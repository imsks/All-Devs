import { healthResponseSchema } from "@alldevs/contracts";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.use("*", secureHeaders());
app.use("/api/*", async (context, next) => {
  context.header("Cache-Control", "no-store");
  await next();
});

app.get("/api/health", (context) => context.json(healthResponseSchema.parse({
  status: "ok",
  service: "alldevs-api",
  stage: "foundation",
  betaReady: false,
})));

app.all("/api/auth/*", (context) => context.json({ error: "authentication_not_configured" }, 503));
app.notFound((context) => context.json({ error: "not_found" }, 404));
app.onError((_error, context) => context.json({ error: "internal_error" }, 500));

export default app;