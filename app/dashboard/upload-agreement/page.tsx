"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { VscSend } from "react-icons/vsc";

export default function UploadPage() {
	const router = useRouter();
	const [mode, setMode] = useState<"pdf" | "text">("pdf");
	const [file, setFile] = useState<File | null>(null);
	const [rawText, setRawText] = useState("");
	const [agreementText, setAgreementText] = useState("");
	const [loading, setLoading] = useState(false);
	const [uploadingStatus, setUploadingStatus] = useState("");
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit() {
		setLoading(true);
		setError(null);

		setUploadingStatus("Uploading Agreement...");

		try {
			if (mode === "pdf") {
				// PDF mode
				if (!file) throw new Error("Please select a PDF file");
				const formData = new FormData();
				formData.append("file", file);

				setUploadingStatus("Extracting Text from PDF...");

				const pdfResponse = await fetch("/api/upload/pdf", {
					method: "POST",
					body: formData,
				});
				const data = await pdfResponse.json();
				if (!pdfResponse.ok)
					throw new Error("Something went wrong while uploading pdf. Please try again.");

				if (data.text) {
					setAgreementText(data.text);
				} else if (data.error) {
					throw new Error(data.error);
				}
			} else {
				// Text mode
				if (!rawText.trim())
					throw new Error("Please paste agreement text");
				if (rawText.length > 50) {
					setAgreementText(rawText);
				} else {
					throw new Error("Please provide proper agreement text.");
				}
			}

			setUploadingStatus("Analyzing Agreement...");

			const res = await fetch("/api/analyze", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ agreement_text: agreementText }),
			});
			const data = await res.json();
			if (!res.ok)
				throw new Error("Something went wrong while analyzing agreement. Please try again.");
			
			router.push(`/dashboard/agreements/agreement/${data?.agreement?._id}`);

		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
			setUploadingStatus("");
		}
	}

	return (
		<div className="w-full mx-auto max-w-[1440px]">
			<Navbar />
			<main className="bg-background relative">
				<div className="flex flex-col items-center justify-start min-h-[90vh] p-8 space-y-4">
					<div className="text-center">
						<h1 className="text-3xl md:text-5xl font-bold text-primary">
							Upload Legal Agreement
						</h1>
						<h2 className="mt-2 text-lg md:text-xl">
							Turn complex agreements into clear insights
						</h2>
						<p className="text-muted-foreground text-sm md:text-base mt-2 md:mt-4">
							Upload your leagal agreement like a contract, rental
							agreement, or loan <br /> document. AgreeWise will
							break it down into simple language so you know your
							rights, obligations, and risks.
						</p>
					</div>

					{/* Mode toggle */}
					<div className="flex space-x-4">
						<Button
							onClick={() => setMode("pdf")}
							className={`px-4 py-2 rounded cursor-pointer hover:text-white ${
								mode === "pdf"
									? "bg-primary text-white"
									: "bg-transparent border border-primary text-primary"
							}`}
						>
							Upload PDF
						</Button>
						<Button
							onClick={() => setMode("text")}
							className={`px-4 py-2 rounded cursor-pointer hover:text-white ${
								mode === "text"
									? "bg-primary text-white"
									: "bg-transparent border border-primary text-primary"
							}`}
						>
							Paste Text
						</Button>
					</div>

					{/* PDF mode */}
					{mode === "pdf" && (
						<input
							type="file"
							accept="application/pdf"
							onChange={(e) =>
								setFile(e.target.files?.[0] || null)
							}
							className="border rounded p-2"
						/>
					)}

					{/* Text mode */}
					{mode === "text" && (
						<textarea
							value={rawText}
							onChange={(e) => setRawText(e.target.value)}
							placeholder="Paste agreement text here..."
							className="w-full max-w-2xl h-48 border rounded p-3"
						/>
					)}

					<Button
						onClick={handleSubmit}
						disabled={loading}
						className="px-4 py-2 rounded cursor-pointer disabled:opacity-50 group overflow-hidden"
					>
						{loading ? "Processing..." : "Analyze Agreement"}
						<span>
							{loading ? (
								<FaSpinner className="animate-spin" />
							) : (
								<VscSend className="transform transition-transform duration-150 rotate-[-30deg] group-hover:rotate-0 group-focus:rotate-0 group-focus:translate-x-16" />
							)}
						</span>
					</Button>

					{uploadingStatus && (
						<p className="text-primary text-xl">
							<span>{uploadingStatus}</span>
						</p>
					)}

					{error && <p className="text-red-600">{error}</p>}
				</div>
			</main>
		</div>
	);
}
