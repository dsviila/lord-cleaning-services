import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import GalleryHero from "./components/GalleryHero";
import GalleryGrid from "./components/GalleryGrid";
import GalleryStandards from "./components/GalleryStandards";
import GalleryCta from "./components/GalleryCta";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background-50 text-foreground-900">
      <h1 className="sr-only">
        Cleaning Gallery — Real Results from Lord Cleaning Services in Northern Virginia
      </h1>
      <Navbar />
      <GalleryHero />
      <GalleryGrid />
      <GalleryStandards />
      <GalleryCta />
      <Footer />
    </main>
  );
}