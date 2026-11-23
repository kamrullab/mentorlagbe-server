import { Router, json, raw } from "express";
import Stripe from "stripe";
import { collections } from "../db.js";
import { env } from "../config/env.js";
import { asyncHandler, HttpError } from "../utils/http.js";
import { verifyAdmin, verifyToken } from "../middleware/auth.js";
import type { Role } from "../types.js";

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY) : undefined;
export const paymentRouter = Router();

export function checkoutPlan(accountRole: Role, requestedPlan: unknown) {
  if (accountRole === "admin") throw new HttpError(403, "Admin accounts cannot subscribe");
  if (requestedPlan !== "student" && requestedPlan !== "tutor") throw new HttpError(400, "Choose a valid Pro plan");
  if (requestedPlan !== accountRole) throw new HttpError(403, `The Pro ${requestedPlan} plan requires a ${requestedPlan} account`);
  return { role: requestedPlan, amount: requestedPlan === "tutor" ? 1500 : 1000 } as const;
}

paymentRouter.post("/checkout", json({ limit: "10kb" }), verifyToken, asyncHandler(async (req, res) => {
  if (!stripe) throw new HttpError(503, "Payments are not configured");
  const plan = checkoutPlan(req.auth!.role, req.body?.plan);
  const { users } = await collections();
  const user = await users.findOne({ email: req.auth!.email }, { projection: { plan: 1 } });
  if (!user) throw new HttpError(404, "Account not found");
  if (user.plan === "pro") throw new HttpError(409, "Your account already has an active Pro plan");
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: req.auth!.email,
    metadata: { email: req.auth!.email, role: plan.role, name: req.auth!.name },
    subscription_data: { metadata: { email: req.auth!.email, role: plan.role } },
    line_items: [{ quantity: 1, price_data: { currency: "usd", unit_amount: plan.amount, recurring: { interval: "month" }, product_data: { name: `MentorLagbe Pro ${plan.role}` } } }],
    success_url: `${env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.CLIENT_URL}/payment/cancel`,
  });
  res.json({ url: session.url });
}));

paymentRouter.get("/session/:sessionId", verifyToken, asyncHandler(async (req, res) => {
  if (!stripe) throw new HttpError(503, "Payments are not configured");
  const sessionId = String(req.params.sessionId);
  if (!sessionId.startsWith("cs_")) throw new HttpError(400, "Invalid checkout session");
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.metadata?.email !== req.auth!.email) throw new HttpError(403, "This checkout does not belong to your account");
  res.json({ paid: session.payment_status === "paid", plan: session.metadata?.role, amount: session.amount_total, currency: session.currency });
}));

export const stripeWebhook = raw({ type: "application/json" });
paymentRouter.post("/webhook", stripeWebhook, asyncHandler(async (req, res) => {
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) throw new HttpError(503, "Webhook unavailable");
  const signature = req.headers["stripe-signature"];
  if (!signature) throw new HttpError(400, "Missing Stripe signature");
  const event = stripe.webhooks.constructEvent(req.body, signature, env.STRIPE_WEBHOOK_SECRET);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.metadata?.email;
    if (email && session.payment_status === "paid") {
      const { users, payments } = await collections();
      const user = await users.findOne({ email });
      if (user) {
        await payments.updateOne({ stripeSessionId: session.id }, { $setOnInsert: { userEmail: user.email, userName: user.name, userRole: user.role, planName: `Pro ${session.metadata?.role || user.role}`, amount: session.amount_total || 0, currency: session.currency || "usd", transactionId: String(session.payment_intent || session.subscription || session.id), stripeSessionId: session.id, paymentStatus: "paid", paidAt: new Date() } }, { upsert: true });
        await users.updateOne({ _id: user._id }, { $set: { plan: "pro", updatedAt: new Date() } });
      }
    }
  }
  if (event.type === "customer.subscription.deleted") {
    const email = event.data.object.metadata.email;
    if (email) { const { users } = await collections(); await users.updateOne({ email }, { $set: { plan: "free", updatedAt: new Date() } }); }
  }
  if (event.type === "invoice.payment_failed") {
    const email = event.data.object.customer_email;
    if (email) { const { users } = await collections(); await users.updateOne({ email }, { $set: { plan: "free", updatedAt: new Date() } }); }
  }
  res.json({ received: true });
}));

paymentRouter.get("/admin/all", verifyToken, verifyAdmin, asyncHandler(async (_req, res) => {
  const { payments } = await collections();
  res.json(await payments.find().sort({ paidAt: -1 }).toArray());
}));
