import Link from "next/link";

export default function Nav() {
  return (
    <div
      style={{ fontFamily: "StudlyFree, sans-serif" }}
      className="flex px-10 pt-8 pb-15 bg-[url('/assets/header-bg.svg')] bg-cover gap-50"
    >
      <Link href="/">
        <img src="/assets/logo.svg" className="w-72" alt="" />
      </Link>
      <div className="flex gap-8 text-lg">
        <Link href="/" className="text-[#FF5757] ">
          HOME
        </Link>
        <Link href="/over-ons" className="text-[#5763FF]">
          OVER ONS
        </Link>
        <Link href="/tickets" className="text-[#FF5757]">
          TICKETS
        </Link>
        <Link href="/openingstijden" className="text-[#BB76FF]">
          OPENINGSTIJDEN
        </Link>
        <Link href="/faq" className="text-[#67CD8A]">
          FAQ
        </Link>
        <Link href="/contact" className="text-[#5763FF]">
          CONTACT
        </Link>
      </div>
    </div>
  );
}
