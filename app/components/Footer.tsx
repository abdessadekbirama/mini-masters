import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative w-full h-screen -mt-20 ">
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

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div>
          <Link href="/">
            <img src="/assets/footer/logo.svg" alt="" />
          </Link>
          <div>
            <Link href="#"></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
