import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import ArticlePreview from "@/components/ArticlePreview/ArticlePreview";
import Card from "@/components/Card/Card";
import Button from "@/components/Button/Button";
import Image from "next/image";
import styles from "./page.module.css";
import { getAllArticles } from "@/lib/queries";
import type { Article } from "@/lib/queries";

async function getArticles(): Promise<Article[]> {
  try {
    return await getAllArticles();
  } catch (err) {
    console.error("Failed to fetch articles", err);
    return [];
  }
}

/**
 * Hlavní stránka webu
 */
export default async function Home() {
  // Získáme poslední 3 články pro homepage
  const articles = await getArticles();
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero sekce */}
        <Hero
          title="VKK TJ Lokomotiva Beroun"
          subtitle="Založeno 1999"
          backgroundImage="/images/heros/hero-rowing.webp"
          ctaText="Přijď veslovat!"
          ctaLink="/clenstvi"
        />

        {/* Představení klubu */}
        <section className="section">
          <div className="container">
            <div className={styles.intro}>
              <h2 className="text-center">Vítejte v Berouně</h2>
              <p className={styles.introText}>
                Veslařský a kanoistický klub TJ Lokomotiva Beroun je sportovní
                klub s přátelskou atmosférou a partou lidí, co mají radi vodu a
                pohyb. Nachází se přímo na břehu řeky Berounky v centru
                královského města Beroun.
              </p>
              <p className={styles.introText}>
                Loděnice na Štulovně nabízí mnoho skifů, dvojskifů, dvojky,
                párovky a čtyrky i tři osmiveslice. Dále máme kajaky a to od K1
                až po K4, tréninkové pramice, koloběžky a kola.
              </p>
              <p className={styles.introText}>
                Posilovna v kasárnách je vybavena jak veslařskými trenažery
                concept2, tak i cyklistickými a lyžařským. Je zde vybavení pro
                silové i kondiční tréninky, také veslařský bazén.
              </p>
            </div>

            {/* Výhody klubu */}
            <div className={styles.features}>
              <Card>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <Image
                      src="/images/treneri.webp"
                      alt="Zkušení trenéři"
                      width={80}
                      height={80}
                    />
                  </div>
                  <h3>Zkušení trenéři</h3>
                  <p>Parta bývalých reprezentantů</p>
                </div>
              </Card>

              <Card>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <Image
                      src="/images/material.webp"
                      alt="Kvalitní vybavení"
                      width={80}
                      height={80}
                    />
                  </div>
                  <h3>Kvalitní vybavení</h3>
                  <p>Lodě všech kategorií a zázemí přímo na Berounce</p>
                </div>
              </Card>

              <Card>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <Image
                      src="/images/tym.webp"
                      alt="Skvělá parta"
                      width={80}
                      height={80}
                    />
                  </div>
                  <h3>Skvělá parta</h3>
                  <p>Přátelská atmosféra a týmový duch</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Aktuality */}
        <section className="section">
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Novinky a aktuality</h2>
              <Button href="/aktuality" variant="outline">
                Všechny aktuality
              </Button>
            </div>

            <div className={styles.articlesGrid}>
              {latestArticles.map((article) => (
                <ArticlePreview key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Chceš veslovat?</h2>
              <p>
                Hledáš zajímavý sport? Chceš poznat super lidi nebo se jen
                hýbat?
              </p>
              <div className={styles.ctaButtons}>
                <Button href="/clenstvi" size="lg">
                  Přijď veslovat!
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sponzoři a partneři */}
        <section className="section">
          <div className="container">
            <h2 className="text">Partneři</h2>
            <div className={styles.sponsorsSection}>
              <a
                href="https://www.mesto-beroun.cz"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sponsorLogo}
              >
                <Image
                  src="/images/sponsors/mesto-beroun.svg"
                  alt="Město Beroun"
                  width={150}
                  height={60}
                />
              </a>
              <a
                href="https://lokomotivaberoun.cz"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sponsorLogo}
              >
                <Image
                  src="/images/sponsors/tj-lokomotiva.svg"
                  alt="TJ Lokomotiva Beroun"
                  width={150}
                  height={60}
                />
              </a>
              <a
                href="https://www.veslo.cz"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sponsorLogo}
              >
                <Image
                  src="/images/sponsors/cvs.svg"
                  alt="Český veslařský svaz"
                  width={150}
                  height={60}
                />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
