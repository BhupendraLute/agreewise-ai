import GoogleButton from "./GoogleButton";
import GithubButton from "./GithubButton";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaEnvelope, FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (form.password !== form.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Failed to sign up");

			router.push("/auth/signin");
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center rounded-md shadow-md bg-card/40 overflow-hidden w-full max-w-[520px] mx-auto">
			<div className="flex flex-col items-center">
				<Link
					href="/"
					className="inline-flex justify-center items-center p-1 my-6"
				>
					<Image
						className="size-10 md:size-12 "
						src="/favicon.webp"
						alt="logo"
						width={100}
						height={100}
					/>
					<span className="text-2xl md:text-4xl text-foreground font-semibold">
						AgreeWise
					</span>
				</Link>
				<p className="md:text-lg text-foreground font-semibold mb-4">
					Create a new account
				</p>
				<p className="text-sm text-foreground">with</p>
			</div>
			<div className="flex items-center justify-center gap-12 w-full my-4 mx-1">
				<GoogleButton />
				<GithubButton />
			</div>
			<div className="w-full relative my-4">
				<Separator />
				<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 py-2 rounded-full">
					or
				</span>
			</div>
			<div className="flex items-center justify-center gap-4 w-full my-4">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center gap-4 w-full mx-2 md:mx-6"
				>
					{error && <p className="text-red-600">{error}</p>}
					<div className="w-full flex items-center">
						<FaUser className="mr-2" />
						<div className="w-full">
							<Input
								type="text"
								name="name"
								id="name"
								value={form.name}
								onChange={handleChange}
								className="w-full border-foreground"
								placeholder="Username"
								required
							/>
						</div>
					</div>
					<div className="w-full flex items-center">
						<FaEnvelope className="mr-2" />
						<div className="w-full">
							<Input
								type="email"
								name="email"
								id="email"
								value={form.email}
								onChange={handleChange}
								className="w-full border-foreground"
								placeholder="Email"
								required
							/>
						</div>
					</div>
					<div className="w-full flex items-center">
						<FaKey className="mr-2" />
						<div className="w-full flex items-center relative">
							<Input
								type={showPassword ? "text" : "password"}
								name="password"
								id="password"
								value={form.password}
								onChange={handleChange}
								className="w-full border-foreground"
								placeholder="Password"
								required
							/>
							<span
								className="text-foreground cursor-pointer absolute right-2 p-1"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <FaEye /> : <FaEyeSlash />}
							</span>
						</div>
					</div>
					<div className="w-full flex items-center">
						<FaKey className="mr-2" />
						<div className="w-full flex items-center relative">
							<Input
								type={showPassword ? "text" : "password"}
								name="confirmPassword"
								id="confirmPassword"
								value={form.confirmPassword}
								onChange={handleChange}
								className="w-full border-foreground"
								placeholder="Confirm Password"
								required
							/>
							<span
								className="text-foreground cursor-pointer absolute right-2 p-1"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <FaEye /> : <FaEyeSlash />}
							</span>
						</div>
					</div>
					<div className="w-full text-center">
						<Button
							type="submit"
							disabled={loading}
							className="w-fit px-8 py-2 cursor-pointer"
						>
							{loading ? "Signing up..." : "Sign Up"}
						</Button>
					</div>
				</form>
			</div>
			<div className="flex items-center justify-center gap-2 w-full mt-4 mb-6">
				<p>Already have an account?</p>
				<Link
					href="/auth/signin"
					className="text-primary hover:underline"
				>
					Sign In
				</Link>
			</div>
		</div>
	);
};

export default SignupForm;
