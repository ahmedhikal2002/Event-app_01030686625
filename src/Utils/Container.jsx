import React from "react";

function Container({ children }) {
  return (
    <div className="container mx-auto min-h-screen flex flex-col">
      {children}
    </div>
  );
}

export default Container;
