import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MobileMenu.css';

const MobileMenu = ({ language, toggleLanguage, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <div className="mobile-menu-container">
      {/* Hamburger Button */}
      <motion.button
        className={`hamburger ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-overlay"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-panel"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobile-menu-header">
              <h3>Menu</h3>
              <button className="close-btn" onClick={closeMenu}>
                ✕
              </button>
            </div>

            <nav className="mobile-nav-links">
              <motion.a
                href="#about"
                className="mobile-nav-link"
                custom={0}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                onClick={closeMenu}
              >
                {t.nav.about}
              </motion.a>
              <motion.a
                href="#tokenomics"
                className="mobile-nav-link"
                custom={1}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                onClick={closeMenu}
              >
                {t.nav.tokenomics}
              </motion.a>
              <motion.a
                href="#roadmap"
                className="mobile-nav-link"
                custom={2}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                onClick={closeMenu}
              >
                {t.nav.roadmap}
              </motion.a>
              <motion.a
                href="#community"
                className="mobile-nav-link"
                custom={3}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                onClick={closeMenu}
              >
                {t.nav.community}
              </motion.a>

              <motion.button
                className="mobile-language-toggle"
                onClick={() => {
                  toggleLanguage();
                  closeMenu();
                }}
                custom={4}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
              >
                {language === 'en' ? '中文' : 'EN'}
              </motion.button>

              <motion.a
                href="#"
                className="mobile-buy-btn"
                custom={5}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                onClick={closeMenu}
              >
                {t.nav.buyNow}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
