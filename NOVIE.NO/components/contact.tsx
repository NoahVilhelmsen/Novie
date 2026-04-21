"use client"

import { useState } from "react"
import { Send, Mail, MapPin, Instagram } from "lucide-react"

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")?.toString().trim() ?? ""
    const email = formData.get("email")?.toString().trim() ?? ""
    const message = formData.get("message")?.toString().trim() ?? ""

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (!response.ok) {
        const data = (await response.json()) as { error?: string }
        throw new Error(data.error ?? "Kunne ikke sende melding")
      }

      setIsSubmitted(true)
      e.currentTarget.reset()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Noe gikk galt. Prøv igjen om litt."
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="kontakt" className="py-24 px-6 bg-secondary/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            La oss snakke
          </h2>
          <p className="text-lg text-muted-foreground">
            Har du et prosjekt i tankene? Ta kontakt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">E-post</p>
                <a href="mailto:noah@novie.no" className="text-foreground hover:text-primary transition-colors">
                  noah@novie.no
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Lokasjon</p>
                <p className="text-foreground">Agder</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Instagram className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Instagram</p>
                <a 
                  href="https://www.instagram.com/novie.media/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Novie.media
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {isSubmitted ? (
            <div className="flex items-center justify-center p-8 bg-primary/10 rounded-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Takk for meldingen!</h3>
                <p className="text-muted-foreground">Jeg tar kontakt snart.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Navn"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-post"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Melding"
                  rows={4}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Sender..." : "Send melding"}
                <Send className="h-4 w-4" />
              </button>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
