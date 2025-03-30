import { useEffect, useRef, useState } from 'react';
import JsonInput, { VideoData } from './components/JsonInput';
import { Button } from './components/ui/button';
import ReactPlayer from 'react-player/lazy';
import VideoCard from './components/VideoCard';

function App() {
  const [jsonData, setJsonData] = useState<VideoData[] | null>(null);
  const [videos, setVideos] = useState<VideoData[] | null>(null);
  const [currentVideo, setCurrentVideo] = useState<VideoData | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [playerSize, setPlayerSize] = useState({
    width: '640px',
    height: '360px',
  });

  useEffect(() => {
    const updatePlayerSize = () => {
      const width = window.innerWidth < 640 ? '100vw' : '640px';
      const height = window.innerWidth < 640 ? '56.25vw' : '360px';
      setPlayerSize({ width, height });
    };

    updatePlayerSize();
    window.addEventListener('resize', updatePlayerSize);
    return () => window.removeEventListener('resize', updatePlayerSize);
  }, []);

  const handlePlay = (video: VideoData) => {
    setCurrentVideo(video);
    setTimeout(() => {
      playerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  };

  return (
    <main className="flex flex-col justify-center items-center mx-auto mt-16 gap-y-4 lg:max-w-7xl mb-8">
      <h1 className="font-paytone text-center text-5xl">PlayListicle</h1>
      <p className="mb-4 text-center">
        Effortlessly create and showcase video listicles with dynamic playback
        and seamless engagement
      </p>
      <JsonInput onJsonParsed={setJsonData} />
      <Button
        className="w-1/4"
        disabled={!jsonData}
        onClick={() => setVideos(jsonData)}>
        Generate
      </Button>

      {currentVideo && (
        <div ref={playerRef}>
          <ReactPlayer
            url={currentVideo?.videoUrl}
            controls
            playing
            width={playerSize.width}
            height={playerSize.height}
          />
        </div>
      )}

      {videos?.length && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {videos?.map((item, index) => (
            <VideoCard
              video={item}
              key={index}
              onPlay={() => handlePlay(item)}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default App;
