import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Card from "@/components/Card/Card";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "Kontakt | VKK TJ Lokomotiva Beroun",
  description: "Kontaktní informace Veslařského a kanoistického klubu Beroun",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Kontakt"
          subtitle="Kontaktí údaje a místa tréninků"
          height="medium"
          backgroundImage="/images/heros/contact-hero.webp"
          className={styles.heroFade}
        />

        <section className="section">
          <div className="container">
            <div className={styles.contactInfoCentered}>
              <Card>
                <div className={styles.infoCard}>
                  <h2>Veslařský a kanoistický klub</h2>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Image
                        src="/images/adresa.webp"
                        alt="Adresa klubu"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div>
                      <h3>Adresa</h3>
                      <p>
                        TJ Lokomotiva Beroun a.s.
                        <br />
                        Tyršova 85
                        <br />
                        266 01 Beroun
                      </p>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Image
                        src="/images/lodenice.webp"
                        alt="Loděnice na Štulovně"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div>
                      <h3>Loděnice na Štulovně</h3>
                      <p>křížení Dukelská a Štulovna</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Image
                        src="/images/bazen.webp"
                        alt="Posilovna v Kasárnách"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div>
                      <h3>Posilovna v Kasárnách</h3>
                      <p>U Kasáren 2088</p>
                    </div>
                  </div>

                  <div className={styles.contactPerson}>
                    <div className={styles.personHeader}>
                      <div className={styles.infoIcon}>
                        <Image
                          src="/images/trener.webp"
                          alt="Předseda klubu"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div>
                        <h3>Předseda</h3>
                        <p className={styles.personName}>Jan Piskáček</p>
                      </div>
                    </div>
                    <div className={styles.personContacts}>
                      <div className={styles.contactDetail}>
                        <span className={styles.smallIcon}>&#9993;</span>
                        <a href="mailto:janpiskacek@seznam.cz">
                          janpiskacek@seznam.cz
                        </a>
                      </div>
                      <div className={styles.contactDetail}>
                        <span className={styles.smallIcon}>&#9742;</span>
                        <a href="tel:+420602315244">+420 602 315 244</a>
                      </div>
                    </div>
                  </div>

                  <div className={styles.contactPerson}>
                    <div className={styles.personHeader}>
                      <div className={styles.infoIcon}>
                        <Image
                          src="/images/trener.webp"
                          alt="Hlavní trenérka"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div>
                        <h3>Hlavní trenérka</h3>
                        <p className={styles.personName}>Růžena Sehnoutková</p>
                      </div>
                    </div>
                    <div className={styles.personContacts}>
                      <div className={styles.contactDetail}>
                        <span className={styles.smallIcon}>&#9993;</span>
                        <a href="mailto:r.sehnoutkova64@gmail.com">
                          r.sehnoutkova64@gmail.com
                        </a>
                      </div>
                      <div className={styles.contactDetail}>
                        <span className={styles.smallIcon}>&#9742;</span>
                        <a href="tel:+420602683113">+420 602 683 113</a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Mapa */}
        <section className={styles.mapSection}>
          <div className="container">
            <h2>Kde nás najdete</h2>
            <div className={styles.mapContainer}>
              <iframe
                src="https://mapy.com/s/botejacuda"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Mapa VKK Beroun"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
