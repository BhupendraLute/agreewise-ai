import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/landing-page-components/HowItWorks";
import Features from "@/components/landing-page-components/Features";
import Testimonials from "@/components/landing-page-components/Testimonials";
import FAQ from "@/components/landing-page-components/FAQ";
import Footer from "@/components/landing-page-components/Footer";
import FinalCTA from "@/components/landing-page-components/FinalCTA";
import Hero from "@/components/landing-page-components/Hero";



export default function Home() {
	return (
		<div className="w-full mx-auto max-w-[1440px]">
			<Navbar />
			<main className="bg-background relative">
				<Hero />

				<Features />

				<HowItWorks />

				<Testimonials />

				<FAQ />

				<FinalCTA />

				<Footer />
			</main>
		</div>
	);
}
