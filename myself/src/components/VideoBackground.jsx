import React, { useRef, useEffect } from 'react'

const VideoBackground = ({ videoUrl}) => {
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
      <video
        ref={videoRef}
        preload="none"
        autoPlay
        loop
        muted
        playsInline
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-black/40' />
    </div>
  )
}

export default VideoBackground