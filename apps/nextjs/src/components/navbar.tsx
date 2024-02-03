"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, Ticket, XIcon } from "lucide-react";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const items = [
    {
      name: "Dogodki",
      href: "#",
    },
    {
      name: "Prodajna Mesta",
      href: "#",
    },
    {
      name: "Za Organizatorje",
      href: "#",
    },
  ];

  return (
    <>
      <div className="fixed top-0 z-50 h-16 w-full bg-black text-sm">
        <div className="container flex h-full items-center">
          <Link href="#" className="mr-8 flex text-xl font-bold">
            <Ticket className="mr-1 mt-[0.2rem] text-white" size={24} />
            Ticketflow
          </Link>

          <div className="hidden w-full lg:flex ">
            {items.map((item) => (
              <Link
                key={item.name}
                className="mt-1 rounded-full px-4 py-1 text-neutral-400 duration-200 hover:bg-neutral-800 hover:text-neutral-100"
                href={item.href}
              >
                {item.name}
              </Link>
            ))}

            <div className="grow" />
            <Link
              className="mt-1 px-2 py-1 text-neutral-400 duration-200 hover:text-neutral-100"
              href="#"
            >
              Kontakt
            </Link>
            <Link
              className="mx-2 rounded-md border border-neutral-600 bg-neutral-950 px-4 py-1.5 font-medium text-white duration-200 hover:bg-neutral-800"
              href="/prijava"
            >
              Prijava
            </Link>
            <Link
              className="rounded-md border border-neutral-600 bg-white px-4 py-1.5 font-medium text-black duration-200 hover:bg-neutral-200"
              href="/registracija"
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

      {isOpen ? (
        <div className="container fixed top-16 w-full text-white lg:hidden">
          <Link
            className="my-2 block rounded-md border border-neutral-700 py-3 text-center text-sm text-white duration-200 hover:bg-neutral-800"
            href="/prijava"
          >
            Prijava
          </Link>

          <Link
            className="my-2 block rounded-md border  border-neutral-700 bg-white py-3 text-center text-sm text-black duration-200 hover:bg-neutral-200"
            href="/registracija"
          >
            Registracija
          </Link>

          {items.map((item) => (
            <Link
              key={item.name}
              className="block border-b border-neutral-600 py-3"
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
          <Link className="block border-b border-neutral-600 py-3" href="#">
            Kontakt
          </Link>
        </div>
      ) : (
        children
      )}
    </>
  );
}
