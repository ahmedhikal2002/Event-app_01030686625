import React from "react";
import ThemeMode from "./ThemeMode";
import Container from "./Container";
function Heading({ children }) {
  return (
    <div className="container mx-auto flex-bet px-5 lg:px-0">
      <h2 className="text-2xl font-bold my-8 text-primary-dark dark:text-Primary-light flex-1">
        {children}
      </h2>
      <ThemeMode />
    </div>
  );
}

export default Heading;
