import { FileText } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmptyAgreementsState = () => {
	return (
		<div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-border rounded-xl bg-muted/30">
			<FileText className="h-12 w-12 text-muted-foreground mb-4" />
			<h3 className="text-lg font-semibold text-foreground mb-2">
				No agreements yet
			</h3>
			<p className="text-sm text-muted-foreground max-w-sm mb-4">
				Upload or create a new agreement to get started. We&apos;ll help
				you simplify and understand the clauses with ease.
			</p>
			<Button asChild>
				<Link href="/dashboard/upload-agreement">+ New Agreement</Link>
			</Button>
		</div>
	);
};

export default EmptyAgreementsState;
