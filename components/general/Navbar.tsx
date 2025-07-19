"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";


export default function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  return (
    <>
    
      <nav className="w-full py-4 px-2 flex items-center justify-between shadow-md bg-white dark:bg-zinc-950 mb-1 rounded-2xl">
        
        <Link href="/">
       <h1 className="text-3xl font-semibold flex items-center pr-2">
  <Image
    src="/equationarylogo.png"
    alt="logo"
    width={40}
    height={40}
    className="relative top-[2px] hidden md:block"
  />
  <span className="text-blue-500 text-xl sm:text-2xl md:text-3xl">EQUATIONARY</span>
</h1>


        </Link>

        
        <div className="flex items-center gap-3">
          {user && (
            <Link href="/dashboard">
              <div className="relative size-8 overflow-hidden rounded-full">
                <Image
                  src={user?.picture || "/vercel.svg"}
                  alt={user?.given_name || "user"}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          )}

          <ModeToggle />

          {user ? (
            <LogoutLink>
              <Button variant="secondary" size="sm" className="cursor-pointer">Logout</Button>
            </LogoutLink>
          ) : (
            <>
              <LoginLink>
                <Button size="sm" className="cursor-pointer">Login</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary" size="sm" className="cursor-pointer">Signup</Button>
              </RegisterLink>
            </>
          )}
        </div>
      </nav>

      {/* Secondary Nav */}
      <div className="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-2xl shadow-sm mb-3">
        <div className="max-w-6xl mx-auto flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-500 hover:underline underline-offset-4">Home</Link>
          <Link href="/contest" className="text-sm font-medium hover:text-blue-500 hover:underline underline-offset-4">Contests</Link>
          <Link href="/blogs" className="text-sm font-medium hover:text-blue-500 hover:underline underline-offset-4">Blogs</Link>
                    <Link href="/about" className="text-sm font-medium hover:text-blue-500 hover:underline underline-offset-4">About us</Link>
        </div>
      </div>
    </>
  );
}
