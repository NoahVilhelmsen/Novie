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
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  )
}
