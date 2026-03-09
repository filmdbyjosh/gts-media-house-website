import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { name, email, brand, website, details } = await req.json();

    const { error } = await resend.emails.send({
      from: "GTS Media House <info@gtsmediahouse.com>",
      to: ["info@gtsmediahouse.com"],
      subject: "Inquiry | GTS Media House",
      html: `
        <h2>New Website Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Brand:</strong> ${brand}</p>
        <p><strong>Website / Instagram:</strong> ${website}</p>
        <p><strong>Brand Details:</strong></p>
        <p>${details}</p>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const { error: clientError } = await resend.emails.send({
      from: "GTS Media House <info@gtsmediahouse.com>",
      to: [email],
      subject: "Submission Received | GTS Media House",
      html: `
        <div style="background:#000000;padding:40px;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:600px;margin:auto;text-align:center;">
            <img src="https://gtsmediahouse.com/og-image.png" style="width:140px;margin-bottom:30px;" />

            <h1 style="color:#00f0ff;margin-bottom:20px;">
              Submission Received ⚡
            </h1>

            <p style="font-size:16px;line-height:1.6;color:#dddddd;">
              Hey ${name},
            </p>

            <p style="font-size:16px;line-height:1.6;color:#dddddd;">
              We just received your submission and are already checking out your brand.
            </p>

            <p style="font-size:16px;line-height:1.6;color:#dddddd;">
              Our team is reviewing your current content, positioning, and ad opportunities to see where we can create the most impact.
            </p>

            <div style="background:#111111;padding:20px;margin:30px 0;border-radius:8px;">
              <p style="margin:0;color:#888;">Brand</p>
              <p style="margin:0;font-size:18px;">${brand}</p>
            </div>

            <p style="font-size:15px;color:#bbbbbb;">
              We'll follow up shortly with next steps.
            </p>

            <p style="margin-top:40px;color:#888;">
              — GTS Media House
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