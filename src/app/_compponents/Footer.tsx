"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Aperture } from "lucide-react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    localStorage.setItem("studiospace-newsletter-email", email.trim());
    setMessage("Thanks! Your email has been saved.");
    setEmail("");
  };

  return (
    <footer className="border-t border-white/10 bg-[#080808] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <Aperture size={24} strokeWidth={1.5} />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-[-1px]">
                  STUDIO
                  <span className="font-light text-zinc-400">
                    SPACE
                  </span>
                  .
                </h2>

                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  Create Without Limits
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-400">
              Discover premium photography studios, podcast lounges,
              music suites and production spaces built for creators.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">
              Quick Links
            </h3>

            <div className="space-y-2 text-sm text-zinc-400">
              <Link href="/" className="block hover:text-white">
                Home
              </Link>

              <Link
                href="/studios"
                className="block hover:text-white"
              >
                Explore Studios
              </Link>

              <Link
                href="/about"
                className="block hover:text-white"
              >
                About Us
              </Link>

            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">
              Stay Updated
            </h3>

            <form className="flex gap-2" onSubmit={subscribe}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="
                  h-11
                  flex-1
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  text-sm
                  outline-none
                "
              />

              <button
                type="submit"
                className="
                  rounded-xl
                  bg-white
                  px-5
                  text-sm
                  font-medium
                  text-black
                  transition
                  hover:bg-zinc-200
                "
              >
                Join
              </button>
            </form>
            {message && (
              <p className="mt-3 text-sm text-zinc-400" role="status">
                {message}
              </p>
            )}
            <div className="mt-5 flex gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <FaInstagram size={16} />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <FaLinkedin size={16} />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <FaYoutube size={16} />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="#" className="hover:text-white">
              Terms
            </Link>

            <Link href="#" className="hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}