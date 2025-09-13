import HeroButton from "./HeroButton";

const FinalCTA = () => {
	return (
		<section className="py-20 px-6 md:px-12 lg:px-20 text-center">
			<div className="max-w-3xl mx-auto p-10 rounded-2xl border shadow bg-background">
				<h2 className="text-2xl md:text-3xl font-bold mb-4">
					Ready to simplify your agreements?
				</h2>
				<p className="text-muted-foreground mb-6">
					Upload your first document today and let AgreeWise show you
					the power of clarity in legal agreements.
				</p>
				<HeroButton
					text="Upload Agreement"
					link="/dashboard/upload-agreement"
				/>
			</div>
		</section>
	);
};

export default FinalCTA;
