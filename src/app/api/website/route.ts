import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    const sender = process.env.RESEND_FROM_EMAIL || site.senderEmail;
    const from = `${site.name} <${sender}>`;
    const projectNote = message?.trim() || "No additional details provided.";

    const { error } = await resend.emails.send({
      from,
      to: [site.email],
      subject: "Website Inquiry | GTS Media House",
      html: `
        <h2>New Website Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Project details:</strong></p>
        <p>${projectNote}</p>
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
      subject: "Website Inquiry Received | GTS Media House",
      html: `
        <div style="background:#000000;padding:40px;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:600px;margin:auto;text-align:center;">
            <h1 style="color:#38B6FF;margin-bottom:20px;">We got your message</h1>
            <p style="font-size:16px;line-height:1.6;color:#dddddd;">
              Hey ${name}, thanks for reaching out about a website project. We'll follow up shortly.
            </p>
            <p style="margin-top:40px;color:#888;">— GTS Media House</p>
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
