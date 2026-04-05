import React, { useRef, useEffect, useState, useCallback } from 'react';
import musicData from '../data/musicData';

export default function ExploreScroll({ onPlaySong }) {
  const scrollRef = useRef(null);
  const itemsRef = useRef([]);
  const requestRef = useRef();
  const [activeIndex, setActiveIndex] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

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
      setIsPlaying(!isPlaying);
    } else {
      setPlayingId(song.id);
      setIsPlaying(true);
      if (onPlaySong) onPlaySong(song);
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
    <div className="fixed left-[120px] top-[36.5%] -translate-y-1/2 z-40 font-['Lato',_sans-serif] antialiased">
      {/* Cài đặt CSS ẩn thanh cuộn (vì Tailwind mặc định không có utilities này) */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Khung điện thoại */}
      <div className="w-[500px] h-[600px] bg-[#F4F4F9] rounded-[15px] shadow-[0_25px_50px_rgba(0,0,0,0.15),inset_0_0_0_6px_#fff] flex flex-col overflow-hidden relative">
        <audio 
          ref={audioRef} 
          src={playingId ? musicData.find(s => s.id === playingId)?.musicSrc : ''} 
          onEnded={handleSongEnded} 
        />
        
        {/* Header */}
        <div className="flex justify-between items-center pt-4 pb-[10px] px-[30px] z-10">
          <h1 className="font-['Playfair_Display',_serif] text-[32px] font-extrabold text-[#111] tracking-[-0.5px]">
            Explore
          </h1>
          <div className="text-[24px] font-bold text-[#111] tracking-[2px] cursor-pointer">•••</div>
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
                    <div className={`overflow-hidden transition-all duration-300 ease-out flex items-center ${isActive ? 'w-[85px] opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}`}>
                      <button 
                        onClick={(e) => handlePlayToggle(e, song)}
                        className="bg-white text-[#111] border-none rounded-[30px] py-[10px] px-[22px] font-['Lato',_sans-serif] text-[13px] font-bold uppercase tracking-[1px] cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.08)] whitespace-nowrap"
                      >
                        {playingId === song.id && isPlaying ? 'Pause' : 'Play'}
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
}