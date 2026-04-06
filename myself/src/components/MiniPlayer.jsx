import React, { useState } from 'react';

const MiniPlayer = ({ song, isPlaying, isVisible, onPlayPause, onPrev, onNext, onClose }) => {
  const [isControls, setIsControls] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    setIsControls((prev) => !prev);
  };

  // Giữ component mounted trong suốt exit animation, chỉ unmount hoàn toàn sau khi không visible và không có song
  if (!song) return null;

  return (
    <div
      className={`
        fixed top-5 right-5 z-50
        transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${isVisible
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 translate-x-full pointer-events-none'}
      `}
    >
      <div className="w-[360px] h-[72px] bg-[#1a1a1a] rounded-[40px] p-2 flex items-center gap-[10px] shadow-[0_10px_40px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/[0.06] font-['Inter',_sans-serif]">

        {/* Nút đóng / back */}
        <button
          onClick={() => {
            if (isControls) {
              setIsControls(false);
            } else {
              onClose && onClose();
            }
          }}
          title={isControls ? 'Back' : 'Close'}
          className="w-[44px] h-[44px] rounded-full bg-white/8 flex justify-center items-center cursor-pointer shrink-0 ml-1 transition-all duration-200 hover:bg-white/15 hover:scale-105 active:scale-95"
        >
          {isControls ? (
            /* Back arrow */
            <svg className="w-[16px] h-[16px] stroke-[#aaa] stroke-[2.5px] fill-none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          ) : (
            /* X close */
            <svg className="w-[14px] h-[14px] stroke-[#aaa] stroke-[2.5px] fill-none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </button>

        {/* Card chính — background là coverSrc */}
        <div
          onClick={handleCardClick}
          className="flex-1 h-full rounded-[30px] relative overflow-hidden cursor-pointer bg-cover bg-center bg-no-repeat select-none"
          style={{ backgroundImage: `url('${song.coverSrc}')` }}
        >
          {/* Overlay tối */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 z-10 pointer-events-none" />

          {/* ── VIEW 1: Info (default) ── */}
          <div className={`
            absolute inset-0 z-30 flex items-center px-3 gap-3
            transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isControls ? 'opacity-0 -translate-x-5 pointer-events-none' : 'opacity-100 translate-x-0 pointer-events-auto'}
          `}>
            {/* Play / Pause */}
            <button
              onClick={(e) => { e.stopPropagation(); onPlayPause && onPlayPause(); }}
              className="w-[44px] h-[40px] rounded-[14px] bg-black/35 backdrop-blur-sm flex justify-center items-center shrink-0 transition-all duration-200 hover:bg-black/55 hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <svg className="w-[15px] h-[15px] fill-white" viewBox="0 0 24 24">
                  <rect x="7" y="5" width="3" height="14" rx="1.5" />
                  <rect x="14" y="5" width="3" height="14" rx="1.5" />
                </svg>
              ) : (
                <svg className="w-[15px] h-[15px] fill-white translate-x-[1px]" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Tên + Tác giả */}
            <div className="flex flex-col flex-1 justify-center overflow-hidden">
              <div className="text-white text-[14px] font-semibold leading-snug truncate drop-shadow-sm">
                {song.title}
              </div>
              <div className="text-white/60 text-[11px] font-medium tracking-wide truncate mt-[1px]">
                {song.artist}
              </div>
            </div>

            {/* Pulse dot khi đang phát */}
            {isPlaying && (
              <span className="w-[7px] h-[7px] rounded-full bg-[#1dd1a1] animate-pulse shrink-0 mr-1 shadow-[0_0_6px_rgba(29,209,161,0.8)]" />
            )}
          </div>

          {/* ── VIEW 2: Controls (prev / play-pause / next) ── */}
          <div className={`
            absolute inset-0 z-30 flex items-center justify-center gap-2 px-3
            transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isControls ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-5 pointer-events-none'}
          `}>
            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); onPrev && onPrev(); }}
              className="flex-1 h-[44px] rounded-[14px] bg-black/35 backdrop-blur-sm flex justify-center items-center transition-all duration-200 hover:bg-black/55 hover:scale-105 active:scale-95"
            >
              <svg className="w-[15px] h-[15px] fill-white" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            {/* Play / Pause (center) */}
            <button
              onClick={(e) => { e.stopPropagation(); onPlayPause && onPlayPause(); }}
              className="flex-1 h-[44px] rounded-[14px] bg-white/20 backdrop-blur-sm flex justify-center items-center transition-all duration-200 hover:bg-white/35 hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <svg className="w-[15px] h-[15px] fill-white" viewBox="0 0 24 24">
                  <rect x="7" y="5" width="3" height="14" rx="1.5" />
                  <rect x="14" y="5" width="3" height="14" rx="1.5" />
                </svg>
              ) : (
                <svg className="w-[15px] h-[15px] fill-white translate-x-[1px]" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); onNext && onNext(); }}
              className="flex-1 h-[44px] rounded-[14px] bg-black/35 backdrop-blur-sm flex justify-center items-center transition-all duration-200 hover:bg-black/55 hover:scale-105 active:scale-95"
            >
              <svg className="w-[15px] h-[15px] fill-white" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zm2.5-6 8.5 6V6z" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;