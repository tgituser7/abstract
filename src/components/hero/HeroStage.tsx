/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  BeginningScreen,
  CollageScreen,
  ExhibitionScreen,
  GRADES,
  IMAGES,
  PhotoScreen,
  RedScreen,
  StatementScreen,
  ThumbsScreen,
} from "./screens";

gsap.registerPlugin(useGSAP);

/**
 * Card order is top → bottom of the column. Offsets are in percent of the
 * card's own size, so the layout scales with the viewport.
 *   y – position in the vertical column
 *   x – horizontal offset in the diagonal cascade the cards enter from
 */
const CARDS = [
  { id: "photo", x: -56, Screen: PhotoScreen, z: 4, scale: 0.78, y: -100 },
  { id: "thumbs", x: -41, Screen: ThumbsScreen, z: 5, scale: 0.85, y: -67 },
  { id: "beginning", x: -20, Screen: BeginningScreen, z: 6, scale: 0.93, y: -33 },
  { id: "red", x: 0, Screen: RedScreen, z: 7, scale: 1, y: 0 },
  { id: "collage", x: 20, Screen: CollageScreen, z: 3, scale: 0.93, y: 33 },
  { id: "exhibition", x: 48, Screen: ExhibitionScreen, z: 2, scale: 0.86, y: 67 },
  { id: "statement", x: 60, Screen: StatementScreen, z: 1, scale: 0.78, y: 100 },
] as const;

// Cards peel away in this order, alternating right (+1) and left (-1).
const EXITS = [
  { id: "red", dir: 1 },
  { id: "beginning", dir: -1 },
  { id: "thumbs", dir: 1 },
  { id: "photo", dir: -1 },
] as const;

const HIDDEN_AFTER_COLLAPSE = ["collage", "exhibition", "statement"];

// Cards start this much further out and slide in to the cascade.
const ENTRY_SPREAD = 1.8;

// How far the stage pushes in while the column collapses.
const PUSH_IN = 1.2;

export default function HeroStage() {
  const root = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const finale = useRef<HTMLDivElement>(null);
  const finaleImg = useRef<HTMLImageElement>(null);
  const finaleCopy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = (id: string) => root.current!.querySelector<HTMLElement>(`[data-card="${id}"]`)!;
      const copyLines = finaleCopy.current!.querySelectorAll("[data-line]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(world.current, { autoAlpha: 0 });
        gsap.set(finale.current, { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The finale starts clipped to exactly where the pushed-in cards sit,
        // so it reads as one more card in the stack until it zooms out.
        const red = card("red");
        const insetX = (root.current!.offsetWidth - red.offsetWidth * PUSH_IN) / 2;
        const insetY = (root.current!.offsetHeight - red.offsetHeight * PUSH_IN) / 2;
        // Tween plain numbers: browsers normalise inset() strings to shorthand,
        // which GSAP cannot interpolate reliably.
        const clip = { x: insetX, y: insetY };
        const applyClip = () => {
          finale.current!.style.clipPath = `inset(${clip.y}px ${clip.x}px)`;
        };
        applyClip();

        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

        // 1. Cards slide in from the sides into a diagonal cascade…
        tl.set(world.current, { scale: 0.92, autoAlpha: 0 });
        tl.set(finale.current, { autoAlpha: 0 });
        tl.set(clip, { x: insetX, y: insetY, onComplete: applyClip });
        tl.set(finaleImg.current, { scale: 1.35 });
        tl.set(copyLines, { autoAlpha: 0, yPercent: 60 });
        CARDS.forEach((c) =>
          tl.set(
            card(c.id),
            { xPercent: c.x * ENTRY_SPREAD, yPercent: c.y, scale: c.scale, transformPerspective: 1400 },
            0,
          ),
        );
        tl.to(world.current, { autoAlpha: 1, duration: 0.6, ease: "power1.out" });
        CARDS.forEach((c) =>
          tl.to(card(c.id), { xPercent: c.x, duration: 1.2, ease: "power2.out" }, "<"),
        );
        tl.to({}, { duration: 0.3 });

        // …then merge into the vertical column; the finale waits hidden underneath.
        tl.addLabel("merge");
        CARDS.forEach((c) => tl.to(card(c.id), { xPercent: 0, duration: 1.9 }, "merge"));
        tl.to({}, { duration: 0.5 });

        // 2. Collapse the column into the red card while pushing in.
        tl.addLabel("collapse");
        CARDS.forEach((c) => tl.to(card(c.id), { yPercent: 0, scale: 1, duration: 2.2 }, "collapse"));
        tl.to(world.current, { scale: PUSH_IN, duration: 2.6, ease: "power2.inOut" }, "collapse");
        tl.set(HIDDEN_AFTER_COLLAPSE.map(card), { autoAlpha: 0 });
        tl.set(finale.current, { autoAlpha: 1 });
        tl.to({}, { duration: 0.9 });

        // 3. Peel the cards away sideways, in 3D, one after another.
        EXITS.forEach(({ id, dir }, i) => {
          tl.to(
            card(id),
            { xPercent: dir * 125, z: 650, rotationY: dir * 32, duration: 1.15, ease: "power2.in" },
            i === 0 ? ">" : ">+0.55",
          );
          // The newly revealed card settles with a slight counter-tilt.
          const next = EXITS[i + 1];
          if (next) {
            tl.fromTo(
              card(next.id),
              { rotationY: -dir * 6 },
              { rotationY: 0, duration: 1.3, ease: "power2.out", immediateRender: false },
              "<+0.35",
            );
          }
        });
        tl.set(world.current, { autoAlpha: 0 });

        // 4. The last image zooms to fill the section and becomes the hero.
        tl.addLabel("finale", "+=0.5");
        tl.to(clip, { x: 0, y: 0, duration: 1.8, onUpdate: applyClip }, "finale");
        tl.to(finaleImg.current, { scale: 1, duration: 2.4, ease: "power2.out" }, "finale");
        tl.to(
          copyLines,
          { autoAlpha: 1, yPercent: 0, duration: 1, ease: "power3.out", stagger: 0.12 },
          "finale+=1.3",
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Visual Record showreel"
      className="relative h-[calc(100svh-69px)] min-h-[560px] overflow-hidden bg-[#e9e9e8]"
    >
      {/* Final full-bleed hero — sits beneath the card stack until it is revealed. */}
      <div ref={finale} className="invisible absolute inset-0 overflow-hidden bg-[#140806] text-white">
        <img
          ref={finaleImg}
          src={IMAGES.finale}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: GRADES.amber }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        <div
          ref={finaleCopy}
          className="absolute inset-x-4 bottom-8 flex flex-col gap-6 sm:inset-x-10 sm:bottom-12 md:flex-row md:items-end md:justify-between"
        >
          <div className="overflow-hidden">
            <p data-line className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
              [ Version 001 ] — Paris / Kyiv
            </p>
            <h1 data-line className="font-wide mt-3 text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.9]">
              VISUAL
              <br />
              RECORD
            </h1>
          </div>
          <div className="max-w-sm overflow-hidden md:text-right">
            <p data-line className="font-serif-condensed text-2xl leading-tight sm:text-3xl">
              Every frame becomes part of a continuous narrative.
            </p>
            <a
              data-line
              href="#services"
              className="mt-5 inline-block font-mono text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white"
            >
              [ Scroll to enter ]
            </a>
          </div>
        </div>
      </div>

      <div ref={world} className="invisible absolute inset-0 will-change-transform">
        {CARDS.map(({ id, Screen, z }) => (
          <div
            key={id}
            data-card={id}
            className="absolute inset-0 m-auto h-[calc(var(--cw)/1.8)] w-[var(--cw)] shadow-[0_1px_2px_rgba(0,0,0,0.06)] [--cw:min(90vw,980px)] [container-type:inline-size] [backface-visibility:hidden] md:[--cw:min(60vw,980px)]"
            style={{ zIndex: z }}
          >
            <Screen />
          </div>
        ))}
      </div>
    </section>
  );
}
