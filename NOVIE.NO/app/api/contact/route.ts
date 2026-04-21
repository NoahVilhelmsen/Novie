import { NextResponse } from "next/server"

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

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        reply_to: email,
        subject: `Ny henvendelse fra ${name}`,
        text: `Navn: ${name}\nE-post: ${email}\n\nMelding:\n${message}`,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      return NextResponse.json(
        { error: `Resend feil (${response.status}): ${errorBody}` },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { error: `Failed to send message: ${message}` },
      { status: 500 },
    )
  }
}
