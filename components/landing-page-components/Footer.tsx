import Link from "next/link";

const Footer = () => {
	return (
		<footer className="py-10 px-6 md:px-12 lg:px-20 border-t mt-10">
			<div className="flex flex-col md:flex-row justify-between items-center gap-4">
				<p className="text-sm text-muted-foreground">
					© {new Date().getFullYear()} AgreeWise. All rights reserved.
				</p>
				<div className="flex gap-4 text-sm">
					<Link href="/privacy" className="hover:underline">
						Privacy Policy
					</Link>
					<Link href="/terms" className="hover:underline">
						Terms of Service
					</Link>
					<Link href="/contact" className="hover:underline">
						Contact
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
