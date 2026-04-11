import React, { useRef, useEffect, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import musicData from '../data/musicData';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

const ExploreScroll = forwardRef(function ExploreScroll({ onPlaySong, isOpen, onClose, onPlayStateChange, canPlay }, ref) {
  const scrollRef = useRef(null);
  const itemsRef = useRef([]);
  const requestRef = useRef();
  const [activeIndex, setActiveIndex] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);
  const isMobile = useIsMobile();

  useImperativeHandle(ref, () => ({
    playExternal(song) {
      setPlayingId(song.id);
      setIsPlaying(true);
      if (onPlaySong) onPlaySong(song);
      if (onPlayStateChange) onPlayStateChange(song, true);
    },
    togglePlay(song, forcedState) {
      if (song && playingId !== song.id) {
        setPlayingId(song.id);
        setIsPlaying(true);
        if (onPlaySong) onPlaySong(song);
        if (onPlayStateChange) onPlayStateChange(song, true);
      } else {
        const next = forcedState !== undefined ? forcedState : !isPlaying;
        setIsPlaying(next);
        const currentSong = musicData.find(s => s.id === playingId);
        if (onPlayStateChange && currentSong) onPlayStateChange(currentSong, next);
      }
    },
  }));

  useEffect(() => {
    if (audioRef.current && playingId) {
      if (isPlaying && canPlay) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playingId, isPlaying, canPlay]);

  const handlePlayToggle = (e, song) => {
    e.stopPropagation();
    if (playingId === song.id) {
      const next = !isPlaying;
      setIsPlaying(next);
      if (onPlayStateChange) onPlayStateChange(song, next);
    } else {
      setPlayingId(song.id);
      setIsPlaying(true);
      if (onPlaySong) onPlaySong(song);
      if (onPlayStateChange) onPlayStateChange(song, true);
    }
  };

  const handleSongEnded = () => {
    const currentIndex = musicData.findIndex(s => s.id === playingId);
    if (currentIndex !== -1) {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= musicData.length) nextIndex = 0;
      const nextSong = musicData[nextIndex];
      setPlayingId(nextSong.id);
      setIsPlaying(true);
      if (onPlaySong) onPlaySong(nextSong);
      if (onPlayStateChange) onPlayStateChange(nextSong, true);
      if (scrollRef.current && itemsRef.current[nextIndex]) {
        const targetItem = itemsRef.current[nextIndex];
        const itemCenter = targetItem.offsetTop + targetItem.offsetHeight / 2;
        scrollRef.current.scrollTo({
          top: itemCenter - scrollRef.current.clientHeight / 2,
          behavior: 'smooth'
        });
      }
    } else {
      setIsPlaying(false);
    }
  };

  const calculateScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollArea = scrollRef.current;
    const scrollRect = scrollArea.getBoundingClientRect();
    const containerCenter = scrollRect.top + scrollRect.height / 2;
    const maxDistance = scrollRect.height / 1.5;
    let closestIdx = 0;
    let minDistance = Infinity;
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const deltaY = itemCenter - containerCenter;
      let ratio = deltaY / maxDistance;
      ratio = Math.max(-1, Math.min(1, ratio));
      const maxOffsetX = isMobile ? 80 : 180;
      const translateX = Math.pow(ratio, 2) * maxOffsetX;
      const opacity = 1 - Math.abs(ratio) * 0.85;
      const scale = 1 - Math.abs(ratio) * 0.12;
      item.style.transform = `translateX(${translateX}px) scale(${scale})`;
      item.style.opacity = opacity;
      if (Math.abs(deltaY) < minDistance) {
        minDistance = Math.abs(deltaY);
        closestIdx = index;
      }
    });
    setActiveIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
  }, [isMobile]);

  const handleScroll = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(calculateScroll);
  };

  useEffect(() => {
    if (scrollRef.current && itemsRef.current[3]) {
      const targetItem = itemsRef.current[3];
      const itemCenter = targetItem.offsetTop + targetItem.offsetHeight / 2;
      scrollRef.current.scrollTop = itemCenter - scrollRef.current.clientHeight / 2;
      calculateScroll();
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [calculateScroll]);

  // ── Một tree duy nhất, style thay đổi theo isMobile ──────────────────────
  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Backdrop — chỉ hiện trên mobile */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-400 pointer-events-none"
        style={{
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
          opacity: isMobile && isOpen ? 1 : 0,
          pointerEvents: isMobile && isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* Panel chính */}
      <div
        className="fixed z-50 font-['Lato',_sans-serif] antialiased"
        style={isMobile ? {
          // Mobile: bottom sheet
          left: 0, right: 0, bottom: 0, top: 'auto',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: `transform 500ms ${isOpen ? 'cubic-bezier(0.32,0.72,0,1)' : 'cubic-bezier(0.4,0,1,1)'}`,
        } : {
          // Desktop: left panel  
          left: '120px',
          top: '50%',
          transform: isOpen
            ? 'translateY(-50%) translateX(0) scale(1)'
            : 'translateY(-50%) translateX(-48px) scale(0.95)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms cubic-bezier(0.4,0,0.2,1)',
          transformOrigin: 'left center',
        }}
      >
        {/* Card */}
        <div
          className="bg-[#F4F4F9] flex flex-col overflow-hidden relative"
          style={isMobile ? {
            borderRadius: '15px 15px 0 0',
            boxShadow: '0 -20px 60px rgba(0,0,0,0.25), inset 0 0 0 5px #fff',
            maxHeight: 'calc(90vh - env(safe-area-inset-bottom, 0px))',
            paddingBottom: 'env(safe-area-inset-bottom, 12px)',
            width: '100%',
          } : {
            borderRadius: '5px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15), inset 0 0 0 6px #fff',
            width: 'min(520px, calc(100vw - 160px))',
            height: 'min(600px, calc(100vh - 40px))',
          }}
        >
          {/* Audio — KHÔNG bao giờ unmount */}
          <audio
            ref={audioRef}
            src={playingId ? musicData.find(s => s.id === playingId)?.musicSrc : undefined}
            onEnded={handleSongEnded}
          />

          {/* Drag handle — chỉ mobile */}
          {isMobile && (
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-[4px] rounded-full bg-black/15" />
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-center z-10 flex-shrink-0"
            style={{ padding: isMobile ? '8px 24px 8px' : '16px 30px 10px' }}
          >
            <h1 className="font-['Playfair_Display',_serif] font-extrabold text-[#111] tracking-[-0.5px]"
              style={{ fontSize: isMobile ? '26px' : '32px' }}
            >
              Explore
            </h1>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 cursor-pointer"
              style={{ background: 'transparent' }}
              aria-label="Close music player"
            >
              {isMobile ? (
                <ChevronDown className="w-5 h-5 text-[#111]" strokeWidth={2.5} />
              ) : (
                <ChevronLeft className="w-5 h-5 text-[#111]" strokeWidth={2.5} />
              )}
            </button>
          </div>

          {/* Scroll Area */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar min-h-0"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
            }}
          >
            <div className="flex flex-col gap-3"
              style={{ padding: isMobile ? '220px 0' : '350px 0' }}
            >
              {musicData.map((song, index) => {
                const isActive = activeIndex === index;
                const imgActive = isMobile ? 78 : 95;
                const imgInactive = isMobile ? 70 : 85;
                return (
                  <div
                    key={index}
                    ref={(el) => (itemsRef.current[index] = el)}
                    className="flex justify-start w-full transition-opacity duration-100 ease-out will-change-transform"
                    style={{ paddingLeft: isMobile ? '16px' : '20px' }}
                  >
                    <div className={`flex items-center p-2 rounded-[60px] transition-all duration-300 ease-out ${isActive ? 'bg-white/98 shadow-[0_15px_40px_rgba(0,0,0,0.04)] scale-[1.03]' : 'bg-transparent'}`}
                      style={{ paddingRight: isActive ? (isMobile ? '14px' : '18px') : '8px' }}
                    >
                      {/* Cover */}
                      <div className="relative z-10 flex-shrink-0">
                        <img
                          src={song.coverSrc}
                          alt={song.title}
                          className={`rounded-full object-cover transition-all duration-300 ease-out ${isActive ? 'grayscale-0 shadow-[0_15px_25px_rgba(0,0,0,0.1)]' : 'grayscale shadow-[0_10px_20px_rgba(0,0,0,0.08)]'}`}
                          style={{ width: isActive ? imgActive : imgInactive, height: isActive ? imgActive : imgInactive }}
                        />
                      </div>
                      {/* Info */}
                      <div className="flex flex-col"
                        style={{ marginLeft: isMobile ? '12px' : '18px', minWidth: isMobile ? '100px' : '120px' }}
                      >
                        <div className={`font-['Playfair_Display',_serif] leading-[1.2] transition-colors duration-300 ease-out font-bold ${isActive ? 'text-[#111]' : 'text-[#999]'}`}
                          style={{ fontSize: isMobile ? '17px' : '20px' }}
                        >
                          {song.title}
                        </div>
                        <div className={`font-['Lato',_sans-serif] mt-[5px] transition-colors duration-300 ease-out ${isActive ? 'text-[#555] font-normal' : 'text-[#bbb] font-light'}`}
                          style={{ fontSize: isMobile ? '12px' : '14px' }}
                        >
                          {song.artist}
                        </div>
                      </div>
                      {/* Play button */}
                      <div className={`overflow-hidden transition-all duration-300 ease-out flex items-center ${isActive ? 'opacity-100' : 'w-0 opacity-0'}`}
                        style={{ width: isActive ? (isMobile ? '90px' : '105px') : 0, marginLeft: isActive ? (isMobile ? '8px' : '12px') : 0 }}
                      >
                        <button
                          onClick={(e) => handlePlayToggle(e, song)}
                          className="group relative flex items-center justify-center gap-[6px] bg-gradient-to-r from-[#1a1a1a] to-[#3a3a3a] text-white border-none rounded-[30px] font-['Lato',_sans-serif] font-extrabold uppercase tracking-[1px] cursor-pointer hover:from-[#111] hover:to-[#222] transition-all duration-300 ease-out active:scale-95 whitespace-nowrap"
                          style={{ padding: isMobile ? '9px 14px' : '10px 18px', fontSize: isMobile ? '11px' : '12px' }}
                        >
                          {playingId === song.id && isPlaying ? (
                            <>
                              <svg className="w-[11px] h-[11px] text-[#ff4d4d] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                              </svg>
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-[11px] h-[11px] group-hover:text-[#1dd1a1] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                              <span>Play</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default ExploreScroll;