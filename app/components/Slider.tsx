"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function Slider() {
  const data = [
    { bg: "img1.jpg", text1: "Losse ticket", text2: "1 persoon" },
    { bg: "img2.jpg", text1: "Groeps ticket", text2: "2-4 persoon" },
    {
      bg: "img3.png",
      text1: "Abonnement",
      text2: "90 min. lang speelplezier + Speelruimte 1 + Speelruimte 2",
    },
    {
      bg: "img4.jpg",
      text1: "Jaar abonnement",
      text2: "Onbeperkt speelplezier + Speelruimte 1 + Speelruimte 2",
    },
    {
      bg: "img5.jpg",
      text1: "Kinderfeestje",
      text2: "150 min. lang speelplezier + Speelruimte 1 & 2 + Restaurant",
    },
  ];

  // ── Fill all slots at all times ────────────────────────────────────────────
  // The arc spans slots -(VISIBLE+EXIT_TRAVEL+1) .. +(VISIBLE+ENTER_TRAVEL+1)
  // = -4 .. +4 = 9 slots. With only 5 source cards some slots stay empty.
  // Fix: repeat the source data enough times so DOM card count ≥ total slots.
  // We need at least: (VISIBLE*2 + EXIT_TRAVEL + ENTER_TRAVEL + 3) cards.
  // With defaults that's 9. Repeat source until we have ≥ 9 DOM cards.
  const SLOTS_NEEDED = 9; // = VISIBLE*2 + EXIT_TRAVEL + ENTER_TRAVEL + 3
  const repeatCount = Math.ceil(SLOTS_NEEDED / data.length);
  const cards = Array.from({ length: repeatCount }, () => data).flat();
  const total = cards.length;

  const [screenW, setScreenW] = useState(1440);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 1440, h: 800 });

  useEffect(() => {
    const updateScreen = () => setScreenW(window.innerWidth);
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ w: width, h: height });
    });
    observer.observe(el);
    setContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const isMobile = screenW < 768;
  const CARD_WIDTH = isMobile ? Math.round((220 * 2) / 3) : 220;
  const CARD_HEIGHT = isMobile ? Math.round((330 * 2) / 3) : 330;

  // ── Slot layout ────────────────────────────────────────────────────────────
  //
  //  slot: ...  -4   -3   -2   -1   0   +1   +2   +3   +4  ...
  //             [off-left]  [visible arc: -2 to +2]  [off-right]
  //
  //  VISIBLE = 2  → slots -2 .. +2 are on-screen
  //  EXIT_SLOT = -3  → card is still moving left, now behind the left edge
  //  RECYCLE_AT = -4 → card has fully exited, safe to teleport it
  //  ENTER_FROM = +4 → card re-enters from here and travels left into view
  //
  //  The gap between RECYCLE_AT and ENTER_FROM must be large enough that
  //  the teleport always happens while the card is completely off-screen.
  //  With ANGLE_STEP=22 each slot is ~22° apart so slot ±3 is well off-screen.
  //
  const VISIBLE = 2; // visible slots each side of center
  const EXIT_TRAVEL = 1; // extra slots a card travels past the edge before recycling
  const ENTER_TRAVEL = 1; // extra slots the card enters from beyond the edge

  // The slot at which we decide the card has fully exited and can be recycled
  const RECYCLE_AT = -(VISIBLE + EXIT_TRAVEL + 1); // = -4

  // Where we drop the recycled card so it travels ENTER_TRAVEL slots before
  // reaching the visible right edge.  This must be > VISIBLE so it starts hidden.
  const ENTER_FROM = VISIBLE + ENTER_TRAVEL + 1; // = +4

  const ANGLE_STEP = 22;
  const GAP = isMobile ? 14 : 24;
  const angleRad1 = (ANGLE_STEP * Math.PI) / 180;
  const RADIUS = (CARD_WIDTH + GAP) / Math.sin(angleRad1);

  const isAnimating = useRef(false);

  // virtualIndex increments by 1 each tick.
  // slot of card i  =  cardVirtual[i] - virtualIndex
  const [virtualIndex, setVirtualIndex] = useState(0);
  // Spread cards evenly so every slot from -(total/2)..+(total/2) is filled
  // at startup. This guarantees the arc is fully populated on first render.
  const half = Math.floor(total / 2);
  const cardVirtual = useRef<number[]>(cards.map((_, i) => i - half));

  // Cards in this set have transition:none for one paint so the teleport
  // from off-left to off-right is invisible.
  const [teleportingCards, setTeleportingCards] = useState<Set<number>>(
    new Set(),
  );

  const getSlot = (index: number) => cardVirtual.current[index] - virtualIndex;

  // ── Style ──────────────────────────────────────────────────────────────────
  const getCardStyle = (
    slot: number,
    teleporting = false,
  ): React.CSSProperties => {
    const angleDeg = slot * ANGLE_STEP;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = RADIUS * Math.sin(angleRad);
    const y = RADIUS * (1 - Math.cos(angleRad)) * 0.45;

    const absSlot = Math.abs(slot);

    // Scale: smoothly shrinks as slots move away from center
    const scale = Math.max(0.55, 1 - absSlot * 0.12);

    // zIndex: center on top, others behind
    const zIndex = Math.max(0, 6 - absSlot);

    // Opacity:
    //   slots -VISIBLE .. +VISIBLE  → fully visible
    //   slots ±(VISIBLE+1)          → fading out/in (still moving, just past edge)
    //   slots beyond that           → invisible (off-screen travel zone)
    const opacity =
      absSlot <= VISIBLE
        ? 1
        : absSlot === VISIBLE + 1
          ? 0 // just crossed the edge – already hidden but still moving
          : 0; // deep off-screen

    // Transition:
    //   - teleporting: NO transition (instant jump, must be invisible)
    //   - otherwise:   smooth transition for all positional properties
    //
    // Crucially we DO animate cards at slot ±(VISIBLE+1) and beyond —
    // that's what makes them physically travel off/onto the screen
    // rather than just popping in/out.
    const transition = teleporting
      ? "none"
      : [
          "left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "opacity 0.3s ease",
        ].join(", ");

    return {
      position: "absolute",
      width: `${CARD_WIDTH}px`,
      left: `calc(50% + ${x}px - ${CARD_WIDTH / 2}px)`,
      top: `${y}px`,
      transform: `rotate(${angleDeg * 0.6}deg) scale(${scale})`,
      transformOrigin: "bottom center",
      zIndex,
      opacity,
      transition,
      pointerEvents: absSlot > VISIBLE ? "none" : "auto",
    };
  };

  // ── next() ─────────────────────────────────────────────────────────────────
  const next = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setVirtualIndex((prev) => {
      const nextV = prev + 1;

      // ── Find the card that has reached RECYCLE_AT ──────────────────────
      // After virtualIndex becomes nextV, a card whose virtual value equals
      // nextV + RECYCLE_AT will be sitting at slot RECYCLE_AT (fully off-left).
      // We find it NOW (using prev) so we can act on it synchronously.
      //
      // The card currently at slot (RECYCLE_AT + 1) relative to prev will be
      // at slot RECYCLE_AT relative to nextV — that's the one to recycle.
      const targetSlotNow = RECYCLE_AT + 1; // slot relative to prev
      const exitingDataIndex = cardVirtual.current.findIndex(
        (v) => v - prev === targetSlotNow,
      );

      if (exitingDataIndex !== -1) {
        // ── Teleport: snap from off-left to off-right with no transition ──
        //
        // New virtual value puts this card at slot ENTER_FROM relative to nextV.
        // It is off-screen on the right (absSlot > VISIBLE), invisible, and will
        // travel leftward over the next ENTER_TRAVEL+1 ticks before becoming visible.
        //
        // The teleport is invisible because:
        //   a) the card was already at opacity=0 (off-left)
        //   b) transition:none so there is no animated sweep across the screen
        //   c) the new position is also opacity=0 (off-right)
        const targetVirtual = nextV + ENTER_FROM;

        // Mark as teleporting → transition:none for this render
        setTeleportingCards((s) => new Set(s).add(exitingDataIndex));
        cardVirtual.current[exitingDataIndex] = targetVirtual;

        // Two rAFs: frame 1 paints at new position with no transition,
        // frame 2 restores transitions so the card slides smoothly inward.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTeleportingCards((s) => {
              const n = new Set(s);
              n.delete(exitingDataIndex);
              return n;
            });
          });
        });
      }

      return nextV;
    });

    setTimeout(() => {
      isAnimating.current = false;
    }, 520);
  }, [RECYCLE_AT, ENTER_FROM]);

  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [next]);

  // ── Wave clip path ─────────────────────────────────────────────────────────
  const W = containerSize.w || 1440;
  const H = containerSize.h || 800;
  const AMP = isMobile ? 20 : 40;

  const wavePath = [
    `M 0,${AMP * 1.0}`,
    `C ${W * 0.0335},${AMP * 1.5}  ${W * 0.106},${AMP * 1.83}  ${W * 0.106},${AMP * 1.83}`,
    `C ${W * 0.1576},${AMP * 2.0}  ${W * 0.1877},${AMP * 1.92} ${W * 0.2397},${AMP * 1.83}`,
    `C ${W * 0.2916},${AMP * 1.75} ${W * 0.3202},${AMP * 1.5}  ${W * 0.3715},${AMP * 1.25}`,
    `C ${W * 0.4216},${AMP * 1.0}  ${W * 0.4492},${AMP * 0.67} ${W * 0.4994},${AMP * 0.5}`,
    `C ${W * 0.5471},${AMP * 0.25} ${W * 0.5738},${AMP * 0.08} ${W * 0.6221},${0}`,
    `C ${W * 0.6715},${-AMP * 0.08} ${W * 0.6994},${0} ${W * 0.7487},${AMP * 0.17}`,
    `C ${W * 0.8484},${AMP * 0.5}  ${W},${AMP * 1.67} ${W},${AMP * 1.67}`,
    `L ${W},${H - AMP * 1.0}`,
    `C ${W * (1 - 0.0335)},${H - AMP * 1.5}  ${W * (1 - 0.106)},${H - AMP * 1.83}  ${W * (1 - 0.106)},${H - AMP * 1.83}`,
    `C ${W * (1 - 0.1576)},${H - AMP * 2.0}  ${W * (1 - 0.1877)},${H - AMP * 1.92} ${W * (1 - 0.2397)},${H - AMP * 1.83}`,
    `C ${W * (1 - 0.2916)},${H - AMP * 1.75} ${W * (1 - 0.3202)},${H - AMP * 1.5}  ${W * (1 - 0.3715)},${H - AMP * 1.25}`,
    `C ${W * (1 - 0.4216)},${H - AMP * 1.0}  ${W * (1 - 0.4492)},${H - AMP * 0.67} ${W * (1 - 0.4994)},${H - AMP * 0.5}`,
    `C ${W * (1 - 0.5471)},${H - AMP * 0.25} ${W * (1 - 0.5738)},${H - AMP * 0.08} ${W * (1 - 0.6221)},${H}`,
    `C ${W * (1 - 0.6715)},${H + AMP * 0.08} ${W * (1 - 0.6994)},${H} ${W * (1 - 0.7487)},${H - AMP * 0.17}`,
    `C ${W * (1 - 0.8484)},${H - AMP * 0.5}  ${0},${H - AMP * 1.67} ${0},${H - AMP * 1.67}`,
    `Z`,
  ].join(" ");

  const clipId = "wavyClipFixed";

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <div
        ref={containerRef}
        style={{
          fontFamily: "Quicksand",
          position: "relative",
          clipPath: `url(#${clipId})`,
        }}
        className="w-full relative mt-2 md:h-fit h-screen pt-28 md:pt-32 bg-linear-to-r from-[#FFCA58] to-[#FFDB8D] overflow-hidden"
      >
        {/* Invisible SVG — defines wave clip geometry */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path d={wavePath} />
            </clipPath>
          </defs>
        </svg>

        <img
          src="/assets/icons/cards-icon1.svg"
          className="absolute right-0 top-10 md:w-80 w-30"
          alt=""
        />
        <img
          src="/assets/icons/cards-icon2.svg"
          className="absolute left-0 md:w-40 w-20"
          alt=""
        />

        {/* Header badge */}
        <div className="flex w-fit md:px-10 px-5 md:py-4 py-2 md:pl-20 pl-10 items-center relative justify-center mx-auto m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl">
          <img
            src="/assets/icons/badge2.svg"
            className="absolute md:hidden"
            style={{ width: "100px", left: "-10%" }}
            alt=""
          />
          <img
            src="/assets/icons/badge2.svg"
            className="absolute hidden md:block"
            style={{ width: "130px", left: -50 }}
            alt=""
          />
          <h1 className="font-bold md:text-xl text-center text-[#FDF9EF] py-1 md:pl-0 pl-8 w-full rounded-br-4xl">
            ONZE ARRANGEMENTEN
          </h1>
        </div>

        {/* Arc Carousel */}
        <div
          className="relative mt-10 w-full mb-44"
          style={{ height: `${CARD_HEIGHT + 180}px`, overflow: "visible" }}
        >
          {cards.map((item, index) => {
            const slot = getSlot(index);
            const isTeleporting = teleportingCards.has(index);

            return (
              <div key={index} style={getCardStyle(slot, isTeleporting)}>
                <div
                  style={{
                    background: `url('/assets/slider/${item.bg}') no-repeat center/cover`,
                    boxShadow: "4px 8px 24px 0px #00000055",
                    height: `${CARD_HEIGHT}px`,
                  }}
                  className="rounded-tr-[60px] rounded-bl-[60px] relative overflow-hidden text-white font-semibold flex flex-col items-center justify-between py-5 cursor-pointer"
                  onClick={next}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(144, 119, 70, 0) 0%, rgba(56, 64, 163, 0.75) 100%)",
                      height: "80%",
                    }}
                    className="absolute bottom-0 left-0 right-0 rounded-bl-[60px]"
                  />
                  <h1 className="z-20 text-center text-sm px-3">
                    {item.text1}
                  </h1>
                  <h1 className="z-20 text-center px-5 text-sm">
                    {item.text2}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
