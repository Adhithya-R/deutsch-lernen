import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "மொழி-Brücke · Deutsch A1/A2",
    short_name: "Mozhi-Brücke",
    description: "Learn German A1 and A2 through stories, in English with Tamil help.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f0f7ff",
    theme_color: "#f0f7ff",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
