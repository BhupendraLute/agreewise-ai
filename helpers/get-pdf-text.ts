import fs from "fs";
import pdf from "pdf-parse-fixed";

/**
 * Extract text from a PDF file at the given path.
 */
export async function extractTextFromPdf(
  filePath: string
): Promise<string | null> {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);

    if (data.text && data.text.trim().length > 50) {
      return data.text.trim();
    }
    return null;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return null;
  }
}
