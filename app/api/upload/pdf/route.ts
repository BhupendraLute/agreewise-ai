import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { extractTextFromPdf } from "@/helpers/get-pdf-text";

export async function POST(req: Request) {
  let filePath: string | null = null;
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save uploaded file to /tmp
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const tempDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    filePath = path.join(tempDir, `${Date.now()}-${file.name}`);
    fs.writeFileSync(filePath, buffer);

    // Try extracting text
    let text: string | null = null;
    try {
      text = await extractTextFromPdf(filePath);
    } catch (err) {
      console.warn("pdf-parse failed", err);
      return NextResponse.json({ error: "Failed to extract text"});
    }

    // // If extraction failed, try OCR
    // if (!text) {
    //   // text = await extractTextWithOcr(filePath);
    // }

    if (!text) {
      return NextResponse.json({ error: "Failed to extract text"}, { status: 500 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error in /api/upload/pdf:", error);
    return NextResponse.json(
      { error: "Failed to process PDF, please try again" },
      { status: 500 }
    );
  } finally {
    // Cleanup uploaded file after processing
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn("Failed to delete temp file:", filePath, err);
      }
    }
  }
}
