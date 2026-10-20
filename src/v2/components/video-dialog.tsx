import { APP_SIGNUP_URL } from "@/lib/links";
import * as Dialog from "@radix-ui/react-dialog";
import { Play, RotateCcw, X } from "lucide-react";
import { useRef, useState } from "react";
import explainerVideo from "../../../video-explain.mp4";
import { buttonClass } from "./ui";

// The explainer is 1 minute long (owner, 2026-10-19). The <video> element only
// mounts when the dialog opens, so nothing downloads until the visitor clicks.
const VIDEO_LENGTH_LABEL = "1 min";
const POSTER = "/v2/video-poster.png";

type VideoState = "loading" | "playing" | "ended" | "error";

const VideoDialog = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<VideoState>("loading");
  const [attempt, setAttempt] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) setState("loading");
  };

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play();
    setState("playing");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="group inline-flex min-h-11 items-center gap-3 text-[0.9375rem] font-medium text-foreground"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-input bg-background transition-colors duration-150 group-hover:border-primary group-hover:text-primary">
            <Play className="ml-0.5 h-4 w-4" />
          </span>
          Watch the overview · {VIDEO_LENGTH_LABEL}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/60 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-foreground v2-raised data-[state=open]:animate-in data-[state=open]:fade-in-0">
          <Dialog.Title className="sr-only">RevSplitPay overview video</Dialog.Title>
          <Dialog.Description className="sr-only">A one-minute overview of how RevSplitPay splits and pays commissions.</Dialog.Description>
          <div className="relative aspect-video w-full">
            <video
              key={attempt}
              ref={videoRef}
              className="h-full w-full"
              src={explainerVideo}
              poster={POSTER}
              controls
              autoPlay
              playsInline
              preload="auto"
              onPlaying={() => setState("playing")}
              onEnded={() => setState("ended")}
              onError={() => setState("error")}
              onStalled={() => setState((current) => (current === "loading" ? "error" : current))}
            />
            {state === "loading" && (
              <p className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-sm text-background" aria-live="polite">
                Loading video…
              </p>
            )}
            {state === "ended" && (
              <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 bg-foreground/70">
                <button type="button" onClick={replay} className={buttonClass("secondary")}>
                  <RotateCcw /> Replay
                </button>
                <a href={APP_SIGNUP_URL} className={buttonClass("primary")}>
                  Get started
                </a>
              </div>
            )}
            {state === "error" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-foreground/80 p-6 text-center">
                <p className="text-background" role="alert">
                  Video couldn't load.
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
          </div>
          <Dialog.Close
            className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-md bg-foreground/60 text-background hover:bg-foreground/80"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default VideoDialog;
