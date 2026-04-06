import React, { useRef, useEffect } from 'react'

const VideoBackground = ({ videoUrl, fallbackImage }) => {
    const videoRef = useRef(null)

    useEffect(() => {
        const video = videoRef.current;
        if(!video || !videoUrl) return;
        
        video.src = videoUrl;
        video.play().catch(() => {
            console.log("autoplay prevented")
        })
    }, [videoUrl])
  return (
    <div className='fixed inset-0 -z-10'>
      {videoUrl ? (
        <div className='fixed inset-0 -z-10'>
          <video
            ref={videoRef}
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            className='w-full h-full object-cover'
          />
      {/* Overlay tối */}
      <div className='absolute inset-0 bg-black/10 backdrop-blur-[2px]' />
    </div>
        
      ) : (
        <div 
          className='w-full h-full bg-cover bg-center bg-no-repeat object-contain'
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}
      <div className='absolute inset-0 bg-black/40' />
    </div>
  )
}

export default VideoBackground