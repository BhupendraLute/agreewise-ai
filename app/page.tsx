import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="w-full">
			<section id="hero" className="w-full h-[85vh] overflow-hidden">
				<div className="grid grid-cols-1 md:grid-cols-2">
					<div className="flex flex-col items-center justify-center p-8 md:p-12">
						<h1 className="text-foreground text-3xl md:text-5xl font-bold text-center">
							Agreements made clear, decisions made wise.
						</h1>
						<p className="text-muted-foreground text-sm md:text-base text-center mt-4">
							Welcome to AgreeWise — your AI-powered platform that
							transforms complex legal documents into plain,
							simple language so you can understand what you’re
							signing — with confidence and clarity.
						</p>
						<div className="flex items-center justify-center mt-8">
							<Button className="hover:scale-105 hover:italic duration-200 hovertext-bold">
								<Link
									href="/auth/signin"
									className="px-4 py-2 flex items-center justify-center relative hover:gap-0.5 duration-200"
								>
									<span className="text-semibold">
										Get Started
									</span>
									<ArrowRightIcon className="ml-2" />
								</Link>
							</Button>
						</div>
					</div>
					<div className="flex items-center justify-center relative overflow-hidden rounded-full">
						<div className="absolute top-12 right-20 w-[calc(100%*2)] h-2/3 transform rotate-45 bg-foreground/80 dark:bg-foreground/50 z-[0]" />
						<div className="w-full p-4 md:p-6 z-[1]">
							<Image
								src="/img_2.svg"
								alt="hero"
								width={600}
								height={600}
								className="w-full object-contain"
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
