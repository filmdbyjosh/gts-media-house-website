import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY || "");

const filmTypeLabels: Record<string, string> = {
  listing: "Listing / property video",
  "remodel-homeowner": "Remodel showcase",
  "remodel-trade": "Remodel / trade business",
  unsure: "Not sure — consult",
};

export async function POST(req: Request) {
  try {
    const {
      filmType,
      projectContext,
      shootNeeds,
      name,
      email,
      phone,
      preferredDate,
      location,
      notes,
    } = await req.json();

    if (!name || !email || !phone || !filmType || !preferredDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sender = process.env.RESEND_FROM_EMAIL || site.senderEmail;
    const from = `${site.name} <${sender}>`;
    const filmLabel = filmTypeLabels[filmType] || filmType;
    const contextNote = projectContext?.trim() || "No project details provided.";
    const needsNote = shootNeeds?.trim() || "No shoot preferences listed.";
    const locationNote = location?.trim() || "Tucson / surrounding areas";
    const extraNotes = notes?.trim() || "None";

    const { error } = await resend.emails.send({
      from,
      to: [site.email],
      subject: `Shoot Date Request | ${filmLabel} | GTS Media House`,
      html: `
        <h2>New Real Estate Shoot Date Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Film type:</strong> ${filmLabel}</p>
        <p><strong>Preferred date:</strong> ${preferredDate}</p>
        <p><strong>Location:</strong> ${locationNote}</p>
        <p><strong>Project context:</strong></p>
        <p>${contextNote}</p>
        <p><strong>Shoot needs:</strong></p>
        <p>${needsNote}</p>
        <p><strong>Notes:</strong></p>
        <p>${extraNotes}</p>
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
      subject: "Shoot Date Request Received | GTS Media House",
      html: `
        <div style="background:#000000;padding:40px;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:600px;margin:auto;text-align:center;">
            <img src="https://gtsmediahouse.com/og-image.png" style="width:140px;margin-bottom:30px;" alt="GTS Media House" />

            <h1 style="color:#38B6FF;margin-bottom:20px;">
              Shoot request received
            </h1>

            <p style="font-size:16px;line-height:1.6;color:#dddddd;">
              Hey ${name}, thanks for requesting a shoot date with GTS Media House.
            </p>

            <p style="font-size:16px;line-height:1.6;color:#dddddd;">
              We received your preference for <strong style="color:#ffffff;">${preferredDate}</strong>
              (${filmLabel}). This is a request — we’ll confirm availability or suggest the next open window.
            </p>

            <div style="background:#111111;padding:20px;margin:30px 0;border-radius:8px;text-align:left;">
              <p style="margin:0 0 8px;color:#888;">Location</p>
              <p style="margin:0 0 16px;font-size:16px;">${locationNote}</p>
              <p style="margin:0 0 8px;color:#888;">Next step</p>
              <p style="margin:0;font-size:16px;">We’ll confirm availability and discuss scope / add-ons when we lock your date.</p>
            </div>

            <p style="font-size:15px;color:#bbbbbb;">
              We’ll follow up shortly to confirm your shoot.
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
