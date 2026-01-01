import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import MatrixRain from "@/components/MatrixRain";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <MatrixRain />

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30" />

      <div className="relative z-10 text-center px-6 max-w-xl">
        {/* Glitch 404 */}
        <h1
          className="text-8xl md:text-9xl font-display uppercase tracking-widest text-destructive mb-6"
          data-text="404"
        >
          404
        </h1>

        {/* Divider line */}
        <div className="w-48 h-px mx-auto bg-gradient-to-r from-transparent via-primary/80 to-transparent mb-6" />

        {/* Message */}
        <p className="font-mono text-sm text-muted-foreground mb-10 leading-relaxed">
          You have drifted beyond the boundaries of karnull cyberspace.<br />
          This sector does not exist in the network.
        </p>

        {/* Return button */}
        <Link
          to="/"
          className="inline-block cyber-box px-8 py-3 font-mono text-sm uppercase tracking-widest text-primary hover:text-primary-foreground hover:bg-primary/90 transition-all duration-300"
        >
          [ re-enter karnull page]
        </Link>

        {/* Status line */}
        <p className="mt-10 font-mono text-xs text-muted-foreground/50 tracking-widest">
          STATUS: <span className="text-destructive">OFFLINE</span> — ROUTE{" "}
          <span className="text-secondary">{location.pathname}</span> NOT MAPPED
        </p>
      </div>
    </div>
  );
};

export default NotFound;
