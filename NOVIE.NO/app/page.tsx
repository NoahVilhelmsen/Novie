import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <section className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <p className="text-center text-lg md:text-2xl font-medium tracking-wide text-foreground/90">
          Utvalgte prosjekter
        </p>
      </section>
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  )
}
