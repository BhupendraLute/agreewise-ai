import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/db/mongoose"
import { User } from "@/models/user.model"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password, confirmPassword } = body

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const existingUser = await User.findOne({ email }).lean()
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      )
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
    // @ts-nocheck
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { message: error.message || "Something went wrong during signup" },
      { status: 500 }
    )
  }
}
