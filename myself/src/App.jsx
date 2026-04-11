import React, { useState, useRef } from 'react';
import './App.css'
import VideoBackground from './components/VideoBackground'
import IconBar from './components/IconBar'
import MusicApp from './components/MusicApp'
import MiniPlayer from './components/MiniPlayer'
import LinkModal from './components/linkModal'
import defaultBg from './assets/firstbg.webp'
import ProfileCard from './components/profileCard'
import musicData from './data/musicData'
import WorkModal from './components/workModal'

function App() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [playingSong, setPlayingSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMiniVisible, setIsMiniVisible] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const musicAppRef = useRef(null);
  const [isWorkOpen, setIsWorkOpen] = useState(false);

  const handleMusicClick = () => {
    setIsMusicOpen(prev => !prev);
  };

  const handlePlayStateChange = (song, playing) => {
    setPlayingSong(song);
    setIsPlaying(playing);
    if (song) setIsMiniVisible(true);
  };

  const handlePlayPause = () => {
    if (musicAppRef.current) {
      musicAppRef.current.togglePlay(playingSong);
    }
  };

  const handlePrev = () => {
    if (!playingSong) return;
    const idx = musicData.findIndex(s => s.id === playingSong.id);
    const prevIdx = idx <= 0 ? musicData.length - 1 : idx - 1;
    const prevSong = musicData[prevIdx];
    if (musicAppRef.current) musicAppRef.current.playExternal(prevSong);
  };

  const handleNext = () => {
    if (!playingSong) return;
    const idx = musicData.findIndex(s => s.id === playingSong.id);
    const nextIdx = (idx + 1) >= musicData.length ? 0 : idx + 1;
    const nextSong = musicData[nextIdx];
    if (musicAppRef.current) musicAppRef.current.playExternal(nextSong);
  };

  return (
    <>
      <WorkModal isOpen={isWorkOpen} onClose={() => setIsWorkOpen(false)} />
      <VideoBackground
        videoUrl={videoUrl}
        fallbackImage={defaultBg}
        onReady={() => setIsVideoReady(true)}
      />
      <IconBar
        onMusicClick={handleMusicClick}
        onLinkClick={() => setIsLinkOpen(prev => !prev)}
        onAboutClick={() => setIsAboutOpen(prev => !prev)}
        onWorkClick={() => setIsWorkOpen(prev => !prev)}
      />
      <ProfileCard isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <LinkModal isOpen={isLinkOpen} onClose={() => setIsLinkOpen(false)} />
      <MusicApp
        ref={musicAppRef}
        onPlaySong={(song) => {
          setIsVideoReady(false); // reset mỗi khi đổi bài
          setVideoUrl(song.videoSrc);
        }}
        isOpen={isMusicOpen}
        onClose={handleMusicClick}
        onPlayStateChange={handlePlayStateChange}
        canPlay={isVideoReady}
      />
      <MiniPlayer
        song={playingSong}
        isPlaying={isPlaying}
        isVisible={isMiniVisible}
        onPlayPause={handlePlayPause}
        onPrev={handlePrev}
        onNext={handleNext}
        onClose={() => {
          setIsMiniVisible(false);
          setTimeout(() => setPlayingSong(null), 500);
        }}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 ml-[200px]">
      </main>
    </>
  )
}

export default App