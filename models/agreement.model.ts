import { Schema, Document, model, models } from "mongoose";

export interface IAgreemant extends Document {
    userId: Schema.Types.ObjectId;
    title: string;
    clauses: IClause[];
    summary: string;
    category: string;
}

export interface IClause extends Document {
    clause_number: number;
    original_text: string;
    simplified_text: string;
    obligations: string[];
    rights: string[];
    risks: string[];
    tip: string;
}

const AgreementSchema = new Schema<IAgreemant>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
        },
        clauses: [
            {
                clause_number: Number,
                original_text: String,
                simplified_text: String,
                obligations: [String],
                rights: [String],
                risks: [String],
                tip: String,
            },
        ],
        summary: {
            type: String,
        },
        category: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Agreement = models.Agreement || model<IAgreemant>("Agreement", AgreementSchema);

