"use client"
import About from "@/components/home/About";
import Events from "@/components/home/Events";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="relative h-full w-full">
      <Hero />
      <div
        style={{
          background: "url('/home/events-bg.png')", 
          backgroundSize: "cover",
        }}
      >
        <About />
        <Events />
      </div>
    </main>
  );
}
