import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Agreement } from "@/models/agreement.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@/models/user.model";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = await params;
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json(
			{ error: "Unauthorized request. Please sign in." },
			{ status: 401 }
		);
	}

	if (!id) {
		return NextResponse.json(
			{ error: "Please provide an agreement id." },
			{ status: 400 }
		);
	}

	try {
		await connectToDatabase();
		const agreement = await Agreement.findById(id);
		if (!agreement) {
			return NextResponse.json(
				{ error: "Agreement not found." },
				{ status: 404 }
			);
		}
		const user = await User.findById(agreement.user);

		if (!user) {
			return NextResponse.json(
				{ error: "User not found." },
				{ status: 404 }
			);
		}

		if (user._id.toString() !== session.user.id) {
			return NextResponse.json(
				{
					error: "Unauthorized request. You are not the owner of this agreement.",
				},
				{ status: 401 }
			);
		}

		return NextResponse.json(
			{ agreement, message: "Agreement found successfully." },
			{ status: 200 }
		);
	} catch (err: any) {
		console.error(err);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
