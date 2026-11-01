"use client";

import Link from "next/link";
import { Aperture } from "lucide-react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Brand */}
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

          {/* Links */}
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

              <Link
                href="/contact"
                className="block hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-semibold">
              Stay Updated
            </h3>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
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
            </div>

            {/* Social */}
            <div className="mt-5 flex gap-2">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition hover:bg-white hover:text-black"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932L18.901 1.153z" />
                </svg>
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition hover:bg-white hover:text-black"
              >
                <FaInstagram size={16} />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition hover:bg-white hover:text-black"
              >
                <FaLinkedin size={16} />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition hover:bg-white hover:text-black"
              >
                <FaYoutube size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
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