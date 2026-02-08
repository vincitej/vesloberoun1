import { createUser } from "@/lib/queries";

async function run() {
  try {
    await createUser("admin", "vkk2024admin", "admin@vesloberoun.cz");
    console.log("ADMIN CREATED SUCCESSFULLY:");
    console.log("Username: admin");
    console.log("Password: vkk2024admin");
  } catch (error: any) {
    if (error.message.includes("UNIQUE")) {
      console.log("Admin user already exists");
    } else {
      console.error("ERROR:", error.message);
    }
  }
}

run().finally(() => process.exit(0));
