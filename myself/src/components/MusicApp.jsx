import React, { useRef, useEffect, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import musicData from '../data/musicData';

const ExploreScroll = forwardRef(function ExploreScroll({ onPlaySong, isOpen, onClose, onPlayStateChange }, ref) {
  const scrollRef = useRef(null);
  const itemsRef = useRef([]);
  const requestRef = useRef();
  const [activeIndex, setActiveIndex] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  // Expose control methods to parent via ref
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
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playingId, isPlaying]);

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
      if (nextIndex >= musicData.length) {
        nextIndex = 0; // Quay lại bài đầu tiên nếu đã hết danh sách
      }
      const nextSong = musicData[nextIndex];
      setPlayingId(nextSong.id);
      setIsPlaying(true);
      if (onPlaySong) onPlaySong(nextSong);
      if (onPlayStateChange) onPlayStateChange(nextSong, true);
      
      // Tự động cuộn đến bài tiếp theo cho mượt
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

      // Toán học tính toán Arc Parabola
      const maxOffsetX = 180;
      const translateX = Math.pow(ratio, 2) * maxOffsetX;
      const opacity = 1 - Math.abs(ratio) * 0.85;
      const scale = 1 - Math.abs(ratio) * 0.12;

      // Cập nhật DOM trực tiếp để đạt 60 FPS, không thông qua React State
      item.style.transform = `translateX(${translateX}px) scale(${scale})`;
      item.style.opacity = opacity;

      if (Math.abs(deltaY) < minDistance) {
        minDistance = Math.abs(deltaY);
        closestIdx = index;
      }
    });

    // Chỉ trigger re-render khi index focus thực sự thay đổi
    setActiveIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
  }, []);

  const handleScroll = () => {
    // Dùng requestAnimationFrame để tối ưu hóa sự kiện cuộn
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(calculateScroll);
  };

  useEffect(() => {
    // Scroll mặc định tới bài hát "Day light" (Index 3)
    if (scrollRef.current && itemsRef.current[3]) {
      const targetItem = itemsRef.current[3];
      const itemCenter = targetItem.offsetTop + targetItem.offsetHeight / 2;
      scrollRef.current.scrollTop = itemCenter - scrollRef.current.clientHeight / 2;
      calculateScroll();
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [calculateScroll]);

  return (
    <div className={`
        fixed left-[120px] top-[36.5%] -translate-y-1/2 z-40 font-['Lato',_sans-serif] antialiased
        /* Thêm Animation classes ở đây */
        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) origin-left
        ${isOpen 
          ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto visible' 
          : 'opacity-0 scale-95 -translate-x-12 pointer-events-none invisible'}
      `}>
      {/* Cài đặt CSS ẩn thanh cuộn (vì Tailwind mặc định không có utilities này) */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Khung điện thoại */}
      <div className="w-[500px] h-[600px] bg-[#F4F4F9] rounded-[15px] shadow-[0_25px_50px_rgba(0,0,0,0.15),inset_0_0_0_6px_#fff] flex flex-col overflow-hidden relative">
        <audio 
          ref={audioRef} 
          src={playingId ? musicData.find(s => s.id === playingId)?.musicSrc : undefined} 
          onEnded={handleSongEnded} 
        />
        
        {/* Header */}
        <div className="flex justify-between items-center pt-4 pb-[10px] px-[30px] z-10">
          <h1 className="font-['Playfair_Display',_serif] text-[32px] font-extrabold text-[#111] tracking-[-0.5px]">
            Explore
          </h1>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F4F4F9] hover:bg-black/10 transition-colors duration-200 cursor-pointer"
            aria-label="Close music player"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#111]">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* Scroll Area */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
          }}
        >
          <div className="py-[350px] flex flex-col gap-3">
            {musicData.map((song, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className="flex justify-start pl-5 w-full transition-opacity duration-100 ease-out will-change-transform"
                >
                  {/* Nội dung Item chuyển đổi bằng Tailwind Group & Logic */}
                  <div className={`flex items-center p-2 rounded-[60px] transition-all duration-300 ease-out ${isActive ? 'bg-white/98 shadow-[0_15px_40px_rgba(0,0,0,0.04)] pr-[18px] scale-[1.03]' : 'bg-transparent'}`}>
                    
                    {/* Ảnh Cover */}
                    <div className="relative z-10">
                      <img
                        src={song.coverSrc}
                        alt={song.title}
                        className={`rounded-full object-cover transition-all duration-300 ease-out ${isActive ? 'w-[95px] h-[95px] grayscale-0 shadow-[0_15px_25px_rgba(0,0,0,0.1)]' : 'w-[85px] h-[85px] grayscale shadow-[0_10px_20px_rgba(0,0,0,0.08)]'}`}
                      />
                    </div>

                    {/* Thông tin bài hát */}
                    <div className="flex flex-col ml-[18px] min-w-[120px]">
                      <div className={`font-['Playfair_Display',_serif] text-[20px] leading-[1.2] transition-colors duration-300 ease-out ${isActive ? 'text-[#111] font-bold' : 'text-[#999] font-bold'}`}>
                        {song.title}
                      </div>
                      <div className={`font-['Lato',_sans-serif] text-[14px] mt-[5px] transition-colors duration-300 ease-out ${isActive ? 'text-[#555] font-normal' : 'text-[#bbb] font-light'}`}>
                        {song.artist}
                      </div>
                    </div>

                    {/* Nút Play (Thu phóng dựa vào thẻ bao bọc ngoài) */}
                    <div className={`overflow-hidden transition-all duration-300 ease-out flex items-center ${isActive ? 'w-[105px] opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}`}>
                      <button 
                        onClick={(e) => handlePlayToggle(e, song)}
                        className="group relative flex items-center justify-center gap-[6px] bg-gradient-to-r from-[#1a1a1a] to-[#3a3a3a] text-white border-none rounded-[30px] py-[10px] px-[18px] font-['Lato',_sans-serif] text-[12px] font-extrabold uppercase tracking-[1px] cursor-pointer hover:from-[#111] hover:to-[#222] transition-all duration-300 ease-out active:scale-95 active:translate-y-0 whitespace-nowrap"
                      >
                        {playingId === song.id && isPlaying ? (
                          <>
                            <svg className="w-[12px] h-[12px] text-[#ff4d4d] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-[12px] h-[12px] group-hover:text-[#1dd1a1] transition-colors duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
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
  );
});

export default ExploreScroll;