import { Suspense } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import ArticlePreview from "@/components/ArticlePreview/ArticlePreview";
import Skeleton from "@/components/Skeleton/Skeleton";
import styles from "./page.module.css";
import { getAllArticles } from "@/lib/queries";
import type { Article } from "@/lib/queries";

export const metadata = {
  title: "Aktuality | VKK TJ Lokomotiva Beroun",
  description: "Nejnovější zprávy a aktuality z Veslařského klubu Beroun",
};

async function getArticles(): Promise<Article[]> {
  try {
    return getAllArticles();
  } catch (err) {
    console.error("Failed to fetch articles", err);
    return [];
  }
}

function ArticlesList() {
  return (
    <Suspense
      fallback={
        <div className={styles.articlesGrid}>
          <Skeleton variant="card" count={6} />
        </div>
      }
    >
      <ArticlesContent />
    </Suspense>
  );
}

async function ArticlesContent() {
  const articles = await getArticles();

  return (
    <div className={styles.articlesGrid}>
      {articles.map((article) => (
        <ArticlePreview key={article.id} article={article} />
      ))}
      {articles.length === 0 && (
        <div className={styles.noArticles}>
          <p>Zatím nejsou k dispozici žádné aktuality.</p>
        </div>
      )}
    </div>
  );
}

export default function ActualitiesPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Aktuality"
          subtitle="Nejnovější zprávy a události z klubu"
          height="medium"
          backgroundImage="/images/heros/news-hero.webp"
          className={styles.heroFade}
        />

        <section className="section">
          <div className="container">
            <ArticlesList />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
