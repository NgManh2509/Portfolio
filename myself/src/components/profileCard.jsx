import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../support/profileCard.css';
import bannerImg from '../assets/banner.webp';
import avatarImg from '../assets/avatar.webp';

const interests = ['Kpop', 'Jpop', 'Gacha Games', 'Anime'];

const ProfileCard = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="profile-card"
          drag
          dragMomentum={false}
          dragElastic={0.08}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: -230,
            marginLeft: -240,
            zIndex: 50,
            width: 480,
            cursor: 'grab',
          }}
          onPointerDown={e => e.currentTarget.style.cursor = 'grabbing'}
          onPointerUp={e => e.currentTarget.style.cursor = 'grab'}
          className="group bg-white flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06)] border-b-2 border-r border-[#E0DDD4]"
        >
          {/* macOS Window Bar */}
          <div className="flex items-center px-[14px] py-[10px] bg-white border-b border-[#E0DDD4] gap-[7px] relative">
            <div className="flex items-center gap-[7px]">
              <div className="w-3 h-3 rounded-full cursor-default bg-[#FF5F57] border-[0.5px] border-black/10"></div>
              <div className="w-3 h-3 rounded-full cursor-default bg-[#FFBD2E] border-[0.5px] border-black/10"></div>
              <div className="w-3 h-3 rounded-full cursor-default bg-[#28C840] border-[0.5px] border-black/10"></div>
            </div>
            <span
              className="absolute left-1/2 -translate-x-1/2 select-none"
              style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontSize: 12, color: '#73716A', fontStyle: 'italic' }}
            >
              About.me
            </span>
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-0 cursor-pointer w-4 h-4 flex items-center justify-center opacity-30 hover:opacity-75 transition-opacity"
              aria-label="Close"
              style={{ background: 'transparent', border: 'none' }}
            >
              <svg viewBox="0 0 10 10" fill="none"
                style={{ width: 10, height: 10, stroke: '#1C1B1A', strokeWidth: 1.5, strokeLinecap: 'round' }}>
                <line x1="1" y1="1" x2="9" y2="9" />
                <line x1="9" y1="1" x2="1" y2="9" />
              </svg>
            </button>
          </div>

          {/* Banner & Avatar */}
          <div className="w-full h-[180px] relative pt-3 px-3 box-border bg-white">
            <div className="w-full h-full overflow-hidden rounded-[2px]">
              <img
                src={bannerImg}
                alt="Profile Banner"
                draggable="false"
                className="w-full h-full object-cover"
                style={{ filter: 'sepia(12%) contrast(105%) brightness(95%)', transition: 'filter 1s ease, transform 4s cubic-bezier(0.16,1,0.3,1)' }}
              />
            </div>
            <div className="absolute -bottom-10 left-10 w-[80px] h-[80px] p-[6px] bg-white rounded-full z-10">
              <div className="w-full h-full overflow-hidden rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
                <img
                  src={avatarImg}
                  alt="Avatar"
                  draggable="false"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(10%) sepia(5%)' }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          {/* Content — scrollable */}
          <div className="profile-card-content pt-[72px] px-10 pb-10 flex flex-col text-left relative" style={{ overflowY: 'auto', maxHeight: 350 }}>
            <div
              className="mb-11 tracking-[0.01em] relative"
              style={{ fontFamily: "'Shippori Mincho', serif", fontSize: '1.1rem', lineHeight: 1.8, color: '#1C1B1A' }}
            >
              Hi everyone, I'm Manh! 👋 <br/>
              I'm an amateur front-end designer, but my true expertise lies in back-end development. <br />
              I have an endless passion for music—especially J-Pop and K-Pop—which is why you'll often find musical elements woven into my projects.
            </div>

            <div className="w-full flex flex-col gap-5 py-6 border-t border-[#E0DDD4]">
              <span style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#73716A' }}>
                Education
              </span>
              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                <li className="flex flex-col gap-1">
                  <span style={{ fontFamily: "'Shippori Mincho', serif", fontSize: '1.05rem', color: '#1C1B1A', letterSpacing: '0.03em' }}>
                    Hanoi University of Industry
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#73716A', lineHeight: 1.6 }}>
                    Bachelor of Information Technology (2022 — 2026)<br />
                    Specialization in Software Engineering
                  </span>
                </li>
              </ul>
            </div>

            <div className="w-full flex flex-col gap-5 py-6 border-t border-[#E0DDD4]">
              <span style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#73716A' }}>
                Other Interests
              </span>
              <div style={{ fontSize: '0.9rem', color: '#1C1B1A', lineHeight: 2, letterSpacing: '0.02em' }}>
                {interests.map((interest, index) => (
                  <React.Fragment key={interest}>
                    <span style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}>{interest}</span>
                    {index < interests.length - 1 && (
                      <span style={{ display: 'inline-block', width: 3, height: 3, background: '#E0DDD4', borderRadius: '50%', margin: '0 14px', verticalAlign: 'middle' }}></span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="w-full flex flex-col gap-5 py-6 border-t border-[#E0DDD4]">
              <span style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#73716A' }}>
                LANGUAGE PROFICIENCY
              </span>
              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                <li className="flex flex-col gap-1">
                  <span style={{ fontFamily: "'Shippori Mincho', serif", fontSize: '1rem', color: '#1C1B1A', letterSpacing: '0.03em' }}>
                    I have native fluency in English, Chinese and Vietnamese
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#73716A', lineHeight: 1.6 }}>
                    I'm learning Japanese and Korean so please be patient with me
                  </span>
                </li>
              </ul>
            </div>


          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileCard;