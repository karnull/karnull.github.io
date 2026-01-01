import { useState, useEffect } from "react";

interface ImageSlideshowProps {
  images: string[];
  interval?: number;
}

const ImageSlideshow = ({ images, interval = 4000 }: ImageSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full aspect-[3/4]">
      {/* Tech frame - outer border */}
      <div className="absolute inset-0 border-2 border-primary/40" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,136,0.03)_50%)] bg-[length:100%_4px] z-10" />

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-primary/5 blur-sm -z-10" />

      {/* Image container */}
      <div className="absolute inset-2 overflow-hidden bg-background/50">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slideshow ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-primary/30"
            }`}
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;
