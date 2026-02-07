import bcrypt from "bcrypt";
import db from "./db";

console.log("[QUERIES] Module loaded, db connection:", !!db);

export interface User {
  id: number;
  username: string;
  email?: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
  created_at: string;
  updated_at: string;
}

// Uživatelé
export function verifyUser(username: string, password: string): User | null {
  const stmt = db.prepare(
    "SELECT id, username, password_hash, email FROM users WHERE username = ?",
  );
  const user = stmt.get(username) as any;
  if (!user) return null;

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) return null;

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}

export function createUser(username: string, password: string, email?: string) {
  const hash = bcrypt.hashSync(password, 10);
  const stmt = db.prepare(
    "INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)",
  );
  return stmt.run(username, hash, email ?? null);
}

export function getUserById(id: number): User | null {
  const stmt = db.prepare("SELECT id, username, email FROM users WHERE id = ?");
  return stmt.get(id) as User | null;
}

// Články
export function getAllArticles(): Article[] {
  const stmt = db.prepare("SELECT * FROM articles ORDER BY date DESC");
  return stmt.all() as Article[];
}

export function getArticleById(id: number): Article | null {
  const stmt = db.prepare("SELECT * FROM articles WHERE id = ?");
  return stmt.get(id) as Article | null;
}

export function createArticle(
  article: Omit<Article, "id" | "created_at" | "updated_at">,
) {
  const stmt = db.prepare(`
    INSERT INTO articles (title, slug, excerpt, content, date, author, image, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(
    article.title,
    article.slug,
    article.excerpt,
    article.content,
    article.date,
    article.author,
    article.image,
    article.category,
  );
}

export function updateArticle(
  id: number,
  article: Partial<Omit<Article, "id" | "created_at" | "updated_at">>,
) {
  const fields = Object.keys(article)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(article);

  const stmt = db.prepare(`
    UPDATE articles 
    SET ${fields}, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `);
  return stmt.run(...values, id);
}

export function deleteArticle(id: number) {
  const stmt = db.prepare("DELETE FROM articles WHERE id = ?");
  return stmt.run(id);
}
