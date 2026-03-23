"use client"

import Player from '@vimeo/player'
import { useState, useRef } from "react"
import { Play, Pause } from "lucide-react"

// Landscape videos (16:9)
const landscapeProjects = [
  {
    id: 1,
    title: "Final med SFX og musikk",
    video: "https://player.vimeo.com/video/1176194270",
    poster: "https://vumbnail.com/1176194270.jpg",
  },
  {
    id: 2,
    title: "Dag 4 Stagedive film",
    video: "/Dag 4 Stagedive film.mov",
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop",
  },
  {
    id: 3,
    title: "Borz Athletes Torpal",
    video: "https://player.vimeo.com/video/1176185877",
    poster: "https://vumbnail.com/1176185877.jpg",
  },
  {
    id: 4,
    title: "Last Wave EPK",
    video: "/Last Wave EPK.mov",
    poster: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=450&fit=crop",
  },
  {
    id: 5,
    title: "Finsland Live Aftermovie",
    video: "/Finsland Live Aftermovie kortere versjon.mp4",
    poster: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=450&fit=crop",
  },
  {
    id: 6,
    title: "Fagbrevutdeling film",
    video: "/Fagbrevutdeling film v2.mp4",
    poster: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=450&fit=crop",
  },
]

// Reel/vertical videos (9:16)
const reelProjects = [
  {
    id: 7,
    title: "Portrett – Hannah Gravdal",
    video: "/Hannah Gravdal.mp4",
    poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=450&h=800&fit=crop",
  },
  {
    id: 8,
    title: "Havblikk – Promo 3",
    video: "/Havblikk 2025 3.mp4",
    poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=450&h=800&fit=crop",
  },
  {
    id: 9,
    title: "Havblikk – Promo 1",
    video: "/Havblikk 2025 1.mp4",
    poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=450&h=800&fit=crop",
  },
  {
    id: 10,
    title: "B2B – Bil & Hotell",
    video: "/B2B Bil & Hotell.mov",
    poster: "https://images.unsplash.com/photo-1516031190212-da133013de50?w=450&h=800&fit=crop",
  },
  {
    id: 11,
    title: "Novie – Showcase Reel",
    video: "/Novie Showcase Reel.mov",
    poster: "https://images.unsplash.com/photo-1526441206473-247e1b6c2c30?w=450&h=800&fit=crop",
  },
  {
    id: 12,
    title: "Staysman – Sommerbris",
    video: "/Staysman Sommerbris.mp4",
    poster: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=450&h=800&fit=crop",
  },
  {
    id: 13,
    title: "Sommerbris – Lever livet",
    video: "/Sommerbris Lever livet.mp4",
    poster: "https://images.unsplash.com/photo-1519996409144-56c880b0c68a?w=450&h=800&fit=crop",
  },
  {
    id: 14,
    title: "Solfrid x Ugland",
    video: "/Solfrid x Ugland nye endringer.mov",
    poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=450&h=800&fit=crop",
  },
]

// Combine all projects into a single list used by the grid below
const projects = [
  ...landscapeProjects.map((p) => ({ ...p, orientation: "landscape" as const })),
  ...reelProjects.map((p) => ({ ...p, orientation: "reel" as const })),
]

function VideoCard({ project }: { project: (typeof projects)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const vimeoPlayerRef = useRef<Player | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const isVimeo = project.video.includes("vimeo")

  const initVimeoPlayer = () => {
    if (isVimeo && iframeRef.current && !vimeoPlayerRef.current) {
      vimeoPlayerRef.current = new Player(iframeRef.current)
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
    if (isVimeo) {
      initVimeoPlayer()
      vimeoPlayerRef.current?.play()
      setIsPlaying(true)
    } else if (videoRef.current) {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (isVimeo) {
      vimeoPlayerRef.current?.pause()
      setIsPlaying(false)
    } else if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  const togglePlay = () => {
    if (isVimeo) {
      if (isPlaying) {
        vimeoPlayerRef.current?.pause()
        setIsPlaying(false)
      } else {
        vimeoPlayerRef.current?.play()
        setIsPlaying(true)
      }
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play().catch(() => {})
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = () => {
    if (isVimeo) {
      vimeoPlayerRef.current?.setVolume(isMuted ? 1 : 0)
      setIsMuted(!isMuted)
    } else if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div
      className={`relative overflow-hidden cursor-pointer group ${
        project.orientation === "reel" ? "aspect-[9/16]" : "aspect-video"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isVimeo ? (
        <iframe
          ref={iframeRef}
          src={`${project.video}?badge=0&autopause=0&player_id=0&app_id=58479&muted=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          className="w-full h-full absolute top-0 left-0"
          title={project.title}
        />
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          playsInline
          muted
          poster={project.poster}
        >
          <source src={project.video} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/0 flex items-end transition-opacity duration-300
          opacity-100 md:opacity-0 ${isHovering ? "md:opacity-100" : ""}`}
      >
        <div className="p-4 md:p-6 w-full flex items-center justify-between">
          <h3 className="text-white text-lg md:text-xl font-medium">
            {project.title}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); toggleMute() }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay() }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              aria-label={isPlaying ? "Pause" : "Spill av"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-white" />
              ) : (
                <Play className="h-4 w-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Portfolio() {
  const landscape = projects.filter((p) => p.orientation === "landscape")
  const reels = projects.filter((p) => p.orientation === "reel")

  return (
    <section id="arbeid" className="py-12 md:py-20">
      {/* Landscape grid */}
      <div className="px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {landscape.map((project) => (
            <VideoCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Reels grid */}
      <div className="mt-12 px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {reels.map((project) => (
            <VideoCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
