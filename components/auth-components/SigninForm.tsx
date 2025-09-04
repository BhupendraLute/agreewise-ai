"use client"
import GoogleButton from "./GoogleButton"
import GithubButton from "./GithubButton"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FaEnvelope, FaEye, FaEyeSlash, FaKey } from "react-icons/fa6"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/")
    }
  }

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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full mx-2 md:mx-6"
        >
          {error && <p className="text-red-600">{error}</p>}
          <div className="w-full flex items-center">
            <FaEnvelope className="text-foreground mr-2" />
            <div className="w-full flex items-center relative">
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-foreground"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="w-full flex items-center">
            <FaKey className="text-foreground mr-2" />
            <div className="w-full flex items-center relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="w-full text-center">
            <Button
              type="submit"
              disabled={loading}
              className="w-fit px-8 py-2 cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center gap-2 w-full mt-4 mb-6">
        <p>Don&apos;t have an account?</p>
        <Link href="/auth/signup" className="text-primary hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default SigninForm
