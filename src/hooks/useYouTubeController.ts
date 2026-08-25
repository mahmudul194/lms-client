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

export function useYouTubeController(elementId: string, videoId: string | null, onEnded?: () => void) {
  const playerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load YouTube IFrame API Script
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Initialize or update player
  useEffect(() => {
    if (!videoId || typeof window === "undefined") return;

    const init = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) {
        playerRef.current.loadVideoById?.(videoId);
        return;
      }

      playerRef.current = new window.YT.Player(elementId, {
        videoId,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          playsinline: 1,
          cc_load_policy: 0,
          origin: typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onReady: (e: any) => {
            setIsReady(true);
            setDuration(e.target.getDuration() || 0);
          },
          onStateChange: (e: any) => {
            if (e.data === 1) setIsPlaying(true); // Playing
            else if (e.data === 2) setIsPlaying(false); // Paused
            else if (e.data === 0) { // Ended
              setIsPlaying(false);
              onEnded?.();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) init();
    else window.onYouTubeIframeAPIReady = init;

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
        setIsReady(false);
      }
    };
  }, [videoId, elementId, onEnded]);

  // Sync current time and duration
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime() || 0);
        setDuration(playerRef.current.getDuration() || 0);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const play = useCallback(() => { playerRef.current?.playVideo?.(); setIsPlaying(true); }, []);
  const pause = useCallback(() => { playerRef.current?.pauseVideo?.(); setIsPlaying(false); }, []);
  const seekTo = useCallback((sec: number) => { playerRef.current?.seekTo?.(sec, true); setCurrentTime(sec); }, []);
  const setVolume = useCallback((vol: number) => { playerRef.current?.setVolume?.(vol * 100); }, []);
  const mute = useCallback(() => { playerRef.current?.mute?.(); }, []);
  const unMute = useCallback(() => { playerRef.current?.unMute?.(); }, []);
  const setPlaybackRate = useCallback((rate: number) => { playerRef.current?.setPlaybackRate?.(rate); }, []);

  return { isReady, isPlaying, currentTime, duration, play, pause, seekTo, setVolume, mute, unMute, setPlaybackRate };
}
