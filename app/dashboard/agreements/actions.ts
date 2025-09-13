"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Agreement } from "@/models/agreement.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function deleteAgreement(id: string) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  if (!session) return;

  await Agreement.deleteOne({ _id: id, user: session.user.id });

  revalidatePath("/dashboard/agreements"); // refresh agreements list
}
