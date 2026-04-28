import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { GameEntry } from "../../types/game";

interface GameCardProps {
  game: GameEntry;
  index: number;
  onClick: (game: GameEntry) => void;
}

const STATUS_LABEL: Record<string, string> = {
  completed: "Completed",
  playing: "Playing",
  dropped: "Dropped",
};

export function GameCard({ game, index, onClick }: GameCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [hovered, setHovered] = useState(false);

  const isHighRating = game.rating >= 9;

  return (
    <motion.div
      ref={ref}
      onClick={() => onClick(game)}
      onHoverStart={() => !reduced && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(game)}
      className="relative cursor-pointer"
      style={{
        display: "flex",
        gap: "clamp(1.5rem, 3vw, 2.5rem)",
        alignItems: "flex-start",
        paddingTop: "52px",
        paddingBottom: "52px",
        borderBottom: "1px solid rgba(39,39,42,0.5)",
      }}
      initial={reduced ? {} : { opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : reduced ? {} : { opacity: 0, y: 12 }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : (index % 6) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}>
      <motion.div className="absolute inset-0 pointer-events-none rounded-xl" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }} style={{ background: "rgba(255,255,255,0.025)" }} />

      <div className="relative flex-shrink-0 self-start" style={{ width: "clamp(100px, 12vw, 180px)" }}>
        <motion.img
          src={game.cover}
          alt={game.title}
          className="w-full object-cover rounded-xl"
          animate={{
            scale: hovered && !reduced ? 1.04 : 1,
            boxShadow: hovered && !reduced ? "0 12px 40px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.2)" : "0 8px 24px rgba(0,0,0,0.4)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        />
        <div className="absolute left-0 right-0 overflow-hidden pointer-events-none" style={{ top: "100%", height: "48px" }}>
          <img
            src={game.cover}
            alt=""
            aria-hidden
            className="w-full object-cover"
            style={{
              transform: "scaleY(-1)",
              opacity: 0.15,
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
            }}
          />
        </div>
      </div>

      <div className="flex-1 min-w-0" style={{ paddingTop: "2px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px" }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "rgba(161,161,170,0.6)" }}>{game.platform}</span>
          <span style={{ color: "rgba(161,161,170,0.35)", fontSize: "12px" }}>·</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "rgba(161,161,170,0.6)" }}>{STATUS_LABEL[game.status]}</span>
          <span style={{ color: "rgba(161,161,170,0.35)", fontSize: "12px" }}>·</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "rgba(161,161,170,0.6)" }}>{game.hoursPlayed}h played</span>
        </div>

        <div className="relative" style={{ marginTop: "14px", fontSize: "clamp(1.25rem, 2.2vw, 1.875rem)" }}>
          <motion.h2 className="font-sans font-bold leading-tight" style={{ color: "#FAFAFA" }} animate={{ opacity: hovered ? 0 : 1 }} transition={{ duration: 0.22 }}>
            {game.title}
          </motion.h2>
          <motion.h2 className="font-sans font-bold leading-tight text-gradient-accent absolute inset-0" aria-hidden animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.22 }}>
            {game.title}
          </motion.h2>
        </div>

        {game.mainStoryProgress > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              maxWidth: "280px",
            }}>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(39,39,42,0.8)",
                position: "relative",
                overflow: "hidden",
              }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  right: `${100 - game.mainStoryProgress}%`,
                  background: "linear-gradient(to right, #6366F1, #8B5CF6)",
                }}
              />
            </div>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "rgba(161,161,170,0.5)", tabularNums: true } as React.CSSProperties}>{game.mainStoryProgress}%</span>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "18px" }}>
          {game.tags.map((tag) => (
            <span key={tag} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "rgba(161,161,170,0.4)" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-shrink-0" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", paddingTop: "2px" }}>
        <span
          className={isHighRating ? "text-gradient-accent" : ""}
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
            fontSize: "clamp(1.25rem, 1.8vw, 1.6rem)",
            color: isHighRating ? undefined : "#FAFAFA",
          }}>
          {game.rating.toFixed(1)}
        </span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "rgba(161,161,170,0.45)" }}>/10</span>
      </div>
    </motion.div>
  );
}
