import { NextResponse } from "next/server"
import { Resend } from "resend"

type ContactPayload = {
  name?: string
  email?: string
  message?: string
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY
  const contactToEmail = process.env.CONTACT_TO_EMAIL
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    return NextResponse.json(
      { error: "Missing email configuration" },
      { status: 500 },
    )
  }

  const body = (await request.json()) as ContactPayload
  const name = body.name?.trim() ?? ""
  const email = body.email?.trim() ?? ""
  const message = body.message?.trim() ?? ""

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    )
  }

  const resend = new Resend(resendApiKey)

  try {
    await resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject: `Ny henvendelse fra ${name}`,
      text: `Navn: ${name}\nE-post: ${email}\n\nMelding:\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    )
  }
}
