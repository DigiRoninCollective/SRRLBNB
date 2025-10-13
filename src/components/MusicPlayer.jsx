import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef(null);

  const tracks = [
    { title: 'Neon Nights', artist: 'SRRL' },
    { title: 'Electric Dreams', artist: 'SRRL' },
    { title: 'Shark Attack', artist: 'SRRL' },
    { title: 'Raptor Rage', artist: 'SRRL' },
    { title: 'Rocket Fuel', artist: 'SRRL' }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <motion.div
      className={`music-player ${isMinimized ? 'minimized' : ''}`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, type: "spring" }}
      drag
      dragConstraints={{ left: 0, right: window.innerWidth - 400, top: 0, bottom: window.innerHeight - 200 }}
      dragElastic={0.1}
    >
      {/* Cassette Tape Design */}
      <div className="player-header">
        <div className="cassette-top">
          <div className="cassette-label">
            <span className="label-text">SRRL MIX '85</span>
          </div>
          <div className="cassette-reels">
            <motion.div
              className="reel left-reel"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
            />
            <motion.div
              className="reel right-reel"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
            />
          </div>
        </div>
        <button className="minimize-btn" onClick={toggleMinimize}>
          {isMinimized ? '▲' : '▼'}
        </button>
      </div>

      {!isMinimized && (
        <>
          {/* Track Display */}
          <div className="track-display">
            <motion.div
              className="track-info"
              key={currentTrack}
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ type: "spring" }}
            >
              <div className="track-title">{tracks[currentTrack].title}</div>
              <div className="track-artist">{tracks[currentTrack].artist}</div>
            </motion.div>
            <div className="track-number">
              {String(currentTrack + 1).padStart(2, '0')} / {String(tracks.length).padStart(2, '0')}
            </div>
          </div>

          {/* Equalizer Bars */}
          <div className="equalizer">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="eq-bar"
                animate={{
                  height: isPlaying ? [
                    '20%',
                    `${Math.random() * 80 + 20}%`,
                    `${Math.random() * 80 + 20}%`,
                    '20%'
                  ] : ['20%']
                }}
                transition={{
                  duration: 0.5,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.05
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="player-controls">
            <motion.button
              className="control-btn"
              onClick={prevTrack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ⏮
            </motion.button>

            <motion.button
              className="control-btn play-btn"
              onClick={togglePlay}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? '⏸' : '▶'}
            </motion.button>

            <motion.button
              className="control-btn"
              onClick={nextTrack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ⏭
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="volume-control">
            <span className="volume-icon">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="volume-slider"
            />
            <span className="volume-value">{volume}%</span>
          </div>

          {/* VU Meters */}
          <div className="vu-meters">
            <div className="vu-meter">
              <div className="vu-label">L</div>
              <div className="vu-bar">
                <motion.div
                  className="vu-fill"
                  animate={{
                    width: isPlaying ? [`${volume * 0.5}%`, `${volume}%`, `${volume * 0.7}%`] : '0%'
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: isPlaying ? Infinity : 0
                  }}
                />
              </div>
            </div>
            <div className="vu-meter">
              <div className="vu-label">R</div>
              <div className="vu-bar">
                <motion.div
                  className="vu-fill"
                  animate={{
                    width: isPlaying ? [`${volume * 0.6}%`, `${volume * 0.9}%`, `${volume * 0.8}%`] : '0%'
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: isPlaying ? Infinity : 0,
                    delay: 0.1
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default MusicPlayer;
