import { NextResponse } from "next/server";
import { ContactEmailService } from "@/backend/services/email/contactEmailService";
import type { ContactRequest, ContactResponse } from "@/shared/types/contact";

const emailService = new ContactEmailService();

export async function handleContactPost(
  req: Request
): Promise<NextResponse<ContactResponse>> {
  try {
    const { name, email, message }: ContactRequest = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await emailService.send(name, email, message);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}
