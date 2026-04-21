"use client"

import Player from '@vimeo/player'
import { useState, useRef } from "react"
import { Play, Pause } from "lucide-react"

// Landscape videos (16:9)
const landscapeProjects = [
  {
    id: 1,
    title: "Davinci Resolve - Behind The Creator",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/Final_med_SFX_og_musikk_hvypyy.mp4",
    poster: "https://vumbnail.com/1176194270.jpg",
  },
  {
    id: 2,
    title: "Stagedive 2025",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/v1774273630/Stagedive_2025_zcqxwe.mp4",
    poster: "https://res.cloudinary.com/dom8piybw/image/upload/v1774273630/Stagedive_2025_zcqxwe.jpg",
  },
  {
    id: 3,
    title: "Borz Athletes",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/v1776775170/Borz_under_1_minutt_reefku.mov",
    poster: "https://res.cloudinary.com/dom8piybw/image/upload/v1776775170/Borz_under_1_minutt_reefku.jpg",
  },
  {
    id: 4,
    title: "Last Wave EPK",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/v1774273898/Last_Wave_EPK_jsmxl4.mp4",
    poster: "https://res.cloudinary.com/dom8piybw/image/upload/v1774273898/Last_Wave_EPK_jsmxl4.jpg",
  },
  {
    id: 5,
    title: "Finsland Live Aftermovie",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/Finsland_Live_Aftermovie_kortere_versjon_bonkyu.mp4",
    poster: "https://res.cloudinary.com/dom8piybw/image/upload/Finsland_Live_Aftermovie_kortere_versjon_bonkyu.jpg",
  },
  {
    id: 6,
    title: "Fagbrevutdeling Reklamefilm",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/Fagbrevutdeling_film_v2_wvhsvj.mp4",
    poster: "https://res.cloudinary.com/dom8piybw/image/upload/Fagbrevutdeling_film_v2_wvhsvj.jpg",
  },
]

// Reel/vertical videos (9:16)
const reelProjects = [
  {
    id: 7,
    title: "Portrett – Hannah Gravdal",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/v1776775330/Hannah_Gravdal_hazzeu.mp4",
    poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=450&h=800&fit=crop",
  },
  {
    id: 8,
    title: "Morgan Sulele – Sommerbris",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/v1776775306/Morgan_sulele_Sommerbris_utcrfg.mp4",
    poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=450&h=800&fit=crop",
  },
  {
    id: 9,
    title: "Havblikk – Promo 2025",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/v1776775306/Havblikk_2025_1_kytnck.mp4",
    poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=450&h=800&fit=crop",
  },
  {
    id: 10,
    title: "God Kveld Pa Haubitz",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/v1776775270/For_f%C3%B8rste_gang_arrangerte_vi_God_Kveld_P%C3%A5_Haubitz_En_vennekveld_med_lave_skuldre_magiske_%C3%B8ye_t1axpc.mp4",
    poster: "https://images.unsplash.com/photo-1516031190212-da133013de50?w=450&h=800&fit=crop",
  },
  {
    id: 11,
    title: "Palmesus x Save the Night",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/v1776775250/Palmesus_x_Save_the_Night-Uten_Drikke_pgwvuo.mov",
    poster: "https://images.unsplash.com/photo-1526441206473-247e1b6c2c30?w=450&h=800&fit=crop",
  },
  {
    id: 12,
    title: "Sommerbris – Staysman",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/v1776775309/Staysman_Sommerbris_xuvqzx.mp4",
    poster: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=450&h=800&fit=crop",
  },
  {
    id: 13,
    title: "Sommerbris – 2025",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/v1776775307/Sommerbris_Lever_livet_tojju0.mp4",
    poster: "https://images.unsplash.com/photo-1519996409144-56c880b0c68a?w=450&h=800&fit=crop",
  },
  {
    id: 14,
    title: "Solfrid x Ugland",
    video: "https://res.cloudinary.com/dom8piybw/video/upload/v1776775331/Solfrid_x_Ugland_nye_endringer_d2ajma.mov",
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
