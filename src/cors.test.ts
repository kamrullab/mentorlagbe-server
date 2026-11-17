import request from"supertest";
import{describe,expect,it}from"vitest";
import app from"./app.js";
import{env}from"./config/env.js";

describe("production browser integration",()=>{
  it("answers BetterAuth preflight with credentialed CORS headers",async()=>{
    const response=await request(app).options("/api/better-auth/sign-up/email").set("Origin",env.CLIENT_URL).set("Access-Control-Request-Method","POST").set("Access-Control-Request-Headers","content-type");
    expect(response.status).toBe(204);
    expect(response.headers["access-control-allow-origin"]).toBe(env.CLIENT_URL);
    expect(response.headers["access-control-allow-credentials"]).toBe("true");
  });
});
