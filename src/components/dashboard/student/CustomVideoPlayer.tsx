"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw, RotateCw } from "lucide-react";
import { extractYouTubeVideoId, useYouTubeController } from "@/hooks/useYouTubeController";

interface CustomVideoPlayerProps {
  videoUrl?: string;
  title: string;
  onEnded?: () => void;
}

export default function CustomVideoPlayer({ videoUrl, title, onEnded }: CustomVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytElementId = `yt-embed-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const ytVideoId = extractYouTubeVideoId(videoUrl);
  const isYouTube = Boolean(ytVideoId);

  const yt = useYouTubeController(ytElementId, ytVideoId, onEnded);
  const [html5Playing, setHtml5Playing] = useState(false);
  const [html5Time, setHtml5Time] = useState(0);
  const [html5Duration, setHtml5Duration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [posterErr, setPosterErr] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isPlaying = isYouTube ? yt.isPlaying : html5Playing;
  const currentTime = isYouTube ? yt.currentTime : html5Time;
  const duration = isYouTube ? yt.duration : html5Duration;
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePct = isMuted ? 0 : volume * 100;

  const togglePlay = () => {
    if (isYouTube) { if (yt.isPlaying) yt.pause(); else yt.play(); }
    else if (videoRef.current) {
      if (html5Playing) { videoRef.current.pause(); setHtml5Playing(false); }
      else videoRef.current.play()?.then(() => setHtml5Playing(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    if (isYouTube) yt.seekTo(t);
    else if (videoRef.current) { videoRef.current.currentTime = t; setHtml5Time(t); }
  };

  const skip = (sec: number) => {
    if (isYouTube) yt.skip(sec);
    else if (videoRef.current) {
      const next = Math.max(0, Math.min(html5Duration || 9999, (videoRef.current.currentTime || 0) + sec));
      videoRef.current.currentTime = next;
      setHtml5Time(next);
    }
  };

  const handleVolume = (v: number) => {
    const val = Math.max(0, Math.min(1, v));
    setVolume(val);
    const muted = val === 0;
    setIsMuted(muted);
    if (isYouTube) { yt.setVolume(val); if (muted) yt.mute(); else yt.unMute(); }
    else if (videoRef.current) { videoRef.current.volume = val; videoRef.current.muted = muted; }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) { containerRef.current.requestFullscreen?.().catch(() => {}); setIsFullscreen(true); }
    else { document.exitFullscreen?.().catch(() => {}); setIsFullscreen(false); }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag && ["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      if (e.code === "Space" || e.key === "k" || e.key === "K") { e.preventDefault(); togglePlay(); }
      else if (e.code === "ArrowRight" || e.key === "l" || e.key === "L") { e.preventDefault(); skip(10); }
      else if (e.code === "ArrowLeft" || e.key === "j" || e.key === "J") { e.preventDefault(); skip(-10); }
      else if (e.code === "ArrowUp") { e.preventDefault(); handleVolume(volume + 0.1); }
      else if (e.code === "ArrowDown") { e.preventDefault(); handleVolume(volume - 0.1); }
      else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        const next = !isMuted;
        setIsMuted(next);
        if (isYouTube) { if (next) yt.mute(); else yt.unMute(); }
        else if (videoRef.current) videoRef.current.muted = next;
      } else if (e.key === "f" || e.key === "F") { e.preventDefault(); toggleFullscreen(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPlaying, isMuted, volume, duration]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => { if (isPlaying) setShowControls(false); }, 2500);
  };

  const fmt = (s: number) => isNaN(s) || !isFinite(s) ? "00:00" : `${Math.floor(s / 60).toString().padStart(2, "0")}:${Math.floor(s % 60).toString().padStart(2, "0")}`;

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} onContextMenu={(e) => e.preventDefault()} className="relative aspect-video bg-slate-950 overflow-hidden rounded-2xl group select-none font-sans">
      {isYouTube ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none scale-100 select-none"><div id={ytElementId} className="w-full h-full" /></div>
      ) : (
        <video ref={videoRef} key={videoUrl} src={videoUrl} onTimeUpdate={() => videoRef.current && setHtml5Time(videoRef.current.currentTime)} onLoadedMetadata={() => videoRef.current && setHtml5Duration(videoRef.current.duration)} onEnded={() => { setHtml5Playing(false); onEnded?.(); }} onError={() => setHtml5Playing(false)} className="w-full h-full object-contain pointer-events-none" playsInline preload="metadata" />
      )}
      {!isPlaying && currentTime === 0 && isYouTube && (
        <img src={posterErr ? `https://img.youtube.com/vi/${ytVideoId}/hqdefault.jpg` : `https://img.youtube.com/vi/${ytVideoId}/maxresdefault.jpg`} onError={() => setPosterErr(true)} alt={title} className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 brightness-95" />
      )}
      <div onClick={togglePlay} className="absolute inset-0 cursor-pointer z-15" />
      <div className={`absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent flex items-center justify-between text-white transition-opacity pointer-events-none z-20 ${showControls ? "opacity-100" : "opacity-0"}`}><span className="text-xs sm:text-sm font-bold text-white/95 drop-shadow-md truncate max-w-lg">{title}</span></div>
      {!isPlaying && (
        <button onClick={togglePlay} className="absolute inset-0 m-auto w-18 h-18 rounded-full bg-gradient-to-br from-[#0077b6] to-[#002b5b] hover:from-[#005a8c] hover:to-[#001830] text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all hover:scale-110 cursor-pointer border-2 border-white/80 z-20"><Play className="w-8 h-8 fill-white ml-1 text-white" /></button>
      )}
      <div className={`absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity space-y-2 z-20 ${showControls ? "opacity-100" : "opacity-0"}`}>
        <input type="range" min={0} max={duration || 100} step={0.1} value={currentTime} onChange={handleSeek} style={{ background: `linear-gradient(to right, #0077b6 0%, #0077b6 ${progressPct}%, rgba(255,255,255,0.2) ${progressPct}%, rgba(255,255,255,0.2) 100%)` }} className="w-full h-1.5 hover:h-2 rounded-lg appearance-none cursor-pointer accent-[#0077b6] transition-all" />
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={togglePlay} className="p-1 hover:text-sky-400 cursor-pointer">{isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}</button>
            <button onClick={() => skip(-10)} title="Rewind 10s" className="p-1 hover:text-sky-400 cursor-pointer"><RotateCcw className="w-3.5 h-3.5" /></button>
            <button onClick={() => skip(10)} title="Forward 10s" className="p-1 hover:text-sky-400 cursor-pointer"><RotateCw className="w-3.5 h-3.5" /></button>
            <span className="font-mono text-[11px] text-slate-300">{fmt(currentTime)} / {fmt(duration)}</span>
            <div className="hidden sm:flex items-center gap-1.5 pl-2">
              <button onClick={() => handleVolume(isMuted ? 1 : 0)} title="Mute (M)" className="hover:text-sky-400 cursor-pointer">{isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}</button>
              <input type="range" min={0} max={1} step={0.02} value={isMuted ? 0 : volume} onChange={(e) => handleVolume(Number(e.target.value))} style={{ background: `linear-gradient(to right, #0077b6 0%, #0077b6 ${volumePct}%, rgba(255,255,255,0.2) ${volumePct}%, rgba(255,255,255,0.2) 100%)` }} className="w-16 h-1 hover:h-1.5 rounded appearance-none cursor-pointer accent-[#0077b6] transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-slate-700 text-[11px] font-mono">
              {[1, 1.25, 1.5, 2].map((r) => (
                <button key={r} onClick={() => { setPlaybackRate(r); if (isYouTube) yt.setPlaybackRate(r); else if (videoRef.current) videoRef.current.playbackRate = r; }} className={`px-1.5 py-0.5 rounded cursor-pointer ${playbackRate === r ? "bg-[#0077b6] text-white font-bold" : "text-slate-400 hover:text-white"}`}>{r}x</button>
              ))}
            </div>
            <button onClick={toggleFullscreen} title="Fullscreen (F)" className="p-1 hover:text-sky-400 cursor-pointer">{isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
