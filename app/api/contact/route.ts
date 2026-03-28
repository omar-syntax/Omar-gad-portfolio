import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Configure Nodemailer with environment variables
    // Using Gmail SMTP as a default recommendation
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Message from Portfolio: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; color: #1a1a1a; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 12px;">
          <h2 style="color: #000; border-bottom: 1px solid #eee; padding-bottom: 12px; margin-bottom: 24px;">New Contact Form Submission</h2>
          <div style="margin-bottom: 16px;">
            <p style="margin: 0; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">From Name</p>
            <p style="margin: 4px 0 0; font-size: 16px; font-weight: 500;">${name}</p>
          </div>
          <div style="margin-bottom: 16px;">
            <p style="margin: 0; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">From Email</p>
            <p style="margin: 4px 0 0; font-size: 16px; font-weight: 500;">${email}</p>
          </div>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Message Content</p>
            <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; font-size: 15px; line-height: 1.6; color: #333; white-space: pre-wrap;">${message}</div>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: #999; text-align: center;">Sent from your Portfolio Website</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
