import { ensureSchema, sql } from "./db";

export interface GalleryImage {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  year: number;
  order: number;
  created_at: string;
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  await ensureSchema();
  const { rows } = await sql`SELECT * FROM gallery ORDER BY "order" ASC`;
  return rows as GalleryImage[];
}

export async function createGalleryImage(
  image: Omit<GalleryImage, "id" | "created_at">,
) {
  await ensureSchema();
  const { rows } = await sql`
    INSERT INTO gallery (title, url, thumbnail, year, "order")
    VALUES (${image.title}, ${image.url}, ${image.thumbnail}, ${image.year}, ${image.order})
    RETURNING id
  `;
  return rows[0]?.id as number | undefined;
}

export async function updateGalleryImage(
  id: number,
  image: Partial<Omit<GalleryImage, "id" | "created_at">>,
) {
  await ensureSchema();
  const updates: string[] = [];
  const values: any[] = [];

  if (image.title !== undefined) {
    updates.push(`title = $${values.length + 1}`);
    values.push(image.title);
  }
  if (image.url !== undefined) {
    updates.push(`url = $${values.length + 1}`);
    values.push(image.url);
  }
  if (image.thumbnail !== undefined) {
    updates.push(`thumbnail = $${values.length + 1}`);
    values.push(image.thumbnail);
  }
  if (image.year !== undefined) {
    updates.push(`year = $${values.length + 1}`);
    values.push(image.year);
  }
  if (image.order !== undefined) {
    updates.push(`"order" = $${values.length + 1}`);
    values.push(image.order);
  }

  if (updates.length === 0) return null;

  const idParam = values.length + 1;
  const query = `UPDATE gallery SET ${updates.join(", ")} WHERE id = $${idParam}`;
  return sql.query(query, [...values, id]);
}

export async function deleteGalleryImage(id: number) {
  await ensureSchema();
  return sql`DELETE FROM gallery WHERE id = ${id}`;
}
