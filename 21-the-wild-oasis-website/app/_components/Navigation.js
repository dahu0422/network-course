import React from "react";
import Link from "next/link";

export default function Navigations() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link className="hover:text-accent-600 transition-colors" href="/cabins">Cabins</Link>
        </li>
        <li>
          <Link className="hover:text-accent-600 transition-colors" href="/about">About</Link>
        </li>
        <li>
          <Link className="hover:text-accent-600 transition-colors" href="/account">Account</Link>
        </li>
      </ul>
    </nav>
  );
}