import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SpotifyPlayer.css';

const SpotifyPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  // Add your MP3 files to /public/music/ folder and list them here
  const tracks = [
    { title: 'Track 1', artist: 'SRRL', file: '/music/track1.mp3' },
    { title: 'Track 2', artist: 'SRRL', file: '/music/track2.mp3' },
    { title: 'Track 3', artist: 'SRRL', file: '/music/track3.mp3' },
    // Add more tracks here
  ];

  // Update audio volume when volume slider changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handle track changes
  useEffect(() => {
    if (audioRef.current && tracks[currentTrack]) {
      audioRef.current.src = tracks[currentTrack].file;
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log('Playback error:', err));
      }
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log('Playback error:', err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Auto-play next track when current one ends
  const handleTrackEnd = () => {
    handleNext();
  };

  return (
    <motion.div
      className={`spotify-player ${isMinimized ? 'minimized' : ''}`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, type: "spring" }}
      drag
      dragConstraints={{ left: 0, right: window.innerWidth - 380, top: 0, bottom: window.innerHeight - 200 }}
      dragElastic={0.1}
    >
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onEnded={handleTrackEnd}
        preload="metadata"
      />

      {/* Walkman Body */}
      <div className="walkman-body">
        {/* Top Section with Branding */}
        <div className="walkman-top">
          <div className="brand-logo">
            <span className="brand-text">SRRL</span>
            <span className="model-text">PRO-88</span>
          </div>
          <button className="minimize-btn" onClick={toggleMinimize}>
            {isMinimized ? '▲' : '▼'}
          </button>
        </div>

        {!isMinimized && (
          <>
            {/* Cassette Window */}
            <div className="cassette-window">
              <div className="cassette-interior">
                {/* Cassette Reels */}
                <div className="cassette-reels-container">
                  <motion.div
                    className="cassette-reel left"
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                  >
                    <div className="reel-center" />
                    <div className="reel-spoke" style={{ transform: 'rotate(0deg)' }} />
                    <div className="reel-spoke" style={{ transform: 'rotate(60deg)' }} />
                    <div className="reel-spoke" style={{ transform: 'rotate(120deg)' }} />
                    <div className="reel-spoke" style={{ transform: 'rotate(180deg)' }} />
                    <div className="reel-spoke" style={{ transform: 'rotate(240deg)' }} />
                    <div className="reel-spoke" style={{ transform: 'rotate(300deg)' }} />
                  </motion.div>

                  <motion.div
                    className="cassette-reel right"
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                  >
                    <div className="reel-center" />
                    <div className="reel-spoke" style={{ transform: 'rotate(0deg)' }} />
                    <div className="reel-spoke" style={{ transform: 'rotate(60deg)' }} />
                    <div className="reel-spoke" style={{ transform: 'rotate(120deg)' }} />
                    <div className="reel-spoke" style={{ transform: 'rotate(180deg)' }} />
                    <div className="reel-spoke" style={{ transform: 'rotate(240deg)' }} />
                    <div className="reel-spoke" style={{ transform: 'rotate(300deg)' }} />
                  </motion.div>
                </div>

                {/* Cassette Label */}
                <div className="cassette-label">
                  <div className="label-line" />
                  <div className="label-text">SRRL MIXTAPE</div>
                  <div className="label-subtext">Vol. 1 • Side A</div>
                  <div className="label-line" />
                </div>
              </div>
            </div>

            {/* LED Display */}
            <div className="led-display">
              <div className="led-text">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="led-indicator"
                >
                  {isPlaying ? '▶' : '⏸'}
                </motion.div>
                <span className="track-info-text">
                  {tracks[currentTrack]?.title || 'No Track'} - {tracks[currentTrack]?.artist || ''}
                </span>
              </div>
              <div className="led-level">
                <span>VOL</span>
                <div className="led-bars">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`led-bar ${i < Math.floor(volume / 10) ? 'active' : ''}`}
                      animate={{
                        opacity: isPlaying && i < Math.floor(volume / 10) ? [0.5, 1, 0.5] : 1
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: isPlaying ? Infinity : 0,
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="track-counter">
                TRACK {String(currentTrack + 1).padStart(2, '0')} / {String(tracks.length).padStart(2, '0')}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="walkman-controls">
              <motion.button
                className="control-button rewind"
                onClick={handlePrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span>⏮</span>
              </motion.button>

              <motion.button
                className="control-button play-pause"
                onClick={togglePlay}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <span>{isPlaying ? '⏸' : '▶'}</span>
              </motion.button>

              <motion.button
                className="control-button forward"
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span>⏭</span>
              </motion.button>

              <motion.button
                className="control-button stop"
                onClick={handleStop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span>⏹</span>
              </motion.button>
            </div>

            {/* Volume Slider */}
            <div className="volume-section">
              <div className="volume-label">VOLUME</div>
              <div className="volume-control">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="volume-slider"
                />
                <div className="volume-markers">
                  {[0, 25, 50, 75, 100].map((mark) => (
                    <span key={mark} className="volume-marker">{mark}</span>
                  ))}
                </div>
              </div>
            </div>

          </>
        )}
      </div>
    </motion.div>
  );
};

export default SpotifyPlayer;
