import { DurableObject } from "cloudflare:workers";
import app from "./app";

export class CircleRoom extends DurableObject<Cloudflare.Env> {
  async fetch(): Promise<Response> {
    return Response.json({ error: "chat_not_implemented" }, { status: 503 });
  }
}

export default app;