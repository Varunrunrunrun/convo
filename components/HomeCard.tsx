"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

export interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <section
      className={cn(
        " px-4 py-6 flex md:flex-col flex-row-reverse justify-between w-full xl:max-w-[270px] min-h-[100px] md:min-h-[260px] rounded-[14px] cursor-pointer group md:hover:scale-[1.05] duration-300",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt="meeting" width={27} height={27} />
      </div>

      <div className="flex flex-col ">
        <h1 className="text-[22px] font-bold opacity-70 group-hover:opacity-100 duration-300">
          {title}
        </h1>
        <p className="text-[14px] font-normal opacity-70 group-hover:opacity-100 duration-300">
          {description}
        </p>
      </div>
    </section>
  );
};

export default HomeCard;
