import type { Metadata } from "next";
import AboutLayout from "./AboutLayout";

export const metadata: Metadata = {
  title: "About | The Gravy Train",
  description: "About David Gray — writer, traveler, cyclist.",
};

export default function AboutPage() {
  return <AboutLayout />;
}
