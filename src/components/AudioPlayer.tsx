import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";

interface AudioPlayerProps {
  src: string;
}

const DEFAULT_VOLUME = 0.6;

const AudioPlayer = ({ src }: AudioPlayerProps) => {
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = DEFAULT_VOLUME;

    // Auto-play on first user interaction
    const handleFirstInteraction = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked, user needs to click
        });
      document.removeEventListener("click", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  // Pause when tab/app loses focus, resume when it regains focus
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlaying) {
          audio.pause();
        }
      } else {
        if (isPlaying) {
          audio.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      // If volume is 0, reset to default
      if (volume === 0) {
        setVolume(DEFAULT_VOLUME);
        audio.volume = DEFAULT_VOLUME;
      }
      audio.play().then(() => {
        setIsPlaying(true);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0 || !isPlaying) {
      return (
        <VolumeX className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors relative z-10" />
      );
    } else if (volume < 0.5) {
      return (
        <Volume1 className="w-5 h-5 text-primary group-hover:text-primary transition-colors relative z-10 animate-pulse" />
      );
    } else {
      return (
        <Volume2 className="w-5 h-5 text-primary group-hover:text-primary transition-colors relative z-10 animate-pulse" />
      );
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="metadata" />
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Volume Slider Container - Vertical, above button, hidden on mobile */}
        <div
          className={`
            hidden sm:block overflow-hidden transition-all duration-300 ease-out
            ${isHovered ? "h-24 opacity-100" : "h-0 opacity-0"}
          `}
        >
          <div className="relative w-10 h-24 flex items-center justify-center py-3 border border-primary/50 bg-background/90 backdrop-blur-sm">
            {/* Corner accents for slider */}
            <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-primary" />
            <div className="absolute -top-px -right-px w-2 h-2 border-t border-r border-primary" />
            <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-primary" />
            <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-primary" />

            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/5" />

            {/* Custom styled vertical range input */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 appearance-none bg-primary/20 cursor-pointer relative z-10 -rotate-90
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:border
                [&::-webkit-slider-thumb]:border-primary
                [&::-webkit-slider-thumb]:shadow-[0_0_8px_hsl(var(--primary)/0.6)]
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:duration-200
                [&::-webkit-slider-thumb]:hover:shadow-[0_0_12px_hsl(var(--primary)/0.8)]
                [&::-moz-range-thumb]:w-3
                [&::-moz-range-thumb]:h-3
                [&::-moz-range-thumb]:bg-primary
                [&::-moz-range-thumb]:border
                [&::-moz-range-thumb]:border-primary
                [&::-moz-range-thumb]:shadow-[0_0_8px_hsl(var(--primary)/0.6)]
              "
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                  volume * 100
                }%, hsl(var(--primary) / 0.2) ${
                  volume * 100
                }%, hsl(var(--primary) / 0.2) 100%)`,
              }}
            />
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 border border-primary/50 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300 group relative"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {/* Corner accents */}
          <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-primary" />
          <div className="absolute -top-px -right-px w-2 h-2 border-t border-r border-primary" />
          <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-primary" />
          <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-primary" />

          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/15 transition-colors" />

          {/* Icon */}
          {getVolumeIcon()}
        </button>
      </div>
    </>
  );
};

export default AudioPlayer;
