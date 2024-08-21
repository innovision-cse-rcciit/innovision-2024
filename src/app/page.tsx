"use client"
import Events from "@/components/events/Events";
import { login } from "@/utils/functions/login";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-12 ">
      <Events/>
    </main>
  );
}
