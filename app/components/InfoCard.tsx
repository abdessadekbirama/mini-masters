import { ReactNode } from "react";

export default function InfoCard({
  icon,
  title,
  description,
  iconWidth,
  pos,
}: {
  icon?: string;
  title?: ReactNode;
  description?: string;
  iconWidth?: number;
  pos?: number;
}) {
  return (
    <div className="">
      <div className="flex items-center relative justify-center w-[75%] m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl">
        <img
          src={icon}
          className="absolute"
          style={{ width: iconWidth, left: pos }}
          alt=""
        />
        {/* <h1 className="font-bold text-xl text-center text-[#FDF9EF] py-0.5 pl-3 w-full"> */}
        {title}
        {/* </h1> */}
      </div>
      <p className="text-[#67CD8A] font-medium text-center m-auto max-w-[75%] mt-8 ">
        {description}
      </p>
    </div>
  );
}
