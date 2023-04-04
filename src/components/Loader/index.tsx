import React from "react";
import { BarLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <BarLoader color="#3b82f6" />
    </div>
  );
};

export default Loader;
