"use client";
import GoogleButton from "./GoogleButton";
import GithubButton from "./GithubButton";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col items-center rounded-md shadow-md bg-card/40 overflow-hidden w-full max-w-[520px] mx-auto">
            <div className="flex flex-col items-center">
                <Link href="/" className="inline-flex justify-center items-center p-1 my-6">
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
                    Sign in to your account
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
                <form className="flex flex-col items-center gap-4 w-[80%] mx-auto">
                    <div className="w-full">
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            className="w-full"
                            placeholder="Username"
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full"
                            placeholder="Email"
                        />
                    </div>
                    <div className="w-full flex items-center relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            className="w-full"
                            placeholder="Password"
                        />
                        <span
                            className="text-foreground cursor-pointer absolute right-2 p-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                    <div className="w-full flex items-center relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="confirm-password"
                            id="confirm-password"
                            className="w-full"
                            placeholder="Confirm Password"
                        />
                        <span
                            className="text-foreground cursor-pointer absolute right-2 p-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                    <div className="w-full text-center">
                        <Button
                            type="submit"
                            className="w-fit px-8 py-2 cursor-pointer"
                        >
                            Sign Up
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
