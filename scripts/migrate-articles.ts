import { articles } from "@/data/articles";
import { createArticle } from "@/lib/queries";

async function run() {
  console.log("Migruji stávající články do databáze...\n");

  let migrated = 0;
  let skipped = 0;

  for (const article of articles) {
    try {
      await createArticle({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        date: article.date,
        author: article.author,
        image: article.image,
        category: article.category,
      });
      console.log(`✅ ${article.title}`);
      migrated++;
    } catch (error: any) {
      if (error.message.includes("UNIQUE")) {
        console.log(`⏭️  ${article.title} (již existuje)`);
        skipped++;
      } else {
        console.error(`❌ ${article.title}:`, error.message);
      }
    }
  }

  console.log(`\n📊 Migrace dokončena:`);
  console.log(`   Nové: ${migrated}`);
  console.log(`   Přeskočené: ${skipped}`);
  console.log(`   Celkem: ${articles.length}`);
}

run().finally(() => process.exit(0));
