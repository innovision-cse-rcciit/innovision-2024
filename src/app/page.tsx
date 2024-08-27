"use client"
import About from "@/components/home/past/About";
import { Footer } from "@/components/home/future/Footer";
import LandingPage from "@/components/home/future/Landing_Page";

export default function Home() {
  return (
    <>
    <main className="flex flex-col">
      <LandingPage />
      <About />
    </main>
    </>
    );
}
