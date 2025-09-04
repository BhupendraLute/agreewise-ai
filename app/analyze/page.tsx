"use client";
import { useState } from "react";

export default function ClauseAnalyzer() {
	const [agreementText, setAgreementText] = useState("");
	const [result, setResult] = useState("");

	const analyze = async () => {
		const res = await fetch("/api/analyze", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ agreement_text: agreementText }),
		});
		const data = await res.json();
		setResult(data.text);
	};

	return (
		<div className="p-6 max-w-xl mx-auto">
			<textarea
				placeholder="Paste a legal clause..."
				className="w-full p-3 border rounded"
				rows={4}
				value={agreementText}
				onChange={(e) => setAgreementText(e.currentTarget.value)}
			/>
			<button
				onClick={analyze}
				className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded"
			>
				Explain Clause
			</button>
			<div className="mt-5 bg-card p-4 rounded whitespace-pre-wrap">
				{result}
			</div>
		</div>
	);
}
