import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MatrixRain from "@/components/MatrixRain";

const personalItems = [
  {
    name: "profile/",
    description: "background, interests, and direction",
    to: "/background",
  },
  {
    name: "community/",
    description: "causes, engagement & impact",
    to: "/community",
  },
  {
    name: "projects/",
    description: "things I've built and explored",
    to: "/codebase",
  },
  {
    name: "writing/",
    description: "observations, ideas, and reflections",
    to: "/journal",
  },
  {
    name: "certifications/",
    description: "certificates & licenses",
    to: "/certifications",
  },
];

const profileItems = [
  {
    name: "email",
    description: "direct contact",
    to: "mailto:karshmail@icloud.com",
    external: false,
  },
  { name: "PGP_key/", description: "secure communication", to: "/pgp" },
  {
    name: "github^",
    description: "code repositories",
    to: "http://github.com/karnull",
    external: true,
  },
  {
    name: "linkedIn^",
    description: "professional profile",
    to: "https://linkedin.com/in/karshranjan",
    external: true,
  },
];

const TerminalHeading = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Karsh";

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="font-mono">
      <span className="text-primary/60">$</span>
      <span className="text-primary/60 ml-2">whoami</span>
      <div className="mt-2">
        <span className="text-primary text-3xl md:text-5xl font-bold tracking-tight">
          {displayText}
        </span>
        <span
          className={`text-primary text-3xl md:text-5xl ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
        >
          _
        </span>
      </div>
    </div>
  );
};

const FileTree = () => {
  const renderSection = (
    command: string,
    items: typeof personalItems | typeof profileItems,
  ) => (
    <div className="mb-6">
      <div className="text-muted-foreground mb-2">
        <span className="text-primary/60">$</span>
        <span className="text-primary/60 ml-2">{command}</span>
      </div>
      <div className="pl-2 space-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const prefix = isLast ? "└──" : "├──";
          const isExternal = "external" in item && item.external;

          if (isExternal || item.to.startsWith("mailto:")) {
            return (
              <a
                key={item.name}
                href={item.to}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-2 hover:text-primary transition-colors"
              >
                <span className="text-primary/40">{prefix}</span>
                <span className="text-primary group-hover:text-primary/80">
                  {item.name}
                </span>
                <span className="text-muted-foreground text-xs mt-0.5">
                  {item.description}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.to}
              className="group flex items-start gap-2 hover:text-primary transition-colors"
            >
              <span className="text-primary/40">{prefix}</span>
              <span className="text-primary group-hover:text-primary/80">
                {item.name}
              </span>
              <span className="text-muted-foreground text-xs mt-0.5">
                {item.description}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="font-mono text-sm">
      {renderSection("ls ~/Archive", personalItems)}
      {renderSection("ls ~/Footprints", profileItems)}
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Matrix rain effect */}
      <MatrixRain />

      {/* Corner decorations - scroll with content */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30" />

      <div className="container mx-auto px-6 py-16 md:py-24 max-w-4xl relative z-10">
        {/* Header */}
        <header className="mb-12">
          <TerminalHeading />
          <p className="text-muted-foreground font-mono text-sm mt-6 leading-relaxed">
            Software and systems engineer, with interests in embedded systems,
            automation, open tools, and assistive technology. This site is
            simply my page on the internet, a place to keep track of what I'm
            building, learning, and thinking about.
          </p>
          <p className="text-muted-foreground font-mono text-sm mt-6 leading-relaxed">
            A lot of that direction was shaped by fiction as much as
            engineering. Mike Pondsmith's Cyberpunk universe had a real impact
            on me. It made technology feel human, political, and personal. I focus
            on tools that reduce dependency on closed systems, mostly: firmware,
            automation, and open utilities.
          </p>
        </header>

        {/* File Tree Navigation */}
        <nav className="mb-16">
          <FileTree />
        </nav>

        {/* Footer */}
        <footer className="pt-6 border-t border-border/20">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono">
            <span>[https://karsh.page]</span>
            <span className="text-primary/40">◈ ENCRYPTED ◈</span>
          </div>
        </footer>
      </div>

      {/* Bottom corner decoration */}
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/30" />
    </div>
  );
};

export default Index;
