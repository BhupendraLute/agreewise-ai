declare module "pdf-parse-fixed" {
  import { Buffer } from "buffer";

  interface PDFInfo {
    numpages: number;
    numrender: number;
    info: Record<string, any>;
    metadata: any;
    text: string;
    version: string;
  }

  function pdf(dataBuffer: Buffer): Promise<PDFInfo>;

  export = pdf;
}
