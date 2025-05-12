import React from "react";
import Link from "next/link";

export default function Navigations() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/cabins">Cabins</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/account">Account</Link>
        </li>
      </ul>
    </nav>
  );
}