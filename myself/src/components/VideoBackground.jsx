import React, { useRef, useEffect } from 'react'

const VideoBackground = ({ videoUrl, fallbackImage, onReady }) => {
    const videoRef = useRef(null)

    useEffect(() => {
        // Không có video → báo sẵn sàng ngay để nhạc không bị block
        if (!videoUrl) {
            onReady?.();
            return;
        }

        const video = videoRef.current;
        if (!video) return;

        // Reset về chưa sẵn sàng mỗi khi đổi bài
        let settled = false;

        const markReady = () => {
            if (settled) return;
            settled = true;
            onReady?.();
        };

        // Fallback: sau 5 giây nếu video vẫn chưa load xong thì vẫn cho play nhạc
        const fallbackTimer = setTimeout(markReady, 5000);

        video.src = videoUrl;
        video.addEventListener('canplaythrough', markReady, { once: true });
        video.play().catch(() => console.log('autoplay prevented'));

        return () => {
            clearTimeout(fallbackTimer);
            video.removeEventListener('canplaythrough', markReady);
        };
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