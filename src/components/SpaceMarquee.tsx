"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { assetUrl } from "@/lib/asset";

const IMAGES = [
  assetUrl("/the%20space/01.jpg"),
  assetUrl("/the%20space/43f383b09e9d2766d9b3b9bb64425a06.jpg"),
  assetUrl("/the%20space/55b1db0a67affd185896fd47c56359a0.jpg"),
  assetUrl("/the%20space/0891f9bc0a60be5edb21cf3bcacad989.jpg"),
  assetUrl("/the%20space/18334a9f073c6f22ee6662e969e83573.jpg"),
  assetUrl("/the%20space/1dada97c9cae23d569df47d1a2432652.jpg"),
];

const TRACK = [...IMAGES, ...IMAGES];
const CARD_W = 280;
const GAP = 12;
const UNIT = CARD_W + GAP;

export default function SpaceMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = UNIT * IMAGES.length;

    tweenRef.current = gsap.to(xRef, {
      current: -totalWidth,
      duration: 28,
      ease: "none",
      repeat: -1,
      onUpdate() {
        if (track) track.style.transform = `translateX(${xRef.current}px)`;
      },
    });

    return () => { tweenRef.current?.kill(); };
  }, []);

  function pause() { tweenRef.current?.pause(); }
  function resume() { tweenRef.current?.resume(); }

  return (
    <section className="py-20 reveal-3d" style={{ background: "var(--color-ivory)", overflow: "hidden" }}>
      <div className="text-center mb-12 px-6">
        <h2
          className="text-3xl md:text-5xl mb-3"
          style={{ color: "#1a1208", fontFamily: "var(--font-serif)", fontWeight: 400 }}
        >
          The Space
        </h2>
        <p
          className="text-sm"
          style={{ color: "#7a6e60", fontFamily: "var(--font-sans)" }}
        >
          A setting designed with soft tones, layered lighting, and thoughtful details
        </p>
      </div>

      <div
        onMouseEnter={pause}
        onMouseLeave={resume}
        style={{ cursor: "grab", userSelect: "none" }}
      >
        <div
          ref={trackRef}
          className="flex space-marquee-track"
          style={{ gap: `${GAP}px`, willChange: "transform" }}
        >
          {TRACK.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 overflow-hidden space-card"
              style={{
                width: `${CARD_W}px`,
                height: "340px",
                borderRadius: "6px",
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                  display: "block",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
