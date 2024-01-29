import React, { useEffect, useState } from "react";
import splash from "../../assets/images/logo/splash.gif";
import style from "./SplashScreen.module.scss";

const SplashScreen = () => {
  const [show, setShow] = useState(true);
  const wrapperClass = `${style.wrapper} ${!show && style.animated}`;
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }, []);
  return (
    <div className={wrapperClass}>
      <img src={splash} alt="splash" />
    </div>
  );
};

export default SplashScreen;
