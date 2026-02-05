import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Image from "next/image";
import {
  trainingSchedules,
  seasonalTraining,
  summerDescription,
  winterDescription,
  summerActivities,
  winterActivities,
} from "@/data/training";
import styles from "./page.module.css";

export const metadata = {
  title: "Členství | VKK TJ Lokomotiva Beroun",
  description:
    "Informace o členství ve Veslařském klubu Beroun, tréninkové plány a příspěvky",
};

export default function MembershipPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Členství v klubu"
          subtitle="Přijď veslovat!"
          height="medium"
          backgroundImage="/images/heros/membership-hero.webp"
          className={styles.heroFade}
        />

        {/* Jak se stát členem */}
        <section className="section">
          <div className="container">
            <h2>Jak se stát členem</h2>
            <div className={styles.stepsGrid}>
              <Card>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>1</div>
                  <h3>Přijď se podívat</h3>
                  <p>
                    Nábor nových členů vždy pondělí, středu a pátek od 16:00 po
                    domluvě s hlavní trenérkou.
                  </p>
                </div>
              </Card>

              <Card>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>2</div>
                  <h3>Přihláška</h3>
                  <p>
                    Vyplníte přihlášku do klubu a Českého veslařského svazu,
                    dodáte zdravotní způsobilost ke sportu.
                  </p>
                </div>
              </Card>

              <Card>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>3</div>
                  <h3>Začni trénovat!</h3>
                  <p>
                    Vítej v klubu! Mezitím můžeš trénovat s námi a stát se
                    součástí party.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Tréninkový plán */}
        <section className="section">
          <div className="container">
            <h2>Tréninkový plán</h2>
            <p className={styles.seasonLegend}>
              Aktuálně zobrazena:{" "}
              {new Date().getMonth() + 1 >= 4 && new Date().getMonth() + 1 <= 10
                ? "letní sezóna"
                : "zimní sezóna"}
              .
            </p>

            <div className={styles.scheduleGrid}>
              {trainingSchedules.map((schedule, index) => (
                <Card key={index}>
                  <div className={styles.scheduleCard}>
                    <h3>{schedule.division}</h3>
                    <div className={styles.scheduleDays}>
                      {schedule.days.map((day, dayIndex) => (
                        <div key={dayIndex} className={styles.scheduleDay}>
                          <div className={styles.dayName}>{day.day}</div>
                          <div className={styles.dayTime}>{day.time}</div>
                          <div className={styles.dayDetails}>
                            <div>{day.location}</div>
                            <div className={styles.coach}>
                              Trenér: {day.coach}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className={styles.seasonCard}>
              <div className={styles.seasonContent}>
                <h3>Jak vypadá trénink?</h3>

                <div className={styles.seasonsContainer}>
                  {/* Letní sezóna */}
                  <div className={styles.seasonBlock}>
                    <h4 className={styles.seasonTitle}>☀️ Letní sezóna</h4>
                    <p className={styles.seasonMonths}>duben - říjen</p>
                    <p>{summerDescription}</p>
                    <div className={styles.activitiesGrid}>
                      {summerActivities.map((group, index) => (
                        <div key={index} className={styles.activityGroup}>
                          <h5>{group.title}</h5>
                          <div className={styles.activityList}>
                            {group.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className={styles.activityItem}
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Zimní sezóna */}
                  <div className={styles.seasonBlock}>
                    <h4 className={styles.seasonTitle}>❄️ Zimní sezóna</h4>
                    <p className={styles.seasonMonths}>listopad - březen</p>
                    <p>{winterDescription}</p>
                    <div className={styles.activitiesGrid}>
                      {winterActivities.map((group, index) => (
                        <div key={index} className={styles.activityGroup}>
                          <h5>{group.title}</h5>
                          <div className={styles.activityList}>
                            {group.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className={styles.activityItem}
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className="container">
            <h2>Připraven začít?</h2>
            <p>Neváhej a domluv si první trénink!</p>
            <div className={styles.ctaButtons}>
              <Button href="/kontakt" size="lg" variant="secondary">
                Kontakty
              </Button>
              <Button href="/o-klubu#treneri" size="lg" variant="outline">
                Naši trenéři
              </Button>
            </div>
          </div>
        </section>

        {/* Pro členy */}
        <section className="section">
          <div className="container">
            <h2 className="text" style={{ marginBottom: "var(--spacing-12)" }}>
              Pro členy
            </h2>

            <div className={styles.memberSection}>
              {/* Rozpis plavání */}
              <Card className={styles.memberCard} hover>
                <div className={styles.memberCardHeader}>
                  <div className={styles.memberIcon}>
                    <Image
                      src="/images/bazen.webp"
                      alt="Rozpis plavání"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div>
                    <h3>Rozpis plavání</h3>
                    <p>Plavecké skupiny a tréninky.</p>
                  </div>
                </div>
                <div className={styles.memberActions}>
                  <Button
                    href="/documents/rozpis-plavani.xlsx"
                    variant="outline"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Stáhnout (.xlsx)
                  </Button>
                  <Button
                    href="/documents/rozpis-plavani.pdf"
                    variant="outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Zobrazit (PDF)
                  </Button>
                </div>
              </Card>

              {/* Termínová listina */}
              <Card className={styles.memberCard} hover>
                <div className={styles.memberCardHeader}>
                  <div className={styles.memberIcon}>
                    <Image
                      src="/images/kalendar.webp"
                      alt="Termínová listina"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h3>Termínová listina</h3>
                    <p>Plán závodů a akcí klubu.</p>
                  </div>
                </div>
                <div className={styles.memberActions}>
                  <Button
                    href="/documents/terminova-listina.xlsx"
                    variant="outline"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Stáhnout (.xlsx)
                  </Button>
                  <Button
                    href="/documents/terminova-listina.pdf"
                    variant="outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Zobrazit (PDF)
                  </Button>
                </div>
              </Card>

              {/* Soustředění */}
              <Card className={styles.memberCard} hover>
                <div className={styles.memberCardHeader}>
                  <div className={styles.memberIcon}>
                    <Image
                      src="/images/rozvoj.webp"
                      alt="Soustředění"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h3>Soustředění</h3>
                    <p>Informace o soustředěních klubu.</p>
                  </div>
                </div>
                <div className={styles.memberActions}>
                  <Button
                    href="/documents/lorem-ipsum.doc"
                    variant="outline"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Lorem Ipsum (.doc)
                  </Button>
                  <Button
                    href="/documents/lorem-ipsum.doc"
                    variant="outline"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Lorem Ipsum (.doc)
                  </Button>
                  <Button
                    href="/documents/lorem-ipsum.doc"
                    variant="outline"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Lorem Ipsum (.doc)
                  </Button>
                </div>
              </Card>

              {/* Důležitá pravidla */}
              <Card className={styles.memberCard} hover>
                <div className={styles.memberCardHeader}>
                  <div className={styles.memberIcon}>
                    <Image
                      src="/images/pravidla.webp"
                      alt="Důležitá pravidla"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h3>Důležitá pravidla</h3>
                    <p>Desatera pro trénink a podmínky přijetí Race Team.</p>
                  </div>
                </div>
                <div className={styles.memberActions}>
                  <Button
                    href="/documents/desatera-pro-trenink.pdf"
                    variant="outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Desatera pro trénink
                  </Button>
                  <Button
                    href="/documents/podminky-prijeti-rt.pdf"
                    variant="outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Podmínky Race Team
                  </Button>
                </div>
              </Card>

              {/* Klubové oblečení */}
              <Card className={styles.memberCard} hover>
                <div className={styles.memberCardHeader}>
                  <div className={styles.memberIcon}>
                    <Image
                      src="/images/material.webp"
                      alt="Sportovní výbava"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h3>Sportovní výbava</h3>
                    <p>Klubové závodní oblečení</p>
                  </div>
                </div>

                <div className={styles.imageGrid}>
                  <div className={styles.imageItem}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src="/images/obleceni/zavodni-dres.webp"
                        alt="Závodní dres"
                        width={200}
                        height={200}
                        className={styles.clothingImage}
                      />
                    </div>
                    <p>Závodní dres</p>
                  </div>
                  <div className={styles.imageItem}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src="/images/obleceni/zavodni-tilko.webp"
                        alt="Závodní tílko"
                        width={200}
                        height={200}
                        className={styles.clothingImage}
                      />
                    </div>
                    <p>Závodní tílko</p>
                  </div>
                  <div className={styles.imageItem}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src="/images/obleceni/zavodni-triko.webp"
                        alt="Závodní triko"
                        width={200}
                        height={200}
                        className={styles.clothingImage}
                      />
                    </div>
                    <p>Závodní triko</p>
                  </div>
                </div>

                <div className={styles.memberActions}>
                  <Button
                    href="/documents/cenik.pdf"
                    variant="outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Ceník
                  </Button>
                  <Button
                    href="https://www.rajce.idnes.cz/vesloberoun/album/nova-kolekce-sportovniho-obleceni-2019"
                    variant="outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    Kompletní kolekce
                  </Button>
                </div>
              </Card>

              {/* Členská sekce - EOS */}
              <Card className={styles.memberCard} hover>
                <div className={styles.memberCardHeader}>
                  <div className={styles.memberIcon}>
                    <Image
                      src="/images/eos.webp"
                      alt="EOS"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h3>EOS</h3>
                    <p>Klubový informační systém.</p>
                  </div>
                </div>
                <div className={styles.memberActions}>
                  <Button
                    href="https://clen.lokomotivaberoun.cz/login"
                    variant="outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    EOS
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
