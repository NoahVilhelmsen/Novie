import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Novie"
              width={36}
              height={36}
              className="invert"
            />
          </Link>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/novie.media/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="mailto:noah@novie.no"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="E-post"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Novie. Norge.
          </p>
        </div>
      </div>
    </footer>
  )
}
