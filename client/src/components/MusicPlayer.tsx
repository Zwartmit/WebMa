import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useAudio } from "@/lib/music";

type MusicPlayerProps = {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
};

const MusicPlayer = ({ isPlaying, setIsPlaying }: MusicPlayerProps) => {
  const [volume, setVolume] = useState(50);
  const { togglePlay, setVolume: adjustVolume } = useAudio();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    adjustVolume(newVolume / 100);
  };

  const handleTogglePlay = () => {
    togglePlay();
    setIsPlaying(!isPlaying);
  };

  // Initialize audio on component mount
  useEffect(() => {
    if (isPlaying) {
      togglePlay();
    }
    adjustVolume(volume / 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div 
      className="bg-white/80 rounded-full px-4 py-2 shadow-md flex items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <button 
        onClick={handleTogglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-light transition-colors"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <div className="ml-3 w-48">
        <input 
          type="range" 
          className="volume-slider w-full" 
          min="0" 
          max="100" 
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Control de volumen"
        />
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
