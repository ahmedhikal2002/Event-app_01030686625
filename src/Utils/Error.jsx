import Lottie from "lottie-react";
import React from "react";
import Err from "../assets/Lottie/error.json";
function Error({ children, error }) {
  if (error) {
    <div className="flex-cen mt-10">
      <Lottie animationData={Err} loop={true} className="w-40" />
    </div>;
  }
  return <>{children}</>;
}

export default Error;
