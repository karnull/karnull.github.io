import PageLayout from "@/components/PageLayout";
import vidSystemPlay from "@/assets/dotfiles/sysrun.mp4";

const tools = [
  "Neovim",
  "tmux",
  "LazyGit",
  "Alacritty",
  "Starship",
  "fzf",
  "ripgrep",
  "btop",
  "tailscale",
  "Docker",
  "n8n",
  "thingsboard",
  "bandwhich",
];

const TagBadge = ({ tag }: { tag: string }) => (
  <span className="inline-block px-3 py-2 text-sm font-mono border border-secondary/40 text-secondary/80 bg-secondary/5 mr-2 mb-2 hover:border-secondary hover:text-secondary transition-colors cursor-default">
    {tag}
  </span>
);

const Dotfiles = () => {
  return (
    <PageLayout title="dotfiles">
      <div className="space-y-8">
        {/* Config files */}
        <div className="border border-primary/20 p-6 bg-card/50 overflow-x-auto">
          <pre className="text-primary/70 text-sm whitespace-pre">
            {`// Hardware Peripherals
> Portable Console : MacBook Pro M3 Pro
> Edge Module      : Debian @ RaspberryPi 3B+
> Central Data Hub : Custom Mint Server @ NVidia 1650Ti, 16GB DDR4 + 32GB Intel Optane`}
          </pre>
        </div>

        {/* Video Element */}
        <div className="cyber-box border-primary/30 bg-card/60">
          <h4 className="text-primary font-display text-lg uppercase tracking-wider mb-4">
            System Run
          </h4>
          Sample Go project to prints “Hello World”, committed to a local
          repository.
          <br />
          <br />
          <video
            className="w-full bg-background/50 border border-primary/20" // Removed aspect-video class
            controls
            autoPlay
            muted
            loop
            style={{ objectFit: "cover" }} // Optional: ensures the video scales properly
          >
            <source src={vidSystemPlay} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Tools & Utilities Box */}
        <div className="cyber-box border-primary/30 bg-card/60">
          <h4 className="text-primary font-display text-lg uppercase tracking-wider mb-4">
            Tools & Utilities
          </h4>
          <div className="flex flex-wrap">
            {tools.map((tool) => (
              <TagBadge key={tool} tag={tool} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dotfiles;
