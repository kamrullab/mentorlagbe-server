import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth/better-auth.js";
import { env } from "../config/env.js";
import { collections } from "../db.js";
import { createAccessToken } from "../middleware/auth.js";
import { asyncHandler, HttpError } from "../utils/http.js";
import type { Role } from "../types.js";

export const authRouter = Router();
authRouter.post("/token", asyncHandler(async (req, res) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  if (!session) throw new HttpError(401, "Authentication required");
  const user = session.user as typeof session.user & { role?: Role; plan?: string };
  const isSuperAdmin = Boolean(env.ADMIN_EMAIL && user.email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase());
  const role: Role | undefined = isSuperAdmin ? "admin" : user.role;
  const plan = isSuperAdmin ? "pro" : user.plan || "free";
  if (!role || !["student", "tutor", "admin"].includes(role)) throw new HttpError(403, "Account role is not configured");
  if (isSuperAdmin) {
    const { users } = await collections();
    await users.updateOne({ email: user.email }, { $set: { role: "admin", plan: "pro", isSuperAdmin: true, updatedAt: new Date() } });
  }
  res.json({ accessToken: createAccessToken({ email: user.email, role, name: user.name }), user: { name: user.name, email: user.email, role, plan, image: user.image, isSuperAdmin } });
}));
