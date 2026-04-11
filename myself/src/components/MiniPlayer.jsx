import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

const MiniPlayer = ({ song, isPlaying, isVisible, onPlayPause, onPrev, onNext }) => {
  const [isControls, setIsControls] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    setIsControls((prev) => !prev);
  };

  if (!song) return null;

  // Variants cho container — framer-motion sẽ interpolate tất cả style path
  const containerVariants = {
    full: {
      width: 360,
      height: 72,
      borderRadius: 40,
      backgroundColor: 'rgba(26,26,26,1)',
    },
    mini: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="miniplayer-root"
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{ position: 'fixed', top: 20, right: 20, zIndex: 60, display: 'flex', justifyContent: 'flex-end' }}
        >
          <motion.div
            layout
            variants={containerVariants}
            animate={isMinimized ? 'mini' : 'full'}
            initial={false}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.06)',
              cursor: isMinimized ? 'pointer' : 'default',
              ...(isMinimized ? {
                backdropFilter: 'url(#liquid-frosted)',
                WebkitBackdropFilter: 'url(#liquid-frosted)',
              } : {}),
              display: 'flex',
              alignItems: 'center',
              gap: isMinimized ? 0 : 10,
              padding: isMinimized ? 0 : 8,
            }}
            onClick={() => {
              if (isMinimized) setIsMinimized(false);
            }}
            whileTap={isMinimized ? { scale: 0.93 } : {}}
          >
            {/* ─── BUBBLE VIEW ─── */}
            <AnimatePresence mode="wait">
              {isMinimized ? (
                <motion.div
                  key="bubble"
                  initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.3, rotate: 20 }}
                  transition={{ type: 'spring', stiffness: 480, damping: 26 }}
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  {/* Vinyl disc */}
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={isPlaying
                      ? { duration: 4, repeat: Infinity, ease: 'linear' }
                      : { duration: 0.4 }
                    }
                    style={{
                      width: 48, height: 48,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                    }}
                  >
                    <img
                      src={song.coverSrc}
                      alt="cover"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* Center spindle hole */}
                    <motion.div
                      style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: 10, height: 10,
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                        background: 'rgba(250,250,248,0.85)',
                        boxShadow: '0 0 0 2px rgba(0,0,0,0.15)',
                        zIndex: 10,
                      }}
                    />
                  </motion.div>

                  {/* Playing pulse ring */}
                  {isPlaying && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        width: 48, height: 48,
                        borderRadius: '50%',
                        border: '1.5px solid rgba(29,209,161,0.7)',
                      }}
                    />
                  )}
                </motion.div>
              ) : (
                /* ─── FULL VIEW ─── */
                <motion.div
                  key="full"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.18, delay: 0.08 }}
                  style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  {/* Minimize btn */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isControls) {
                        setIsControls(false);
                      } else {
                        setIsMinimized(true);
                      }
                    }}
                    title={isControls ? 'Back' : 'Minimize'}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.12)' }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.06)',
                      border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', flexShrink: 0, marginLeft: 4,
                    }}
                  >
                    {isControls ? (
                      <svg style={{ width: 16, height: 16, stroke: '#aaa', strokeWidth: 2.5, fill: 'none' }} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    ) : (
                      <svg style={{ width: 14, height: 14, stroke: '#aaa', strokeWidth: 2.5, fill: 'none' }} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </motion.button>

                  {/* Card with cover */}
                  <div
                    onClick={handleCardClick}
                    style={{
                      flex: 1, height: '100%', borderRadius: 30,
                      position: 'relative', overflow: 'hidden', cursor: 'pointer',
                      backgroundImage: `url('${song.coverSrc}')`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      userSelect: 'none',
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
                      zIndex: 10, pointerEvents: 'none',
                    }} />

                    {/* Info view */}
                    <motion.div
                      animate={isControls ? { opacity: 0, x: -16 } : { opacity: 1, x: 0 }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      style={{
                        position: 'absolute', inset: 0, zIndex: 30,
                        display: 'flex', alignItems: 'center', padding: '0 12px', gap: 12,
                        pointerEvents: isControls ? 'none' : 'auto',
                      }}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); onPlayPause && onPlayPause(); }}
                        style={{
                          width: 44, height: 40, borderRadius: 14,
                          background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
                          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', flexShrink: 0,
                        }}
                      >
                        {isPlaying ? (
                          <svg style={{ width: 15, height: 15, fill: 'white' }} viewBox="0 0 24 24">
                            <rect x="7" y="5" width="3" height="14" rx="1.5" />
                            <rect x="14" y="5" width="3" height="14" rx="1.5" />
                          </svg>
                        ) : (
                          <svg style={{ width: 15, height: 15, fill: 'white', transform: 'translateX(1px)' }} viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                        <span style={{ color: 'white', fontSize: 14, fontWeight: 600, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{song.title}</span>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 500, letterSpacing: '0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 1 }}>{song.artist}</span>
                      </div>

                      {isPlaying && (
                        <motion.span
                          animate={{ opacity: [1, 0.2, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                          style={{ width: 7, height: 7, borderRadius: '50%', background: '#1dd1a1', flexShrink: 0, marginRight: 4, boxShadow: '0 0 6px rgba(29,209,161,0.8)', display: 'block' }}
                        />
                      )}
                    </motion.div>

                    {/* Controls view */}
                    <motion.div
                      animate={isControls ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      style={{
                        position: 'absolute', inset: 0, zIndex: 30,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 12px',
                        pointerEvents: isControls ? 'auto' : 'none',
                      }}
                    >
                      {[
                        { icon: <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />, fn: onPrev },
                        { icon: isPlaying ? <><rect x="7" y="5" width="3" height="14" rx="1.5" /><rect x="14" y="5" width="3" height="14" rx="1.5" /></> : <path d="M8 5v14l11-7z" />, fn: onPlayPause, highlight: true },
                        { icon: <path d="M6 18l8.5-6L6 6v12zm2.5-6 8.5 6V6z" />, fn: onNext },
                      ].map((btn, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); btn.fn && btn.fn(); }}
                          style={{
                            flex: 1, height: 44, borderRadius: 14,
                            background: btn.highlight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.35)',
                            backdropFilter: 'blur(8px)',
                            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <svg style={{ width: 15, height: 15, fill: 'white' }} viewBox="0 0 24 24">{btn.icon}</svg>
                        </button>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiniPlayer;
