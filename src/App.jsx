import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import IntroAnimation from './components/IntroAnimation';
import WelcomePopup from './components/WelcomePopup';
import SpotifyPlayer from './components/SpotifyPlayer';
import AnimatedBackground from './components/AnimatedBackground';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setShowContent(true);
  };

  // Fade-in animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="App">
      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Welcome Popup */}
      <WelcomePopup isOpen={showPopup} onClose={handlePopupClose} />

      {/* Spotify Player Widget */}
      {showContent && <SpotifyPlayer />}

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Navbar */}
            <motion.nav
              className="navbar"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="container">
                <motion.div
                  className="nav-brand gradient-text-blue"
                  whileHover={{ scale: 1.05 }}
                >
                  🦈🦖🚀 SRRL.FUN
                </motion.div>
                <div className="nav-links">
                  <a href="#about">About</a>
                  <a href="#tokenomics">Tokenomics</a>
                  <a href="#roadmap">Roadmap</a>
                  <a href="#community">Community</a>
                  <motion.a
                    href="#"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Buy Now
                  </motion.a>
                </div>
              </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="hero">
              <video className="hero-video" autoPlay muted loop playsInline>
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="hero-overlay" />

              <motion.div
                className="container hero-content"
                style={{ opacity }}
              >
                <motion.h1
                  className="hero-title"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.span
                    className="gradient-text-blue"
                    animate={{ textShadow: ["0 0 20px #00d4ff", "0 0 40px #00d4ff", "0 0 20px #00d4ff"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    SHARK RAPTOR
                  </motion.span>
                  <br />
                  <motion.span
                    className="gradient-text-purple"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ROCKET LAUNCH
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="hero-subtitle gradient-text-green"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  The Most Ferocious Memecoin in the Crypto Ocean
                </motion.p>

                <motion.p
                  className="hero-description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Combining the predatory instincts of sharks, the prehistoric power of raptors,
                  and the explosive momentum of a rocket launch. Ready to dominate the memecoin universe.
                </motion.p>

                <motion.div
                  className="hero-buttons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.a
                    href="#"
                    className="btn btn-large btn-primary"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Launch to the Moon 🚀
                  </motion.a>
                  <motion.a
                    href="#about"
                    className="btn btn-large btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.a>
                </motion.div>

                <motion.div
                  className="hero-stats"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { label: "$SRRL", value: "Ticker" },
                    { label: "1B", value: "Total Supply" },
                    { label: "0%", value: "Tax" }
                  ].map((stat, i) => (
                    <motion.div key={i} className="stat" variants={fadeInUp}>
                      <motion.h3
                        className="gradient-text-green"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.label}
                      </motion.h3>
                      <p>{stat.value}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </section>

            {/* About Section */}
            <motion.section
              id="about"
              className="about"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <div className="container">
                <motion.h2 className="section-title" variants={fadeInUp}>
                  What is SRRL?
                </motion.h2>
                <div className="about-grid">
                  {[
                    { icon: "🦈", title: "Shark Instinct", desc: "Like a great white in the ocean, SRRL hunts for opportunities in the crypto seas. We're apex predators in the memecoin ecosystem, always moving forward." },
                    { icon: "🦖", title: "Raptor Cunning", desc: "Velociraptors were pack hunters with superior intelligence. Our community works together with strategy and coordination to dominate the market." },
                    { icon: "🚀", title: "Rocket Power", desc: "Once we ignite, there's no stopping the ascent. SRRL is engineered for explosive growth and moon-bound trajectory. Strap in!" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="about-card"
                      variants={fadeInUp}
                      whileHover={{ y: -10, boxShadow: "0 20px 60px rgba(0, 212, 255, 0.4)" }}
                    >
                      <motion.div
                        className="icon"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {item.icon}
                      </motion.div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Tokenomics Section */}
            <motion.section
              id="tokenomics"
              className="tokenomics"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <div className="container">
                <motion.h2 className="section-title" variants={fadeInUp}>
                  Tokenomics
                </motion.h2>
                <div className="tokenomics-grid">
                  <motion.div variants={fadeInUp}>
                    <motion.div
                      className="tokenomics-chart"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  <motion.div className="tokenomics-details" variants={fadeInUp}>
                    <motion.div
                      className="launch-phase-banner"
                      variants={fadeInUp}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(255,215,0,0.4)",
                          "0 0 40px rgba(255,215,0,0.8)",
                          "0 0 20px rgba(255,215,0,0.4)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="phase-title">LAUNCHING PHASE 1 ON</div>
                      <div className="phase-platform">FOUR.MEME</div>
                    </motion.div>
                    {[
                      { label: "meme.fun", value: "99%", color: "#ffd700" },
                      { label: "Rockets", value: "1%", color: "#ff6b00" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="token-item"
                        whileHover={{ x: 10, backgroundColor: "rgba(0, 212, 255, 0.1)" }}
                      >
                        <div className="token-label">
                          <motion.span
                            className="color-badge"
                            style={{ background: item.color }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          />
                          <span>{item.label}</span>
                        </div>
                        <div className="token-value">{item.value}</div>
                      </motion.div>
                    ))}
                    <motion.div className="token-info" variants={fadeInUp}>
                      <p><strong>Total Supply:</strong> 1,000,000,000 $SRRL</p>
                      <p><strong>Contract:</strong> <span className="contract-address gradient-text-green">0x...</span></p>
                      <p><strong>Tax:</strong> 0% Buy / 0% Sell</p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Features Section */}
            <motion.section
              className="features"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <div className="container">
                <motion.h2 className="section-title" variants={fadeInUp}>
                  Why SRRL?
                </motion.h2>
                <div className="features-grid">
                  {[
                    { icon: "💎", title: "Community Driven", desc: "Built by the community, for the community. Every holder is part of the pack." },
                    { icon: "🔒", title: "Liquidity Locked", desc: "LP tokens locked forever. Your investment is protected by the deep blue ocean." },
                    { icon: "✅", title: "Contract Verified", desc: "Fully audited and transparent. No hidden functions, just pure memecoin power." },
                    { icon: "🎯", title: "Marketing Blitz", desc: "Aggressive marketing strategy across all platforms. We're everywhere." },
                    { icon: "🌊", title: "Fair Launch", desc: "No presale, no team allocation. Everyone starts at the same depth." },
                    { icon: "⚡", title: "Lightning Fast", desc: "Built on modern blockchain infrastructure for speed and efficiency." }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="feature-card"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                      <motion.div
                        className="feature-icon"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Roadmap Section */}
            <motion.section
              id="roadmap"
              className="roadmap"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <div className="container">
                <motion.h2 className="section-title" variants={fadeInUp}>
                  Mission Roadmap
                </motion.h2>
                <div className="roadmap-timeline">
                  {[
                    { icon: "🦈", title: "Phase 1: The Swim", items: ["Token Launch", "Website & Social Media", "Community Building", "1,000+ Holders"] },
                    { icon: "🦖", title: "Phase 2: The Hunt", items: ["CoinGecko Listing", "CoinMarketCap Listing", "Influencer Partnerships", "10,000+ Holders"] },
                    { icon: "🚀", title: "Phase 3: The Launch", items: ["Major Exchange Listings", "Strategic Partnerships", "NFT Collection Drop", "100,000+ Holders"] },
                    { icon: "🌙", title: "Phase 4: The Moon", items: ["Global Domination", "SRRL Ecosystem Expansion", "Charity Initiatives", "1,000,000+ Holders"] }
                  ].map((phase, i) => (
                    <motion.div key={i} className="roadmap-item" variants={fadeInUp}>
                      <motion.div
                        className="roadmap-marker"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring" }}
                      >
                        {phase.icon}
                      </motion.div>
                      <motion.div className="roadmap-content" whileHover={{ x: 5 }}>
                        <h3>{phase.title}</h3>
                        <ul>
                          {phase.items.map((item, j) => (
                            <motion.li
                              key={j}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.1 }}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Community Section */}
            <motion.section
              id="community"
              className="community"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <div className="container">
                <motion.h2 className="section-title" variants={fadeInUp}>
                  Join the Pack
                </motion.h2>
                <motion.p className="community-subtitle" variants={fadeInUp}>
                  Be part of the most ferocious community in crypto
                </motion.p>
                <motion.div className="social-links" variants={staggerContainer}>
                  {[
                    { name: "Twitter", color: "#1da1f2" },
                    { name: "Telegram", color: "#0088cc" },
                    { name: "Discord", color: "#5865f2" },
                    { name: "Reddit", color: "#ff4500" }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className="social-btn"
                      style={{ background: social.color }}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.name}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.section>

            {/* Footer */}
            <motion.footer
              className="footer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="container">
                <div className="footer-content">
                  <div className="footer-brand">
                    <h3 className="gradient-text-blue">🦈🦖🚀 SRRL</h3>
                    <p>Shark Raptor Rocket Launch</p>
                  </div>
                  <div className="footer-disclaimer">
                    <p><strong>Disclaimer:</strong> $SRRL is a memecoin created for entertainment purposes.
                    Cryptocurrency investments are risky. Please do your own research and never invest more than you can afford to lose.</p>
                  </div>
                </div>
                <div className="footer-bottom">
                  <p>&copy; 2024 SRRL. All rights reserved. Built by the community, for the community.</p>
                </div>
              </div>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
