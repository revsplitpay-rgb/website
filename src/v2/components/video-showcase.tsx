import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useRef, useState, type DetailedHTMLProps, type HTMLAttributes } from "react";
import { buttonClass } from "./ui";

// The explainer (1:15) is hosted on Wistia (owner, 2026-10-21). Wistia's
// scripts load only after the visitor presses play, so the page stays fast and
// nothing is requested from Wistia before the visitor chooses to watch.
const WISTIA_MEDIA_ID = "xyba3e68fp";
const WISTIA_ASPECT = "1.7777777777777777";
const VIDEO_LENGTH_LABEL = "1:15";
const POSTER = "/v2/video-poster.png";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        "media-id": string;
        aspect?: string;
        autoplay?: string;
      };
    }
  }
}

const WISTIA_SCRIPTS = [
  { src: "https://fast.wistia.com/player.js", module: false },
  { src: `https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`, module: true },
];

let wistiaLoading: Promise<void> | null = null;

/** Adds Wistia's player scripts once; a failed load can be retried. */
const loadWistia = () =>
  (wistiaLoading ??= Promise.all(
    WISTIA_SCRIPTS.map(
      ({ src, module }) =>
        new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          if (module) script.type = "module";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Could not load ${src}`));
          document.head.appendChild(script);
        }),
    ),
  )
    .then(() => undefined)
    .catch((error) => {
      wistiaLoading = null;
      throw error;
    }));

type VideoState = "idle" | "loading" | "ready" | "error";

const VideoShowcase = () => {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<VideoState>("idle");

  // Grows from 88% to full size as it scrolls into view.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 28]);
  const tilt = useTransform(scrollYProgress, [0, 1], [10, 0]);

  const play = () => {
    setState("loading");
    loadWistia()
      .then(() => setState("ready"))
      .catch(() => setState("error"));
  };

  return (
    <div className="relative" style={{ perspective: 1600 }}>
      <motion.div
        ref={frameRef}
        style={reduced ? undefined : { scale, borderRadius: radius, rotateX: tilt }}
        className="relative overflow-hidden rounded-[28px] bg-[rgb(var(--foreground))] p-1.5 shadow-[0_50px_100px_-40px_rgb(0_40_110/0.55)] ring-1 ring-[rgb(0_114_228/0.15)]"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-[22px] bg-black">
          {state === "idle" ? (
            <button
              type="button"
              onClick={play}
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
              <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-4 text-white sm:bottom-5 sm:left-5 sm:right-5 md:bottom-8 md:left-8 md:right-8">
                <span className="flex items-center gap-4 md:gap-5">
                  <span className="relative flex shrink-0 items-center justify-center">
                    <span className="v2-pulse-ring absolute h-11 w-11 rounded-full bg-white/40 sm:h-14 sm:w-14 md:h-20 md:w-20" />
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-[0_20px_40px_-12px_rgb(0_30_80/0.6)] transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 md:h-20 md:w-20">
                      <Play className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6 md:h-8 md:w-8" />
                    </span>
                  </span>
                  <span className="text-sm font-semibold sm:hidden">Watch · {VIDEO_LENGTH_LABEL}</span>
                  <span className="hidden sm:block">
                    <span className="block text-sm text-white/75">Product overview</span>
                    <span className="mt-0.5 block text-lg font-semibold tracking-tight md:text-2xl">How RevSplitPay pays your whole team</span>
                  </span>
                </span>
                <span className="hidden rounded-full bg-white/15 px-3 py-1 font-mono text-sm sm:block">{VIDEO_LENGTH_LABEL}</span>
              </span>
            </button>
          ) : state === "error" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[rgb(0_20_60/0.85)] p-6 text-center">
              <p className="text-white" role="alert">
                The video couldn't load. A browser extension may be blocking it.
              </p>
              <button type="button" onClick={play} className={buttonClass("secondary")}>
                Try again
              </button>
            </div>
          ) : (
            <>
              {/* Poster stays underneath until Wistia's player paints over it. */}
              <img src={POSTER} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
              {state === "loading" && (
                <p className="absolute inset-x-0 bottom-6 text-center text-sm text-white" aria-live="polite">
                  Loading video…
                </p>
              )}
              <div className="absolute inset-0">
                <wistia-player media-id={WISTIA_MEDIA_ID} aspect={WISTIA_ASPECT} autoplay="true" className="block h-full w-full" />
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VideoShowcase;
