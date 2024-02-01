"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 h-16 w-full bg-black text-sm">
        <div className="container flex h-full items-center">
          <Link href="#" className="mr-8 text-xl font-bold">
            Ticketflow
          </Link>

          <div className="hidden w-full lg:flex ">
            <Link
              className="mt-1 rounded-full px-4 py-1 text-neutral-400 duration-200 hover:bg-neutral-800 hover:text-neutral-100"
              href="#"
            >
              Dogodki
            </Link>

            <Link
              className="mt-1 rounded-full px-4 py-1 text-neutral-400 duration-200 hover:bg-neutral-800 hover:text-neutral-100"
              href="#"
            >
              Prodajna Mesta
            </Link>

            <Link
              className="mt-1 rounded-full px-4 py-1 text-neutral-400 duration-200 hover:bg-neutral-800 hover:text-neutral-100"
              href="#"
            >
              Za Organizatorje
            </Link>

            <div className="grow" />

            <Link
              className="mt-1 px-2 py-1 text-neutral-400 duration-200 hover:text-neutral-100"
              href="#"
            >
              Kontakt
            </Link>

            <Link
              className="mx-2 rounded-md border border-neutral-600 bg-neutral-950 px-4 py-1.5 font-medium text-white duration-200 hover:bg-neutral-800"
              href="#"
            >
              Prijava
            </Link>

            <Link
              className="rounded-md border border-neutral-600 bg-white px-4 py-1.5 font-medium text-black duration-200 hover:bg-neutral-200"
              href="#"
            >
              Registracija
            </Link>
          </div>

          <div className="flex w-full justify-end lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex aspect-square h-9 items-center justify-center rounded-full border border-neutral-600"
            >
              {isOpen ? (
                <XIcon className="text-neutral-400" />
              ) : (
                <MenuIcon className="text-neutral-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {!isOpen && children}
    </>
  );
}
