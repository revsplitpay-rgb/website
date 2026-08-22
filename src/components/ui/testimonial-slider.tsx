import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"

interface Testimonial {
    id: number
    title: string
    quote: string
    author: string
    image: string
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        title: "Finally Found the Solution",
        quote:
            "I used to dread checking my accounts, but AI budgeting tools gave me a clear picture of my spending within days. Now I actually look forward to managing my money.",
        author: "James Arthur",
        image: "/images/home/testimonial-1.webp",
    },
    {
        id: 2,
        title: "Game Changer for My Business",
        quote:
            "The insights provided by this platform have completely transformed how we approach our monthly financial planning. It's intuitive, powerful, and essential.",
        author: "Sarah Chen",
        image: "/images/home/testimonial-2.webp",
    },
    {
        id: 3,
        title: "Simplified My Life",
        quote:
            "I never thought managing multiple streams of income could be this simple. The automation handles the heavy lifting, leaving me to focus on what I love.",
        author: "Elena Rodriguez",
        image: "/images/home/testimonial-3.webp",
    },
    {
        id: 4,
        title: "Total Peace of Mind",
        quote:
            "Knowing that my finances are being monitored by such a sophisticated AI gives me peace of mind I haven't had in years. Highly recommended for everyone.",
        author: "Michael Ross",
        image: "/images/home/testimonial-4.webp",
    },
]

const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [direction, setDirection] = React.useState(0)

    const next = () => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prev = () => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <div className="w-full max-w-6xl mx-auto overflow-hidden">

            <div className="relative md:h-[450px] h-[500px] flex items-center pb-20">
                <div className="flex gap-6 items-center w-full relative">
                    {/* Active Testimonial Card */}
                    <motion.div
                        layout
                        key={`active-${testimonials[currentIndex].id}`}
                        className="flex-shrink-0 flex flex-col md:flex-row items-center gap-12 w-full md:w-[70%] z-20 h-80"
                        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className="relative md:w-80 md:h-80 h-64 w-64 flex-shrink-0 overflow-hidden rounded-2xl">
                            <img
                                src={testimonials[currentIndex].image || "/images/common/placeholder.svg"}
                                alt={testimonials[currentIndex].author}
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-between h-full max-w-md text-center md:text-left">
                            <div>
                                <h3 className="h4 mb-4">{testimonials[currentIndex].title}</h3>
                                <p className="text-lg font-medium text-muted-foreground mb-2">"{testimonials[currentIndex].quote}"</p>
                            </div>
                            <p className="text-muted-foreground">{testimonials[currentIndex].author}</p>
                        </div>
                    </motion.div>

                    {/* Next Testimonial Cards (Preview) with Overlapping Transition */}
                    <div className="hidden md:flex gap-6 flex-1 relative h-80">
                        {testimonials.map((_, i) => {
                            const index = (currentIndex + i + 1) % testimonials.length
                            if (i >= 2) return null

                            return (
                                <motion.div
                                    key={`preview-${testimonials[index].id}`}
                                    layout
                                    className="flex-shrink-0 w-64 h-80 flex items-center relative rounded-2xl overflow-hidden grayscale opacity-40 hover:opacity-60 transition-opacity"
                                    initial={{ opacity: 0, x: direction > 0 ? 150 : -150 }}
                                    animate={{ opacity: 0.4, x: 0 }}
                                    exit={{ opacity: 0, x: direction > 0 ? -150 : 150 }}
                                    transition={{
                                        type: "spring",
                                        damping: 30,
                                        stiffness: 250,
                                        delay: i * 0.05, // Staggered transition for overlapping effect
                                    }}
                                >
                                    <img
                                        src={testimonials[index].image || "/images/common/placeholder.svg"}
                                        alt={testimonials[index].author}
                                        className="object-cover"
                                    />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col-reverse md:flex-row items-center md:justify-between justify-center gap-4 md:gap-0 md:mt-12 mt-20">
                <div className="flex gap-4">
                    <button
                        onClick={prev}
                        className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition-colors group"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                    </button>
                    <button
                        onClick={next}
                        className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition-colors group"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                    </button>
                </div>

                <div className="text-zinc-500 font-medium tabular-nums">
                    <span className="text-white">{currentIndex + 1}</span>
                    <span className="mx-1">/</span>
                    <span>{testimonials.length}</span>
                </div>
            </div>
        </div>
    )
}

export default TestimonialSlider
