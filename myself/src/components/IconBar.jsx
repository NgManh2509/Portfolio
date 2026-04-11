import React, { useState } from 'react'
import { LIQUID_MAP } from '../support/liquidMap';

const BASE = import.meta.env.BASE_URL || '/';

// Dữ liệu Icon bar
const iconData = [
    { name: "About", src :`${BASE}useIcon/contactIcon.svg` },
    { name: "Work", src :`${BASE}useIcon/aboutIcon.svg` },
    { name: "Link", src :`${BASE}useIcon/linkIcon.svg` },
    { name: "Music", src :`${BASE}useIcon/musicIcon.svg` },
]

const LIQUID_CONFIG = {
    scale: 2.0, 

    offsetX: 0.0, 
    offsetY: 0.1, 
};

const computedSVG_X = ((1 - LIQUID_CONFIG.scale) / 2) + LIQUID_CONFIG.offsetX;
const computedSVG_Y = ((1 - LIQUID_CONFIG.scale) / 2) + LIQUID_CONFIG.offsetY;

const IconBar = ({ onMusicClick, onLinkClick, onAboutClick, onWorkClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <div 
        id="icon-bar-container"
        onMouseLeave={() => setHoveredIndex(null)}
        className="
          fixed left-[20px] top-[25%] -translate-y-1/2 z-50 
          flex flex-col gap-3 items-center 
          border-2 border-transparent
          bg-white/[0.08] rounded-[5px] px-4 py-6
          shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_16px_32px_rgba(0,0,0,0.12)]
        "
        style={{ 
          backdropFilter: 'url(#liquid-frosted)', 
          WebkitBackdropFilter: 'url(#liquid-frosted)' 
        }}
      >
        {iconData.map((item, index) => {
          const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - index) : null;
          
          let scaleClass = 'scale-100 opacity-100'; 
          let durationClass = 'duration-300'; 
          
          if (hoveredIndex !== null) {
            if (distance === 0) {
              scaleClass = 'scale-125 opacity-100 z-10 origin-left'; 
            } else if (distance === 1) {
              scaleClass = 'scale-110 opacity-90 origin-left'; 
            } else {
              scaleClass = 'scale-95 opacity-60 origin-left'; 
            }

            if (index < hoveredIndex) {
              durationClass = 'duration-600'; 
            } else if (index > hoveredIndex) {
              durationClass = 'duration-400'; 
            } else {
              durationClass = 'duration-300'; 
            }
          }

          return (
            <div 
              key={item.name} 
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => {
                if (item.name === "Music" && onMusicClick) onMusicClick();
                if (item.name === "Link"  && onLinkClick)  onLinkClick();
                if (item.name === "About" && onAboutClick) onAboutClick();
                if (item.name === "Work"  && onWorkClick)  onWorkClick();
              }}
              className={`flex flex-col items-center justify-center cursor-pointer transition-all ${durationClass} ${scaleClass}`}
            >
              <img src={item.src} alt={item.name} draggable="false" className="w-12 h-12 object-contain" />
              <span className="text-xs mb-1 mt-1 font-medium text-white select-none">{item.name}</span>
            </div>
          )
        })}
      </div>

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