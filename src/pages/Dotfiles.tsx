import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Cpu,
  HardDrive,
  Package,
  Github,
  CircuitBoard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import movRecording from "../assets/dev_env.mp4";

const Dotfiles = () => {
  const systemSpecs = [
    {
      label: "Home Server",
      value: "Custom Linux Mint Server",
      icon: HardDrive,
    },
    { label: "DevSystem", value: "MacBook Pro M3 Pro", icon: Cpu },
    { label: "Edge Server", value: "Raspberry Pi 3B+", icon: CircuitBoard },
  ];

  const tools = [
    "tailscale",
    "Docker",
    "n8n",
    "thingsboard",
    "bandwhich",
    "lazygit",
    "lazydocker",
    "neovim",
    "vscode",
    "tmux",
    "fzf",
  ];

  return (
    <div className="min-h-screen tech-grid">
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 p-6">
        <div className="max-w-6xl mx-auto py-12">
          <div className="mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 glow-text">
              Dotfiles
            </h1>
          </div>

          {/* System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {systemSpecs.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div
                  key={idx}
                  className="card-elegant rounded-lg p-6 text-center animate-slide-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Icon className="w-8 h-8 text-accent mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">
                    {spec.label}
                  </p>
                  <p className="font-serif text-lg">{spec.value}</p>
                </div>
              );
            })}
          </div>

          {/* Configuration Preview Video */}
          <div className="card-elegant rounded-lg p-8 mb-16 animate-fade-in-up">
            <h2 className="text-2xl font-serif mb-6">Configuration Preview</h2>
            <div className="bg-secondary/50 rounded-lg overflow-hidden border border-border/50">
              <video className="w-full" controls src={movRecording}>
                Your browser does not support the video tag.
              </video>
            </div>
            <p>
              A sample modular Go project to prints “Hello World”, committed to
              a local repository.
            </p>
          </div>

          {/* Tools & Utilities */}
          <div className="card-elegant rounded-lg p-8 mb-16 animate-fade-in-up">
            <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
              <Package className="w-6 h-6 text-accent" />
              Tools & Utilities
            </h2>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-lg bg-secondary text-foreground border border-border hover:border-accent/50 hover:shadow-[0_0_20px_hsl(var(--glow)/0.2)] transition-all duration-300 cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Button */}
          <div className="text-center">
            <a
              href="https://github.com/karshPrime/dotfiles"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="luxury" size="xl">
                <Github className="mr-2" />
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dotfiles;
