/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from "react";

// Placeholder photography. Swap these for your own files in /public
// (e.g. "/work/01.jpg") — every screen reads from this one list.
const photo = (id: number, w = 640, h = 420) => `https://picsum.photos/id/${id}/${w}/${h}`;

export const IMAGES = {
  kitchen: photo(1027, 1280, 720),
  eye: photo(1005, 480, 300),
  portraits: [64, 65, 91, 338, 1011, 1027, 1005, 177, 349, 1062].map((id) => photo(id, 300, 300)),
  strip: [65, 64, 1011, 338, 91].map((id) => photo(id, 480, 300)),
  // Extra full-photo screens peeled away after "Every frame".
  frames: [photo(64, 1280, 720), photo(338, 1280, 720)],
  // Revealed last, then zoomed to fill the whole hero.
  finale: photo(184, 1920, 1080),
};

// Colour grades that give neutral stock photos the cinematic look of the reference.
export const GRADES = {
  red: "sepia(0.7) saturate(4) hue-rotate(-25deg) contrast(1.1)",
  blue: "grayscale(1) sepia(1) hue-rotate(185deg) saturate(3.5) brightness(1.1)",
  green: "sepia(0.75) hue-rotate(35deg) saturate(1.6) brightness(0.85)",
  amber: "sepia(0.9) saturate(1.8) brightness(0.9)",
  mono: "grayscale(1) contrast(1.25)",
} as const;

type Grade = keyof typeof GRADES;

function Img({ src, grade, className = "", style }: { src: string; grade?: Grade; className?: string; style?: CSSProperties }) {
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      className={`block object-cover ${className}`}
      style={{ filter: grade ? GRADES[grade] : undefined, ...style }}
    />
  );
}

const mono = "font-mono uppercase tracking-[0.12em]";

function Nav({ dark = false, menuInverted = false }: { dark?: boolean; menuInverted?: boolean }) {
  const ink = dark ? "text-white" : "text-[#1b1a19]";
  return (
    <div className={`absolute inset-x-0 top-0 flex items-center justify-between px-[1.6cqw] pt-[1.4cqw] ${ink}`}>
      <span className={`${mono} text-[0.8cqw]`}>
        <span className="opacity-50">Noir</span> | Lumière
      </span>
      <span className="font-wide text-[1.25cqw]">VISUAL RECORD</span>
      <span className={`${mono} flex items-center gap-[2.6cqw] text-[0.8cqw]`}>
        <span>IG</span>
        <span>Vimeo</span>
        <span>Are.na</span>
        <span
          className={`px-[1.4cqw] py-[0.3cqw] ${
            menuInverted ? "bg-white text-[#1b1a19]" : "bg-[#1b1a19] text-white"
          }`}
        >
          Menu
        </span>
      </span>
    </div>
  );
}

function Paper({ children }: { children: ReactNode }) {
  return <div className="absolute inset-0 overflow-hidden bg-[#f4f1ed] text-[#1b1a19]">{children}</div>;
}

/* ---------- 1. "Every frame" photo screen ---------- */
export function PhotoScreen() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#2b2a12]">
      <Img src={IMAGES.kitchen} grade="green" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      <Nav dark menuInverted />
      <div className="absolute inset-x-[1.6cqw] top-[4.2cqw] h-px bg-white/30" />
      <p className="font-serif-condensed absolute bottom-[1.8cqw] left-[26%] text-[5.4cqw] leading-none text-[#f4ecd8]">
        Every <span className="relative top-[1.2cqw] text-[4.4cqw]">frame</span>
      </p>
      <span className={`${mono} absolute bottom-[1.4cqw] left-[1.6cqw] text-[0.8cqw] text-white/80`}>[ 01 ]</span>
      <div className="absolute bottom-[1.3cqw] left-1/2 flex -translate-x-1/2 gap-[0.3cqw]">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={`h-[0.7cqw] w-[1.2cqw] border border-white/70 ${i === 0 ? "bg-white/70" : ""}`} />
        ))}
      </div>
      <span className={`${mono} absolute bottom-[1.4cqw] right-[1.6cqw] text-[0.8cqw] text-white/80`}>[ Next ]</span>
    </div>
  );
}

/* ---------- Extra full-photo screens ---------- */
function FilmScreen({ src, grade, index, words }: { src: string; grade: Grade; index: number; words: [string, string] }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#140806]">
      <Img src={src} grade={grade} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      <Nav dark menuInverted />
      <div className="absolute inset-x-[1.6cqw] top-[4.2cqw] h-px bg-white/30" />
      <p className="font-serif-condensed absolute bottom-[1.8cqw] left-[26%] text-[5.4cqw] leading-none text-[#f4ecd8]">
        {words[0]} <span className="relative top-[1.2cqw] text-[4.4cqw]">{words[1]}</span>
      </p>
      <span className={`${mono} absolute bottom-[1.4cqw] left-[1.6cqw] text-[0.8cqw] text-white/80`}>
        [ 0{index} ]
      </span>
      <span className={`${mono} absolute bottom-[1.4cqw] right-[1.6cqw] text-[0.8cqw] text-white/80`}>[ Next ]</span>
    </div>
  );
}

export function FrameTwoScreen() {
  return <FilmScreen src={IMAGES.frames[0]} grade="red" index={2} words={["Every", "light"]} />;
}

export function FrameThreeScreen() {
  return <FilmScreen src={IMAGES.frames[1]} grade="blue" index={3} words={["Every", "silence"]} />;
}

/* ---------- 2. Thumbnail index screen ---------- */
const THUMB_GRADES: Grade[] = ["red", "blue", "blue", "amber", "red", "mono", "mono", "green", "mono", "mono"];

export function ThumbsScreen() {
  return (
    <Paper>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3 className="font-wide text-[2.9cqw] leading-none">VISUAL RECORD</h3>
        <div className="mt-[1.2cqw] flex gap-[0.8cqw]">
          {IMAGES.portraits.map((src, i) => (
            <Img
              key={i}
              src={src}
              grade={THUMB_GRADES[i]}
              className={`size-[7cqw] ${i === 6 ? "rounded-full" : ""}`}
            />
          ))}
        </div>
        <p className={`${mono} mt-[1.4cqw] text-[0.75cqw]`}>Observation is an act of intimacy</p>
      </div>
    </Paper>
  );
}

/* ---------- 3. "It is the beginning of a world" screen ---------- */
export function BeginningScreen() {
  return (
    <Paper>
      <div className="absolute inset-y-0 left-[66%] w-px bg-black/10" />
      <div className="absolute inset-x-[1.6cqw] top-[62%] h-px bg-black/10" />
      <Nav />
      <div className="absolute inset-x-0 top-[7.5%] text-center">
        <p className={`${mono} text-[0.8cqw]`}>[ Version 001 ]</p>
        <p className="font-serif-condensed text-[1.6cqw] leading-tight">This is not an archive of works.</p>
      </div>
      <div className="absolute inset-x-[7%] top-[25%] flex items-stretch justify-between">
        <span className="w-[1.2cqw] border-y-[0.25cqw] border-l-[0.25cqw] border-[#1b1a19]" />
        <h3 className="font-wide py-[1.2cqw] text-center text-[5.6cqw] leading-[0.9]">
          IT IS THE BEGINNING
          <br />
          OF A WORLD
        </h3>
        <span className="w-[1.2cqw] border-y-[0.25cqw] border-r-[0.25cqw] border-[#1b1a19]" />
      </div>
      <div className="absolute left-1/2 top-[48%] -translate-x-1/2 text-center">
        <Img src={IMAGES.eye} grade="amber" className="mx-auto h-[10cqw] w-[16.5cqw]" />
        <p className={`${mono} mt-[1cqw] text-[0.72cqw] leading-snug`}>
          Voyeur vérité is a point of intersection
          <br />
          between cinema, art, and culture.
        </p>
      </div>
      <p className="font-serif-condensed absolute inset-x-0 bottom-[1.6cqw] text-center text-[1.5cqw] leading-tight">
        We create a space where a project does not end at release.
        <br />
        It becomes part of a continuous narrative.
      </p>
    </Paper>
  );
}

/* ---------- 4. Red hero screen ---------- */
export function RedScreen() {
  return (
    <div
      className="absolute inset-0 overflow-hidden text-white"
      style={{
        background: [
          "radial-gradient(ellipse 30% 55% at 56% 55%, #07030a 0%, #14040a 40%, transparent 75%)",
          "radial-gradient(ellipse 22% 30% at 46% 30%, #1a0508 0%, transparent 80%)",
          "radial-gradient(circle at 18% 70%, #ff2a12 0%, transparent 45%)",
          "radial-gradient(circle at 25% 5%, #ff8a14 0%, transparent 45%)",
          "linear-gradient(110deg, #c2300f 0%, #f0620f 30%, #b3121f 65%, #7a0719 100%)",
        ].join(","),
      }}
    >
      <span className="font-wide absolute left-1/2 top-[1.6cqw] -translate-x-1/2 text-[1.25cqw]">VISUAL RECORD</span>
      <div className="absolute inset-x-[1.2cqw] top-1/2 flex -translate-y-1/2 items-center justify-between">
        <span className={`${mono} text-[0.8cqw]`}>
          Noir | <span className="text-[#ff8f86]">Lumière</span>
        </span>
        <span className={`${mono} flex items-center gap-[2.6cqw] text-[0.8cqw]`}>
          <span>IG</span>
          <span>Vimeo</span>
          <span>Are.na</span>
          <span className="bg-white px-[1.4cqw] py-[0.3cqw] text-[#1b1a19]">Menu</span>
        </span>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] text-center">
        <p className="font-serif-condensed text-[1.6cqw] leading-none">We</p>
        <h3 className="font-wide mt-[0.4cqw] text-[2.3cqw] leading-[0.9]">
          DO NOT
          <br />
          PRODUCE
          <br />
          CONTENT
        </h3>
        <p className={`${mono} mt-[0.9cqw] text-[0.75cqw] leading-snug`}>
          We construct
          <br />
          perception
        </p>
      </div>
      <div className="absolute bottom-[3cqw] right-[1.2cqw] flex gap-[0.3cqw]">
        {IMAGES.portraits.slice(0, 4).map((src, i) => (
          <div key={i}>
            <p className={`${mono} mb-[0.4cqw] text-[0.55cqw]`}>[ 0{i + 1} ]</p>
            <Img src={src} grade={(["red", "mono", "blue", "amber"] as Grade[])[i]} className="size-[6.8cqw] opacity-90" />
          </div>
        ))}
      </div>
      <div className={`${mono} absolute inset-x-[1.2cqw] bottom-[1.2cqw] flex justify-between text-[0.72cqw]`}>
        <span>Paris / Kyiv | 22:47 CET</span>
        <span>[ Scroll to enter version 001 ]</span>
        <span>A continuous narrative in motion</span>
      </div>
    </div>
  );
}

/* ---------- 5. Collage screen ---------- */
export function CollageScreen() {
  return (
    <Paper>
      <Img src={IMAGES.portraits[3]} grade="green" className="absolute left-[33%] top-[2%] h-[9cqw] w-[10cqw]" />
      <Img src={IMAGES.portraits[8]} grade="red" className="absolute left-[60%] top-[2%] h-[6cqw] w-[10cqw]" />
      <Img src={IMAGES.portraits[4]} grade="red" className="absolute left-[36%] top-[28%] size-[10cqw]" />
      <Img src={IMAGES.portraits[5]} grade="mono" className="absolute left-[47%] top-[36%] h-[10cqw] w-[9cqw] opacity-80 blur-[1px]" />
      <Img src={IMAGES.portraits[6]} grade="mono" className="absolute left-[57%] top-[24%] size-[10cqw] rounded-full ring-[0.8cqw] ring-black" />
    </Paper>
  );
}

/* ---------- 6. "A moving exhibition" screen ---------- */
export function ExhibitionScreen() {
  const grades: Grade[] = ["blue", "blue", "amber", "red", "mono"];
  return (
    <Paper>
      <div className="absolute inset-y-0 left-[70%] w-px bg-black/10" />
      <div className="absolute inset-x-0 top-[5%] h-px bg-black/10" />
      <div className="font-serif-condensed absolute inset-x-[2cqw] top-[6%] flex justify-between text-[4.6cqw] leading-none">
        <span>[A</span>
        <span>Moving</span>
        <span>Exhibition]</span>
      </div>
      <div className="absolute inset-x-0 bottom-[34%] flex gap-[0.8cqw]">
        {IMAGES.strip.map((src, i) => (
          <Img key={i} src={src} grade={grades[i]} className={`h-[7cqw] flex-1 ${i === 4 ? "opacity-40" : ""}`} />
        ))}
      </div>
    </Paper>
  );
}

/* ---------- 7. "We produce / do not / content" screen ---------- */
export function StatementScreen() {
  return (
    <Paper>
      <div className="font-serif-condensed absolute inset-x-[2cqw] top-[12%] flex items-start justify-between text-[5.4cqw] leading-[0.85]">
        <span>
          We
          <br />
          produce
        </span>
        <span>do</span>
        <span className="text-right">
          not
          <br />
          content
        </span>
      </div>
      <Img src={IMAGES.strip[1]} grade="blue" className="absolute left-[20%] top-[10%] h-[13cqw] w-[20cqw]" />
      <Img src={IMAGES.portraits[7]} grade="amber" className="absolute left-[5%] top-[12%] h-[10cqw] w-[4cqw] -rotate-6" />
      <p className="font-wide absolute left-[42%] top-[30%] text-[1.8cqw] leading-[0.95]">
        WE CONSTRUCT
        <br />
        PERCEPTION
      </p>
    </Paper>
  );
}
