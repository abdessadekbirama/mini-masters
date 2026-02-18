export default function Slider() {
  const data = [
    {
      bg: "img1.jpg",
      text1: "Losse ticket",
      text2: "1 persoon",
    },
    {
      bg: "img2.jpg",
      text1: "Groeps ticket",
      text2: "2-4 persoon",
    },
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

  const Card = ({
    bg,
    text1,
    text2,
  }: {
    bg: string;
    text1: string;
    text2: string;
  }) => {
    return (
      <div
        style={{
          background: `url('/assets/slider/${bg}') no-repeat center/cover`,
          boxShadow: "2px 4px 8px 0px #00000040",
        }}
        className="w-60 h-90 rounded-tr-[60px] rounded-bl-[60px] relative overflow-hidden text-white font-semibold flex flex-col items-center justify-between py-5 text-l"
      >
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(144, 119, 70, 0) 0%, rgba(56, 64, 163, 0.75) 100%)",
            height: "80%",
          }}
          className="absolute bottom-0 left-0 right-0 rounded-bl-[60px]"
        />
        <h1 className="z-20 text-center">{text1}</h1>
        <h1 className="z-20  text-center px-5">{text2}</h1>
      </div>
    );
  };
  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="wavyClip" clipPathUnits="objectBoundingBox">
            <path
              d="
              M 0,0.0647
              C 0.0335,0.0952  0.106,0.1135   0.106,0.1135
              C 0.1576,0.1265  0.1877,0.1208  0.2397,0.1135
              C 0.2916,0.1062  0.3202,0.0927  0.3715,0.0763
              C 0.4216,0.0602  0.4492,0.0457  0.4994,0.0305
              C 0.5471,0.0161  0.5738,0.0043  0.6221,0
              C 0.6715,-0.0044 0.6994,0.0006  0.7487,0.0091
              C 0.8484,0.0265  1,0.1056       1,0.1056
              L 1,0.9262
              C 0.929,0.884   0.8821,0.8719  0.8821,0.8719
              C 0.8305,0.8585  0.8021,0.8503  0.75,0.8505
              C 0.7022,0.8507  0.6738,0.861   0.6263,0.8719
              C 0.5761,0.8834  0.5492,0.9039  0.5,0.9262
              C 0.4532,0.9474  0.4189,0.9612  0.3715,0.9768
              C 0.3214,0.9933  0.2905,1.0031  0.2397,1
              C 0.1893,0.9969  0.1557,0.9927  0.106,0.9768
              C 0.0577,0.9614  0,0.9262       0,0.9262
              Z
            "
            />
          </clipPath>
        </defs>
      </svg>

      <div
        style={{ clipPath: "url(#wavyClip)", fontFamily: "Quicksand" }}
        className="w-full mt-2 md:h-[150vh] pt-44 h-[50vh] overflow-hidden bg-linear-to-r from-[#FFCA58] to-[#FFDB8D] "
      >
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
          <h1 className="font-bold md:text-xl text-center text-[#FDF9EF] bg-linear-to-r py-1 md:pl-0 pl-8 w-full rounded-br-4xl">
            ONZE ARRANGEMENTEN
          </h1>
        </div>
        <div className="mt-15 flex justify-center items-center">
          {data.map((item, index) => (
            <Card
              key={index}
              bg={item.bg}
              text1={item.text1}
              text2={item.text2}
            />
          ))}
        </div>
      </div>
    </>
  );
}
