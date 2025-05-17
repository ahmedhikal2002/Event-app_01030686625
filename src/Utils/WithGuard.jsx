/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function WithGuard(Comp) {
  return () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    useEffect(() => {
      if (user?.role === "admin") {
        navigate("/dashboard", { replace: true });
      } else if (user?.role === "user") {
        navigate("/", { replace: true });
      }
    }, [user, navigate]);
    return <Comp />;
  };
}

export default WithGuard;
