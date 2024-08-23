"use client"
import { Footer } from "@/components/home/future/Footer";
import LandingPage from "@/components/home/future/Landing_Page";
import { login } from "@/utils/functions/login";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <main className="">
      <LandingPage />
    </main>
    </>
    );
}
