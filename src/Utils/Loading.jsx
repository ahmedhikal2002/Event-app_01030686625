import Lottie from "lottie-react";
import React from "react";
import Load from "../assets/Lottie/loading.json";

function Loading({ isLoading, children }) {
  const isNativeButton = children?.type === "button";

  if (isLoading) {
    if (isNativeButton) {
      return React.cloneElement(children, {
        disabled: true,
        children: (
          <Lottie animationData={Load} loop className="w-6 h-6 mx-auto" />
        ),
      });
    }

    return (
      <div className="flex-cen mt-10">
        <Lottie animationData={Load} loop={true} className="w-40" />
      </div>
    );
  }

  return <>{children}</>;
}

export default Loading;
