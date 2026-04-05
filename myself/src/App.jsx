import React, { useState } from 'react';
import './App.css'
import VideoBackground from './components/VideoBackground'
import IconBar from './components/IconBar'
import MusicApp from './components/MusicApp'

function App() {
  const [videoUrl, setVideoUrl] = useState("https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773160399/ILLIT_%EC%95%84%EC%9D%BC%EB%A6%BF_NOT_ME_Official_MV_mzwcfl.mp4");

  return (
    <>
      <VideoBackground videoUrl={videoUrl} />
      <IconBar />
      <MusicApp onPlaySong={(song) => setVideoUrl(song.videoSrc)} />
      
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 ml-[200px]">
        <h1 className="text-4xl font-bold text-white">
          ILLIT Fanpage
        </h1>
      </main>
    </>
  )
}

export default App
