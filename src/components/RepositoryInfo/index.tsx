import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";

interface IRepositoryInfoProps {
  name: string;
  description: string;
  link: string;
  stars: number;
}

const RepositoryInfo = (props: IRepositoryInfoProps) => {
  const { name, description, link, stars } = props;
  return (
    <a
      className="flex flex-col gap-4 bg-gray-300 w-full px-2 py-4 cursor-pointer"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-sm text-black font-bold">{name}</span>

        <div className="flex items-center gap-1">
          <span className="text-lg text-gray-500">{stars}</span>
          <StarIcon className="h-5 w-5 text-black font-bold" />
        </div>
      </div>
      <span className="text-sm text-gray-500">{description}</span>
    </a>
  );
};

export default RepositoryInfo;
