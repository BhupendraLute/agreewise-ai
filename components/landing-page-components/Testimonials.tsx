import { QuoteIcon } from "lucide-react"

const Testimonials = () => {
  return (
    <section
					id="testimonials"
					className="py-20 px-6 md:px-12 lg:px-20 text-center"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-center">
						What Our Users Say
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="p-6 rounded-xl border shadow-sm bg-background">
							<p className="italic text-muted-foreground">
								“AgreeWise made my rental agreement so much
								easier to understand. I finally knew exactly
								what I was signing.”
							</p>
							<p className="mt-3 font-semibold">— Priya, Tenant</p>
						</div>
						<div className="p-6 rounded-xl border shadow-sm bg-background">
							<p className="italic text-muted-foreground">
								“The insights helped me avoid a risky clause in
								a business contract. Saved me a lot of trouble.”
							</p>
							<p className="mt-3 font-semibold">
								— Arjun, Entrepreneur
							</p>
						</div>
						<div className="p-6 rounded-xl border shadow-sm bg-background">
							<p className="italic text-muted-foreground">
								“As a first-time employee, I didn’t understand
								notice periods. AgreeWise explained it
								clearly.”
							</p>
							<p className="mt-3 font-semibold">
								— Neha, Software Engineer
							</p>
						</div>
					</div>
				</section>
  )
}

export default Testimonials