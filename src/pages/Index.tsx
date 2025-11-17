import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Users, BookOpen, Terminal, BrainCircuit } from "lucide-react";

import pdfHaemograph from "../assets/Completion_letter_Haemograph.pdf";

const Index = () => {
  const navButtons = [
    {
      title: "Codebase",
      path: "/codebase",
      icon: Code2,
      description: "Projects & Development",
    },
    {
      title: "Community",
      path: "/community",
      icon: Users,
      description: "Engagement & Impact",
    },
    {
      title: "OpenNetics",
      path: "https://github.com/OpenNetics",
      icon: BrainCircuit,
      description: "Current Focus",
    },
    {
      title: "Journal",
      path: "/journal",
      icon: BookOpen,
      description: "Thoughts & Writings",
    },
    {
      title: "Dotfiles",
      path: "/dotfiles",
      icon: Terminal,
      description: "System Configuration",
    },
  ];

  return (
    <div className="min-h-screen tech-grid">
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 p-6 pt-[10%]">
        <div className="max-w-6xl w-full mx-auto">
          <div className="mb-24 text-left">
            <h1 className="text-5xl md:text-6xl font-serif mb-8">
              Karsh Ranjan
            </h1>
            <div className="text-sm md:text-base text-foreground max-w-4xl leading-relaxed pr-[5%]">
              <p>
                Innovator who looks at the world through the lens of
                engineering. Motivated by purpose, I was awarded the "Innovator
                Impact" award at{" "}
                <a
                  href="https://www.babson.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link text-accent"
                >
                  Babson College
                </a>
                , and I was offered an officer role in the U.S. Marine Corps.
              </p>
              <br />
              <p>
                Disciplined, I am preparing for a 100 km ultra-marathon, and I
                received the Vice-Chancellor Excellence Scholarship at{" "}
                <a
                  href="https://www.swinburne.edu.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link text-accent"
                >
                  Swinburne University of Technology
                </a>
                , from where I graduated with Distinction in Engineering
                Honours.
              </p>
              <br />
              <p>
                Previously, I worked for a{" "}
                <a
                  href="http://haemograph.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link text-accent"
                >
                  biotech startup
                </a>{" "}
                based in Melbourne, where I wrote the firmware for the patented
                rheometer device. A detailed summary of my work can be found in
                this{" "}
                <a
                  href={pdfHaemograph}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link text-accent"
                >
                  letter of completion.
                </a>{" "}
                This experience sharpened my low-level development skills and
                familiarised me with the{" "}
                <a
                  href="https://www.espressif.com/en/products/socs/esp32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link text-accent"
                >
                  ESP32 platform
                </a>
                .
              </p>
              <br />
              <p>
                <a
                  href="https://github.com/karshPrime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link text-accent"
                >
                  Github
                </a>{" "}
                &nbsp; | &nbsp;
                <a
                  href="https://linkedin.com/in/karshPrime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link text-accent"
                >
                  LinkedIn
                </a>{" "}
                &nbsp; | &nbsp;
                <a
                  href="mailto:utkarsh_ranjan@protonmail.com"
                  className="home-link text-accent"
                >
                  Email
                </a>{" "}
                &nbsp; | &nbsp;
                <Link to="/pgp" className="home-link text-accent">
                  PGP Key
                </Link>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-full">
            {navButtons.map((button, index) => {
              const Icon = button.icon;
              return (
                <Link
                  key={button.path}
                  to={button.path}
                  className="block group animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="card-elegant rounded-lg p-6 h-full flex flex-col items-start gap-3">
                    <Icon className="w-6 h-6 text-accent group-hover:animate-glow-pulse" />
                    <div>
                      <h3 className="text-lg font-serif mb-1 group-hover:text-accent transition-colors duration-300">
                        {button.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {button.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
