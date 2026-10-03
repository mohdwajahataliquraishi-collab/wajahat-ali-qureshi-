import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { globalSequenceManager, FramePreloadProgress } from '../utils/frameSequence';

interface LoadingScreenProps {
  brandName: string;
  onComplete: () => void;
  accentColor?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  brandName,
  onComplete,
  accentColor = '#FF5500'
}) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [statusMessage, setStatusMessage] = useState('INITIALIZING SEQUENCE');

  useEffect(() => {
    // Start sequence preloading
    globalSequenceManager.startPreload();

    const unsubscribe = globalSequenceManager.subscribe((info: FramePreloadProgress) => {
      // Scale progress up to 90% based on asset preloading
      const calculated = Math.min(95, Math.max(10, Math.round((info.loaded / 25) * 85)));
      setProgress((prev) => Math.max(prev, calculated));

      if (info.firstFrameReady) {
        setStatusMessage('BUFFERING 240-FRAME CANVASES');
      }
      if (info.isReady) {
        setStatusMessage('SYNCHRONIZING SCROLL VECTORS');
      }
    });

    // Minimum display timer for cinematic title sequence feel
    const minTimer = setTimeout(() => {
      setProgress(100);
      setStatusMessage('EXPERIENCE READY');
      setTimeout(() => {
        setIsDone(true);
        setTimeout(onComplete, 700);
      }, 500);
    }, 1800);

    return () => {
      unsubscribe();
      clearTimeout(minTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#EAEAEA] select-none"
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 cinematic-grain pointer-events-none opacity-40" />

          {/* Center Brand & Experience Title */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-display">
                {brandName}
              </h1>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs tracking-[0.3em] text-[#888888] font-mono uppercase">
                <span>AI</span>
                <span className="text-[#FF5500]">×</span>
                <span>WEB</span>
                <span className="text-[#FF5500]">×</span>
                <span>MOTION</span>
              </div>
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#737373] mb-6"
            >
              LOADING EXPERIENCE
            </motion.div>

            {/* Thin Orange Progress Bar */}
            <div className="w-full max-w-xs h-[2px] bg-[#1a1a1a] relative overflow-hidden rounded-full mb-4">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-[#FF5500]"
                style={{
                  backgroundColor: accentColor,
                  width: `${progress}%`
                }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            {/* Counter and micro status */}
            <div className="w-full max-w-xs flex justify-between items-center text-[10px] font-mono text-[#666666]">
              <span className="tracking-widest uppercase">{statusMessage}</span>
              <span className="tabular-nums text-white font-medium">{progress}%</span>
            </div>
          </div>

          {/* Minimal bottom marker */}
          <div className="absolute bottom-8 text-[10px] font-mono text-[#444444] tracking-widest uppercase">
            STUDIO 2026 · IMMERSIVE EXPERIENCE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
