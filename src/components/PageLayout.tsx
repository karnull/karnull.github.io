import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MatrixRain from "@/components/MatrixRain";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
  fluid?: boolean;
  innerMaxWidth?: string;
}

const PageLayout = ({ title, children, wide = false, fluid = false, innerMaxWidth }: PageLayoutProps) => {
  const containerClass = fluid
    ? 'w-full px-[clamp(1.5rem,5vw,6rem)] py-16'
    : `container mx-auto px-6 py-16 ${wide ? 'max-w-6xl' : 'max-w-4xl'}`;

  const inner = (
    <>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-sm uppercase tracking-wider">
          back to main
        </span>
      </Link>

      <header className="mb-12">
        <div className="mb-4">
          <span className="text-primary/50 font-mono text-xs tracking-widest">
            $ print {title.replace(/\s+/g, '_').toLowerCase()}/
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-primary text-glow-primary">
          {title}
        </h1>
      </header>

      <main className="text-foreground/80 font-mono leading-relaxed">
        {children}
      </main>
    </>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Matrix rain effect */}
      <MatrixRain />

      {/* Corner decorations - scroll with content */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30" />

      <div className={containerClass}>
        {innerMaxWidth
          ? <div className={`${innerMaxWidth} mx-auto`}>{inner}</div>
          : inner
        }
      </div>

      {/* Bottom corner decorations */}
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/30" />
    </div>
  );
};

export default PageLayout;
