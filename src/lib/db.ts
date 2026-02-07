import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

let dbInstance: Database.Database | null = null;

function getDatabase(): Database.Database {
  if (dbInstance) {
    return dbInstance;
  }

  console.log("[DB] Initializing database module...");

  const dbPath = path.join(process.cwd(), "data", "vesloberoun.db");
  const dbDir = path.dirname(dbPath);

  console.log("[DB] Database path:", dbPath);

  // Vytvoř složku data, pokud neexistuje
  if (!fs.existsSync(dbDir)) {
    console.log("[DB] Creating database directory:", dbDir);
    fs.mkdirSync(dbDir, { recursive: true });
  }

  console.log("[DB] Opening database connection...");
  dbInstance = new Database(dbPath);
  console.log("[DB] Database connection established");

  // Inicializace databáze s tabulkami
  console.log("[DB] Starting database initialization...");
  try {
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        date TEXT NOT NULL,
        author TEXT NOT NULL,
        image TEXT NOT NULL,
        category TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
      CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);

      CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        thumbnail TEXT NOT NULL,
        year INTEGER NOT NULL,
        \`order\` INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery(\`order\`);
      CREATE INDEX IF NOT EXISTS idx_gallery_year ON gallery(year DESC);
    `);

    // Migrace: Přidej sloupec year pokud neexistuje
    try {
      const tableInfo = dbInstance
        .prepare("PRAGMA table_info(gallery)")
        .all() as any[];
      const hasYearColumn = tableInfo.some((col) => col.name === "year");

      if (!hasYearColumn) {
        console.log("[DB] Adding year column to gallery table...");
        dbInstance.exec(
          `ALTER TABLE gallery ADD COLUMN year INTEGER DEFAULT 2024`,
        );
        console.log("[DB] Year column added successfully");
      }
    } catch (migrationError) {
      console.error("[DB] Migration error:", migrationError);
    }

    console.log("[DB] Database tables initialized successfully");

    // Vytvoř výchozího admin uživatele pokud neexistuje
    try {
      const userCount = dbInstance
        .prepare("SELECT COUNT(*) as count FROM users")
        .get() as { count: number };

      if (userCount.count === 0) {
        console.log("[DB] Creating default admin user...");
        const bcrypt = require("bcrypt");
        const hash = bcrypt.hashSync("vkk2024admin", 10);
        dbInstance
          .prepare(
            "INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)",
          )
          .run("admin", hash, "admin@vesloberoun.cz");
        console.log(
          "[DB] Default admin user created (username: admin, password: vkk2024admin)",
        );
      }
    } catch (userError) {
      console.error("[DB] Error creating default user:", userError);
    }
  } catch (error) {
    console.error("[DB] Database initialization error:", error);
    throw error;
  }

  return dbInstance;
}

const db = getDatabase();

export default db;
