"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import HeroButton from "./HeroButton";

const Hero = () => {
	return (
		<section
			id="hero"
			className="w-full min-h-[85vh] flex items-center overflow-hidden"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-12 lg:px-20">
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					viewport={{ once: true }}
					className="flex flex-col items-center md:items-start justify-center text-center md:text-left space-y-6"
				>
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-foreground text-4xl md:text-6xl font-extrabold leading-tight"
					>
						Agreements made clear,
						<br className="hidden md:block" /> decisions made wise.
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						viewport={{ once: true }}
						className="text-muted-foreground text-base md:text-lg max-w-lg"
					>
						Welcome to{" "}
						<span className="font-semibold">AgreeWise</span> — your
						AI-powered platform that transforms complex legal
						documents into plain, simple language so you can sign
						with confidence and clarity.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						viewport={{ once: true }}
						className="flex items-center justify-center md:justify-start gap-4 mt-4"
					>
						<HeroButton text="Get Started" link="/auth/signin" />
						<Link
							href="#features"
							className="text-primary font-medium hover:underline"
						>
							Learn More
						</Link>
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					viewport={{ once: true }}
					className="flex items-center justify-center relative"
				>
					<Image
						src="/img_2.svg"
						alt="hero"
						width={600}
						height={600}
						className="w-full max-w-md md:max-w-lg object-contain relative z-10 drop-shadow-xl"
					/>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
