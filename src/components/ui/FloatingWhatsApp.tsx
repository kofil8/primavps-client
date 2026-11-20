"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [isInHero, setIsInHero] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let cancelled = false;

    const setupObserver = () => {
      const heroEl = document.getElementById("hero");
      if (!heroEl) {
        setIsInHero(false);
        return;
      }

      // Check current scroll position
      const rect = heroEl.getBoundingClientRect();
      const inHeroNow = rect.bottom > 80 && rect.top < window.innerHeight;
      setIsInHero(inHeroNow);

      observer = new IntersectionObserver(
        (entries) => {
          if (cancelled) return;
          const [entry] = entries;
          setIsInHero(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0.05,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(heroEl);
    };

    const frameId = requestAnimationFrame(setupObserver);

    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (!heroEl) {
        setIsInHero(false);
        return;
      }
      const rect = heroEl.getBoundingClientRect();
      setIsInHero(rect.bottom > 80 && rect.top < window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return (
    <aside
      aria-label="Direct support on WhatsApp"
      className={`fixed bottom-6 left-4 z-40 flex items-center group lg:hidden transition-opacity duration-200 ${
        isInHero
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="https://wa.me/8801960677463?text=Hello%20primevpsbd,%20I%20need%20more%20information%20about%20your%20VPS%20plans"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-full bg-emerald-600 pl-3.5 pr-4 py-2.5 text-white shadow-xl shadow-emerald-900/20 ring-4 ring-emerald-500/20 transition-all duration-300 hover:bg-emerald-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-600/30 active:scale-95"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
        </span>

        <MessageCircle size={20} className="fill-white/20" />

        <div className="flex flex-col text-left">
          <span className="text-xs font-bold leading-tight tracking-tight">
            ঢাকা টিমের সাথে কথা বলুন
          </span>
          <span className="text-[10px] font-medium text-emerald-100 opacity-90 leading-tight">
            WhatsApp · Reply in 3 min
          </span>
        </div>
      </a>
    </aside>
  );
}
