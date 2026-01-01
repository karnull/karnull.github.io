import PageLayout from "@/components/PageLayout";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

import imgLogo from "@/assets/opennetics/Logo.png";
import imgGestureTracker from "@/assets/opennetics/GestureTracker.png";
import imgPipPackage from "@/assets/opennetics/PipPackage.png";

const screenshots = [imgLogo, imgGestureTracker, imgPipPackage];

const Projectx = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout title="OpenNetics">
      <div className="space-y-8">
        <p className="text-foreground/70">
          Current operational focus. Details classified until completion. All
          assets allocated. Automation by humans and robots working as one.
        </p>

        <div className="border border-primary/20 p-6 bg-card/50 overflow-x-auto">
          <pre className="text-primary/70 text-sm whitespace-pre">
            {`// Status report...
> Classification : Protected
> Phase          : In Progress
> Current Focus  : OpenNetics-lib.py
> Progress       : [████░░░░░░] 40%
> ETA            : REDACTED`}
          </pre>
        </div>

        {/* Screenshot Slideshow */}
        <div className="space-y-4">
          <div className="relative aspect-video overflow-hidden border border-primary/20">
            {screenshots.map((img, index) => (
              <img
                key={img}
                src={img}
                alt={`OpenNetics screenshot ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute bottom-2 right-2 flex gap-1">
              {screenshots.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 border border-primary/50 ${
                    index === currentIndex ? "bg-primary" : "bg-transparent"
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
          </div>

          <a
            href="https://github.com/OpenNetics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-primary/40 bg-card/50 text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary/10 hover:border-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

export default Projectx;
