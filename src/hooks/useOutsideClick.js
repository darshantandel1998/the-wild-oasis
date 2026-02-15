import { useEffect, useRef } from "react";

export function useOutsideClick(handler, useCapture = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }
    document.addEventListener("click", handleClick, useCapture);
    return () => document.removeEventListener("click", handleClick, useCapture);
  }, [ref, handler, useCapture]);

  return ref;
}
