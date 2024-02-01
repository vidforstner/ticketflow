import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 h-16 w-full bg-black text-sm">
      <div className="container flex h-full items-center">
        <Link href="#" className="mr-8 text-xl font-bold">
          Ticketflow
        </Link>

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

        <Link className="mt-1 px-4 py-1 text-neutral-400 duration-200" href="#">
          Kontakt
        </Link>

        <Link
          className="mr-2 mt-1 rounded-md border border-neutral-600 bg-neutral-950 px-4 py-1 font-medium text-white duration-200 hover:bg-neutral-800"
          href="#"
        >
          Prijava
        </Link>

        <Link
          className="mt-1 rounded-md border border-neutral-600 bg-white px-4 py-1 font-medium text-black duration-200 hover:bg-neutral-200"
          href="#"
        >
          Registracija
        </Link>
      </div>
    </div>
  );
}
