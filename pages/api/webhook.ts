import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Webhook receiver for Brevo automation triggers.
 * Sends Telegram notification when a hot lead is detected.
 *
 * POST /api/webhook
 * Body: Brevo webhook payload (contact data + event info)
 *
 * Configure in Brevo: Automation > Workflow > Webhook action
 * URL: https://thaifood-consulting.vercel.app/api/webhook
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log("[webhook] No Telegram config. Payload:", JSON.stringify(req.body).slice(0, 200));
    return res.status(200).json({ ok: true });
  }

  try {
    const { email, FIRSTNAME, LEAD_MAGNET, SOURCE, TAGS } = req.body;

    const message = [
      `🔥 <b>Hot Lead</b>`,
      `Email: ${email || "N/A"}`,
      `Name: ${FIRSTNAME || "N/A"}`,
      `Lead Magnet: ${LEAD_MAGNET || "N/A"}`,
      `Source: ${SOURCE || "N/A"}`,
      `Tags: ${TAGS || "N/A"}`,
    ].join("\n");

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[webhook] Error:", err);
    return res.status(200).json({ ok: true }); // Always 200 so Brevo doesn't retry
  }
}
