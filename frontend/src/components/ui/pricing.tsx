"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom"; // Changed from 'next/link' to 'react-router-dom'
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container py-20 px-4 mx-auto">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl display-font font-black uppercase">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-center mb-12">
        <div className="bg-black/5 p-1 rounded-full border border-black/[0.03] flex items-center ring-1 ring-black/[0.02]">
          <div className="relative flex items-center">
            <motion.div 
              className="absolute h-full bg-[#111111] rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-0"
              animate={{ 
                x: !isMonthly ? 110 : 0,
                width: !isMonthly ? 130 : 110
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button 
              onClick={() => setIsMonthly(true)}
              className={`relative z-10 w-[110px] py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isMonthly ? 'text-white' : 'text-black/40 hover:text-black/60'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsMonthly(false)}
              className={`relative z-10 w-[130px] py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${!isMonthly ? 'text-white' : 'text-black/40 hover:text-black/60'}`}
            >
              Annually 
              <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${!isMonthly ? 'bg-accent text-accent-foreground' : 'bg-black/10 text-black/40'}`}>-10%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -10 : index === 0 ? 10 : 0,
                    scale: index === 0 || index === 2 ? 0.96 : 1.0,
                  }
                : { y: 0, opacity: 1 }
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              type: "spring",
              stiffness: 80,
              damping: 25,
              delay: index * 0.1,
            }}
            className={cn(
              `rounded-2xl border-[1px] p-8 bg-background relative flex flex-col transition-all duration-300`,
              plan.isPopular ? "border-accent ring-2 ring-accent/20 z-10" : "border-border shadow-sm",
              !plan.isPopular && "mt-0 md:mt-5",
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent py-1 px-4 rounded-full flex items-center shadow-lg">
                <Star className="text-accent-foreground h-4 w-4 fill-current" />
                <span className="text-accent-foreground ml-1 font-sans font-bold text-xs uppercase">
                  Popular Choice
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-xl font-black text-foreground uppercase tracking-widest display-font">
                {plan.name}
              </p>
              <div className="mt-6 flex items-baseline justify-center gap-x-1">
                <span className="text-6xl font-black tracking-tighter text-foreground display-font">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{
                      duration: 800,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>
                <span className="text-sm font-bold leading-6 tracking-wide text-muted-foreground uppercase">
                  / {plan.period}
                </span>
              </div>

              <p className="text-xs font-medium text-muted-foreground mt-2 uppercase">
                {isMonthly ? "billed monthly" : "billed annually"}
              </p>

              <div className="mt-8 flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-foreground/80 text-sm font-medium leading-tight text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 border-t border-border pt-8">
                <Link
                  to={plan.href}
                  className={cn(
                    buttonVariants({
                      variant: plan.isPopular ? "default" : "outline",
                      size: "lg"
                    }),
                    "group relative w-full gap-2 overflow-hidden text-sm font-black uppercase tracking-widest rounded-full transition-all duration-300",
                    plan.isPopular 
                      ? "bg-accent text-accent-foreground hover:scale-[1.02] shadow-[0_10px_30px_rgba(212,255,63,0.3)]" 
                      : "border-2 border-foreground hover:bg-foreground hover:text-background"
                  )}
                >
                  {plan.buttonText}
                </Link>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
