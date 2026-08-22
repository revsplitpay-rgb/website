import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  pricePeriod: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  isHighlighted?: boolean;
  backgroundImage?: string;
  /** Tightens type and spacing so four cards fit one row. Off by default,
   *  so existing 2-up usages render exactly as before. */
  compact?: boolean;
}

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      title,
      description,
      price,
      pricePeriod,
      features,
      buttonText,
      buttonLink,
      isHighlighted = false,
      backgroundImage,
      compact = false,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "flex flex-col h-full relative overflow-hidden bg-card border-white/10",
          compact && isHighlighted && "border-[#3FC1FF]/35 shadow-[0_0_0_1px_rgba(63,193,255,0.18),0_18px_50px_-20px_rgba(0,114,228,0.55)]"
        )}
        style={
          backgroundImage
            ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
            : undefined
        }
        {...props}
      >
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
            <img src={backgroundImage} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="relative z-10 flex flex-col h-full">
          <CardHeader className={cn(compact ? "p-5 pb-3" : "p-6")}>
            <CardTitle className={cn(compact ? "text-2xl font-medium tracking-tight mb-1.5" : "h2 mb-2")}>
              {title}
            </CardTitle>
            <CardDescription className={cn(compact ? "text-sm text-muted-foreground min-h-[40px]" : "text-lg text-foreground max-w-[400px]")}>
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className={cn("flex-1", compact ? "space-y-5 px-5" : "space-y-8")}>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className={cn(compact ? "text-[2.25rem] leading-none font-medium tracking-tight" : "h1")}>{price}</span>
                <span className={cn(compact ? "text-sm text-muted-foreground" : "text-lg text-muted-foreground")}>
                  {pricePeriod}
                </span>
              </div>
            </div>
            <div className="h-px bg-white/10" />
            <div className="space-y-4">
              <h4 className={cn(compact ? "text-sm font-medium text-foreground" : "text-lg font-medium text-foreground")}>
                What You Get
              </h4>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className={cn("flex items-start", compact ? "gap-2.5" : "gap-3")}>
                    <svg
                      width={compact ? 18 : 24}
                      height={compact ? 18 : 24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-0.5 flex-shrink-0"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="23"
                        height="23"
                        rx="11.5"
                        stroke="white"
                        strokeOpacity="0.1"
                      />
                      <path
                        d="M14.6673 10L11.0007 13.6667L9.33398 12"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={cn(compact ? "text-[13px] leading-snug text-white/75" : "text-lg text-white/80")}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className={cn(compact && "px-5 pb-5")}>
            <Button
              className="w-full"
              variant={isHighlighted ? "pricing" : "outline"}
              asChild
            >
              <Link to={buttonLink}>
                {buttonText}
              </Link>
            </Button>
          </CardFooter>
        </div>
      </Card>
    );
  }
);

PricingCard.displayName = "PricingCard";

export { PricingCard };

