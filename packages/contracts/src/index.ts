import { z } from "zod";

export const MAX_AUTHORIZATION_STALENESS_MS = 60_000;

export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  service: z.literal("alldevs-api"),
  stage: z.literal("foundation"),
  betaReady: z.literal(false),
});

export function isAuthorizationFresh(verificationStartedAt: number, sessionExpiresAt: number, now: number): boolean {
  if (![verificationStartedAt, sessionExpiresAt, now].every(Number.isFinite)) return false;
  if (now < verificationStartedAt) return false;
  return now < Math.min(verificationStartedAt + MAX_AUTHORIZATION_STALENESS_MS, sessionExpiresAt);
}