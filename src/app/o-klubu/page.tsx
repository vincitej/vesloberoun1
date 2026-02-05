import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Card from "@/components/Card/Card";
import { boardMembers } from "@/data/board";
import { coaches } from "@/data/coaches";
import Image from "next/image";
import { achievements } from "@/data/achievements";
import styles from "./page.module.css";

export const metadata = {
  title: "O klubu | VKK TJ Lokomotiva Beroun",
  description:
    "Historie, úspěchy a vedení Veslařského a kanoistického klubu Beroun",
};

export default function AboutPage() {
  // Seskupení úspěchů podle roků
  const achievementsByYear = achievements.reduce(
    (acc, achievement) => {
      if (!acc[achievement.year]) {
        acc[achievement.year] = [];
      }
      acc[achievement.year].push(achievement);
      return acc;
    },
    {} as Record<number, typeof achievements>,
  );

  const years = Object.keys(achievementsByYear).sort(
    (a, b) => Number(b) - Number(a),
  );

  const divisionInfo = {
    pripravka: {
      title: "Žactvo a přípravka (9-14 let)",
      description:
        "Seznámení s veslováním, rozvoj koordinace a základních dovedností",
      color: "var(--color-secondary)",
    },
    mladez: {
      title: "Dorost a starší (15+ let)",
      description:
        "Intenzivní trénink zaměřený na techniku, kondici a závodní přípravu",
      color: "var(--color-secondary)",
    },
  };

  const coachesByDivision = {
    pripravka: coaches.filter((c) => c.division === "pripravka"),
    mladez: coaches.filter((c) => c.division === "mladez"),
  };

  return (
    <>
      <Header />
      <main>
        <Hero
          title="O klubu"
          subtitle="Tradice a úspěchy od roku 1999"
          height="medium"
          backgroundImage="/images/heros/about-hero.webp"
          className={styles.heroFade}
        />

        {/* Historie */}
        <section className="section">
          <div className="container">
            <h2 className={styles.pageTitle}>Krátká historie</h2>
            <div className={styles.historyContent}>
              <p>
                Veslařský a kanoistický klub Beroun byl založen 9. září 1999
                skupinou nadšenců, kteří si zamilovali tento sport. Od samého
                začátku byl klub zaměřen na rozvoj tohoto elegantního pohybu. Za
                skutečný základní kámen založení je považována první jízda na
                skifu jménem "Kubík", která se uskutečnila právě v tento den.
                Klub byl založen jako první veslařský klub na řece Berounce a
                poslední v minulém století i tisíciletí.
              </p>
              <p>
                V průběhu desetiletí klub vychoval stovky závodníků, z nichž
                mnozí dosáhli úspěchů na mistrovstvích České republiky i
                mezinárodních závodech. Loděnice na Berounce se stala druhým
                domovem pro několik generací veslařů.
              </p>
              <p>
                Klub si zakládá na myšlence nabídnout všem, co se chtějí hýbat,
                jak smysluplně vyplnit volný čas. Mimo sportovní výsledky drží
                členy u vody dobrá parta, která společně podniká řadu aktivit,
                jako jsou závody, příprava lodí, zimní a letní soustředění nebo
                zvelebování loděnice.
              </p>

              <div className={styles.milestones}>
                <Card>
                  <div className={styles.milestone}>
                    <div className={styles.year}>1999</div>
                    <div className={styles.milestoneText}>Založení klubu</div>
                  </div>
                </Card>
                <Card>
                  <div className={styles.milestone}>
                    <div className={styles.year}>2002</div>
                    <div className={styles.milestoneText}>
                      Titul mistra světa (T. Patera)
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className={styles.milestone}>
                    <div className={styles.year}>2009</div>
                    <div className={styles.milestoneText}>
                      Dostavba nové loděnice
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Trenéři */}
        <section className="section" id="treneri">
          <div className="container">
            <h2 className={styles.pageTitle}>Trenéři a tréninkové skupiny</h2>

            {Object.entries(coachesByDivision).map(
              ([division, divisionCoaches]) => (
                <div key={division} className={styles.divisionSection}>
                  <div
                    className={styles.divisionHeader}
                    style={{
                      borderLeftColor:
                        divisionInfo[division as keyof typeof divisionInfo]
                          .color,
                    }}
                  >
                    <h3>
                      {
                        divisionInfo[division as keyof typeof divisionInfo]
                          .title
                      }
                    </h3>
                    <p>
                      {
                        divisionInfo[division as keyof typeof divisionInfo]
                          .description
                      }
                    </p>
                  </div>

                  <div className={styles.coachesGrid}>
                    {divisionCoaches.map((coach) => (
                      <Card key={coach.id} hover>
                        <div className={styles.coachCard}>
                          <div className={styles.coachPhoto}>
                            <Image
                              src={coach.image}
                              alt={coach.name}
                              width={200}
                              height={200}
                              className={styles.coachImage}
                            />
                          </div>
                          <h4>{coach.name}</h4>
                          <p className={styles.role}>{coach.role}</p>

                          <div className={styles.bio}>
                            <p>{coach.bio}</p>
                          </div>

                          <div className={styles.coachAchievements}>
                            <h5>Úspěchy:</h5>
                            <ul>
                              {coach.achievements.map((achievement, index) => (
                                <li key={index}>{achievement}</li>
                              ))}
                            </ul>
                          </div>

                          <div className={styles.contact}>
                            {coach.email && (
                              <a
                                href={`mailto:${coach.email}`}
                                className={styles.email}
                              >
                                {coach.email}
                              </a>
                            )}
                            {coach.phone && (
                              <a
                                href={`tel:${coach.phone}`}
                                className={styles.phone}
                              >
                                {coach.phone}
                              </a>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Úspěchy */}
        <section className="section">
          <div className="container">
            <h2 className={styles.pageTitle}>Největší úspěchy</h2>

            <div className={styles.achievements}>
              {years.map((year) => (
                <div key={year} className={styles.yearSection}>
                  <h3 className={styles.yearTitle}>{year}</h3>
                  <div className={styles.achievementsList}>
                    {achievementsByYear[Number(year)].map((achievement) => (
                      <Card key={achievement.id}>
                        <div className={styles.achievement}>
                          <div className={styles.place}>
                            {achievement.place === 1 && "🥇"}
                            {achievement.place === 2 && "🥈"}
                            {achievement.place === 3 && "🥉"}
                            <span className={styles.placeNumber}>
                              {achievement.place}. místo
                            </span>
                          </div>
                          <h4>{achievement.title}</h4>
                          <p className={styles.athlete}>
                            {achievement.athlete}
                          </p>
                          <p className={styles.competition}>
                            {achievement.competition}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vedení klubu */}
        <section className="section">
          <div className="container">
            <h2 className={styles.pageTitle}>Vedení klubu</h2>
            <p className={styles.subtitle}>
              Tým lidí, kteří se starají o chod klubu a jeho rozvoj
            </p>

            <div className={styles.boardGrid}>
              {boardMembers.map((member) => (
                <Card key={member.id} hover>
                  <div className={styles.boardMember}>
                    <div className={styles.boardPhoto}>
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={150}
                          height={150}
                          className={styles.boardPhotoImage}
                        />
                      ) : (
                        <div className={styles.boardPhotoPlaceholder}>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                    </div>
                    <h3>{member.name}</h3>
                    <p className={styles.position}>{member.position}</p>
                    {member.email && (
                      <p className={styles.email}>
                        <a href={`mailto:${member.email}`}>{member.email}</a>
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hodnoty klubu */}
        <section className={styles.valuesSection}>
          <div className="container">
            <h2 className={styles.pageTitle}>Základní hodnoty</h2>
            <div className={styles.values}>
              <div className={styles.value}>
                <div className={styles.valueIcon}>
                  <Image
                    src="/images/tym.webp"
                    alt="Jsme jeden tým"
                    width={80}
                    height={80}
                  />
                </div>
                <h3>Jsme jeden tým</h3>
                <p>
                  Společně táhneme za jeden provaz. Pomáháme si na závodech,
                  tvoříme partu přátel i na břehu. Trávíme společně čas třeba na
                  soustředěních a vytváříme vzpomínky na celý život.
                </p>
              </div>
              <div className={styles.value}>
                <div className={styles.valueIcon}>
                  <Image
                    src="/images/rozvoj.webp"
                    alt="Rozvoj s každým záběrem"
                    width={80}
                    height={80}
                  />
                </div>
                <h3>Rozvoj s každým záběrem</h3>
                <p>
                  Neustále se učíme a zlepšujeme. Pravidelně organizujeme
                  soustředění, které tě posunou dál. Naučíš se veslovat, zažiješ
                  dřinu a získáš nové zkušenosti.
                </p>
              </div>
              <div className={styles.value}>
                <div className={styles.valueIcon}>
                  <Image
                    src="/images/laska.webp"
                    alt="Láska ke sportu"
                    width={80}
                    height={80}
                  />
                </div>
                <h3>Láska ke sportu</h3>
                <p>
                  Veslování pro nás znamená víc než jen pohyb, je to životní
                  styl a srdeční záležitost, která spojuje lidi všech věkových
                  kategorií.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
