import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY || "");

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, mediaLink } = await req.json();

    if (!name || !email || !phone || !mediaLink) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sender = process.env.RESEND_FROM_EMAIL || site.senderEmail;
    const from = `${site.name} <${sender}>`;

    const nameNote = escapeHtml(String(name).trim());
    const emailNote = escapeHtml(String(email).trim());
    const phoneNote = escapeHtml(String(phone).trim());
    const mediaNote = escapeHtml(String(mediaLink).trim());

    const { error } = await resend.emails.send({
      from,
      to: [site.email],
      subject: `Quote request | ${nameNote}`,
      html: `
        <h2>New quote request</h2>
        <p><strong>Name:</strong> ${nameNote}</p>
        <p><strong>Email:</strong> ${emailNote}</p>
        <p><strong>Phone:</strong> ${phoneNote}</p>
        <p><strong>Footage link:</strong> <a href="${mediaNote}">${mediaNote}</a></p>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const { error: clientError } = await resend.emails.send({
      from,
      to: [email],
      replyTo: site.email,
      subject: `Quote request received | ${site.name}`,
      html: `
        <div style="background:#050505;padding:40px;font-family:Arial,Helvetica,sans-serif;color:#f2f2f2;">
          <div style="max-width:600px;margin:auto;">
            <h1 style="color:#f2f2f2;margin-bottom:16px;">Your request is being reviewed</h1>
            <p style="font-size:16px;line-height:1.6;color:#bdbdbd;">
              Hey ${nameNote}, thanks for reaching out to ${site.name}. We’ll review your footage link and send you a free quote before any work begins.
            </p>
          </div>
        </div>
      `,
    });

    if (clientError) {
      console.error("CLIENT EMAIL ERROR:", clientError);
      return NextResponse.json({ error: clientError }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
