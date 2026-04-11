import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../support/profileCard.css';
import workData from '../data/workData';


const development = [
  'Python', 'JavaScript', 'HTML/CSS', 'React', 'Java Spring', 'PostgreSQL', 'Git'
];

const animation = [
  'candy: a zelink fan animation',
  'of the wild',
];

const checkWorkArr = () => {
  if (workData.length === 0) {
    return false;
  }
  return true;
}

const labelStyle = {
  fontFamily: "'Zen Kaku Gothic New', sans-serif",
  fontSize: '0.62rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.25em',
  color: '#73716A',
};

const TagButton = ({ label }) => (
  <button
    style={{
      fontFamily: "'Zen Kaku Gothic New', sans-serif",
      fontSize: '0.78rem',
      fontWeight: 400,
      letterSpacing: '0.02em',
      color: '#1C1B1A',
      background: 'transparent',
      border: '1px solid #CFCDC5',
      borderRadius: '20px',
      padding: '5px 13px',
      cursor: 'default',
      transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
      whiteSpace: 'nowrap',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = '#F5F3EF';
      e.currentTarget.style.borderColor = '#A8A59E';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.borderColor = '#CFCDC5';
    }}
  >
    {label}
  </button>
);

const WorkModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="work-modal"
          drag
          dragMomentum={false}
          dragElastic={0.08}
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 18 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: -260,
            marginLeft: -255,
            zIndex: 50,
            width: 510,
            cursor: 'grab',
            background: '#FAFAF8',
            boxShadow: '0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)',
            borderBottom: '2px solid #E0DDD4',
            borderRight: '1px solid #E0DDD4',
          }}
          onPointerDown={e => (e.currentTarget.style.cursor = 'grabbing')}
          onPointerUp={e => (e.currentTarget.style.cursor = 'grab')}
        >
          {/* macOS Window Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 14px',
              background: '#F2F0EB',
              borderBottom: '1px solid #E0DDD4',
              gap: 7,
              position: 'relative',
            }}
          >
            {/* 3 iOS dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', border: '0.5px solid rgba(0,0,0,0.1)', cursor: 'default' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E', border: '0.5px solid rgba(0,0,0,0.1)', cursor: 'default' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840', border: '0.5px solid rgba(0,0,0,0.1)', cursor: 'default' }} />
            </div>

            {/* Centered title */}
            <span
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: "'Zen Kaku Gothic New', sans-serif",
                fontSize: 12,
                color: '#73716A',
                fontStyle: 'italic',
                userSelect: 'none',
              }}
            >
              work
            </span>

            {/* X close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                opacity: 0.3,
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.3')}
            >
              <svg viewBox="0 0 10 10" fill="none" style={{ width: 10, height: 10, stroke: '#1C1B1A', strokeWidth: 1.5, strokeLinecap: 'round' }}>
                <line x1="1" y1="1" x2="9" y2="9" />
                <line x1="9" y1="1" x2="1" y2="9" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div
            className="profile-card-content"
            style={{ overflowY: 'auto', maxHeight: 620, padding: '20px 22px 24px' }}
          >

            <div style={{ height: 1, background: '#E0DDD4', marginBottom: 20 }} />

            {/* DEVELOPMENT */}
            <section style={{ marginBottom: 20 }}>
              <p style={{ ...labelStyle, marginBottom: 10 }}>Development</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {development.map(d => <TagButton key={d} label={d} />)}
              </div>
            </section>

            <div style={{ height: 1, background: '#E0DDD4', marginBottom: 20 }} />

            {/* WORK LIST */}
            <section>
              <p style={{ ...labelStyle, marginBottom: 12 }}>Works</p>
              {checkWorkArr() ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {workData.map(work => (
                    <a
                      key={work.id}
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        gap: 16,
                        background: '#F2F0EB',
                        border: '1px solid #E0DDD4',
                        borderRadius: 5,
                        padding: 12,
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'background 0.15s ease, border-color 0.15s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#EAE8E2';
                        e.currentTarget.style.borderColor = '#BFBCB4';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#F2F0EB';
                        e.currentTarget.style.borderColor = '#E0DDD4';
                      }}
                    >
                      {/* Left: Image */}
                      <img
                        src={work.imgSrc}
                        alt={work.title}
                        style={{
                          width: 180,
                          height: 120,
                          objectFit: 'cover',
                          borderRadius: 2,
                          flexShrink: 0,
                          border: '1px solid #E0DDD4',
                        }}
                      />

                      {/* Right: Title & Description */}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{
                          fontFamily: "'Shippori Mincho', serif",
                          fontSize: '0.95rem',
                          color: '#1C1B1A',
                          margin: '0 0 6px 0',
                        }}>
                          {work.title}
                        </h3>
                        <p style={{
                          fontFamily: "'Zen Kaku Gothic New', sans-serif",
                          fontSize: '0.75rem',
                          color: '#73716A',
                          lineHeight: 1.5,
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {work.des}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p style={{ ...labelStyle, marginBottom: 12, textTransform: 'none' }}>I'm working on something...</p>
              )}
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WorkModal;
