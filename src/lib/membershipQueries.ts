import { ensureSchema, sql } from "./db";

export interface MembershipLink {
  id: number;
  section_key: string;
  label: string;
  url: string;
  is_download: boolean;
  order: number;
}

export interface MembershipSection {
  id: number;
  key: string;
  title: string;
  description: string;
  order: number;
  links: MembershipLink[];
}

export async function getMembershipSections(): Promise<MembershipSection[]> {
  await ensureSchema();
  const { rows: sectionRows } = await sql`
    SELECT id, key, title, description, "order"
    FROM membership_sections
    ORDER BY "order" ASC
  `;

  const { rows: linkRows } = await sql`
    SELECT id, section_key, label, url, is_download, "order"
    FROM membership_links
    ORDER BY "order" ASC
  `;

  const linksBySection = new Map<string, MembershipLink[]>();
  for (const link of linkRows as MembershipLink[]) {
    const list = linksBySection.get(link.section_key) ?? [];
    list.push(link);
    linksBySection.set(link.section_key, list);
  }

  return (sectionRows as MembershipSection[]).map((section) => ({
    ...section,
    links: linksBySection.get(section.key) ?? [],
  }));
}

export async function updateMembershipSection(
  id: number,
  updates: Partial<Pick<MembershipSection, "title" | "description" | "order">>,
) {
  await ensureSchema();
  const fields = Object.keys(updates);
  if (fields.length === 0) return null;

  const values = Object.values(updates);
  const setClauses = fields.map((field, index) => `"${field}" = $${index + 1}`);
  const idParam = values.length + 1;
  const query = `
    UPDATE membership_sections
    SET ${setClauses.join(", ")}, updated_at = NOW()
    WHERE id = $${idParam}
  `;
  return sql.query(query, [...values, id]);
}

export async function createMembershipLink(link: Omit<MembershipLink, "id">) {
  await ensureSchema();
  const { rows } = await sql`
    INSERT INTO membership_links (section_key, label, url, is_download, "order")
    VALUES (${link.section_key}, ${link.label}, ${link.url}, ${link.is_download}, ${link.order})
    RETURNING id
  `;
  return rows[0]?.id as number | undefined;
}

export async function updateMembershipLink(
  id: number,
  updates: Partial<Omit<MembershipLink, "id" | "section_key">>,
) {
  await ensureSchema();
  const fields = Object.keys(updates);
  if (fields.length === 0) return null;

  const values = Object.values(updates);
  const setClauses = fields.map((field, index) => `"${field}" = $${index + 1}`);
  const idParam = values.length + 1;
  const query = `
    UPDATE membership_links
    SET ${setClauses.join(", ")}
    WHERE id = $${idParam}
  `;
  return sql.query(query, [...values, id]);
}

export async function deleteMembershipLink(id: number) {
  await ensureSchema();
  return sql`DELETE FROM membership_links WHERE id = ${id}`;
}
