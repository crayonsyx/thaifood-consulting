import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Lead capture API route.
 * Receives form submissions and creates contacts in Brevo CRM.
 *
 * POST /api/lead-capture
 * Body: { email, firstName?, leadMagnet, tags?, source? }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, firstName, leadMagnet, tags, source } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required" });
  }

  // Honeypot check (if botcheck field is filled, it's spam)
  if (req.body.botcheck) {
    return res.status(200).json({ ok: true });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;

  if (!brevoApiKey) {
    // Brevo not configured -- log and succeed silently
    console.log("[lead-capture] No BREVO_API_KEY. Lead:", { email, firstName, leadMagnet, source });
    return res.status(200).json({ ok: true, dry_run: true });
  }

  try {
    // Create contact in Brevo
    const attributes: Record<string, string> = {};
    if (firstName) attributes.FIRSTNAME = firstName;
    if (leadMagnet) attributes.LEAD_MAGNET = leadMagnet;
    if (source) attributes.SOURCE = source;
    if (tags) attributes.TAGS = tags;

    const brevoResp = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        attributes,
        updateEnabled: true, // Update if contact exists
      }),
    });

    if (!brevoResp.ok && brevoResp.status !== 204) {
      const errData = await brevoResp.json().catch(() => ({}));
      console.error("[lead-capture] Brevo error:", brevoResp.status, errData);
      // Don't expose Brevo errors to the client
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[lead-capture] Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
