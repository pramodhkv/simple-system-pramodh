import React from "react";

interface IInfoMessageProps {
  message: string;
  className?: string;
}

const InfoMessage = (props: IInfoMessageProps) => {
  const { message, className = "text-xl" } = props;

  return (
    <div
      className="flex items-center justify-center w-full"
      data-testid="info-message"
    >
      <h2 className={`${className} font-bold`}>{message} 😢</h2>
    </div>
  );
};

export default InfoMessage;
