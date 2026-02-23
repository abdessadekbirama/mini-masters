"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function Faq() {
  const [clicked, setClicked] = useState(false);

  const toggleClick = () => {
    setClicked(!clicked);
  };

  const Card = () => {
    return (
      <div className="flex flex-col items-center mt-10 w-full">
        <h1 className="font-bold text-[#67CD8A] text-xl text-center mb-4 ">
          Algemene vragen
        </h1>
        <div
          onClick={toggleClick}
          className={`w-full cursor-pointer p-4 px-6 rounded-xl ${clicked ? "bg-[#67CD8A]" : "bg-[#FFFCF6]"}`}
        >
          <div className="flex items-center justify-between w-full">
            <h1
              className={`font-bold text-lg ${clicked ? "text-white" : "text-[#67CD8A]"}`}
            >
              Waar ligt Minimasters?
            </h1>
            <ChevronDown
              className={` ${clicked ? "text-white" : "text-[#F6CB78]"}`}
            />
          </div>
          {clicked && (
            <p className="text-white font-medium text-base">
              Minimasters ligt in het hart van de stad, aan de rand van het
              centrum.
            </p>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="my-24" style={{ fontFamily: "Quicksand" }}>
      <div className="flex w-fit md:px-10 px-5 md:py-4 py-2 md:pl-20 pl-10 items-center relative justify-center mx-auto m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl">
        <img
          src="/assets/faq/icon.svg"
          className="absolute md:hidden"
          style={{ width: "100px", left: "-10%" }}
          alt=""
        />
        <img
          src="/assets/faq/icon.svg"
          className="absolute hidden md:block"
          style={{ width: "130px", left: -50 }}
          alt=""
        />
        <h1 className="font-bold md:text-lg text-center text-[#FDF9EF] md:pl-0 pl-8 w-full rounded-br-4xl">
          VEELGESTELDE VRAGEN
        </h1>
      </div>
      <div className="w-1/2 flex flex-col items-center m-auto">
        <Card />
      </div>
    </div>
  );
}
