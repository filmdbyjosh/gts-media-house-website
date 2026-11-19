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
    const { name, email, phone, preferredContact, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const preferred = String(preferredContact || "").trim();
    if (!preferred) {
      return NextResponse.json(
        { error: "Preferred contact method required" },
        { status: 400 }
      );
    }

    const sender = process.env.RESEND_FROM_EMAIL || site.senderEmail;
    const from = `${site.name} <${sender}>`;
    const nameNote = escapeHtml(String(name).trim());
    const emailNote = escapeHtml(String(email).trim());
    const phoneNote = escapeHtml(String(phone).trim());
    const preferredNote = escapeHtml(preferred);
    const messageNote = escapeHtml(String(message).trim()).replaceAll(
      "\n",
      "<br/>"
    );

    const { error } = await resend.emails.send({
      from,
      to: [site.email],
      subject: `Get in touch | ${site.name}`,
      html: `
        <h2>New message</h2>
        <p><strong>Name:</strong> ${nameNote}</p>
        <p><strong>Email:</strong> ${emailNote}</p>
        <p><strong>Phone:</strong> ${phoneNote}</p>
        <p><strong>Preferred contact:</strong> ${preferredNote}</p>
        <p><strong>Message:</strong></p>
        <p>${messageNote}</p>
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
      subject: `Message received | ${site.name}`,
      html: `
        <div style="background:#000000;padding:40px;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:600px;margin:auto;text-align:center;">
            <h1 style="color:#ffffff;margin-bottom:20px;">We got your message</h1>
            <p style="font-size:16px;line-height:1.6;color:#dddddd;">
              Hey ${nameNote}, thanks for reaching out to ${site.name}. We’ll get back to you with a free quote.
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
