import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import { Article } from "@/types";
import { getAllArticles } from "@/lib/queries";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

async function getArticles(): Promise<Article[]> {
  try {
    return getAllArticles();
  } catch (err) {
    console.error("Failed to fetch articles", err);
    return [];
  }
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: "Článek nenalezen | VKK TJ Lokomotiva Beroun",
    };
  }

  return {
    title: `${article.title} | VKK TJ Lokomotiva Beroun`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      zavod: "Závod",
      treninky: "Tréninky",
      akce: "Akce",
      uspech: "Úspěch",
    };
    return labels[category] || category;
  };

  return (
    <>
      <Header />
      <main>
        <article className={styles.article}>
          {article.image && (
            <div className={styles.heroImage}>
              <img src={article.image} alt={article.title} />
            </div>
          )}

          <div className="container">
            <div className={styles.articleContent}>
              <div className={styles.articleHeader}>
                <span
                  className={`${styles.category} ${styles[article.category]}`}
                >
                  {getCategoryLabel(article.category)}
                </span>
                <h1>{article.title}</h1>
                <div className={styles.meta}>
                  <span className={styles.date}>
                    {formatDate(article.date)}
                  </span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.author}>{article.author}</span>
                </div>
              </div>

              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className={styles.articleFooter}>
                <Button href="/aktuality" variant="outline">
                  ← Zpět na aktuality
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
