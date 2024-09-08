import { Metadata } from "next";

export function constructMetaData({
  title = "INNOVISION 2024",
  description = "INNOVISION is the official departmental tech fest of CSE department of RCCIIT.",
  authors = {
    name: "INNOVISION 2024 Team",
    url: "https://innovision-2k24.vercel.app/",
  },
  creator = "INNOVISION 2024 Team",
  generator = "Next.js",
  publisher = "INNOVISION 2024",
  icons = "/favicon.ico",
  robots = "index, follow",
  image = "/assets/home/about/about_logo.png",
}: {
  title?: string;
  description?: string;
  image?: string;
  authors?: { name: string; url: string };
  creator?: string;
  generator?: string;
  publisher?: string;
  icons?: string;
  robots?: string;
} = {}): Metadata {
  return {
    title,
    description,
    authors,
    creator,
    generator,
    publisher,

    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title,
    //   description,
    //   images: [image],
    //   creator: "@",
    // },
    icons,

    metadataBase: new URL("https://innovision-2k24.vercel.app/"),
    robots,
  };
}
