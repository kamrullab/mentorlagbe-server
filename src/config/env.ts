import "dotenv/config";
import { z } from "zod";
const schema=z.object({NODE_ENV:z.enum(["development","test","production"]).default("development"),PORT:z.coerce.number().default(5000),MONGODB_URI:z.string().min(1),MONGODB_DB:z.string().default("mentorlagbe"),JWT_SECRET:z.string().min(32),JWT_REFRESH_SECRET:z.string().min(32),CLIENT_URL:z.string().url(),ADMIN_EMAIL:z.string().email().optional(),ADMIN_PASSWORD:z.string().min(8).optional(),STRIPE_SECRET_KEY:z.string().startsWith("sk_").optional(),STRIPE_WEBHOOK_SECRET:z.string().startsWith("whsec_").optional(),IMGBB_API_KEY:z.string().optional()});
export const env=schema.parse(process.env);
