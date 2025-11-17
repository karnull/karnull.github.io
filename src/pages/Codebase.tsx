import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Codebase = () => {
  const projectsByYear = [
    {
      year: "2025",
      categories: [
        {
          name: "Hobby",
          projects: [
            {
              name: "OpenNetics - Gesture Tracker",
              description:
                "Tool to visualise serial read and record gestures for OpenNetics development.",
              tech: ["OpenNetics", "Python", "PySlide", "QT", "pandas", "scipy", "numpy"],
              link: "https://github.com/OpenNetics/Gesture-Tracker",
            },
            {
              name: "Outfit Generator",
              description:
                "Pick right outfit for the occasion",
              tech: ["Python" ],
              link: "https://github.com/karshosphere/outfit-generator",
            },
            {
              name: "gun",
              description:
                "Tool to unify build, run, and test commands across multiple programming languages.",
              tech: ["Go", "Build Automation"],
              link: "https://github.com/karshPrime/gun",
            },
            {
              name: "smonitor",
              description:
                "Tool for reading and writing serial port data with timestamped logging capabilities.",
              tech: ["Serial Communication", "C++"],
              link: "https://github.com/karshPrime/smonitor",
            },
          ],
        },
        {
          name: "Academic",
          projects: [
            {
              name: "IoT Firmware",
              description:
                "Firmware development for IoT devices featuring ECG and motion sensors.",
              tech: ["C", "C++", "ESP-IDF", "IoT"],
              link: "https://github.com/karshPrime/SWE30011-Firmware",
            },
            {
              name: "IoT Webserver",
              description:
                "Web server implementation for processing data from ECG and motion sensors.",
              tech: ["Python", "Flask", "IoT"],
              link: "https://github.com/karshPrime/SWE30011-WebServer",
            },
            {
              name: "IoT Smart Home",
              description:
                "Group project for managing independent IoT devices with edge and cloud server integration.",
              tech: ["IoT", "Cloud Computing", "Embedded Systems"],
              link: "https://github.com/karshPrime/c-vault",
            },
          ],
        },
      ],
    },
    {
      year: "2024",
      categories: [
        {
          name: "Community",
          projects: [
            {
              name: "TE SM9000 pressure sensors",
              description:
                "Fixed ambiguous I2C address type in Wire.requestFrom() call. Patch 1.2.2",
              tech: ["C++", "Drivers"],
              link: "https://github.com/teemune/TE_SM9000_library/pull/2",
            },
            {
              name: "Amber",
              description: "Patched Amber's installer for MacOS installation.",
              tech: ["Amber", "MacOS", "Shell"],
              link: "https://github.com/Ph0enixKM/Amber/pull/102",
            },
          ],
        },
        {
          name: "Hobby",
          projects: [
            {
              name: "vimacro",
              description: "Power of vim macros on Shell.",
              tech: ["Shell", "vim", "UNIX"],
              link: "https://github.com/karshPrime/SysHacks/blob/main/vimacro.sh",
            },
            {
              name: "rename",
              description:
                "Mass rename files and dirs with $EDITOR; with file conversion support.",
              tech: ["Shell", "UNIX"],
              link: "https://github.com/karshPrime/SysHacks/blob/main/refresh.sh",
            },
            {
              name: "copy code",
              description:
                "Copy all source-code for current project to clipboard.",
              tech: ["Shell", "UNIX"],
              link: "https://github.com/karshprime/SysHacks/blob/main/copy_code.sh",
            },
            {
              name: "project initialise",
              description:
                "Generate templates for new projects with basic code structure.",
              tech: ["Shell", "UNIX"],
              link: "https://github.com/karshprime/SysHacks/blob/main/project_initialise.sh",
            },
            {
              name: "MemoryPercent",
              description:
                "Tool that calculates the percentage of time elapsed since a specified date.",
              tech: ["C"],
              link: "https://github.com/karshPrime/MemoryPercent",
            },
            {
              name: "Trash",
              description:
                "Delete to ~/.Trash, with the power to restore from the terminal.",
              tech: ["Go", "UNIX"],
              link: "https://github.com/karshPrime/trash",
            },
            {
              name: "TODO",
              description:
                "A todo utility for more personalised and priority based use case.",
              tech: ["Go"],
              link: "https://github.com/karshprime/todo",
            },
            {
              name: "todo",
              description:
                "Manage todo files in centralised location. Discontinued.",
              tech: ["Shell", "UNIX"],
              link: "https://github.com/karshprime/SysHacks/blob/main/todo.sh",
            },
            {
              name: "rmsymlink",
              description: "Delete symlinks and their associated base files.",
              tech: ["Shell", "UNIX"],
              link: "https://github.com/karshprime/SysHacks/blob/main/rmsymlink.sh",
            },
            {
              name: "trash",
              description: "Move files to ~/.Trash and prevent accidental rm.",
              tech: ["Shell", "UNIX"],
              link: "https://github.com/karshprime/SysHacks/blob/main/trash.sh",
            },
          ],
        },
        {
          name: "Academics",
          projects: [
            {
              name: "Simplified MISP CPU",
              description: "VHDL Design",
              tech: ["VHDL", "MISP", "MCU"],
              link: "https://github.com/karshPrime/EEE40013/tree/main/Assignment2",
            },
            {
              name: "16bit multiplier",
              description:
                "Designed a 16bit multiplier using a single 8bit multiplier",
              tech: ["VHDL", "MISP", "MCU"],
              link: "https://github.com/karshPrime/EEE40013/tree/main/Assignment1",
            },
            {
              name: "text invert (ti)",
              description:
                "utility to perform text transformation actions on stdin as pipes & args.",
              tech: ["Go"],
              link: "https://github.com/karshPrime/ti",
            },
            {
              name: "AstroStreakNet",
              description:
                "Capstone Project. Interface for astronomers to manage captured streak.",
              tech: ["Go", "Java", "Python", "Shell", "Typescript"],
              link: "https://github.com/AstroStreakNet",
            },
            {
              name: "Hotel Management",
              description:
                "Prototype software to simulate hotel reservation system.",
              tech: ["C++"],
              link: "https://github.com/karshPrime/uni-SWE300003",
            },
          ],
        },
      ],
    },
    {
      year: "2023",
      categories: [
        {
          name: "Hobby",
          projects: [
            {
              name: "resistor",
              description:
                "Simple util to get resistor values from their colour bands.",
              tech: ["C"],
              link: "https://github.com/karshprime/SysHacks/blob/main/resistor.c",
            },
            {
              name: "periodic",
              description: "Print ASCII periodic table with colour code.",
              tech: ["Shell", "UNIX"],
              link: "https://github.com/karshprime/SysHacks/blob/main/periodic.sh",
            },
            {
              name: "colors",
              description: "Print all terminal \\033 terminal colours.",
              tech: ["Shell", "UNIX"],
              link: "https://github.com/karshprime/SysHacks/blob/main/colors.sh",
            },
          ],
        },
        {
          name: "Academic",
          projects: [
            {
              name: "Flight DBMS",
              description:
                "Project in Julia to study user permissions within database.",
              tech: ["Julia", "MySQL", "MariaDB"],
              link: "https://github.com/karshprime/uni-flightDBMS",
            },
            {
              name: "Fine-Tune LLM",
              description:
                "My efforts to fine-tune various LLMs to new domains.",
              tech: ["Machine Learning", "LLMs", "Python"],
              link: "https://github.com/karshPrime/IntelligentSystems/tree/utkarsh-branch",
            },
          ],
        },
      ],
    },
    {
      year: "2022",
      categories: [
        {
          name: "Hobby",
          projects: [
            {
              name: "ytdl GTK",
              description: "GUI frontend for yt-dl in GTK3 toolkit.",
              tech: ["GTK3", "Python"],
              link: "https://github.com/karshPrime/ytdl_GTK3",
            },
            {
              name: "story time",
              description:
                "Discord bot to summarise stories where users type a word each to write a story.",
              tech: ["Python", "Discord API"],
              link: "https://github.com/karshPrime/story_time",
            },
            {
              name: "Arch vulnerable",
              description:
                "Python web-scraper util to match local packages with known vulnerable ones.",
              tech: ["Python", "Arch Linux", "BeautifulSoup"],
              link: "https://github.com/karshPrime/arch_vulnerable",
            },
            {
              name: "AUR helper",
              description:
                "Python web-scraper util to install packages from the AUR.",
              tech: ["Python", "Arch Linux", "BeautifulSoup"],
              link: "https://github.com/karshPrime/aur_helper",
            },
            {
              name: "click_speed",
              description:
                "Simple Ruby util to measure self mouse click speed.",
              tech: ["Ruby", "Gosu"],
              link: "https://github.com/karshPrime/click_speed/commits/main/",
            },
            {
              name: "refresh",
              description: "Clear system cache to free up memory.",
              tech: ["Shell", "UNIX"],
              link: "https://github.com/karshprime/SysHacks/blob/main/refresh.sh",
            },
          ],
        },
        {
          name: "Academic",
          projects: [
            {
              name: "D02",
              description:
                "Wireless Message Communicator built on top of myDAQ1.",
              tech: ["MATLAB", "myDAQ1"],
              link: "https://github.com/karshprime/uni-d02",
            },
            {
              name: "Flight Booking",
              description: "Flight reservation website.",
              tech: ["PHP", "HTML", "CSS", "JavaScript"],
              link: "https://github.com/karshprime/uni-delta_flights",
            },
            {
              name: "EVM Prototype",
              description: "Prototype for Electronic Voting System.",
              tech: ["C++"],
              link: "https://github.com/karshprime/uni-electronic_vote_system",
            },
            {
              name: "Traffic Light Simulator",
              description:
                "FPGA design in VHDL to simulate traffic light/pedestrian buttons.",
              tech: ["VHDL", "FPGA"],
              link: "https://github.com/karshPrime/uni-traffic_light",
            },
          ],
        },
      ],
    },
    {
      year: "2021",
      categories: [
        {
          name: "Hobby",
          projects: [
            {
              name: "ZellaBOT",
              description: "Discord bot for anonymous server confessions.",
              tech: ["Python", "Discord API"],
              link: "https://github.com/karshprime/zella_bot",
            },
            {
              name: "fetch",
              description: "Collection of minimal fetch scripts in bash.",
              tech: ["Shell", "UNIX"],
              link: "https://github.com/karshPrime/fetch",
            },
            {
              name: "battery limit",
              description:
                "Create systemd service to put a limit on max charge percentage.",
              tech: ["Shell", "systemd"],
              link: "https://github.com/karshPrime/SysHacks/blob/main/battery_cap.sh",
            },
          ],
        },
        {
          name: "Academic",
          projects: [
            {
              name: "CLI Music Player",
              description: "task description",
              tech: ["Ruby"],
              link: "https://github.com/karshPrime/uni-music_player_cli",
            },
            {
              name: "GUI Music Player",
              description: "task description",
              tech: ["Ruby", "Gosu"],
              link: "https://github.com/karshPrime/uni-music_player_gui",
            },
            {
              name: "Random Walker",
              description: "task description",
              tech: ["Ruby", "Gosu"],
              link: "https://github.com/karshPrime/uni-random_walker",
            },
            {
              name: "Genesis",
              description: "2D adventure game.",
              tech: ["Ruby", "Gosu"],
              link: "https://github.com/karshPrime/uni-genesis",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen tech-grid">
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 p-6">
        <div className="max-w-6xl mx-auto py-12">
          <div className="mb-16 animate-fade-in-up flex justify-between items-start gap-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-serif mb-4 glow-text">
                Codebase
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                A chronological archive of projects, experiments, and
                contributions to the open-source ecosystem.
              </p>
            </div>
            <div className="hidden lg:block flex-shrink-0">
              <a
                href="https://github.com/karshPrime"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="github-stats"
                  alt="Github Stats"
                  src="https://github-readme-stats.vercel.app/api?username=karshPrime&theme=graywhite&show_icons=true&count_private=true&rank_icon=github&custom_title=GitHub%20Statistics"
                />
              </a>
            </div>
          </div>

          <div className="space-y-16">
            {projectsByYear.map((yearGroup, idx) => (
              <div
                key={yearGroup.year}
                className="animate-slide-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-4xl font-serif text-accent">
                    {yearGroup.year}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent"></div>
                </div>

                <div className="space-y-12">
                  {yearGroup.categories.map((category, catIdx) => (
                    <div key={catIdx}>
                      <h3 className="text-2xl font-serif text-muted-foreground mb-6">
                        {category.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {category.projects.map((project, projectIdx) => (
                          <div
                            key={projectIdx}
                            className="card-elegant rounded-lg p-6 group"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="text-xl font-serif group-hover:text-accent transition-colors duration-300">
                                {project.name}
                              </h4>
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-accent transition-colors"
                              >
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            </div>

                            <p className="text-muted-foreground mb-4">
                              {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="https://github.com/karshPrime"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="luxury" size="lg">
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

export default Codebase;
