"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, DragEvent } from "react";
import { FaSpinner } from "react-icons/fa6";
import { VscSend } from "react-icons/vsc";
import { Upload, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UploadPage() {
	const router = useRouter();
	const [mode, setMode] = useState<"pdf" | "text">("pdf");
	const [file, setFile] = useState<File | null>(null);
	const [rawText, setRawText] = useState("");
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<number>(0); // 0 = idle, 1 = upload, 2 = extract, 3 = analyze, 4 = done
	const [error, setError] = useState<string | null>(null);
	const [dragActive, setDragActive] = useState(false);

	async function handleSubmit() {
		setLoading(true);
		setError(null);
		setStep(1);

		let retries = 0;
		let success = false;

		while (!success && retries < 3) {
			try {
				let text = "";
				if (mode === "pdf") {
					if (!file) throw new Error("Please select a PDF file");
					const formData = new FormData();
					formData.append("file", file);

					setStep(2);
					const pdfResponse = await fetch("/api/upload/pdf", {
						method: "POST",
						body: formData,
					});

					const data = await pdfResponse.json();
					if (!pdfResponse.ok)
						throw new Error(data.error || "Failed to process PDF");
					text = data.text;
				} else {
					if (!rawText.trim())
						throw new Error("Please paste agreement text");
					if (rawText.length <= 50)
						throw new Error("Agreement text seems too short.");
					text = rawText;
				}
				setStep(3);

				const res = await fetch("/api/analyze", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ agreement_text: text }),
				});

				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Analysis failed");

				setStep(4);
				success = true;
				router.push(
					`/dashboard/agreements/agreement/${data?.agreement?._id}`
				);
			} catch (err: any) {
				retries++;
				if (retries >= 3) {
					setError(err.message || "Upload failed. Please try again.");
					setStep(0);
				}
			}
		}

		setLoading(false);
	}

	function handleDragOver(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		setDragActive(true);
	}

	function handleDragLeave(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		setDragActive(false);
	}

	function handleDrop(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const droppedFile = e.dataTransfer.files[0];
			if (droppedFile.type === "application/pdf") {
				setFile(droppedFile);
			} else {
				setError("Only PDF files are supported.");
			}
		}
	}

	const steps = [
		{ id: 1, label: "Upload" },
		{ id: 2, label: "Extract" },
		{ id: 3, label: "Analyze" },
		{ id: 4, label: "Done" },
	];

	return (
		<div className="w-full mx-auto max-w-4xl">
			<main className="bg-background">
				<div className="flex flex-col items-center justify-start min-h-[89vh] p-8 space-y-8">
					{/* Header */}
					<div className="text-center max-w-2xl space-y-3">
						<h1 className="text-3xl md:text-5xl font-bold text-primary">
							Upload Agreement
						</h1>
						<h2 className="mt-1 text-lg md:text-xl font-medium text-foreground">
							From complex legal docs to clear, actionable
							insights
						</h2>
						<p className="text-muted-foreground text-sm md:text-base">
							Upload your contract, rental agreement, loan
							document, or any other legal file. AgreeWise will
							simplify it into obligations, rights, and risks you
							can actually understand.
						</p>
					</div>

					<div className="flex space-x-4">
						<Button
							onClick={() => setMode("pdf")}
							className={cn(
								"px-5 py-2 rounded transition-all",
								mode === "pdf"
									? "bg-primary text-white shadow-md"
									: "bg-muted text-foreground"
							)}
						>
							Upload PDF
						</Button>
						<Button
							onClick={() => setMode("text")}
							className={cn(
								"px-5 py-2 rounded transition-all",
								mode === "text"
									? "bg-primary text-white shadow-md"
									: "bg-muted text-foreground"
							)}
						>
							Paste Text
						</Button>
					</div>

					{mode === "pdf" && (
						<div
							className={cn(
								"w-full max-w-md border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors relative",
								dragActive
									? "border-primary bg-primary/10"
									: "border-muted-foreground/25"
							)}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
						>
							<Upload className="h-8 w-8 mb-2 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">
								Drag & drop your PDF here, or click to select
							</p>
							<input
								type="file"
								accept="application/pdf"
								onChange={(e) =>
									setFile(e.target.files?.[0] || null)
								}
								className="absolute inset-0 opacity-0 cursor-pointer"
							/>
							{file && (
								<p className="mt-2 text-sm text-primary font-medium">
									Selected: {file.name}
								</p>
							)}
						</div>
					)}

					{mode === "text" && (
						<textarea
							value={rawText}
							onChange={(e) => setRawText(e.target.value)}
							placeholder="Paste agreement text here..."
							className="w-full max-w-2xl h-48 border border-input rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
						/>
					)}

					{/* Stepper */}
					{loading && (
						<div className="flex items-center space-x-6 mt-4">
							{steps.map((s) => (
								<div
									key={s.id}
									className="flex flex-col items-center text-center"
								>
									{step > s.id ? (
										<CheckCircle2 className="h-6 w-6 text-green-500" />
									) : step === s.id ? (
										<FaSpinner className="h-6 w-6 animate-spin text-primary" />
									) : (
										<Circle className="h-6 w-6 text-muted-foreground" />
									)}
									<span className="text-xs mt-1 text-muted-foreground">
										{s.label}
									</span>
								</div>
							))}
						</div>
					)}

					<Button
						onClick={handleSubmit}
						disabled={loading}
						className="px-6 py-3 rounded-md font-medium text-lg disabled:opacity-50 group overflow-hidden"
					>
						{loading ? "Processing..." : "Analyze Agreement"}
						<span className="ml-2">
							{loading ? (
								<FaSpinner className="animate-spin" />
							) : (
								<VscSend className="transform transition-transform duration-150 rotate-[-30deg] group-hover:rotate-0" />
							)}
						</span>
					</Button>

					{/* Error */}
					{error && (
						<p className="text-red-600 text-sm font-medium">
							{error}
						</p>
					)}
				</div>
			</main>
		</div>
	);
}
