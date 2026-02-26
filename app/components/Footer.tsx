// "use client";
// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";

// type CardState = "current" | "next" | "out" | "idle";

// const cardData = [
//   {
//     title: "Emily J.",
//     role: "Directrice",
//     text: "Alles ziet er veilig, creatief en super speels uit. Mijn zoontje vraagt nu al wanneer het open gaat!",
//   },
//   {
//     title: "Sophie M.",
//     role: "Ouder",
//     text: "Geweldige plek voor kinderen! Ze komen altijd met een grote glimlach thuis. Absolute aanrader!",
//   },
//   {
//     title: "Thomas K.",
//     role: "Vader",
//     text: "De begeleiders zijn super professioneel en lief. Mijn dochter wil elke dag komen spelen!",
//   },
// ];

// const POSITION_ROTATE: Record<CardState, string> = {
//   current: "-12.49deg",
//   next: "-24.85deg",
//   idle: "0deg",
//   out: "-12.49deg",
// };

// const ANIM_CSS = `
// @keyframes card-out {
//   0%   { z-index: 20; transform: rotate(-12.49deg) scale(1) translateY(0px); border-radius: 1.5rem; }
//   40%  { transform: rotate(-5deg) scale(1.04) translateY(-110%); border-radius: 2rem; }
//   80%  { z-index: 1; transform: rotate(-2deg) scale(0.97) translateY(-30px); border-radius: 1.2rem; }
//   100% { transform: rotate(0deg) scale(0.95) translateY(0px); border-radius: 1rem; }
// }
// `;

// export default function Footer() {
//   const [states, setStates] = useState<CardState[]>([
//     "current",
//     "next",
//     "idle",
//   ]);
//   const animating = useRef(false);
//   const styleInjected = useRef(false);

//   useEffect(() => {
//     if (!styleInjected.current) {
//       const style = document.createElement("style");
//       style.textContent = ANIM_CSS;
//       document.head.appendChild(style);
//       styleInjected.current = true;
//     }
//   }, []);

//   const advance = () => {
//     if (animating.current) return;
//     animating.current = true;

//     setStates((prev) => {
//       const currentIdx = prev.indexOf("current");
//       const nextIdx = prev.indexOf("next");
//       const idleIdx = prev.findIndex((s) => s === "idle");

//       const next = [...prev] as CardState[];
//       next[currentIdx] = "out";
//       next[nextIdx] = "current";
//       next[idleIdx] = "next";

//       return next;
//     });

//     setTimeout(() => {
//       setStates((prev) => {
//         return prev.map((s) => (s === "out" ? "idle" : s)) as CardState[];
//       });
//       animating.current = false;
//     }, 700);
//   };

//   useEffect(() => {
//     const interval = setInterval(advance, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const getCardStyle = (state: CardState): React.CSSProperties => {
//     const rotate = POSITION_ROTATE[state];
//     const transition = [
//       "transform 0.65s cubic-bezier(.4,0,.2,1)",
//       "opacity 0.5s ease",
//       "border-radius 0.65s cubic-bezier(.4,0,.2,1)",
//       "background 0.5s linear",
//     ].join(", ");
//     const base = { position: "absolute" as const, top: 0, left: 0 };

//     switch (state) {
//       case "current":
//         return {
//           ...base,
//           zIndex: 10,
//           transform: `rotate(${rotate}) scale(1)`,
//           borderRadius: "1.5rem",
//           background:
//             "linear-gradient(230deg, #67CD8A 6%, #A5DEB9 23%, #67CD8A 65%, #67CD8A 94%)",
//           opacity: 1,
//           transition,
//         };
//       case "next":
//         return {
//           ...base,
//           zIndex: 5,
//           transform: `rotate(${rotate}) scale(0.97)`,
//           borderRadius: "1.25rem",
//           background:
//             "linear-gradient(230deg, #52b874 6%, #8dcba4 23%, #52b874 65%, #52b874 94%)",
//           opacity: 0.9,
//           transition,
//         };
//       case "out":
//         return {
//           ...base,
//           zIndex: 1,
//           animation: `card-out 0.7s cubic-bezier(.4,0,.2,1) forwards`,
//           background:
//             "linear-gradient(230deg, #3fa060 6%, #72b88c 23%, #3fa060 65%, #3fa060 94%)",
//           opacity: 0.8,
//         };
//       case "idle":
//       default:
//         return {
//           ...base,
//           zIndex: 2,
//           transform: `rotate(${rotate}) scale(0.95)`,
//           borderRadius: "1rem",
//           background:
//             "linear-gradient(230deg, #3fa060 6%, #72b88c 23%, #3fa060 65%, #3fa060 94%)",
//           opacity: 0.75,
//           transition,
//         };
//     }
//   };

//   const renderOrder = [
//     ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "idle"),
//     ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "out"),
//     ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "next"),
//     ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "current"),
//   ];

//   return (
//     <div
//       style={{ fontFamily: "Nunito Variable" }}
//       className="relative w-full min-h-screen -mt-20"
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

//       {/* Main container: responsive flex row on lg+, column on smaller */}
//       <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-12 px-6 sm:px-10 xl:px-16 py-16">
//         {/* Column 1: Logo + Socials */}
//         <div className="flex flex-col gap-10 items-center flex-1 min-w-0 max-w-xs lg:max-w-none">
//           <Link href="/">
//             <img src="/assets/footer/logo.svg" alt="" className="max-w-full" />
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

//         {/* Column 2: Card Stack */}
//         <div className="flex-1 min-w-0 flex items-center justify-center">
//           {/* Mobile: single card in normal flow, no absolute positioning */}
//           <div className="block lg:hidden w-full max-w-[20rem]">
//             {cardData.map((card, i) => {
//               if (states[i] !== "current") return null;
//               return (
//                 <div
//                   key={i}
//                   style={{
//                     borderRadius: "1.5rem",
//                     background:
//                       "linear-gradient(230deg, #67CD8A 6%, #A5DEB9 23%, #67CD8A 65%, #67CD8A 94%)",
//                     padding: "1.25rem",
//                     color: "white",
//                     width: "100%",
//                     minHeight: "20rem",
//                   }}
//                 >
//                   <h1
//                     style={{ margin: 0, fontWeight: 700, fontSize: "1.25rem" }}
//                   >
//                     {card.title}
//                   </h1>
//                   <span style={{ fontSize: "1.1rem" }}>{card.role}</span>
//                   <img
//                     src="/assets/footer/stars.svg"
//                     style={{
//                       transform: "rotate(12.5deg)",
//                       marginTop: "0.75rem",
//                     }}
//                     alt=""
//                   />
//                   <p style={{ marginTop: "0.25rem" }}>{card.text}</p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Desktop: stacked animated cards with fixed pixel size */}
//           <div
//             className="hidden lg:block relative"
//             style={{ width: "320px", height: "320px", flexShrink: 0 }}
//           >
//             {renderOrder.map(({ s, i }) => {
//               const card = cardData[i];
//               return (
//                 <div
//                   key={i}
//                   style={{
//                     ...getCardStyle(s),
//                     width: "320px",
//                     height: "320px",
//                     padding: "1.25rem",
//                     color: "white",
//                     boxShadow: "none",
//                     willChange: "transform, opacity, border-radius",
//                     userSelect: s === "current" ? "auto" : "none",
//                   }}
//                 >
//                   <h1
//                     style={{ margin: 0, fontWeight: 700, fontSize: "1.25rem" }}
//                   >
//                     {card.title}
//                   </h1>
//                   <span style={{ fontSize: "1.1rem" }}>{card.role}</span>
//                   <img
//                     src="/assets/footer/stars.svg"
//                     style={{
//                       transform: "rotate(12.5deg)",
//                       marginTop: "0.75rem",
//                     }}
//                     alt=""
//                   />
//                   <p style={{ marginTop: "0.25rem" }}>{card.text}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Column 3: Letter / newsletter form */}
//         <div className="flex-1 min-w-0 relative z-20 flex flex-col items-center max-w-xs lg:max-w-none w-full">
//           <div className="relative w-full">
//             <img src="/assets/footer/letter.svg" className="w-full" alt="" />
//             <div className="absolute top-0 w-2/3 left-1/2 -translate-x-1/2 mt-5 flex flex-col gap-5 items-center">
//               <h1 className="font-bold text-[#5763FF] text text-center text-sm xl:text-base">
//                 KRIJG ALS EERSTE EEN SEINTJE WANNEER WIJ OPENEN!
//               </h1>
//               <div className="w-full flex flex-col gap-2 text-xs">
//                 <input
//                   type="text"
//                   className="bg-[#E1FBE9] p-3 rounded outline-0 w-full"
//                   placeholder="Naam"
//                 />
//                 <input
//                   type="text"
//                   className="bg-[#E1FBE9] p-3 rounded outline-0 w-full"
//                   placeholder="Naam"
//                 />
//               </div>
//               <button className="font-bold text-white text-xs rounded bg-[#BB76FF] p-3 px-5 w-fit block">
//                 VERTEL ME ALLES!
//               </button>
//             </div>
//           </div>
//           <div className="flex mt-3 w-full justify-evenly">
//             <Link href="#">
//               <img
//                 src="/assets/footer/map.svg"
//                 className="w-10 xl:w-13"
//                 alt=""
//               />
//             </Link>
//             <Link href="#">
//               <img
//                 src="/assets/footer/phone.svg"
//                 className="w-10 xl:w-13"
//                 alt=""
//               />
//             </Link>
//             <Link href="#">
//               <img
//                 src="/assets/footer/mail.svg"
//                 className="w-10 xl:w-13"
//                 alt=""
//               />
//             </Link>
//           </div>
//         </div>
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
      const currentIdx = prev.indexOf("current");
      const nextIdx = prev.indexOf("next");
      const idleIdx = prev.findIndex((s) => s === "idle");

      const next = [...prev] as CardState[];
      next[currentIdx] = "out";
      next[nextIdx] = "current";
      next[idleIdx] = "next";

      return next;
    });

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

  const renderOrder = [
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "idle"),
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "out"),
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "next"),
    ...states.map((s, i) => ({ s, i })).filter(({ s }) => s === "current"),
  ];

  // Shared card stack JSX (used on both mobile and desktop)
  const cardStack = (size: number) => (
    <div
      style={{ width: `${size}px`, height: `${size}px`, position: "relative", flexShrink: 0 }}
    >
      {renderOrder.map(({ s, i }) => {
        const card = cardData[i];
        return (
          <div
            key={i}
            style={{
              ...getCardStyle(s),
              width: `${size}px`,
              height: `${size}px`,
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
  );

  return (
    <div
      style={{ fontFamily: "Nunito Variable" }}
      className="relative w-full min-h-screen -mt-20"
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

      {/* Main container */}
      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-12 px-6 sm:px-10 xl:px-16 py-16">
        {/* Column 1: Logo + Socials */}
        <div className="flex flex-col gap-10 items-center flex-1 min-w-0 max-w-xs lg:max-w-none">
          <Link href="/">
            <img src="/assets/footer/logo.svg" alt="" className="max-w-full" />
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

        {/* Column 2: Card Stack */}
        <div className="flex-1 min-w-0 flex items-center justify-center">
          {/* Mobile: relative wrapper so it doesn't overlap letter section */}
          <div className="block lg:hidden">
            {cardStack(Math.min(280, typeof window !== "undefined" ? window.innerWidth - 80 : 280))}
          </div>

          {/* Desktop: fixed 320px */}
          <div className="hidden lg:block">
            {cardStack(320)}
          </div>
        </div>

        {/* Column 3: Letter / newsletter form */}
        <div className="flex-1 min-w-0 relative z-20 flex flex-col items-center max-w-xs lg:max-w-none w-full">
          <div className="relative w-full">
            <img src="/assets/footer/letter.svg" className="w-full" alt="" />
            <div className="absolute top-0 w-2/3 left-1/2 -translate-x-1/2 mt-5 flex flex-col gap-5 items-center">
              <h1 className="font-bold text-[#5763FF] text text-center text-sm xl:text-base">
                KRIJG ALS EERSTE EEN SEINTJE WANNEER WIJ OPENEN!
              </h1>
              <div className="w-full flex flex-col gap-2 text-xs">
                <input
                  type="text"
                  className="bg-[#E1FBE9] p-3 rounded outline-0 w-full"
                  placeholder="Naam"
                />
                <input
                  type="text"
                  className="bg-[#E1FBE9] p-3 rounded outline-0 w-full"
                  placeholder="Naam"
                />
              </div>
              <button className="font-bold text-white text-xs rounded bg-[#BB76FF] p-3 px-5 w-fit block">
                VERTEL ME ALLES!
              </button>
            </div>
          </div>
          <div className="flex mt-3 w-full justify-evenly">
            <Link href="#">
              <img src="/assets/footer/map.svg" className="w-10 xl:w-13" alt="" />
            </Link>
            <Link href="#">
              <img src="/assets/footer/phone.svg" className="w-10 xl:w-13" alt="" />
            </Link>
            <Link href="#">
              <img src="/assets/footer/mail.svg" className="w-10 xl:w-13" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}