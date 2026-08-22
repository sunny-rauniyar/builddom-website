"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = (scrollTop / height) * 100;

      setProgress(progress);
    };

    window.addEventListener("scroll", updateProgress);

    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[100] h-1 w-full bg-transparent">
      <div
        className="h-full bg-[#F58220] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}