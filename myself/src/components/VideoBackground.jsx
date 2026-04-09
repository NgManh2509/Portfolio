import React, { useRef, useEffect, useState } from 'react'
import LoadingThreeDotsJumping from '../support/LoadingThreeDotsJumping'

const VideoBackground = ({ videoUrl, fallbackImage, onReady }) => {
    const videoRef = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const onReadyRef = useRef(onReady)

    // Luôn giữ phiên bản mới nhất của onReady từ cha mà không làm re-render video
    useEffect(() => {
        onReadyRef.current = onReady
    }, [onReady])

    useEffect(() => {
        if (!videoUrl) {
            setIsLoaded(true);
            onReadyRef.current?.();
            return;
        }

        const video = videoRef.current;
        if (!video) return;

        let settled = false;
        let audioCtx = null;
        let sourceNode = null;

        const markReady = () => {
            if (settled) return;
            settled = true;
            setIsLoaded(true);
            onReadyRef.current?.();
        };

        const fallbackTimer = setTimeout(markReady, 5000);

        video.src = videoUrl;
        video.addEventListener('canplaythrough', markReady, { once: true });

        const startPlayback = async () => {
            try {
                await video.play();

                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                sourceNode = audioCtx.createMediaElementSource(video);
                sourceNode.connect(audioCtx.destination);
                if (audioCtx.state === 'suspended') {
                    await audioCtx.resume();
                }
            } catch (err) {
                console.log('autoplay or AudioContext prevented:', err);
            }
        };

        startPlayback();

        // Fallback: resume nếu bằng cách nào đó vẫn bị pause khi quay lại tab
        const handleVisibilityChange = () => {
            if (!document.hidden && video.paused) {
                if (audioCtx?.state === 'suspended') audioCtx.resume();
                video.play().catch(() => {});
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearTimeout(fallbackTimer);
            video.removeEventListener('canplaythrough', markReady);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            // Dọn dẹp AudioContext
            sourceNode?.disconnect();
            audioCtx?.close();
        };
    }, [videoUrl]) // Chỉ bắt duy nhất sự thay đổi của url video

  return (
    <>
      {!isLoaded && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F4F4F9]">
          <LoadingThreeDotsJumping />
        </div>
      )}
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
      </div>
    </>
  )
}

// Custom memo comparison để ngăn ngừa hoàn toàn việc React tự refresh component
export default React.memo(VideoBackground, (prevProps, nextProps) => {
  return prevProps.videoUrl === nextProps.videoUrl && prevProps.fallbackImage === nextProps.fallbackImage;
})