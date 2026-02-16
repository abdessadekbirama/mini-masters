import InfoCard from "./InfoCard";

export default function Hero() {
  const infoCards = [
    {
      pos: -70,
      iconWidth: 120,
      icon: "/assets/icons/group.svg",

      title: (
        <h1 className="font-bold text-xl text-center text-[#FDF9EF] bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] py-1 w-full rounded-br-4xl">
          DE MINI <br /> MAATSCHAPPIJ
        </h1>
      ),
      description:
        "Binnen minimasters stappen kinderen in een wereld die volledig is afgestemd op hun eigen belevingswereld. zij krijgen de ruimte om spelenderwijs te ontdekken hoe vormen van samenwerking een belangrijke rol spelen in het dagelijks leven.",
    },
    {
      pos: -90,
      iconWidth: 150,

      icon: "/assets/icons/education.svg",
      title: (
        <h1 className="font-bold text-xl text-center text-[#FDF9EF] bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] py-1 pl-1 w-full rounded-br-4xl">
          HET EDUCATIEVE <br /> KARAKTER
        </h1>
      ),
      description:
        "Ons doel is om kinderen te laten leren door te doen, door actief deel te nemen aan herkenbare beroepen. Zelfvertrouwen en creativiteit krijgen de ruimte omdat er geen goed of fout bestaat: elk kind mag op zijn eigen manier ontdekken.",
    },
    {
      pos: -50,
      iconWidth: 100,

      icon: "/assets/icons/badge.svg",
      title: (
        <h1 className="font-bold text-xl text-center text-[#FDF9EF] bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] py-1 pl-1 w-full rounded-br-4xl">
          DE NIEUWE <br /> STANDAARD
        </h1>
      ),
      description:
        "MiniMasters biedt een hoogwaardige, schone en begeleide speelomgeving waarin kinderen worden uitgedaagd om te ontdekken en te creeëren. Geen drukke of chaotische speelplekken, maar rust, overzicht en aandacht.",
    },
  ];
  return (
    <div className="-mt-21 relative" style={{ fontFamily: "Quicksand" }}>
      <img src="/assets/hero.svg" alt="" />
      <div className="pt-28 relative">
        <img src="/assets/icons/gear.svg" className="absolute top-0 right-0 w-60" alt="" />
        <img src="/assets/icons/gear2.svg" className="absolute left-0 w-60" alt="" />
        <h1 className="text-8xl font-extrabold text-center bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#97d5ad] bg-clip-text text-transparent w-fit m-auto drop-shadow-lg">
          TINY HEROES
        </h1>
        <h1 className="text-8xl font-extrabold text-center bg-linear-to-r from-[#FFCA58] via-[#FFCA58] to-[#FFDB8D] bg-clip-text text-transparent w-fit m-auto drop-shadow-lg">
          BIG ADVENTURES
        </h1>
      </div>
      <div className="my-28 flex items-center justify-center gap-10 mx-24">
        {infoCards.map((card, index) => {
          return (
            <InfoCard
              pos={card.pos}
              iconWidth={card.iconWidth}
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          );
        })}
      </div>
    </div>
  );
}
