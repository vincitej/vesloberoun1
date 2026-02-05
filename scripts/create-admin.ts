import { createUser } from "@/lib/queries";

try {
  createUser("admin", "vkk2024admin", "admin@vesloberoun.cz");
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

process.exit(0);
