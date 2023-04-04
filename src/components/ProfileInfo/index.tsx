import React from "react";

interface IProfileInfoProps {
  imgSrc: string;
  alt: string;
  text: string;
}

const ProfileInfo = (props: IProfileInfoProps) => {
  const { imgSrc, alt, text } = props;

  return (
    <div className="flex items-center gap-2">
      <img src={imgSrc} alt={alt} className="w-12 h-12 rounded-full" />
      <span>{text}</span>
    </div>
  );
};

export default ProfileInfo;
