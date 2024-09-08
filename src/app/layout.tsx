import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import SessionProvider from "@/components/common/SessionProvider";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/common/Footer";
import { constructMetaData } from "@/utils/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = constructMetaData({
  title: "INNOVISION 2K24",
  description: "Technical Fest organized by Department of CSE",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gg = false;
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen overflow-x-hidden`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      <Footer />
        <SessionProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
