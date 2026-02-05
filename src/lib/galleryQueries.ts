import db from "./db";

export interface GalleryImage {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  year: number;
  order: number;
  created_at: string;
}

export function getAllGalleryImages(): GalleryImage[] {
  const stmt = db.prepare("SELECT * FROM gallery ORDER BY `order` ASC");
  return stmt.all() as GalleryImage[];
}

export function createGalleryImage(
  image: Omit<GalleryImage, "id" | "created_at">
) {
  const stmt = db.prepare(
    `INSERT INTO gallery (title, url, thumbnail, year, \`order\`) 
     VALUES (?, ?, ?, ?, ?)`
  );
  return stmt.run(
    image.title,
    image.url,
    image.thumbnail,
    image.year,
    image.order
  );
}

export function updateGalleryImage(
  id: number,
  image: Partial<Omit<GalleryImage, "id" | "created_at">>
) {
  const updates: string[] = [];
  const values: any[] = [];

  if (image.title !== undefined) {
    updates.push("title = ?");
    values.push(image.title);
  }
  if (image.url !== undefined) {
    updates.push("url = ?");
    values.push(image.url);
  }
  if (image.thumbnail !== undefined) {
    updates.push("thumbnail = ?");
    values.push(image.thumbnail);
  }
  if (image.year !== undefined) {
    updates.push("year = ?");
    values.push(image.year);
  }
  if (image.order !== undefined) {
    updates.push("`order` = ?");
    values.push(image.order);
  }

  if (updates.length === 0) return null;

  values.push(id);
  const stmt = db.prepare(
    `UPDATE gallery SET ${updates.join(", ")} WHERE id = ?`
  );
  return stmt.run(...values);
}

export function deleteGalleryImage(id: number) {
  const stmt = db.prepare("DELETE FROM gallery WHERE id = ?");
  return stmt.run(id);
}
