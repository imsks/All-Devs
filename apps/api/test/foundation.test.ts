import { exports as worker, env } from "cloudflare:workers";
import { healthResponseSchema } from "@alldevs/contracts";
import { describe, expect, it } from "vitest";

describe("Worker foundation", () => {
  it("serves a non-cacheable foundation health response", async () => {
    const response = await worker.default.fetch("https://alldevs.test/api/health");
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(healthResponseSchema.parse(await response.json()).betaReady).toBe(false);
  });

  it("fails closed while GitHub authentication is not implemented", async () => {
    const response = await worker.default.fetch("https://alldevs.test/api/auth/get-session");
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "authentication_not_configured" });
  });

  it("does not expose unimplemented feature endpoints", async () => {
    const response = await worker.default.fetch("https://alldevs.test/api/ideas");
    expect(response.status).toBe(404);
  });

  it("binds local SQLite without requiring a cloud database", async () => {
    const result = await env.DB.prepare("SELECT 1 AS healthy").first<{ healthy: number }>();
    expect(result?.healthy).toBe(1);
  });

  it("does not accept chat connections before admission is implemented", async () => {
    const room = env.CHAT_ROOMS.getByName("foundation-test");
    const response = await room.fetch("https://alldevs.test/socket");
    expect(response.status).toBe(503);
  });
});