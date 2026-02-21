// export default function Mobile() {
//   return (
//     <div className="mb-24" style={{ fontFamily: "Quicksand" }}>
//       <div className="relative w-fit">
//         {/* Full phone SVG visible in its entirety */}
//         <img
//           src="/assets/mobile/mobile.svg"
//           alt="Mobile frame"
//           className="block"
//           style={{ width: "320px" }}
//         />

//         {/* Content overlaid on the screen — adjust top/left/width/height to match your SVG's screen cutout */}
//         <div
//           className="absolute flex flex-col items-center gap-4 overflow-y-auto"
//           style={{
//             top: "12%",
//             left: "8%",
//             width: "84%",
//             height: "76%",
//             padding: "16px 14px",
//           }}
//         >
//           {/* Logo */}
//           <img
//             src="/assets/mobile/logo.svg"
//             className="w-28 object-contain"
//             alt="Logo"
//           />

//           <div className="w-10 h-1 rounded-full bg-orange-400 opacity-60" />

//           <p
//             className="text-center text-xs leading-relaxed"
//             style={{ color: "#5c3d1e", fontWeight: 500 }}
//           >
//             Elk avontuur duurt 2,5 uur. Kies hieronder jouw speelmoment en
//             ontdek het plezier!
//           </p>

//           <div className="flex flex-col gap-3 w-full mt-1">
//             {[
//               { label: "Kick start", time: "09:00 – 11:30", emoji: "🌅" },
//               { label: "Middag avontuur", time: "12:00 – 14:30", emoji: "☀️" },
//               { label: "Eind pret", time: "15:30 – 17:30", emoji: "🌇" },
//             ].map(({ label, time, emoji }) => (
//               <div
//                 key={label}
//                 className="flex items-center justify-between rounded-xl px-3 py-2"
//                 style={{
//                   background: "rgba(255,255,255,0.75)",
//                   boxShadow: "0 2px 8px rgba(200,120,50,0.12)",
//                   border: "1px solid rgba(255,180,100,0.35)",
//                 }}
//               >
//                 <div className="flex items-center gap-2">
//                   <span className="text-base">{emoji}</span>
//                   <div className="flex flex-col leading-tight">
//                     <span
//                       className="text-xs font-semibold uppercase tracking-wide"
//                       style={{ color: "#c96a1a" }}
//                     >
//                       {label}
//                     </span>
//                     <span
//                       className="text-xs font-bold"
//                       style={{ color: "#3b2510" }}
//                     >
//                       {time}
//                     </span>
//                   </div>
//                 </div>
//                 <div
//                   className="text-xs font-semibold px-2 py-1 rounded-full"
//                   style={{ background: "#ff8c00", color: "#fff" }}
//                 >
//                   Kies
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Mobile() {
  return (
    <div className="mb-24" style={{ fontFamily: "Quicksand" }}>
      <div className="relative w-fit">
        {/* Full phone SVG visible in its entirety */}
        <img
          src="/assets/mobile/mobile.svg"
          alt="Mobile frame"
          className="block h-[80vh]"
        />

        {/* Content overlaid on the screen — no overflow, everything fits */}
        <div className="absolute text-center text-white font-bold top-1/2 -translate-y-1/2 mt-3 p-4 pb-8 mx-5 gap-5 flex flex-col items-center overflow-hidden bg-[linear-gradient(200.1deg,#B1B6FF_2.75%,#D3D6FF_14.08%,#B1B6FF_33.74%,#B1B6FF_80.21%)] rounded-2xl ">
          {/* Logo */}
          <img
            src="/assets/mobile/logo.svg"
            className="object-contain shrink-0"
            alt="Logo"
            style={{ width: "90px" }}
          />
          <h1>
            Elk avontuur duurt 2,5 uur. Kies hieronder jouw speelmoment en
            ontdek het plezier!
          </h1>
          <div>
            <h1>Kick start</h1>
            <h1>09:00 - 11:30</h1>
          </div>
          <div>
            <h1>Middag avontuur:</h1>
            <h1>12:00 - 14:30</h1>
          </div>
          <div>
            <h1>Eind pret:</h1>
            <h1>15:30 - 17:30</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
