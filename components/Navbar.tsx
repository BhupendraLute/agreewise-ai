import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between fixed top-0 w-full py-2 px-4 bg-background z-50">
        <Link href="/" className="inline-flex justify-center items-center p-1">
          <Image className="size-8 md:size-10 " src="/favicon.webp" alt="logo" width={100} height={100} />
          <span className="text-xl md:text-2xl text-foreground font-semibold">AgreeWise</span>
        </Link>
    </nav>
  )
}

export default Navbar