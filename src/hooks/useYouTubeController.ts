"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function extractYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const str = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
  const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYT(cb: () => void) {
  if (typeof window === "undefined") return;
  if (window.YT?.Player) { cb(); return; }
  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => { prev?.(); cb(); };
  if (!document.getElementById("yt-script")) {
    const t = document.createElement("script");
    t.id = "yt-script";
    t.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(t);
  }
}

export function useYouTubeController(elementId: string, videoId: string | null, onEnded?: () => void) {
  const playerRef = useRef<any>(null);
  const isSeekingUntilRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Reset state immediately on video switch
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    isSeekingUntilRef.current = 0;
  }, [videoId]);

  useEffect(() => {
    if (!videoId || typeof window === "undefined") return;
    loadYT(() => {
      if (playerRef.current) {
        playerRef.current.cueVideoById?.(videoId);
        return;
      }
      playerRef.current = new window.YT.Player(elementId, {
        videoId,
        playerVars: {
          controls: 0, modestbranding: 1, rel: 0, showinfo: 0,
          disablekb: 1, fs: 0, iv_load_policy: 3, playsinline: 1,
          cc_load_policy: 0, origin: typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onReady: (e: any) => { setIsReady(true); setDuration(e.target.getDuration() || 0); },
          onStateChange: (e: any) => {
            if (e.data === 1) setIsPlaying(true);
            else if (e.data === 2) setIsPlaying(false);
            else if (e.data === 0) { setIsPlaying(false); onEnded?.(); }
          },
        },
      });
    });

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
        setIsReady(false);
      }
    };
  }, [videoId, elementId, onEnded]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (Date.now() < isSeekingUntilRef.current) return;
      if (playerRef.current?.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime() || 0);
        const d = playerRef.current.getDuration() || 0;
        if (d > 0) setDuration(d);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const play = useCallback(() => { playerRef.current?.playVideo?.(); setIsPlaying(true); }, []);
  const pause = useCallback(() => { playerRef.current?.pauseVideo?.(); setIsPlaying(false); }, []);

  const seekTo = useCallback((sec: number) => {
    if (!playerRef.current) return;
    isSeekingUntilRef.current = Date.now() + 450;
    setCurrentTime(sec);
    playerRef.current.seekTo?.(sec, true);
  }, []);

  const skip = useCallback((sec: number) => {
    if (!playerRef.current) return;
    const cur = typeof playerRef.current.getCurrentTime === "function" ? (playerRef.current.getCurrentTime() || 0) : 0;
    const dur = typeof playerRef.current.getDuration === "function" ? (playerRef.current.getDuration() || 0) : 0;
    const target = Math.max(0, Math.min(dur || 999999, cur + sec));
    isSeekingUntilRef.current = Date.now() + 450;
    setCurrentTime(target);
    playerRef.current.seekTo?.(target, true);
  }, []);

  const setVolume = useCallback((vol: number) => { playerRef.current?.setVolume?.(vol * 100); }, []);
  const mute = useCallback(() => { playerRef.current?.mute?.(); }, []);
  const unMute = useCallback(() => { playerRef.current?.unMute?.(); }, []);
  const setPlaybackRate = useCallback((rate: number) => { playerRef.current?.setPlaybackRate?.(rate); }, []);

  return { isReady, isPlaying, currentTime, duration, play, pause, seekTo, skip, setVolume, mute, unMute, setPlaybackRate };
}
