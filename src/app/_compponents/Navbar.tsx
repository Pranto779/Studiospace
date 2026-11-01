"use client";
/* eslint-disable react-hooks/static-components */

import { useState } from "react";
import Link from "next/link";
import {
  Aperture,
  House,
  Compass,
  Workflow,
  Info,
  ArrowUpRight,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  PlusCircle,
  Building2,
  CalendarDays,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { authClient } from "../lib/auth-client";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/", icon: House },
  { name: "Explore Studios", href: "/studios", icon: Compass },
  { name: "How It Works", href: "/how-it-works", icon: Workflow },
  { name: "About Us", href: "/about", icon: Info },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    setProfileOpen(false);
    setIsOpen(false);
  };

  const avatarLetter = user?.name?.trim().charAt(0).toUpperCase() || "U";

  // Profile Loading Skeleton
  const UserSkeleton = ({
    size = "normal",
  }: {
    size?: "normal" | "small";
  }) => (
    <div className="flex animate-pulse items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-3">
      <div
        className={`shrink-0 rounded-full bg-white/10 ${
          size === "small" ? "h-8 w-8" : "h-10 w-10"
        }`}
      />

      {size === "normal" && (
        <>
          <div className="h-3 w-20 rounded bg-white/10" />
          <div className="h-3 w-3 rounded-full bg-white/10" />
        </>
      )}
    </div>
  );

  // User avatar
  const UserAvatar = ({ size = "normal" }: { size?: "normal" | "small" }) => (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 font-semibold text-white ${
        size === "small" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm"
      }`}
    >
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name || "User"}
          height={50}
          width={50}
          className="h-full w-full object-cover"
        />
      ) : (
        avatarLetter
      )}
    </div>
  );

  // Profile menu
  const ProfileMenu = () => (
    <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#141414] p-2 shadow-2xl">
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-3">
        <UserAvatar />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {user?.name}
          </p>

          <p className="truncate text-xs text-zinc-500">{user?.email}</p>
        </div>
      </div>

      <Link
        href="/dashboard"
        onClick={() => setProfileOpen(false)}
        className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/[0.07] hover:text-white"
      >
        <LayoutDashboard size={17} />
        Dashboard
        <ArrowUpRight size={15} className="ml-auto" />
      </Link>

      <Link
        href="/add-studio"
        onClick={() => setProfileOpen(false)}
        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/[0.07] hover:text-white"
      >
        <PlusCircle size={17} />
        Add New Studio
      </Link>

      <Link
        href="/my-listings"
        onClick={() => setProfileOpen(false)}
        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/[0.07] hover:text-white"
      >
        <Building2 size={17} />
        My Studio Listings
      </Link>

      <Link
        href="/my-bookings"
        onClick={() => setProfileOpen(false)}
        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/[0.07] hover:text-white"
      >
        <CalendarDays size={17} />
        My Bookings
      </Link>

      <div className="my-2 border-t border-white/10" />

      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition-colors hover:bg-red-500/10"
      >
        <LogOut size={17} />
        Logout
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/95 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <nav className="flex h-16 items-center justify-between sm:h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/[0.08] sm:h-11 sm:w-11">
              <Aperture
                size={25}
                strokeWidth={1.6}
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </div>

            <div>
              <h1 className="text-[21px] font-bold leading-none tracking-[-1px] sm:text-[24px]">
                STUDIO
                <span className="font-light text-zinc-400">SPACE</span>
                <span>.</span>
              </h1>

              <p className="mt-1.5 hidden text-[8px] font-medium uppercase tracking-[0.35em] text-zinc-400 min-[380px]:block">
                Create Without Limits
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1.5 xl:flex">
            {navLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={`group flex items-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-medium transition-all duration-300 xl:px-5 ${
                  pathname === href
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                <Icon
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                {name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 xl:flex">
            {isPending ? (
              <UserSkeleton />
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-expanded={profileOpen}
                  aria-label="Open profile menu"
                  className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-3 transition-colors hover:bg-white/[0.08]"
                >
                  <UserAvatar />

                  <span className="max-w-28 truncate text-sm font-medium text-zinc-200">
                    {user.name || "Profile"}
                  </span>

                  <ChevronDown
                    size={15}
                    className={`text-zinc-500 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && <ProfileMenu />}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-[13px] font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Login In
                </Link>

                <Link
                  href="/signup"
                  className="group flex h-11 items-center gap-3 rounded-full bg-white px-5 text-[12px] font-semibold text-black transition-all hover:bg-zinc-200"
                >
                  Register
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={14} />
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-3 xl:hidden">
            {isPending ? (
              <UserSkeleton size="small" />
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  className="flex items-center gap-2 rounded-full border border-white/10 p-1"
                >
                  <UserAvatar size="small" />
                  <ChevronDown size={14} />
                </button>

                {profileOpen && <ProfileMenu />}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-1 py-2 text-xs font-medium text-zinc-300 hover:text-white sm:px-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-white px-2.5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-zinc-200 sm:px-4"
                >
                  Register
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] transition-colors hover:bg-white/10"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`grid transition-all duration-300 ease-in-out xl:hidden ${
            isOpen
              ? "grid-rows-[1fr] pb-5 opacity-100"
              : "grid-rows-[0fr] pb-0 opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-1 border-t border-white/10 pt-4">
              {navLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={17} strokeWidth={1.7} />
                    {name}
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
