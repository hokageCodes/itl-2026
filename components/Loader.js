"use client";
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100
    const tl = gsap.timeline({
      onUpdate: () => {
        setProgress(Math.round(tl.progress() * 100));
      },
      onComplete: () => {
        // Small delay before calling onComplete
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 300);
      }
    });

    tl.to({}, {
      duration: 2,
      ease: "power2.out"
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-200 flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            {/* Progress Bar Fill */}
            <div
              className="h-full bg-gradient-to-r from-primary-600 to-primary-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Progress Percentage */}
          <div className="mt-4 text-center">
            <span className="text-primary-600 font-semibold text-lg">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

