import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const HeroButton = ({ text, link }: { text: string; link: string }) => {
	return (
		<Button
			className={cn(
				"group hover:scale-105 duration-200 hover:shadow-lg text-base md:text-lg font-semibold px-6 py-3"
			)}
		>
			<Link
				href={link}
				className="flex items-center justify-center relative"
			>
				<span>{text}</span>
				<ArrowRightIcon className="ml-2 h-5 w-5 transform transition-transform duration-200 rotate-[-30deg] group-hover:rotate-0" />
			</Link>
		</Button>
	);
};

export default HeroButton;