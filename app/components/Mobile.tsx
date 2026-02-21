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
