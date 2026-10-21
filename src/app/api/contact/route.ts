const PURPOSES: Record<string, string> = {
  order: "Place an order",
  price: "Ask about prices",
  visit: "Visit the farm",
  partner: "Partnership",
  other: "Other",
};

// Best-effort per-instance rate limit: 5 messages per IP every 10 minutes.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const purpose = String(body.purpose ?? "");
  const message = String(body.message ?? "").trim();
  const locale = body.locale === "km" ? "Khmer" : "English";

  const digits = phone.replace(/\D/g, "");
  const valid =
    name.length >= 2 &&
    name.length <= 80 &&
    /^\+?[\d\s-]+$/.test(phone) &&
    digits.length >= 8 &&
    digits.length <= 15 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    email.length <= 120 &&
    purpose in PURPOSES &&
    message.length <= 1000;

  if (!valid) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const text = [
    "🍯 <b>New message from the LATA Bee website</b>",
    "",
    `<b>Name:</b> ${esc(name)}`,
    `<b>Phone:</b> ${esc(phone)}`,
    `<b>Email:</b> ${esc(email)}`,
    `<b>Purpose:</b> ${PURPOSES[purpose]}`,
    message ? `<b>Message:</b> ${esc(message)}` : null,
    "",
    `<i>Site language: ${locale}</i>`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    if (!res.ok) {
      return Response.json({ ok: false, error: "telegram_failed" }, { status: 502 });
    }
  } catch {
    return Response.json({ ok: false, error: "telegram_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
