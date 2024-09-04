"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";
import { ProfileToggle } from "./profile-toggle";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";

const Header = () => {
  const { status } = useSession();
  const router = useRouter();

  return (
    <header className="py-2">
      <nav className="container flex items-center justify-between">
        <div>
          <Link href={`/`}>
            <KeyRound />
          </Link>
        </div>
        <ul className="flex gap-10 font-medium">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/me">Me</Link>
          </li>
          <li>
            <Link href="/private-data">PrivateData</Link>
          </li>
        </ul>

        <div className="flex items-center justify-between gap-6">
          <ThemeToggle />
          {status == "authenticated" ? (
            <ProfileToggle />
          ) : (
            <>
              <Button size={`sm`} onClick={() => router.push("/sign-in")}>
                Sign in
              </Button>
              <Button size={`sm`} onClick={() => router.push("/sign-up")}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
