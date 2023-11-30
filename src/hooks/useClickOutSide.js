import React, { useEffect } from "react";

export const useClickOutSide = (ref, callback) => {
  const handleClick = (e) => {
    if (
      e.target.getAttribute("class") == "rotate" ||
      e.target.getAttribute("class") == "checkedCat" ||
      e.target.getAttribute("class") == "roles_category" ||
      e.target.getAttribute("class") == "checkedArrow" ||
      e.target.getAttribute("class") == "checkedJob" ||
      e.target.getAttribute("class") == "roles_job"
    ) {
      return;
    }
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
};
