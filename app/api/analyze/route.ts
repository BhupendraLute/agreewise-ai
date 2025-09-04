import { NextResponse } from "next/server";
import { client } from "@/lib/genai";

export async function POST(req: Request) {
	const { agreement_text } = await req.json();

	const prompt = `
You are a legal assistant specializing in simplifying legal agreements.  
The user will provide a complete raw agreement text.  

Your task: analyze it find out cluses and analyze each clause and return ONLY a valid JSON object with this schema:

{
  "agreement_title": string,
  "clauses": [
    {
      "clause_number": number,
      "original_text": string,
      "simplified_text": string,
      "obligations": [string],
      "rights": [string],
      "risks": [string],
      "tip": string
    }
  ],
  "summary": string,
  "category": string
}

Rules:
1. Always return valid JSON (no explanations outside JSON).
2. Obligations = duties imposed by the clause.
3. Rights = benefits granted.
4. Risks = possible downsides or liabilities.
5. Tip = a helpful suggestion to understand or negotiate this clause.

Here are some example mappings for reference:
[
  {
    "clause": "The Lessee shall pay to the Lessor a monthly rent of INR 15,000 on or before the 5th day of each calendar month, failing which a penalty of INR 500 per day shall be levied.",
    "simplified": "The tenant must pay rent of ₹15,000 every month by the 5th. If late, a ₹500 fine is charged per day.",
    "category": "Rental Agreement",
    "tips": "Set reminders to avoid late payment penalties."
  },
  {
    "clause": "In the event of the Borrower defaulting on three consecutive installments, the Bank shall have the right to seize the collateral provided without further notice.",
    "simplified": "If you miss 3 loan payments in a row, the bank can take the asset you pledged without warning.",
    "category": "Loan Agreement",
    "tips": "If you can’t pay on time, talk to the bank before missing multiple payments."
  },
  {
    "clause": "The Employee shall serve a notice period of 90 days in the event of voluntary resignation, failing which the Employer reserves the right to deduct salary in lieu of notice.",
    "simplified": "If you quit your job, you must work for 90 more days or your employer can deduct that salary amount.",
    "category": "Employment Contract",
    "tips": "Check if your company allows buyout of notice period."
  },
  {
    "clause": "The Parties agree to resolve any disputes arising under this Agreement through arbitration in New Delhi, in accordance with the Arbitration and Conciliation Act, 1996.",
    "simplified": "Any disputes will be handled by arbitration in New Delhi under Indian law.",
    "category": "Business Contract",
    "tips": "Arbitration usually means faster resolution than court, but it may still involve costs."
  },
  {
    "clause": "The applicant must link their Aadhaar number with their PAN card before 31st March, failing which the PAN shall become inoperative as per Income Tax regulations.",
    "simplified": "You must link Aadhaar with PAN before 31st March, or your PAN will stop working.",
    "category": "Government Notice",
    "tips": "Linking can be done online via the Income Tax website."
  }
]

Now analyze the following agreement and generate the JSON output:

${agreement_text}
`;

	try {
		const response = await client.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt,
			config: {
				responseMimeType: "application/json",
			},
		});

		const output = response.text || "";
		return NextResponse.json({ text: output });
	} catch (err: any) {
		console.error(err);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
