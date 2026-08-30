"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function extractYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const str = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
  const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

export interface YTPlayer {
  playVideo?: () => void;
  pauseVideo?: () => void;
  seekTo?: (seconds: number, allowSeekAhead?: boolean) => void;
  setVolume?: (volume: number) => void;
  mute?: () => void;
  unMute?: () => void;
  setPlaybackRate?: (rate: number) => void;
  getDuration?: () => number;
  getCurrentTime?: () => number;
  cueVideoById?: (videoId: string) => void;
  loadVideoById?: (videoId: string) => void;
  destroy?: () => void;
}

interface YTEvent {
  target: YTPlayer;
  data: number;
}

declare global {
  interface Window {
    YT?: {
      Player: new (elementId: string, options: unknown) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYT(cb: () => void) {
  if (typeof window === "undefined") return;
  if (window.YT?.Player) { cb(); return; }
  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => { try { prev?.(); } catch {} cb(); };
  if (!document.getElementById("yt-script")) {
    const t = document.createElement("script");
    t.id = "yt-script";
    t.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(t);
  }
}

export function useYouTubeController(elementId: string, videoId: string | null, onEnded?: () => void) {
  const playerRef = useRef<YTPlayer | null>(null);
  const isSeekingUntilRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Synchronize state on videoId switch without cascading renders
  const [prevVideoId, setPrevVideoId] = useState(videoId);
  if (prevVideoId !== videoId) {
    setPrevVideoId(videoId);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }

  useEffect(() => {
    isSeekingUntilRef.current = 0;
    if (!videoId || typeof window === "undefined") return;
    loadYT(() => {
      if (playerRef.current && typeof playerRef.current.cueVideoById === "function") {
        try { playerRef.current.cueVideoById(videoId); } catch {}
        return;
      }
      try {
        playerRef.current = new window.YT!.Player(elementId, {
          videoId,
          playerVars: {
            controls: 0, modestbranding: 1, rel: 0, showinfo: 0,
            disablekb: 1, fs: 0, iv_load_policy: 3, playsinline: 1,
            cc_load_policy: 0, origin: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: (e: YTEvent) => {
              setIsReady(true);
              try { setDuration(e.target.getDuration?.() || 0); } catch {}
            },
            onStateChange: (e: YTEvent) => {
              if (e.data === 1) setIsPlaying(true);
              else if (e.data === 2) setIsPlaying(false);
              else if (e.data === 0) { setIsPlaying(false); onEnded?.(); }
            },
          },
        });
      } catch {}
    });

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy?.(); } catch {}
        playerRef.current = null;
        setIsReady(false);
      }
    };
  }, [videoId, elementId, onEnded]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (playerRef.current && Date.now() > isSeekingUntilRef.current) {
        try {
          const t = playerRef.current.getCurrentTime?.() || 0;
          setCurrentTime(t);
        } catch {}
      }
    }, 250);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const play = useCallback(() => { try { playerRef.current?.playVideo?.(); } catch {} }, []);
  const pause = useCallback(() => { try { playerRef.current?.pauseVideo?.(); } catch {} }, []);
  const seekTo = useCallback((sec: number) => {
    try {
      setCurrentTime(sec);
      isSeekingUntilRef.current = Date.now() + 600;
      playerRef.current?.seekTo?.(sec, true);
    } catch {}
  }, []);
  const setVolume = useCallback((v: number) => { try { playerRef.current?.setVolume?.(v * 100); } catch {} }, []);
  const mute = useCallback(() => { try { playerRef.current?.mute?.(); } catch {} }, []);
  const unMute = useCallback(() => { try { playerRef.current?.unMute?.(); } catch {} }, []);
  const setPlaybackRate = useCallback((r: number) => { try { playerRef.current?.setPlaybackRate?.(r); } catch {} }, []);
  const skip = useCallback((delta: number) => {
    try {
      const cur = playerRef.current?.getCurrentTime?.() || 0;
      const dur = duration || 9999;
      const next = Math.max(0, Math.min(dur, cur + delta));
      seekTo(next);
    } catch {}
  }, [duration, seekTo]);

  return { isReady, isPlaying, currentTime, duration, play, pause, seekTo, setVolume, mute, unMute, setPlaybackRate, skip };
}
