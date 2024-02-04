import Link from "next/link";

import { Button } from "~/components/ui/button";

export default function Organizatorji() {
  return (
    <div className="container">
      <h1 className="mt-24 text-center text-3xl font-semibold">
        Organiziraš dogodek?
      </h1>
      <div className="mt-6 flex w-full items-center justify-center">
        <Link className="" href="/organizatorji/new">
          <Button variant="secondary" className="mx-auto">
            Ustvari dogodek
          </Button>
        </Link>
      </div>
    </div>
  );
}
