import request from"supertest";
import{describe,expect,it}from"vitest";
import app from"./app.js";

describe("health experience",()=>{
  it("returns machine-readable health JSON by default",async()=>{const response=await request(app).get("/api/health").set("Accept","application/json");expect(response.status).toBe(200);expect(response.body.status).toBe("ok")});
  it("returns the branded status page to browsers",async()=>{const response=await request(app).get("/api/health").set("Accept","text/html");expect(response.status).toBe(200);expect(response.text).toContain("All systems operational");expect(response.text).toContain("Service heartbeat")});
});
