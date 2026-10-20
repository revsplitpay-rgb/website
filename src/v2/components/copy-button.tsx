import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

/**
 * Copies `value`. Shows "Copied" for 2 seconds and announces it; if the
 * clipboard is blocked, it selects the visible text so it can be copied by hand.
 */
const CopyButton = ({
  value,
  label,
  className,
  showValue = true,
}: {
  value: string;
  label: string;
  className?: string;
  showValue?: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const node = textRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-3", className)}>
      <span
        ref={textRef}
        className={
          showValue
            ? "rounded-[10px] border border-dashed border-[rgb(0_114_228/0.45)] bg-[rgb(0_114_228/0.06)] px-3 py-1.5 font-mono text-[0.9375rem] font-semibold tracking-wider text-[rgb(var(--v2-deep))]"
            : "sr-only"
        }
      >
        {value}
      </span>
      <button
        type="button"
        onClick={copy}
        className="v2-btn-secondary inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-foreground"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : label}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </span>
  );
};

export default CopyButton;
