import { describe, expect, it } from "vitest";
import { healthResponseSchema, isAuthorizationFresh } from "./index";

describe("authorization freshness", () => {
  it("expires at the 60-second boundary", () => {
    expect(isAuthorizationFresh(1000, 100000, 60999)).toBe(true);
    expect(isAuthorizationFresh(1000, 100000, 61000)).toBe(false);
  });

  it("never extends an expired login session", () => {
    expect(isAuthorizationFresh(1000, 2000, 1999)).toBe(true);
    expect(isAuthorizationFresh(1000, 2000, 2000)).toBe(false);
  });

  it("fails closed for invalid or future verification times", () => {
    expect(isAuthorizationFresh(1000, 100000, 999)).toBe(false);
    expect(isAuthorizationFresh(Number.NaN, 100000, 1000)).toBe(false);
    expect(isAuthorizationFresh(1000, Number.POSITIVE_INFINITY, 1000)).toBe(false);
  });
});

it("does not label a foundation health response as beta-ready", () => {
  expect(healthResponseSchema.safeParse({ status: "ok", service: "alldevs-api", stage: "foundation", betaReady: true }).success).toBe(false);
});