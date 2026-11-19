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

function clean(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = clean(body.name, 120);
    const business = clean(body.business, 160);
    const web = clean(body.web, 200);
    const email = clean(body.email, 160);
    const phone = clean(body.phone, 40);

    if (!name || !business || !web || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const sender = process.env.RESEND_FROM_EMAIL || site.senderEmail;
    const from = `${site.name} <${sender}>`;
    const nameNote = escapeHtml(name);
    const businessNote = escapeHtml(business);
    const webNote = escapeHtml(web);
    const emailNote = escapeHtml(email);
    const phoneNote = escapeHtml(phone);

    const { error } = await resend.emails.send({
      from,
      to: [site.email],
      replyTo: email,
      subject: `New message | ${business}`,
      html: `
        <h2>New message</h2>
        <p><strong>Full name:</strong> ${nameNote}</p>
        <p><strong>Business:</strong> ${businessNote}</p>
        <p><strong>Website or Instagram:</strong> ${webNote}</p>
        <p><strong>Email:</strong> ${emailNote}</p>
        <p><strong>Phone:</strong> ${phoneNote}</p>
      `,
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
        <div style="background:#0c0b0a;padding:40px;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:560px;margin:auto;">
            <h1 style="margin:0 0 16px;font-size:28px;">Message received</h1>
            <p style="margin:0;font-size:16px;line-height:1.6;color:#d6d3d1;">
              Hey ${nameNote}, we received your message. We’ll be in touch shortly.
            </p>
          </div>
        </div>
      `,
    });

    if (clientError) {
      console.error("CLIENT EMAIL ERROR:", clientError);
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
