import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { LIQUID_MAP } from '../support/liquidMap';

const BASE = import.meta.env.BASE_URL || '/';

// Dữ liệu Icon bar
const iconData = [
    { name: "About", src :`${BASE}useIcon/contactIcon.svg` },
    { name: "Work", src :`${BASE}useIcon/aboutIcon.svg` },
    { name: "Link", src :`${BASE}useIcon/linkIcon.svg` },
    { name: "Music", src :`${BASE}useIcon/musicIcon.svg` },
]

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

const LIQUID_CONFIG = {
    scale: 2.0, 

    offsetX: 0.0, 
    offsetY: 0.1, 
};

const computedSVG_X = ((1 - LIQUID_CONFIG.scale) / 2) + LIQUID_CONFIG.offsetX;
const computedSVG_Y = ((1 - LIQUID_CONFIG.scale) / 2) + LIQUID_CONFIG.offsetY;

function AppIcon({item, onMusicClick, onLinkClick, onAboutClick, onWorkClick, mouseY}){
  let ref = useRef(null);

  // Tính khoảng cách từ y của chuột đến tâm y của icon này
  let distance = useTransform(mouseY, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  // Giữ lại scale nhún nhảy thần thánh của bạn
  let scaleSync = useTransform(distance, [-200, 0, 200], [1, 2, 1]);
  let scale = useSpring(scaleSync, { mass: 0.1, stiffness: 250, damping: 15 });
  
  // THEO ĐÚNG Ý BẠN: Chiều cao thủy tinh giãn nở ĐỒNG BỘ với ScaleSync! 
  // Map từ giá trị scale (1x -> 2x) sang chiều cao vùng chứa (70px -> 140px)
  let heightSync = useTransform(scaleSync, [1, 2], [70, 140]);
  let dynamicHeight = useSpring(heightSync, { mass: 0.1, stiffness: 250, damping: 15 });

  let zIndex = useTransform(scaleSync, (v) => Math.round(v * 10));

  return (
    <motion.div 
        ref={ref}
        style={{
            height: dynamicHeight, 
            width: 48, 
            zIndex: zIndex,
        }}
        key={item.name} 
        onClick={() => {
            if (item.name === "Music" && onMusicClick) onMusicClick();
            if (item.name === "Link"  && onLinkClick)  onLinkClick();
            if (item.name === "About" && onAboutClick) onAboutClick();
            if (item.name === "Work"  && onWorkClick)  onWorkClick();
        }}
        className="relative flex items-center justify-center cursor-pointer w-full"
    >
        <motion.div 
            style={{ 
                scale: scale,
                originX: 0 
            }}
            className="absolute flex flex-col items-center justify-center pointer-events-none"
        >
            <img src={item.src} alt={item.name} draggable="false" className="w-12 h-12 object-contain drop-shadow-xl" />
            <span className="text-xs mt-1 font-medium text-white select-none">{item.name}</span>
        </motion.div>
    </motion.div>
  )
}

const IconBar = ({ onMusicClick, onLinkClick, onAboutClick, onWorkClick }) => {
  let mouseY = useMotionValue(Infinity);

  const isMobile = useIsMobile();

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Desktop: vertical left sidebar */}
      {!isMobile && (
        <div 
          onMouseMove={(e) => mouseY.set(e.clientY)}
          onMouseLeave={() => mouseY.set(Infinity)}
          id="icon-bar-container"
          className="no-scrollbar
            fixed left-[20px] top-1/2 -translate-y-1/2 z-50 
            flex flex-col gap-0 items-center 
            w-[64px]
            border-2 border-transparent
            bg-white/[0.08] rounded-[5px] py-6
            shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_16px_32px_rgba(0,0,0,0.12)]
          "
          style={{ 
            backdropFilter: 'url(#liquid-frosted)', 
            WebkitBackdropFilter: 'url(#liquid-frosted)',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {iconData.map((item) => (
            <AppIcon key={item.name} item={item} onMusicClick={onMusicClick} onLinkClick={onLinkClick} onAboutClick={onAboutClick} onWorkClick={onWorkClick} mouseY={mouseY} />
          ))}
        </div>
      )}

      {/* Mobile: horizontal bottom navigation bar */}
      {isMobile && (
        <div 
          id="icon-bar-container"
          className="
            fixed bottom-0 left-0 right-0 z-50
            flex flex-row items-center justify-around
            bg-white/[0.08]
            px-2 py-3
            shadow-[0_-1px_0_rgba(255,255,255,0.25),0_-8px_24px_rgba(0,0,0,0.18)]
            safe-area-pb
          "
          style={{ 
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderTop: '1px solid rgba(255,255,255,0.18)',
            paddingBottom: 'env(safe-area-inset-bottom, 12px)',
          }}
        >
          {iconData.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (item.name === "Music" && onMusicClick) onMusicClick();
                if (item.name === "Link"  && onLinkClick)  onLinkClick();
                if (item.name === "About" && onAboutClick) onAboutClick();
                if (item.name === "Work"  && onWorkClick)  onWorkClick();
              }}
              className="flex flex-col items-center justify-center gap-1 flex-1 active:scale-90 transition-transform duration-150"
              style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
            >
              <img src={item.src} alt={item.name} draggable="false" className="w-9 h-9 object-contain" />
              <span className="text-[10px] font-medium text-white/80 select-none tracking-wide">{item.name}</span>
            </button>
          ))}
        </div>
      )}

      <svg className="absolute w-0 h-0" aria-hidden="true" xmlns="http://www.w3.org/1999/xlink">
        <filter id="liquid-frosted" primitiveUnits="objectBoundingBox" x="-50%" y="-50%" width="200%" height="200%">
          <feImage 
            href={LIQUID_MAP}
            x={computedSVG_X}
            y={computedSVG_Y}
            width={LIQUID_CONFIG.scale}
            height={LIQUID_CONFIG.scale}
            result="map" 
            preserveAspectRatio="xMidYMid slice"
          />
          
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur" />
          
          <feDisplacementMap id="disp" in="blur" in2="map" scale="1" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" to="1.4" dur="0.3s" begin="icon-bar-container.mouseover" fill="freeze" />
            <animate attributeName="scale" to="1" dur="0.3s" begin="icon-bar-container.mouseout" fill="freeze" />
          </feDisplacementMap>
        </filter>
      </svg>
    </>
  )
}

export default IconBar