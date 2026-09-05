// In-memory per-IP token bucket rate limiter. No external infrastructure.
// Each serverless instance keeps its own buckets, so the real limit is a small
// multiple of the configured one. That is fine here: the point is to stop a
// script from running the public AI routes in a loop, not to enforce a quota.
// Replace with a shared store (Redis or Postgres) if traffic grows.
//
// Copied from src/fluffy-score-v2/app/lib/rate-limit.ts. Keep the two in sync
// by hand, or extract to a shared package if a third project needs it.

interface Bucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5000;

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Returns null when the request is allowed, or a 429 Response when it is not.
// limitPerMinute is both the bucket size and the refill rate.
export function rateLimit(req: Request, route: string, limitPerMinute: number): Response | null {
  const now = Date.now();
  const key = `${route}:${clientIp(req)}`;

  // Bound memory: drop stale buckets when the map grows too large
  if (buckets.size > MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (now - b.lastRefill > 120_000) buckets.delete(k);
    }
    if (buckets.size > MAX_BUCKETS) buckets.clear();
  }

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { tokens: limitPerMinute, lastRefill: now };
    buckets.set(key, bucket);
  } else {
    const elapsed = now - bucket.lastRefill;
    if (elapsed > 0) {
      bucket.tokens = Math.min(limitPerMinute, bucket.tokens + (elapsed / 60_000) * limitPerMinute);
      bucket.lastRefill = now;
    }
  }

  if (bucket.tokens < 1) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please wait a minute and try again." }),
      { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "60" } },
    );
  }

  bucket.tokens -= 1;
  return null;
}
