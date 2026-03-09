import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { name, email, brand, website, details } = await req.json();

    const { error } = await resend.emails.send({
      from: "GTS Media House <onboarding@resend.dev>",
      to: ["joshweissfilms@gmail.com"],
      subject: "New GTS Media House Lead",
      html: `
        <h2>New Lead From Website</h2>
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
