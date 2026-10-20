import { APP_SIGNUP_URL } from "@/lib/links";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import explainerVideo from "../../../video-explain.mp4";
import { buttonClass } from "./ui";

// The explainer file (video-explain.mp4) runs 0:23. The <video> only mounts
// after the visitor presses play, so nothing downloads before that.
const VIDEO_LENGTH_LABEL = "0:23";
const POSTER = "/v2/video-poster.png";

type VideoState = "idle" | "loading" | "playing" | "ended" | "error";

const VideoShowcase = () => {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<VideoState>("idle");
  const [attempt, setAttempt] = useState(0);

  // Grows from 88% to full size as it scrolls into view.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 28]);
  const tilt = useTransform(scrollYProgress, [0, 1], [10, 0]);

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play();
    setState("playing");
  };

  return (
    <div className="relative" style={{ perspective: 1600 }}>
      <motion.div
        ref={frameRef}
        style={reduced ? undefined : { scale, borderRadius: radius, rotateX: tilt }}
        className="relative overflow-hidden rounded-[28px] bg-[rgb(var(--foreground))] p-1.5 shadow-[0_50px_100px_-40px_rgb(0_40_110/0.55)] ring-1 ring-[rgb(0_114_228/0.15)]"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-[22px]">
          {state === "idle" ? (
            <button
              type="button"
              onClick={() => setState("loading")}
              className="group absolute inset-0 h-full w-full text-left"
              aria-label={`Play the RevSplitPay overview video, ${VIDEO_LENGTH_LABEL}`}
            >
              <img
                src={POSTER}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_20_60/0.05)_30%,rgb(0_20_60/0.65)_100%)]" />
              <span className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 text-white md:bottom-8 md:left-8 md:right-8">
                <span className="flex items-center gap-4 md:gap-5">
                  <span className="relative flex shrink-0 items-center justify-center">
                    <span className="v2-pulse-ring absolute h-14 w-14 rounded-full bg-white/40 md:h-20 md:w-20" />
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-[0_20px_40px_-12px_rgb(0_30_80/0.6)] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                      <Play className="ml-1 h-6 w-6 fill-current md:h-8 md:w-8" />
                    </span>
                  </span>
                  <span>
                    <span className="block text-sm text-white/75">Product overview</span>
                    <span className="mt-0.5 block text-base font-semibold tracking-tight sm:text-lg md:text-2xl">How RevSplitPay pays your whole team</span>
                  </span>
                </span>
                <span className="hidden rounded-full bg-white/15 px-3 py-1 font-mono text-sm sm:block">{VIDEO_LENGTH_LABEL}</span>
              </span>
            </button>
          ) : (
            <>
              <video
                key={attempt}
                ref={videoRef}
                className="h-full w-full bg-black"
                src={explainerVideo}
                poster={POSTER}
                controls
                autoPlay
                playsInline
                preload="auto"
                onPlaying={() => setState("playing")}
                onEnded={() => setState("ended")}
                onError={() => setState("error")}
              />
              {state === "loading" && (
                <p className="pointer-events-none absolute inset-x-0 bottom-16 text-center text-sm text-white" aria-live="polite">
                  Loading video…
                </p>
              )}
              {state === "ended" && (
                <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 bg-[rgb(0_20_60/0.7)]">
                  <button type="button" onClick={replay} className={buttonClass("secondary")}>
                    <RotateCcw /> Replay
                  </button>
                  <a href={APP_SIGNUP_URL} className={buttonClass("primary")}>
                    Get started
                  </a>
                </div>
              )}
              {state === "error" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[rgb(0_20_60/0.8)] p-6 text-center">
                  <p className="text-white" role="alert">
                    The video couldn't load.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setState("loading");
                      setAttempt((n) => n + 1);
                    }}
                    className={buttonClass("secondary")}
                  >
                    Try again
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VideoShowcase;
