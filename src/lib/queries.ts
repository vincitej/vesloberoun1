import bcrypt from "bcrypt";
import { ensureSchema, sql } from "./db";

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
export async function verifyUser(
  username: string,
  password: string,
): Promise<User | null> {
  await ensureSchema();
  const { rows } = await sql`
    SELECT id, username, password_hash, email FROM users WHERE username = ${username}
  `;
  const user = rows[0] as any;
  if (!user) return null;

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) return null;

  return {
    id: user.id,
    username: user.username,
    email: user.email ?? undefined,
  };
}

export async function createUser(
  username: string,
  password: string,
  email?: string,
) {
  await ensureSchema();
  const hash = bcrypt.hashSync(password, 10);
  const { rows } = await sql`
    INSERT INTO users (username, password_hash, email)
    VALUES (${username}, ${hash}, ${email ?? null})
    RETURNING id
  `;
  return rows[0]?.id as number | undefined;
}

export async function getUserById(id: number): Promise<User | null> {
  await ensureSchema();
  const { rows } = await sql`
    SELECT id, username, email FROM users WHERE id = ${id}
  `;
  return (rows[0] as User) ?? null;
}

// Články
export async function getAllArticles(): Promise<Article[]> {
  await ensureSchema();
  const { rows } = await sql`SELECT * FROM articles ORDER BY date DESC`;
  return rows as Article[];
}

export async function getArticleById(id: number): Promise<Article | null> {
  await ensureSchema();
  const { rows } = await sql`SELECT * FROM articles WHERE id = ${id}`;
  return (rows[0] as Article) ?? null;
}

export async function createArticle(
  article: Omit<Article, "id" | "created_at" | "updated_at">,
) {
  await ensureSchema();
  const { rows } = await sql`
    INSERT INTO articles (title, slug, excerpt, content, date, author, image, category)
    VALUES (
      ${article.title},
      ${article.slug},
      ${article.excerpt},
      ${article.content},
      ${article.date},
      ${article.author},
      ${article.image},
      ${article.category}
    )
    RETURNING id
  `;
  return rows[0]?.id as number | undefined;
}

export async function updateArticle(
  id: number,
  article: Partial<Omit<Article, "id" | "created_at" | "updated_at">>,
) {
  await ensureSchema();
  const fields = Object.keys(article);
  if (fields.length === 0) return null;

  const updates = fields.map((field, index) => `"${field}" = $${index + 1}`);
  const values = Object.values(article);
  const paramIndex = values.length + 1;

  const query = `
    UPDATE articles
    SET ${updates.join(", ")}, updated_at = NOW()
    WHERE id = $${paramIndex}
  `;
  return sql.query(query, [...values, id]);
}

export async function deleteArticle(id: number) {
  await ensureSchema();
  return sql`DELETE FROM articles WHERE id = ${id}`;
}
