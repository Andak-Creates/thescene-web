"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      once: false,           // whether animation should happen only once - while scrolling down
      easing: "ease-out-cubic", // default easing for AOS animations
      duration: 800,        // values from 0 to 3000, with step 50ms
      offset: 50,           // offset (in px) from the original trigger point
    });
  }, []);

  return null;
};
