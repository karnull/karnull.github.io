import PageLayout from "@/components/PageLayout";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

type Grade = "projects" | "learning" | "toolsAndScripts" | "templates" | "contributions";

interface CodePost {
  heading: string;
  description: string;
  tags: string[];
  link: string;
  year: number;
  grade: Grade;
}

const codebasePosts: CodePost[] = [
  {
    year: 2026,
    grade: "projects",
    heading: "switchboard.nvim",
    description:
      "One keybind - different actions. Plugin to bind per-project automations to single key.",
    tags: ["neovim", "tmux", ":term"],
    link: "https://github.com/karnull/switchboard.nvim",
  },
  {
    year: 2026,
    grade: "toolsAndScripts",
    heading: "tnotify",
    description: "Notifications as a tmux overlay.",
    tags: ["tmux", "copilot-cli"],
    link: "https://github.com/karnull/tnotify",
  },
  {
    year: 2026,
    grade: "toolsAndScripts",
    heading: "grid",
    description: "Arrange a set of images into a single PNG collage.",
    tags: ["Go"],
    link: "https://github.com/karnull/grid",
  },
  {
    year: 2026,
    grade: "toolsAndScripts",
    heading: "ifdef.nvim",
    description: "Navigate C/C++ files full of nested #ifdef blocks.",
    tags: ["neovim", "C", "C++"],
    link: "https://github.com/karnull/ifdef.nvim",
  },
  {
    grade: "templates",
    heading: "",
    description: "Generic",
    tags: [],
    link: "https://github.com/karnull/templates",
  },
  {
    grade: "templates",
    heading: "",
    description: "Go",
    tags: [],
    link: "https://github.com/karnull/templates/tree/go",
  },
  {
    grade: "templates",
    heading: "",
    description: "Python",
    tags: [],
    link: "https://github.com/karnull/templates/tree/python",
  },
  {
    grade: "templates",
    heading: "",
    description: "Rust",
    tags: [],
    link: "https://github.com/karnull/templates/tree/rust",
  },
  {
    year: 2025,
    grade: "projects",
    heading: "smonitor",
    description:
      "Tool for reading and writing serial port data with timestamped logging capabilities.",
    tags: ["Serial Communication", "C++"],
    link: "https://github.com/karnull/smonitor",
  },
  {
    year: 2024,
    grade: "contributions",
    heading: "TE SM9000 pressure sensors",
    description:
      "Fixed ambiguous I2C address type in Wire.requestFrom() call. Patch 1.2.2",
    tags: ["C++", "Drivers"],
    link: "https://github.com/teemune/TE_SM9000_library/pull/2",
  },
  {
    year: 2024,
    grade: "contributions",
    heading: "Amber",
    description: "Patched Amber's installer for MacOS installation.",
    tags: ["Amber", "MacOS", "Shell"],
    link: "https://github.com/Ph0enixKM/Amber/pull/102",
  },
  {
    year: 2024,
    grade: "toolsAndScripts",
    heading: "vimacro",
    description: "Power of vim macros on Shell.",
    tags: ["Shell", "vim", "UNIX"],
    link: "https://github.com/karnull/gists/blob/main/vimacro.sh",
  },
  {
    year: 2024,
    grade: "toolsAndScripts",
    heading: "copy code",
    description: "Copy all source-code for current project to clipboard.",
    tags: ["Shell", "UNIX"],
    link: "https://github.com/karnull/gists/blob/main/copy_code.sh",
  },
  {
    year: 2024,
    grade: "learning",
    heading: "text invert (ti)",
    description:
      "utility to perform text transformation actions on stdin as pipes & args.",
    tags: ["Go"],
    link: "https://github.com/karnull/ti",
  },
  {
    year: 2024,
    grade: "toolsAndScripts",
    heading: "tokyoburn.nvim",
    description: "Red themed fork of folke/tokyonight.nvim.",
    tags: ["neovim", "Lua"],
    link: "https://github.com/karnull/tokyoburn.nvim",
  },
  {
    year: 2024,
    grade: "toolsAndScripts",
    heading: "only-tmux.nvim",
    description:
      "Zoom in a pane",
    tags: ["neovim", "tmux"],
    link: "https://github.com/karnull/only-tmux.nvim",
  },
  {
    year: 2023,
    grade: "toolsAndScripts",
    heading: "resistor",
    description: "Simple util to get resistor values from their colour bands.",
    tags: ["C"],
    link: "https://github.com/karnull/gists/blob/main/resistor.c",
  },
  {
    year: 2023,
    grade: "toolsAndScripts",
    heading: "periodic",
    description: "Print ASCII periodic table with colour code.",
    tags: ["Shell", "UNIX"],
    link: "https://github.com/karnull/gists/blob/main/periodic.sh",
  },
  {
    year: 2023,
    grade: "toolsAndScripts",
    heading: "colors",
    description: "Print all terminal \\033 terminal colours.",
    tags: ["Shell", "UNIX"],
    link: "https://github.com/karnull/gists/blob/main/colors.sh",
  },
  {
    year: 2022,
    grade: "toolsAndScripts",
    heading: "AUR helper",
    description: "Python web-scraper util to install packages from the AUR.",
    tags: ["Python", "Arch Linux", "BeautifulSoup"],
    link: "https://github.com/karnull/aur_helper",
  },
  {
    year: 2022,
    grade: "toolsAndScripts",
    heading: "refresh",
    description: "Clear system cache to free up memory.",
    tags: ["Shell", "UNIX"],
    link: "https://github.com/karnull/gists/blob/main/refresh.sh",
  },
  {
    year: 2021,
    grade: "toolsAndScripts",
    heading: "fetch",
    description: "Collection of minimal fetch scripts in bash.",
    tags: ["Shell", "UNIX"],
    link: "https://github.com/karnull/fetch",
  },
  {
    year: 2021,
    grade: "toolsAndScripts",
    heading: "battery limit",
    description:
      "Create systemd service to put a limit on max charge percentage.",
    tags: ["Shell", "systemd"],
    link: "https://github.com/karnull/gists/blob/main/battery_cap.sh",
  },
];

const gradeLabels: Record<Grade, string> = {
  projects: "Projects",
  learning: "Learning",
  toolsAndScripts: "Tools & Scripts",
  templates: "Templates",
  contributions: "Contributions",
};

const grades: Grade[] = [
  "projects",
  "learning",
  "toolsAndScripts",
  "templates",
  "contributions",
];

const TagBadge = ({ tag }: { tag: string }) => (
  <span className="inline-block px-2 py-1 text-xs font-mono border border-secondary/40 text-secondary/80 bg-secondary/5 mr-2 mb-2 hover:border-secondary hover:text-secondary transition-colors">
    {tag}
  </span>
);

const CodePostCard = ({ post }: { post: CodePost }) => (
  <a
    href={post.link}
    target="_blank"
    rel="noopener noreferrer"
    className="block cyber-box border-primary/30 bg-card/60 mb-4 hover:border-primary/60 cursor-pointer transition-all hover:bg-card/80"
  >
    <div className="flex items-start justify-between gap-4 mb-3">
      <h4 className="text-primary font-display text-lg uppercase tracking-wider">
        {post.heading}
      </h4>
      <span className="text-foreground/60 text-xs font-mono uppercase tracking-widest">
        {post.year}
      </span>
    </div>
    <p className="text-foreground/60 font-mono text-sm mb-4">
      {post.description}
    </p>
    <div className="flex flex-wrap">
      {post.tags.map((tag) => (
        <TagBadge key={tag} tag={tag} />
      ))}
    </div>
  </a>
);

const Codebase = () => {
  const [openGrades, setOpenGrades] = useState<Record<Grade, boolean>>({
    projects: true,
    learning: false,
    toolsAndScripts: false,
    templates: false,
    contributions: false,
  });

  const toggleGrade = (grade: Grade) => {
    setOpenGrades((prev) => ({ ...prev, [grade]: !prev[grade] }));
  };

  return (
    <PageLayout title="Projects" fluid>
      <div className="space-y-8">
        <p className="text-foreground/70">
          Repository of tools, scripts, and contributions to the open-source
          projects. Each line of code written to solve problems in the urban
          sprawl.
        </p>

        {grades.map((grade) => {
          const posts = codebasePosts.filter((post) => post.grade === grade);
          if (posts.length === 0) return null;

          return (
            <Collapsible
              key={grade}
              open={openGrades[grade]}
              onOpenChange={() => toggleGrade(grade)}
              className="mt-10"
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-4 mb-6 cursor-pointer group">
                  <div className="w-2 h-2 bg-primary animate-pulse" />
                  <h3 className="text-2xl font-display text-primary/80 uppercase tracking-widest">
                    {gradeLabels[grade]}
                  </h3>
                  <div className="flex-1 h-px bg-primary/20" />
                  <ChevronDown
                    className={`w-5 h-5 text-primary/60 transition-transform duration-200 ${
                      openGrades[grade] ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
                  {posts.map((post) => (
                    <CodePostCard key={post.link} post={post} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}

        <p className="text-foreground/70">
          Other projects can be found at{" "}
          <a
            href="https://github.com/karshosphere"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Karsh's Stratosphere
          </a>
          . Above the clouds. All my random projects drift here like aerosols.
        </p>
      </div>
    </PageLayout>
  );
};

export default Codebase;
