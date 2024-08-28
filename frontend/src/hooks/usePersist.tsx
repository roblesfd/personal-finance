import { useState, useEffect } from "react";

const usePersist = () => {
  const [persist, setPersist] = useState(() => {
    const savedValue = localStorage.getItem("persist");
    return savedValue ? JSON.parse(savedValue) : false;
  });
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};

export default usePersist;
