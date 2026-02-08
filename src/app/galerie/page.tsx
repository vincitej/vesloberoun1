import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import GalleryClient from "@/components/GalleryClient/GalleryClient";
import styles from "./galerie.module.css";
import { getAllGalleryImages, GalleryImage } from "@/lib/galleryQueries";

export const metadata = {
  title: "Galerie | VKK TJ Lokomotiva Beroun",
  description: "Fotografie z našich aktivit a závodů",
};

export const dynamic = "force-dynamic";

async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    return await getAllGalleryImages();
  } catch (error) {
    console.error("Chyba při načítání galerie:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const galleryImages = await getGalleryImages();

  return (
    <>
      <Header />
      <main>
        <Hero
          title="Galerie"
          subtitle="Fotografie z našich aktivit a závodů"
          height="medium"
          backgroundImage="/images/heros/gallery-hero.webp"
          className={styles.heroFade}
        />

        <section className="section">
          <div className="container">
            <GalleryClient images={galleryImages} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
