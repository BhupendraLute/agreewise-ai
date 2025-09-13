import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import { HelpCircleIcon } from "lucide-react";

const FAQ = () => {
	return (
		<section id="faq" className="py-20 px-6 md:px-12 lg:px-20 bg-muted/40">
			<h2 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-2">
				<HelpCircleIcon className="h-7 w-7 text-primary" />
				Frequently Asked Questions
			</h2>
			<div className="max-w-3xl mx-auto">
				<Accordion type="single" collapsible className="space-y-4">
					<AccordionItem
						value="item-1"
						className="border rounded-lg px-4"
					>
						<AccordionTrigger className="font-semibold">
							Is my data secure?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Yes, your documents are encrypted and only
							accessible to you. We never share your agreements
							with third parties.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem
						value="item-2"
						className="border rounded-lg px-4"
					>
						<AccordionTrigger className="font-semibold">
							Which file formats are supported?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Currently, we support PDF uploads and plain text.
							More formats will be added soon.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem
						value="item-3"
						className="border rounded-lg px-4"
					>
						<AccordionTrigger className="font-semibold">
							Do I need legal knowledge to use AgreeWise?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Not at all. Our goal is to make legal agreements
							understandable for everyone — no jargon, no
							confusion.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</section>
	);
};

export default FAQ;
