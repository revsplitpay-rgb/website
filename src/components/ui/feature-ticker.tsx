import { cn } from "@/lib/utils"
import { motion, useAnimationFrame, useMotionValue } from "framer-motion"
import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"

interface InfiniteTickerProps {
    children: React.ReactNode[]
    speed?: number
    className?: string
    pauseOnHover?: boolean
    align?: "center" | "start" | "end"
    gap?: string
}

const FeatureTicker = ({
    children,
    speed = 50,
    className,
    pauseOnHover = true,
    align = "center",
    gap = "6" }:
    InfiniteTickerProps) => {
    const [containerWidth, setContainerWidth] = useState(0)
    const [contentWidth, setContentWidth] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        const measure = () => {
            if (containerRef.current && contentRef.current) {
                setContainerWidth(containerRef.current.offsetWidth)
                setContentWidth(contentRef.current.scrollWidth)
            }
        }

        measure()

        const resizeObserver = new ResizeObserver(measure)
        if (containerRef.current) resizeObserver.observe(containerRef.current)
        if (contentRef.current) resizeObserver.observe(contentRef.current)

        return () => resizeObserver.disconnect()
    }, [children])

    useAnimationFrame((t, delta) => {
        if (isPaused || contentWidth === 0) return

        const moveBy = (speed * delta) / 1000
        let newX = x.get() - moveBy

        if (newX <= -contentWidth) {
            newX = newX % contentWidth
        }

        x.set(newX)
    })

    const clonesNeeded = useMemo(
        () => contentWidth > 0 ? Math.max(3, Math.ceil(containerWidth / contentWidth) + 3) : 3,
        [containerWidth, contentWidth]
    )

    return (
        <div
            ref={containerRef}
            className={cn("relative overflow-hidden whitespace-nowrap", className)}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            <motion.div style={{ x }} className={cn(`flex w-max items-end gap-${gap} md:py-10 py-6`, align === "center" && "justify-center", align === "start" && "justify-start", align === "end" && "justify-end")}>
                <div ref={contentRef} className={cn(`flex items-end gap-${gap} shrink-0`)}>
                    {children}
                </div>
                {/* Render clones */}
                {Array.from({ length: clonesNeeded }).map((_, i) => (
                    <div key={i} className={cn(`flex items-end gap-${gap} shrink-0`)} aria-hidden="true">
                        {children}
                    </div>
                ))}
            </motion.div>

            {/* Gradient masks for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
    )
}

export default FeatureTicker
