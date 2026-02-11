export default function Hero() {
  return (
    <div className="-mt-21" style={{ fontFamily: "Quicksand" }}>
      <img src="/assets/hero.svg" alt="" />
      <div className="mt-15 bg-[linear-gradient(60deg,#67CD8A_35%,#FDF9EF99_43%,#67CD8A_10%)] bg-clip-text text-transparent">
        <div className="">
          <h1 className="font-bold text-center text-8xl">TINY HEROES</h1>
          <h1 className="font-bold text-center text-8xl">BIG ADVENTURES</h1>
        </div>
      </div>
    </div>
  );
}
