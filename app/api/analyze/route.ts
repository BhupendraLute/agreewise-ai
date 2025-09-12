import { NextResponse } from "next/server";
import { client } from "@/lib/genai";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Agreement, IAgreement } from "@/models/agreement.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/user.model";
import { Schema } from "mongoose";

function sanitizeOutput(json: any) {
	if (!json || !Array.isArray(json.clauses)) return json;

	json.clauses = json.clauses.map((clause: any, i: number) => {
		if (!Array.isArray(clause.risks)) {
			try {
				const parsed = JSON.parse(clause.risks);
				clause.risks = Array.isArray(parsed) ? parsed : [];
			} catch {
				clause.risks = [];
			}
		}
		return clause;
	});

	return json;
}

export async function POST(req: Request) {
	await connectToDatabase();

	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json(
			{ error: "Unauthorized request. Please sign in." },
			{ status: 401 }
		);
	}

	const { agreement_text } = await req.json();

	console.log("agreement_text length: ", agreement_text.length);

	if (!agreement_text) {
		return NextResponse.json(
			{ error: "Please provide an agreement text." },
			{ status: 400 }
		);
	}

	const prompt = `
You are a legal assistant. The user provides a full agreement text.  
Return ONLY valid JSON matching this schema:

{
  "agreement_title": string,
  "clauses": [
    {
      "clause_number": number,
      "original_text": string,
      "simplified_text": string,
      "obligations": [string],
      "rights": [string],
      "risks": [
        {
          "risk_level": "low" | "medium" | "high",
          "risk": string,
          "solution": string
        }
      ],
      "tip": string
    }
  ],
  "summary": string,
  "category": string
}

Guidelines:
- Obligations = duties imposed by the clause.
- Rights = benefits granted.
- Risks = possible downsides or liabilities.
- Tip = a practical suggestion for understanding or negotiating the clause.
- Do not include text outside of the JSON.

Agreement text to analyze:
"""${agreement_text}"""
`;

	try {
		const user = await User.findOne({ email: session.user.email });

		if (!user)
			return NextResponse.json(
				{ error: "User not found in database" },
				{ status: 500 }
			);

		const response = await client.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt,
			config: {
				responseMimeType: "application/json",
			},
		});

		const output = response.text || "";
		if (output === "" || !output)
			return NextResponse.json(
				{ error: "No output generated" },
				{ status: 500 }
			);

		let json = JSON.parse(output);

		json = sanitizeOutput(json);
		if (json.error)
			return NextResponse.json({ error: json.error }, { status: 500 });

		const agreement: IAgreement = await Agreement.create({
			user: user?._id as Schema.Types.ObjectId,
			title: json.agreement_title,
			clauses: json.clauses,
			agreement_text: agreement_text,
			summary: json.summary,
			category: json.category,
		});

		if (!agreement)
			return NextResponse.json(
				{ error: "Failed to create agreement" },
				{ status: 500 }
			);

		return NextResponse.json({agreement}, { status: 200 });
	} catch (err: any) {
		console.error(err);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
