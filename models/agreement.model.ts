import { Schema, Document, model, models } from "mongoose";

// ---- Interfaces ----
export interface IRisk {
  risk_level: "low" | "medium" | "high";
  risk: string;
  solution: string;
}

export interface IClause extends Document {
  clause_number: number;
  original_text: string;
  simplified_text: string;
  obligations: string[];
  rights: string[];
  risks: IRisk[];
  tip: string;
}

export interface IAgreement extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  clauses: IClause[];
  agreement_text: string;
  summary: string;
  category: string;
}

// ---- Sub-schemas ----
const RiskSchema = new Schema<IRisk>(
  {
    risk_level: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    risk: { type: String, required: true },
    solution: { type: String, required: true },
  },
  { _id: false }
);

const ClauseSchema = new Schema<IClause>(
  {
    clause_number: { type: Number, required: true },
    original_text: { type: String, required: true },
    simplified_text: { type: String, required: true },
    obligations: [{ type: String }],
    rights: [{ type: String }],
    risks: [RiskSchema],
    tip: { type: String },
  },
  { _id: false }
);

// ---- Agreement schema ----
const AgreementSchema = new Schema<IAgreement>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String },
    clauses: [ClauseSchema],
    agreement_text: {
      type: String,
      required: true,
    },
    summary: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

export const Agreement =
  models.Agreement || model<IAgreement>("Agreement", AgreementSchema);
