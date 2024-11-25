import React, { useEffect, useState } from "react";

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.disconnect();
  }, []);

  return isMobile;
};