// auth.ts - CORRECTED
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
// Make sure to import all the tables the adapter might need
import { user, account, session, verification } from "@/db/schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  // The fix is to pass the schema tables directly into the adapter's options object
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, account, session, verification }, // It's very likely the adapter also needs the verification table for things like email confirmation links.
  }),
  // This top-level `schema` key is now unnecessary and can be removed.
});
