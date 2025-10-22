import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './IntroAnimation.css';

const IntroAnimation = ({ onComplete }) => {
  const [logoVisible, setLogoVisible] = useState(false);
  const [videoZoom, setVideoZoom] = useState(1);

  useEffect(() => {
    // Start showing logo subtly after 1 second
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 1000);

    // Gradually zoom the video
    const zoomInterval = setInterval(() => {
      setVideoZoom(prev => {
        const newZoom = prev + 0.002; // Slower, more subtle zoom
        if (newZoom >= 1.5) { // When zoom reaches 1.5x, trigger complete
          clearInterval(zoomInterval);
          setTimeout(() => onComplete(), 500);
        }
        return newZoom;
      });
    }, 30);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(zoomInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="intro-animation"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Ocean Video with Zoom Effect */}
      <motion.video
        className="ocean-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          transform: `scale(${videoZoom})`,
        }}
      >
        <source src="/ocean-zoom.mp4" type="video/mp4" />
      </motion.video>

      {/* Overlay */}
      <div className="intro-overlay" />

      {/* SRRL Logo - Subtle Fade In */}
      <motion.div
        className="srrl-logo-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: logoVisible ? 0.15 : 0, // Very subtle at first
          scale: logoVisible ? 1 : 0.8,
        }}
        transition={{
          duration: 3,
          ease: "easeOut"
        }}
      >
        <motion.img
          src="/srrl-logo.svg"
          alt="SRRL"
          className="srrl-logo"
          loading="eager"
          animate={{
            opacity: [0.15, 0.25, 0.15], // Pulse effect
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Subtle particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default IntroAnimation;
