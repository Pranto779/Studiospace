"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Aperture,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";
import { createAuthClient } from "better-auth/react";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message);
    }
  };

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);

    const Userdata = Object.fromEntries(formdata.entries()) as {
      email: string;
      password: string;
    };

    if (!Userdata.email || !Userdata.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const { error } = await authClient.signIn.email({
        email: Userdata.email,
        password: Userdata.password,
        callbackURL: "/",
      });

      if (error) {
        console.error("Signin error:", error);
        toast.error(error.message);
        return;
      }

      toast.success("Login successful!");
    } catch (err) {
      console.error("Signin failed:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-4 py-10 text-white sm:px-6">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-white/[0.035] blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-zinc-500/[0.06] blur-[140px]" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#101010] shadow-2xl lg:grid-cols-2">
        {/* FORM SECTION */}
        <section className="px-6 py-9 sm:px-10 sm:py-12 lg:px-10 xl:px-12">
          {/* Mobile Logo */}
          <Link href="/" className="mb-9 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04]">
              <Aperture size={23} strokeWidth={1.5} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-[-1px]">
                STUDIO
                <span className="font-light text-zinc-400">SPACE</span>.
              </h1>

              <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                Create Without Limits
              </p>
            </div>
          </Link>

          {/* Heading */}
          <div className="mb-7">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Welcome Back
            </p>

            <h2 className="text-3xl font-semibold tracking-[-1px] sm:text-4xl">
              Sign in<span className="text-zinc-500">.</span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Continue your creative journey with StudioSpace.
            </p>
          </div>

          <form onSubmit={handleSignin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] pl-11 pr-4 text-sm outline-none transition-all placeholder:text-zinc-600 focus:border-white/40 focus:bg-white/[0.05]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-300">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-zinc-500 hover:text-white"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] pl-11 pr-12 text-sm outline-none transition-all placeholder:text-zinc-600 focus:border-white/40 focus:bg-white/[0.05]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black transition-all hover:bg-zinc-200"
            >
              Sign In
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-600">
                Or with Gmail
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            {/* Social Buttons: UI Only */}
            <div className="grid grid-cols-1">
              <button
                onClick={handleGoogleSignin}
                type="button"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07]"
              >
                <svg viewBox="0 0 48 48" className="h-4 w-4">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.01 13.22l7.98 6.19C11.88 13.72 17.43 9.5 24 9.5Z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.2 5.59c4.2-3.87 7.57-9.57 7.57-17.24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M9.99 28.59A14.4 14.4 0 0 1 9.2 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.93 23.93 0 0 0 0 24c0 3.87.93 7.53 2.57 10.78l7.42-6.19Z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.9-5.79l-7.2-5.59c-2 1.34-4.55 2.13-8.7 2.13-6.57 0-12.12-4.22-14.01-10.03l-7.42 6.19C6.51 42.62 14.62 48 24 48Z"
                  />
                </svg>
                Google
              </button>
            </div>
          </form>

          <p className="mt-7 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              Create Account
            </Link>
          </p>

          <p className="mt-6 text-center text-[10px] leading-5 text-zinc-600">
            Welcome back to your creative workspace.
          </p>
        </section>

        {/* HERO SECTION */}
        <section className="relative hidden min-h-[720px] flex-col justify-between overflow-hidden border-l border-white/10 bg-[#141414] p-10 lg:flex xl:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.07),transparent_55%)]" />

          <Link href="/" className="relative flex items-center gap-3 self-end">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04]">
              <Aperture size={27} strokeWidth={1.5} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-[-1.5px]">
                STUDIO
                <span className="font-light text-zinc-400">SPACE</span>.
              </h1>

              <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-400">
                Create Without Limits
              </p>
            </div>
          </Link>

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-300">
                Welcome Back
              </span>
            </div>

            <h2 className="text-5xl font-semibold leading-[1.13] tracking-[-2px] xl:text-6xl">
              Your studio.
              <br />
              Your projects.
              <br />
              <span className="font-light text-zinc-500">
                Ready for the
                <br />
                next booking.
              </span>
            </h2>

            <p className="mt-7 max-w-sm text-sm leading-7 text-zinc-400">
              Access your creative workspace, manage studio listings, track
              bookings, and continue creating extraordinary projects.
            </p>

            <div className="mt-10 flex items-center gap-2">
              <div className="h-1 w-12 rounded-full bg-white" />
              <div className="h-1 w-5 rounded-full bg-white/25" />
              <div className="h-1 w-5 rounded-full bg-white/25" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[11px] text-zinc-500">
              © {new Date().getFullYear()} StudioSpace
            </p>

            <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-600">
              Keep creating
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
