import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BASE = import.meta.env.BASE_URL || '/';

const links = [
  { name: 'ng.manh',   src: `${BASE}useIcon/youtube-svgrepo-com.svg`,     href: 'https://www.youtube.com/@mxnheditnquvcer' },
  { name: 'ng.manh2509',   src: `${BASE}useIcon/discord-icon-svgrepo-com.svg`, href: 'https://discord.gg/MdVa9Kn7' },
  { name: 'il.manh', src: `${BASE}useIcon/instagram-1-svgrepo-com.svg`,  href: 'https://www.instagram.com/il.manh/' },
  { name: 'ill.moka2509',   src: `${BASE}useIcon/threads-seeklogo-4.svg`,        href: 'https://www.threads.com/@ill.moka2509?hl=vi' },
  { name: 'NgManh2509',    src: `${BASE}useIcon/github-svgrepo-com.svg`,        href: 'https://github.com/NgManh2509' },
  { name: 'Nguyễn Mạnh',  src: `${BASE}useIcon/facebook-svgrepo-com.svg`,      href: 'https://web.facebook.com/ng.manh2509' },
];

const LinkModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>

          <motion.div
            key="modal"
            id="link-modal-container"
            drag
            dragMomentum={false}
            dragElastic={0.1}
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              marginTop: -220,   
              marginLeft: -260,  
              zIndex: 50,
              width: 520,
              borderRadius: 5,
              padding: '20px 24px 28px',
              background: '#F8F7F2',
              boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
              fontFamily: 'serif',
              cursor: 'grab',
            }}
            onPointerDown={e => e.currentTarget.style.cursor = 'grabbing'}
            onPointerUp={e => e.currentTarget.style.cursor = 'grab'}
          >
            {/* Header: three dots + title + X */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, borderBottom: '1px solid #e5e5e5', paddingBottom: 12 }}>
              {/* Three dots */}
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF605C' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD44' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#00CA4E' }} />
              </div>

              {/* Title */}
              <p style={{ color: '#5C5C5C', fontSize: 13, fontStyle: 'italic', userSelect: 'none', margin: 0, cursor: 'default' }}>
                Social Links
              </p>

              {/* X close */}
              <button
                onClick={onClose}
                title="Đóng"
                style={{
                  width: 28, height: 28,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#999',
                  fontSize: 18,
                  lineHeight: 1,
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#ebebeb'; e.currentTarget.style.color = '#333'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#999'; }}
              >
                ✕
              </button>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px 16px' }}>
              {links.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target='_blank'
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', transition: 'transform 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: 14,
                    background: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    marginBottom: 10,
                    overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'box-shadow 0.25s',
                  }}>
                    <img
                      src={item.src}
                      alt={item.name}
                      draggable="false"
                      style={{ width: 36, height: 36, objectFit: 'contain' }}
                    />
                  </div>
                  <span style={{ fontSize: 12, color: '#2C2C2C', userSelect: 'none' }}>
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LinkModal;