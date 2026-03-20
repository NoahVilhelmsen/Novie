"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Volume2, VolumeX, Play } from "lucide-react"

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
      >
        <source src="/hero-video.mov" type="video/quicktime" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <Image
          src="/logo.png"
          alt="Novie"
          width={270}
          height={270}
          className="invert w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
          priority
        />
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-white/70 tracking-widest uppercase text-center">
          Novie <br />Film & Foto
        </p>
      </div>

      {/* Play Button (if autoplay fails) */}
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute bottom-8 left-8 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
          aria-label="Spill av video"
        >
          <Play className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
        aria-label={isMuted ? "Skru på lyd" : "Skru av lyd"}
      >
        {isMuted ? (
          <VolumeX className="h-6 w-6 text-white" />
        ) : (
          <Volume2 className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/60" />
      </div>
    </section>
  )
}
