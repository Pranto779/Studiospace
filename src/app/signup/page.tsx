"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Aperture,
  Eye,
  EyeOff,
  UserRound,
  Mail,
  Image as ImageIcon,
  LockKeyhole,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { authClient } from "../lib/auth-client";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordRules = [
    {
      valid: /[A-Z]/.test(password),
      label: "At least one uppercase letter (A–Z)",
    },
    {
      valid: /[a-z]/.test(password),
      label: "At least one lowercase letter (a–z)",
    },
    {
      valid: password.length >= 6,
      label: "At least 6 characters",
    },
  ];
  const Handlesub = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formdata = new FormData(e.currentTarget);

  const Userdata = Object.fromEntries(formdata.entries()) as {
    name: string;
    email: string;
    password: string;
    image: string;
  };

  try {
    const { error } = await authClient.signUp.email({
      name: Userdata.name,
      email: Userdata.email,
      password: Userdata.password,
      image: Userdata.image || undefined,
    });
     await authClient.signOut();

    if (error) {
      toast.error(error.message || "Registration failed!");
      return;
    }

    toast.success("Registration successful!");

    router.push("/signin");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Please try again.");
  }
};

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-4 py-10 text-white sm:px-6">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-white/[0.035] blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-zinc-500/[0.06] blur-[140px]" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#101010] shadow-2xl lg:grid-cols-2">
        {/* Left Side */}
        <section className="relative hidden min-h-[720px] flex-col justify-between overflow-hidden border-r border-white/10 bg-[#141414] p-10 lg:flex xl:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.07),transparent_55%)]" />

          <Link href="/" className="relative flex items-center gap-3">
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

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-300">
                Made for Creators
              </span>
            </div>

            <h2 className="text-5xl font-semibold leading-[1.13] tracking-[-2px] xl:text-6xl">
              Your vision.
              <br />
              Your space.
              <br />
              <span className="font-light text-zinc-500">
                Your next
                <br />
                masterpiece.
              </span>
            </h2>

            <p className="mt-7 max-w-sm text-sm leading-7 text-zinc-400">
              Discover inspiring creative spaces, connect with studio owners,
              and turn your next big idea into reality.
            </p>

            <div className="mt-10 flex items-center gap-2">
              <div className="h-1 w-12 rounded-full bg-white" />
              <div className="h-1 w-5 rounded-full bg-white/25" />
              <div className="h-1 w-5 rounded-full bg-white/25" />
            </div>
          </div>

          <div className="relative flex items-center justify-between gap-4">
            <p className="text-[11px] text-zinc-500">
              © {new Date().getFullYear()} StudioSpace
            </p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-600">
              Space to create
            </p>
          </div>
        </section>

        {/* Right Side: Signup Form */}
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
              Join The Community
            </p>

            <h2 className="text-3xl font-semibold tracking-[-1px] sm:text-4xl">
              Create account<span className="text-zinc-500">.</span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Start your creative journey with StudioSpace.
            </p>
          </div>


       

          {/* Form */}
          <form onSubmit={Handlesub} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium text-zinc-300"
              >
                Full Name
              </label>
              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                 required
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"            
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/40 focus:bg-white/[0.045]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium text-zinc-300"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                 required
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/40 focus:bg-white/[0.045]"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-xs font-medium text-zinc-300"
              >
                Photo URL <span className="text-zinc-600">(Optional)</span>
              </label>
              <div className="relative">
                <ImageIcon
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                required
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/40 focus:bg-white/[0.045]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium text-zinc-300"
              >
                Password
              </label>
              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] pl-11 pr-12 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/40 focus:bg-white/[0.045]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-white"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {/* Password Rules */}
              <div className="mt-3 space-y-2">
                {passwordRules.map((rule) => {
                  const passed = password.length > 0 && rule.valid;

                  return (
                    <p
                      key={rule.label}
                      className={`flex items-center gap-2 text-[11px] transition-colors ${
                        passed ? "text-emerald-400" : "text-zinc-500"
                      }`}
                    >
                      {passed ? (
                        <Check size={13} />
                      ) : (
                        <X size={13} className="text-zinc-600" />
                      )}
                      {rule.label}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black transition-all duration-300 hover:bg-zinc-200"
            >
              Create Account
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
               {/* Divider */}
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

          {/* Sign In */}
          <p className="mt-7 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-white underline-offset-4 transition-colors hover:text-zinc-300 hover:underline"
            >
              Sign In
            </Link>
          </p>

          <p className="mt-6 text-center text-[10px] leading-5 text-zinc-600">
            Your creative journey starts with a single step.
          </p>
        </section>
      </div>
    </main>
  );
}
