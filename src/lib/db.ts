import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

let schemaReady: Promise<void> | null = null;

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = initSchema();
  }
  await schemaReady;
}

async function initSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      email TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      author TEXT NOT NULL,
      image TEXT NOT NULL,
      category TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS gallery (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      thumbnail TEXT NOT NULL,
      year INTEGER NOT NULL,
      "order" INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery("order");
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_gallery_year ON gallery(year DESC);
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS membership_sections (
      id SERIAL PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      "order" INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS membership_links (
      id SERIAL PRIMARY KEY,
      section_key TEXT NOT NULL REFERENCES membership_sections(key) ON DELETE CASCADE,
      label TEXT NOT NULL,
      url TEXT NOT NULL,
      is_download BOOLEAN DEFAULT FALSE,
      "order" INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await ensureDefaultAdmin();
  await ensureMembershipSeed();
}

async function ensureDefaultAdmin() {
  const { rows } = await sql`SELECT COUNT(*)::int AS count FROM users`;
  if (rows[0]?.count > 0) return;

  const hash = bcrypt.hashSync("vkk2024admin", 10);
  await sql`
    INSERT INTO users (username, password_hash, email)
    VALUES ('admin', ${hash}, 'admin@vesloberoun.cz')
  `;
}

async function ensureMembershipSeed() {
  const { rows } =
    await sql`SELECT COUNT(*)::int AS count FROM membership_sections`;
  if (rows[0]?.count > 0) return;

  const sections = [
    {
      key: "rozpis-plavani",
      title: "Rozpis plavání",
      description: "Plavecké skupiny a tréninky.",
      order: 1,
    },
    {
      key: "terminova-listina",
      title: "Termínová listina",
      description: "Plán závodů a akcí klubu.",
      order: 2,
    },
    {
      key: "soustredeni",
      title: "Soustředění",
      description: "Informace o soustředěních klubu.",
      order: 3,
    },
    {
      key: "dulezita-pravidla",
      title: "Důležitá pravidla",
      description: "Desatera pro trénink a podmínky přijetí Race Team.",
      order: 4,
    },
    {
      key: "sportovni-vybava",
      title: "Sportovní výbava",
      description: "Klubové závodní oblečení",
      order: 5,
    },
  ];

  for (const section of sections) {
    await sql`
      INSERT INTO membership_sections (key, title, description, "order")
      VALUES (${section.key}, ${section.title}, ${section.description}, ${section.order})
    `;
  }

  const links = [
    {
      sectionKey: "rozpis-plavani",
      label: "Stáhnout (.xlsx)",
      url: "/documents/rozpis-plavani.xlsx",
      isDownload: true,
      order: 1,
    },
    {
      sectionKey: "rozpis-plavani",
      label: "Zobrazit (PDF)",
      url: "/documents/rozpis-plavani.pdf",
      isDownload: false,
      order: 2,
    },
    {
      sectionKey: "terminova-listina",
      label: "Stáhnout (.xlsx)",
      url: "/documents/terminova-listina.xlsx",
      isDownload: true,
      order: 1,
    },
    {
      sectionKey: "terminova-listina",
      label: "Zobrazit (PDF)",
      url: "/documents/terminova-listina.pdf",
      isDownload: false,
      order: 2,
    },
    {
      sectionKey: "soustredeni",
      label: "Lorem Ipsum (.doc)",
      url: "/documents/lorem-ipsum.doc",
      isDownload: true,
      order: 1,
    },
    {
      sectionKey: "soustredeni",
      label: "Lorem Ipsum (.doc)",
      url: "/documents/lorem-ipsum.doc",
      isDownload: true,
      order: 2,
    },
    {
      sectionKey: "soustredeni",
      label: "Lorem Ipsum (.doc)",
      url: "/documents/lorem-ipsum.doc",
      isDownload: true,
      order: 3,
    },
    {
      sectionKey: "dulezita-pravidla",
      label: "Desatera pro trénink",
      url: "/documents/desatera-pro-trenink.pdf",
      isDownload: false,
      order: 1,
    },
    {
      sectionKey: "dulezita-pravidla",
      label: "Podmínky Race Team",
      url: "/documents/podminky-prijeti-rt.pdf",
      isDownload: false,
      order: 2,
    },
    {
      sectionKey: "sportovni-vybava",
      label: "Ceník",
      url: "/documents/cenik.pdf",
      isDownload: false,
      order: 1,
    },
    {
      sectionKey: "sportovni-vybava",
      label: "Kompletní kolekce",
      url: "https://www.rajce.idnes.cz/vesloberoun/album/nova-kolekce-sportovniho-obleceni-2019",
      isDownload: false,
      order: 2,
    },
  ];

  for (const link of links) {
    await sql`
      INSERT INTO membership_links (section_key, label, url, is_download, "order")
      VALUES (${link.sectionKey}, ${link.label}, ${link.url}, ${link.isDownload}, ${link.order})
    `;
  }
}

export { sql };
