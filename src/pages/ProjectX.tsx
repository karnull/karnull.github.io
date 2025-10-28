import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Github,
  Target,
  Clock,
  Users,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const RosellaInc = () => {
  const milestones = [
    {
      phase: "Research & Planning",
      status: "Completed",
      date: "Q4 2025",
      progress: 100,
    },
    {
      phase: "Core Development",
      status: "In Progress",
      date: "Q1 2026",
      progress: 5,
    },
    {
      phase: "Beta Testing",
      status: "Upcoming",
      date: "Q2 2026",
      progress: 0,
    },
    {
      phase: "Public Release",
      status: "Planned",
      date: "Q3 2025",
      progress: 0,
    },
  ];

  const features = [
    {
      icon: Target,
      title: "Open-Source",
      description:
        "Empowered by transparency and freely accessible development",
    },
    {
      icon: Workflow,
      title: "Expandable Architecture",
      description:
        "Designed for growth with modular capabilities for limitless enhancements",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Centrally driven by the contributions and insights of the engaged community",
    },
  ];

  return (
    <div className="min-h-screen tech-grid">
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 p-6">
        <div className="max-w-6xl mx-auto py-12">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-8 back-home-btn">
              <ArrowLeft className="mr-2" />
              <span>Back to Home</span>
            </Button>
          </Link>

          <div className="mb-16 animate-fade-in-up text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Currently in Development
            </div>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 glow-text">
              Rosella
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <p>Automation by humans and robots working as one.</p>
              <p>Will have more to share soon...</p>
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="card-elegant rounded-lg p-6 text-center group animate-slide-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 border border-accent/20 mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-accent group-hover:animate-glow-pulse" />
                  </div>
                  <h3 className="text-lg font-serif mb-2 group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Timeline */}
          <div className="card-elegant rounded-lg p-8 mb-16 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-serif">Development Timeline</h2>
            </div>

            <div className="space-y-6">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        milestone.progress === 100
                          ? "bg-accent"
                          : milestone.progress > 0
                          ? "bg-accent animate-glow-pulse"
                          : "bg-muted-foreground/30"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-serif text-lg">
                          {milestone.phase}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {milestone.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent to-accent/50 transition-all duration-1000"
                            style={{ width: `${milestone.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-accent">
                          {milestone.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="card-elegant rounded-lg p-8 animate-fade-in-up">
            <h2 className="text-2xl font-serif mb-6">Technology Stack</h2>
            <div className="flex flex-wrap gap-3">
              {["C", "C++", "Go", "Python", "n8n", "ESP-IDF"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="https://github.com/RosellaInc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="luxury" size="xl">
                <Github className="mr-2" />
                View on GitHub
              </Button>
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              (All repositories are currently set to private)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RosellaInc;
