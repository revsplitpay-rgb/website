const RevSplitPayMiniCard = ({ className = "" }: { className?: string }) => (
  <div className={`group/card relative aspect-[240/154] w-full max-w-[340px] [perspective:1000px] ${className}`}>
    <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-2xl transition-opacity duration-500 group-hover/card:opacity-80" />
    <div className="relative h-full w-full rounded-2xl border border-sky-300/30 bg-[linear-gradient(135deg,#004a9f_0%,#0072e4_48%,#3fc1ff_100%)] p-5 text-white shadow-2xl shadow-primary/30 transition-transform duration-700 [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_72%_28%,rgba(255,255,255,0.25),transparent_26%)]" />
      <div className="relative flex h-full flex-col justify-between [backface-visibility:hidden]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-base font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-primary">R</span>
            RevSplitPay
          </div>
          <span className="rounded-lg border border-white/30 bg-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.2em]">Example</span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/70">Total Revenue</p>
          <p className="text-4xl font-semibold leading-none">$5,864</p>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-[#101318] p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
        <div className="h-8 rounded bg-black/70" />
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-white/70" />
          <div className="h-5 w-20 rounded bg-white text-right text-xs leading-5 text-black">***</div>
        </div>
      </div>
    </div>
  </div>
)

export default RevSplitPayMiniCard
