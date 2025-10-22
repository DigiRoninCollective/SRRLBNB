import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = ({ imageSrc }) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Detect mobile breakpoint
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);

    // Random VHS glitch effect - reduced frequency on mobile
    const glitchInterval = setInterval(() => {
      const threshold = isMobile ? 0.85 : 0.7; // Less frequent on mobile
      if (Math.random() > threshold) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, isMobile ? 5000 : 3000); // Longer intervals on mobile

    return () => {
      clearInterval(glitchInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <div className="animated-background">
      {/* Main Background Image with Parallax */}
      <motion.div
        className={`bg-image-container ${glitchActive ? 'glitch' : ''}`}
        initial={{ scale: 1.1 }}
        animate={{
          scale: [1.1, 1.15, 1.1],
          y: [0, -20, 0]
        }}
        transition={{
          duration: isMobile ? 25 : 15, // Slower animation on mobile for performance
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div
          className="bg-image"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />

        {/* Chromatic aberration layers */}
        <div
          className="bg-image-red"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
        <div
          className="bg-image-blue"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      </motion.div>

      {/* VHS Scanlines */}
      <div className="scanlines" />

      {/* VHS Static Noise */}
      <motion.div
        className="vhs-noise"
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 0.1, repeat: Infinity }}
      />

      {/* Retro Grid Overlay */}
      <div className="retro-grid">
        <motion.div
          className="grid-lines"
          animate={{ y: [0, 100] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Neon Glow Pulses */}
      <motion.div
        className="neon-pulse top-left"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="neon-pulse bottom-right"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />

      {/* Spotlight Effect */}
      <motion.div
        className="spotlight"
        animate={{
          x: ['0%', '100%', '0%'],
          y: ['0%', '50%', '0%']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* VHS Tracking Lines */}
      <motion.div
        className="tracking-lines"
        animate={{ y: [-100, window.innerHeight + 100] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Color Bars (VHS artifact) */}
      <motion.div
        className="color-bars"
        initial={{ opacity: 0 }}
        animate={{ opacity: glitchActive ? 1 : 0 }}
      >
        <div className="bar bar-1" />
        <div className="bar bar-2" />
        <div className="bar bar-3" />
        <div className="bar bar-4" />
      </motion.div>

      {/* Film Grain */}
      <div className="film-grain" />

      {/* Vignette */}
      <div className="vignette" />

      {/* Retro Sun Rays */}
      <div className="sun-rays">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="ray"
            style={{
              transform: `rotate(${i * 45}deg)`
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
