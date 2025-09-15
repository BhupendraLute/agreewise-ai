import fs from "fs";
import pdf from "pdf-parse-fixed";

/**
 * Extract text directly from the PDF text layer.
 */
export async function extractTextFromPdf(
	filePath: string
): Promise<string | null> {
	try {
		const buffer = fs.readFileSync(filePath);
		const data = await pdf(buffer);

		if (data.text.trim().length > 50) {
			return data.text.trim();
		}
		return null;
	} catch (error) {
		console.error("Error extracting text from PDF:", error);
		return null;
	}
}

export async function extractTextWithOcr(filePath: string) : Promise<string | null>{
	try {
    return null;
  } catch (error) {
     console.error("Error extracting text with OCR:", error);
    return null;
  }
}
