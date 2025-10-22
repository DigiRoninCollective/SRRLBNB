import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import IntroAnimation from './components/IntroAnimation';
import WelcomePopup from './components/WelcomePopup';
import SpotifyPlayer from './components/SpotifyPlayer';
import MobileMenu from './components/MobileMenu';
import { translations } from './translations';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [language, setLanguage] = useState('en');

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Prevent auto-scroll to anchor on initial load
  useEffect(() => {
    // Disable browser scroll restoration immediately
    window.history.scrollRestoration = 'manual';

    // Remove hash from URL if it exists
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Force scroll to top again after a short delay to override any browser restoration
    const scrollTimer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(scrollTimer);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setShowContent(true);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const t = translations[language];

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
            style={{ paddingTop: '0' }}
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
                  {t.nav.brand}
                  {language === 'en' && (
                    <span style={{
                      fontSize: '0.6rem',
                      marginLeft: '0.5rem',
                      color: '#ffd700',
                      textShadow: '0 0 10px #ffd700'
                    }}>
                      鲨鱼猛禽火箭发射器
                    </span>
                  )}
                </motion.div>
                <div className="nav-links">
                  <a href="#about">{t.nav.about}</a>
                  <a href="#tokenomics">{t.nav.tokenomics}</a>
                  <a href="#roadmap">{t.nav.roadmap}</a>
                  <a href="#community">{t.nav.community}</a>
                  <motion.button
                    onClick={toggleLanguage}
                    className="language-toggle"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: 'linear-gradient(145deg, #ffd700, #ffb700)',
                      border: '2px solid #000',
                      borderRadius: '8px',
                      padding: '0.5rem 1rem',
                      color: '#000',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      boxShadow: '0 4px 0 #ff6b00, 0 0 15px rgba(255,215,0,0.5)',
                      fontFamily: "'Press Start 2P', cursive"
                    }}
                  >
                    {language === 'en' ? '中文' : 'EN'}
                  </motion.button>
                  <motion.a
                    href="#"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.nav.buyNow}
                  </motion.a>
                </div>
                <MobileMenu language={language} toggleLanguage={toggleLanguage} t={t} />
              </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="hero">
              <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
              >
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
                    {t.hero.title1}
                  </motion.span>
                  <br />
                  <motion.span
                    className="gradient-text-purple"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {t.hero.title2}
                  </motion.span>
                  {language === 'en' && (
                    <>
                      <br />
                      <motion.span
                        className="chinese-text"
                        style={{
                          fontSize: '2rem',
                          color: '#ffd700',
                          textShadow: '0 0 20px #ffd700, 0 0 40px #ffd700',
                          fontWeight: 'bold',
                          letterSpacing: '0.3rem'
                        }}
                        animate={{
                          textShadow: [
                            "0 0 20px #ffd700, 0 0 40px #ffd700",
                            "0 0 30px #ffd700, 0 0 60px #ffd700",
                            "0 0 20px #ffd700, 0 0 40px #ffd700"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        鲨鱼猛禽火箭发射器
                      </motion.span>
                    </>
                  )}
                </motion.h1>

                {/* SRRL OG Logo */}
                <motion.img
                  src="/srrlog.png"
                  alt="SRRL OG Logo"
                  className="hero-og-logo"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  style={{
                    maxWidth: 'min(100vw - 2rem, 500px)',
                    width: '100%',
                    height: 'auto',
                    margin: '2rem auto 0',
                    display: 'block',
                    filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.4))'
                  }}
                />

                <motion.p
                  className="hero-subtitle gradient-text-green"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {t.hero.subtitle}
                </motion.p>

                <motion.p
                  className="hero-description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {t.hero.description}
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
                    {t.hero.launchButton}
                  </motion.a>
                  <motion.a
                    href="#about"
                    className="btn btn-large btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.hero.learnMore}
                  </motion.a>
                </motion.div>

                <motion.div
                  className="hero-stats"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { label: t.hero.stats.ticker.label, value: t.hero.stats.ticker.value },
                    { label: t.hero.stats.supply.label, value: t.hero.stats.supply.value },
                    { label: t.hero.stats.tax.label, value: t.hero.stats.tax.value }
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
                  {t.about.title}
                </motion.h2>
                <div className="about-grid">
                  {t.about.cards.map((item, i) => (
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
                        {["🦈", "🦖", "🚀"][i]}
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
                  {t.tokenomics.title}
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
                      <div className="phase-title">{t.tokenomics.launchBanner.title}</div>
                      <div className="phase-platform">{t.tokenomics.launchBanner.platform}</div>
                    </motion.div>
                    {t.tokenomics.distribution.map((item, i) => (
                      <motion.div
                        key={i}
                        className="token-item"
                        whileHover={{ x: 10, backgroundColor: "rgba(0, 212, 255, 0.1)" }}
                      >
                        <div className="token-label">
                          <motion.span
                            className="color-badge"
                            style={{ background: ["#ffd700", "#ff6b00"][i] }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          />
                          <span>{item.label}</span>
                        </div>
                        <div className="token-value">{item.value}</div>
                      </motion.div>
                    ))}
                    <motion.div className="token-info" variants={fadeInUp}>
                      <p><strong>{t.tokenomics.info.totalSupply}</strong> {t.tokenomics.info.totalSupplyValue}</p>
                      <p><strong>{t.tokenomics.info.contract}</strong> <span className="contract-address gradient-text-green">0x...</span></p>
                      <p><strong>{t.tokenomics.info.tax}</strong> {t.tokenomics.info.taxValue}</p>
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
                  {t.features.title}
                </motion.h2>
                <div className="features-grid">
                  {t.features.items.map((item, i) => (
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
                        {["💎", "🔒", "✅", "🎯", "🌊", "⚡"][i]}
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
                  {t.roadmap.title}
                </motion.h2>
                <div className="roadmap-timeline">
                  {t.roadmap.phases.map((phase, i) => (
                    <motion.div key={i} className="roadmap-item" variants={fadeInUp}>
                      <motion.div
                        className="roadmap-marker"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring" }}
                      >
                        {["🦈", "🦖", "🚀", "🌙"][i]}
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
                  {t.community.title}
                </motion.h2>
                <motion.p className="community-subtitle" variants={fadeInUp}>
                  {t.community.subtitle}
                </motion.p>
                <motion.div className="social-links" variants={staggerContainer}>
                  {[
                    { name: "X Community", icon: "𝕏", color: "#000000", url: "https://x.com/i/communities/1916929954207375831" },
                    { name: "Telegram", icon: "✈", color: "#0088cc", url: "https://t.me/SRRLonBNB" },
                    { name: "YouTube", icon: "▶", color: "#ff0000", url: "https://www.youtube.com/@raptorcrew" },
                    { name: "Spotify", icon: "♫", color: "#1db954", url: "https://open.spotify.com/track/0VqRtmNBbbtIAHq1qDcrUA" },
                    { name: "Forbes", icon: "𝐅", color: "#FF6B00", url: "https://www.forbes.com/digital-assets/assets/shark-raptor-rocket-launcher-srrl/" }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                      style={{ background: social.color }}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>{social.icon}</span>
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
                    <p>{t.footer.brand}</p>
                  </div>
                  <div className="footer-disclaimer">
                    <p><strong>{t.footer.disclaimer}</strong> {t.footer.disclaimerText}</p>
                  </div>
                </div>
                <div className="footer-bottom">
                  <p>{t.footer.copyright}</p>
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
