// import Link from "next/link";
// const cards = [
//   {
//     rotate: "-12deg",
//     title: "Emily J.",
//     role: "Directrice",
//     text: "Alles ziet er veilig, creatief en super speels uit. Mijn zoontje vraagt nu al wanneer het open gaat!",
//   },
//   {
//     rotate: "-24.85deg",
//     title: "Emily J.",
//     role: "Directrice",
//     text: "Alles ziet er veilig, creatief en super speels uit. Mijn zoontje vraagt nu al wanneer het open gaat!",
//   },
//   {
//     rotate: "0deg",
//     title: "Emily J.",
//     role: "Directrice",
//     text: "Alles ziet er veilig, creatief en super speels uit. Mijn zoontje vraagt nu al wanneer het open gaat!",
//   },
// ];
// export default function Footer() {
//   const Card = ({
//     title,
//     role,
//     text,
//     rotate,
//   }: {
//     title: string;
//     role: string;
//     text: string;
//     rotate: string;
//   }) => {
//     return (
//       <div
//         style={{ rotate: rotate }}
//         className="size-80 p-5 bg-[linear-gradient(230.02deg,#67CD8A_6.27%,#A5DEB9_23.12%,#67CD8A_64.82%,#67CD8A_64.83%,#67CD8A_93.89%)] rounded-2xl text-white"
//       >
//         <h1 className="font-bold text-xl">{title}</h1>
//         <span className="text-lg">{role}</span>
//         <img
//           src="/assets/footer/stars.svg"
//           className="rotate-[12.5deg] mt-3"
//           alt=""
//         />
//         <p className="mt-1">{text}</p>
//       </div>
//     );
//   };
//   return (
//     <div
//       style={{ fontFamily: "Nunito Variable" }}
//       className="relative w-full h-screen -mt-20 "
//     >
//       <svg
//         viewBox="0 0 1752 980"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="absolute inset-0 w-full h-full block"
//         preserveAspectRatio="none"
//         aria-hidden="true"
//       >
//         <path
//           d="M1366.99 0C1574.43 -2.04248e-08 1752 53 1752 53V291C1752 291 1751.66 291 1751 291L1752 1029H-2V287H0V90C0.0785611 90.0179 120.118 117.314 268.324 130C456.746 146.128 655.027 121.5 849.506 74.5C1052 25.5631 1159.54 1.04199e-05 1366.99 0Z"
//           fill="url(#shapeGradient)"
//         />
//         <defs>
//           <linearGradient
//             id="shapeGradient"
//             x1="861.008"
//             y1="136.08"
//             x2="793.445"
//             y2="994.561"
//             gradientUnits="userSpaceOnUse"
//           >
//             <stop stopColor="#FFDE98" />
//             <stop offset="1" stopColor="#FFCA58" />
//           </linearGradient>
//         </defs>
//       </svg>

//       <div className="absolute inset-0 flex items-center justify-center gap-20 mx-16">
//         <div className="flex flex-col gap-10 items-center">
//           <Link href="/">
//             <img src="/assets/footer/logo.svg" className="" alt="" />
//           </Link>
//           <div className="flex gap-5">
//             <Link href="#">
//               <img
//                 src="/assets/footer/insta.svg"
//                 className="rounded-full w-12"
//                 alt=""
//               />
//             </Link>
//             <Link href="#">
//               <img
//                 src="/assets/footer/tiktok.svg"
//                 className="rounded-full w-12"
//                 alt=""
//               />
//             </Link>
//           </div>
//         </div>
//         <div>
//           {cards.map((card, index) => {
//             return (
//               <Card
//                 rotate={card.rotate}
//                 key={index}
//                 title={card.title}
//                 role={card.role}
//                 text={card.text}
//               />
//             );
//           })}
//         </div>
//         <div>{/* <Card /> */}</div>
//       </div>
//     </div>
//   );
// }
"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type CardState = "current" | "next" | "out" | "idle";

const cardData = [
  {
    title: "Emily J.",
    role: "Directrice",
    text: "Alles ziet er veilig, creatief en super speels uit. Mijn zoontje vraagt nu al wanneer het open gaat!",
  },
  {
    title: "Sophie M.",
    role: "Ouder",
    text: "Geweldige plek voor kinderen! Ze komen altijd met een grote glimlach thuis. Absolute aanrader!",
  },
  {
    title: "Thomas K.",
    role: "Vader",
    text: "De begeleiders zijn super professioneel en lief. Mijn dochter wil elke dag komen spelen!",
  },
];

// Rotation belongs to the STACK POSITION, not the card
// front (current) = 12.49deg, middle (next) = 24.85deg, back (idle) = 0deg
const POSITION_ROTATE: Record<CardState, string> = {
  current: "-12.49deg",
  next: "-24.85deg",
  idle: "0deg",
  out: "-12.49deg",
};

const ANIM_CSS = `
@keyframes card-out {
  0%   { z-index: 20; transform: rotate(-12.49deg) scale(1) translateY(0px); border-radius: 1.5rem; }
  40%  { transform: rotate(-5deg) scale(1.04) translateY(-110%); border-radius: 2rem; }
  80%  { z-index: 1; transform: rotate(-2deg) scale(0.97) translateY(-30px); border-radius: 1.2rem; }
  100% { transform: rotate(0deg) scale(0.95) translateY(0px); border-radius: 1rem; }
}
`;

export default function Footer() {
  // Start: card 0 is current, card 1 is next, card 2 is idle
  const [states, setStates] = useState<CardState[]>([
    "current",
    "next",
    "idle",
  ]);
  const animating = useRef(false);
  const styleInjected = useRef(false);

  useEffect(() => {
    if (!styleInjected.current) {
      const style = document.createElement("style");
      style.textContent = ANIM_CSS;
      document.head.appendChild(style);
      styleInjected.current = true;
    }
  }, []);

  const advance = () => {
    if (animating.current) return;
    animating.current = true;

    setStates((prev) => {
      // Find indices
      const currentIdx = prev.indexOf("current");
      const nextIdx = prev.indexOf("next");
      // idle card becomes next
      const idleIdx = prev.findIndex((s) => s === "idle");

      const next = [...prev] as CardState[];
      next[currentIdx] = "out"; // current flies out
      next[nextIdx] = "current"; // next becomes current
      next[idleIdx] = "next"; // idle steps up to next

      return next;
    });

    // After animation, demote "out" → "idle"
    setTimeout(() => {
      setStates((prev) => {
        return prev.map((s) => (s === "out" ? "idle" : s)) as CardState[];
      });
      animating.current = false;
    }, 700);
  };

  useEffect(() => {
    const interval = setInterval(advance, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (state: CardState): React.CSSProperties => {
    const rotate = POSITION_ROTATE[state];
    const transition = [
      "transform 0.65s cubic-bezier(.4,0,.2,1)",
      "opacity 0.5s ease",
      "border-radius 0.65s cubic-bezier(.4,0,.2,1)",
      "background 0.5s linear",
    ].join(", ");
    const base = { position: "absolute" as const, top: 0, left: 0 };

    switch (state) {
      case "current":
        return {
          ...base,
          zIndex: 10,
          transform: `rotate(${rotate}) scale(1)`,
          borderRadius: "1.5rem",
          background:
            "linear-gradient(230deg, #67CD8A 6%, #A5DEB9 23%, #67CD8A 65%, #67CD8A 94%)",
          opacity: 1,
          transition,
        };
      case "next":
        return {
          ...base,
          zIndex: 5,
          transform: `rotate(${rotate}) scale(0.97)`,
          borderRadius: "1.25rem",
          background:
            "linear-gradient(230deg, #52b874 6%, #8dcba4 23%, #52b874 65%, #52b874 94%)",
          opacity: 0.9,
          transition,
        };
      case "out":
        return {
          ...base,
          zIndex: 1,
          animation: `card-out 0.7s cubic-bezier(.4,0,.2,1) forwards`,
          background:
            "linear-gradient(230deg, #3fa060 6%, #72b88c 23%, #3fa060 65%, #3fa060 94%)",
          opacity: 0.8,
        };
      case "idle":
      default:
        return {
          ...base,
          zIndex: 2,
          transform: `rotate(${rotate}) scale(0.95)`,
          borderRadius: "1rem",
          background:
            "linear-gradient(230deg, #3fa060 6%, #72b88c 23%, #3fa060 65%, #3fa060 94%)",
          opacity: 0.75,
          transition,
        };
    }
  };

  // Render order: idle first (bottom), then next, then current (top) — so current paints last
  const renderOrder = [
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "idle"),
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "out"),
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "next"),
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "current"),
  ];

  return (
    <div
      style={{ fontFamily: "Nunito Variable" }}
      className="relative w-full h-screen -mt-20"
    >
      <svg
        viewBox="0 0 1752 980"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full block"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M1366.99 0C1574.43 -2.04248e-08 1752 53 1752 53V291C1752 291 1751.66 291 1751 291L1752 1029H-2V287H0V90C0.0785611 90.0179 120.118 117.314 268.324 130C456.746 146.128 655.027 121.5 849.506 74.5C1052 25.5631 1159.54 1.04199e-05 1366.99 0Z"
          fill="url(#shapeGradient)"
        />
        <defs>
          <linearGradient
            id="shapeGradient"
            x1="861.008"
            y1="136.08"
            x2="793.445"
            y2="994.561"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFDE98" />
            <stop offset="1" stopColor="#FFCA58" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center gap-20 mx-16">
        {/* Logo + Socials */}
        <div className="flex flex-col gap-10 items-center">
          <Link href="/">
            <img src="/assets/footer/logo.svg" alt="" />
          </Link>
          <div className="flex gap-5">
            <Link href="#">
              <img
                src="/assets/footer/insta.svg"
                className="rounded-full w-12"
                alt=""
              />
            </Link>
            <Link href="#">
              <img
                src="/assets/footer/tiktok.svg"
                className="rounded-full w-12"
                alt=""
              />
            </Link>
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative w-80 h-80">
          {renderOrder.map(({ s, i }) => {
            const card = cardData[i];
            return (
              <div
                key={i}
                style={{
                  ...getCardStyle(s),
                  width: "20rem",
                  height: "20rem",
                  padding: "1.25rem",
                  color: "white",
                  boxShadow: "none",
                  willChange: "transform, opacity, border-radius",
                  userSelect: s === "current" ? "auto" : "none",
                }}
              >
                <h1 style={{ margin: 0, fontWeight: 700, fontSize: "1.25rem" }}>
                  {card.title}
                </h1>
                <span style={{ fontSize: "1.1rem" }}>{card.role}</span>
                <img
                  src="/assets/footer/stars.svg"
                  style={{ transform: "rotate(12.5deg)", marginTop: "0.75rem" }}
                  alt=""
                />
                <p style={{ marginTop: "0.25rem" }}>{card.text}</p>
              </div>
            );
          })}
        </div>

        <div />
      </div>
    </div>
  );
}
