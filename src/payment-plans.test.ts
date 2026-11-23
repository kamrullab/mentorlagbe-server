import { beforeAll, describe, expect, it } from "vitest";

beforeAll(() => {
  process.env.MONGODB_URI = "mongodb://127.0.0.1:27017";
  process.env.JWT_SECRET = "test-jwt-secret-with-at-least-32-characters";
  process.env.JWT_REFRESH_SECRET = "test-refresh-secret-with-at-least-32-characters";
  process.env.CLIENT_URL = "http://localhost:3000";
});

describe("Stripe plan selection", () => {
  it("charges tutors 15 USD", async () => {
    const { checkoutPlan } = await import("./routes/payments.js");
    expect(checkoutPlan("tutor", "tutor")).toEqual({ role: "tutor", amount: 1500 });
  });

  it("charges students 10 USD", async () => {
    const { checkoutPlan } = await import("./routes/payments.js");
    expect(checkoutPlan("student", "student")).toEqual({ role: "student", amount: 1000 });
  });

  it("rejects a plan that does not match the account role", async () => {
    const { checkoutPlan } = await import("./routes/payments.js");
    expect(() => checkoutPlan("student", "tutor")).toThrow("requires a tutor account");
  });
});
