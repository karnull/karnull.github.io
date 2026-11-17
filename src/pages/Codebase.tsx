import PageLayout from "@/components/PageLayout";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

type Grade = "projects" | "scripts" | "templates" | "contributions";

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
      "One keybind, different actions. Binds per-project automations to a single key.",
    tags: ["Lua", "Neovim", "tmux"],
    link: "https://github.com/karnull/switchboard.nvim",
  },
  {
    year: 2026,
    grade: "projects",
    heading: "tmux-telemetry",
    description:
      "Keeps a log of where the working day goes, from tmux session, window and pane switches, without changing how you work.",
    tags: ["Go", "tmux"],
    link: "https://github.com/karnull/tmux-telemetry",
  },
  {
    year: 2026,
    grade: "projects",
    heading: "datakrash",
    description:
      "Tracks your activity across services and, when you go quiet, checks in over ntfy before alerting a contact.",
    tags: ["Python", "systemd", "ntfy"],
    link: "https://github.com/karnull/datakrash",
  },
  {
    year: 2026,
    grade: "projects",
    heading: "osc52pty",
    description:
      "Workaround that brings OSC 52 clipboard copying to Terminal.app.",
    tags: ["Go", "macOS"],
    link: "https://github.com/karnull/osc52pty",
  },
  {
    year: 2026,
    grade: "projects",
    heading: "grid",
    description:
      "Arranges a set of images into a single PNG collage.",
    tags: ["Go"],
    link: "https://github.com/karnull/grid",
  },
  {
    year: 2026,
    grade: "projects",
    heading: "OpenNetics - Capture-SRM",
    description:
      "Reads raw sensor values over serial, records gestures and builds machine learning models from them.",
    tags: ["Python", "Qt", "SciPy", "NumPy"],
    link: "https://github.com/OpenNetics/Capture-SRM",
  },
  {
    year: 2024,
    grade: "projects",
    heading: "tokyoburn.nvim",
    description:
      "Red-themed fork of folke/tokyonight.nvim.",
    tags: ["Lua", "Neovim"],
    link: "https://github.com/karnull/tokyoburn.nvim",
  },
  {
    year: 2024,
    grade: "projects",
    heading: "only-tmux.nvim",
    description:
      "A Neovim keybind for :only that works on tmux panes too.",
    tags: ["Lua", "Neovim", "tmux"],
    link: "https://github.com/karnull/only-tmux.nvim",
  },
  {
    year: 2026,
    grade: "projects",
    heading: "tnotify",
    description:
      "Notifications shown as a tmux overlay.",
    tags: ["Go", "tmux"],
    link: "https://github.com/karnull/tnotify",
  },
  {
    year: 2026,
    grade: "projects",
    heading: "ifdef.nvim",
    description:
      "Maps nested #ifdef blocks in C and C++ files, with a tree view and labels for matching #endif lines.",
    tags: ["Lua", "Neovim", "C/C++"],
    link: "https://github.com/karnull/ifdef.nvim",
  },
  {
    year: 2024,
    grade: "projects",
    heading: "text invert (ti)",
    description:
      "Formats text, passed as arguments or piped in, into one of several output styles.",
    tags: ["C"],
    link: "https://github.com/karnull/ti",
  },
  {
    year: 2024,
    grade: "projects",
    heading: "trash",
    description:
      "Deletes files to the system trash, lists what's there and restores them by ID.",
    tags: ["Go"],
    link: "https://github.com/karnull/trash",
  },
  {
    year: 2025,
    grade: "projects",
    heading: "smonitor",
    description:
      "Terminal serial monitor with timestamps and saving straight to file.",
    tags: ["C++", "Arduino", "Serial Communication"],
    link: "https://github.com/karnull/smonitor",
  },
  {
    year: 2021,
    grade: "projects",
    heading: "fetch",
    description:
      "Collection of minimal system fetch scripts.",
    tags: ["Shell"],
    link: "https://github.com/karnull/fetch",
  },
  {
    year: 2023,
    grade: "projects",
    heading: "ytdl_GTK3",
    description:
      "GTK 3 front end for youtube-dl.",
    tags: ["Python", "GTK 3"],
    link: "https://github.com/karnull/ytdl_GTK3",
  },
  {
    year: 2026,
    grade: "scripts",
    heading: "git_fuzzy.sh",
    description:
      "Fuzzy pickers for everyday git chores - branches, worktrees, stashes and staging.",
    tags: ["Git", "Shell", "fzf"],
    link: "https://github.com/karnull/gists/blob/main/git_fuzzy.sh",
  },
  {
    year: 2026,
    grade: "scripts",
    heading: "git_logs.sh",
    description:
      "A tidier git log, with a coloured commit graph and fzf actions on picked commits.",
    tags: ["Git", "Shell", "fzf"],
    link: "https://github.com/karnull/gists/blob/main/git_logs.sh",
  },
  {
    year: 2025,
    grade: "scripts",
    heading: "namedit.sh",
    description:
      "Mass-renames files in your $EDITOR, and converts them with ffmpeg when the extension changes.",
    tags: ["Workflow", "Shell", "ffmpeg"],
    link: "https://github.com/karnull/gists/blob/main/namedit.sh",
  },
  {
    year: 2024,
    grade: "scripts",
    heading: "copy_code.sh",
    description:
      "Copies every source file of a given type to the clipboard in one go.",
    tags: ["Workflow", "Shell"],
    link: "https://github.com/karnull/gists/blob/main/copy_code.sh",
  },
  {
    year: 2024,
    grade: "scripts",
    heading: "vimacro.sh",
    description:
      "Vim macros in the shell: record a sequence of edits and replay it across input.",
    tags: ["Workflow", "Shell", "Vim"],
    link: "https://github.com/karnull/gists/blob/main/vimacro.sh",
  },
  {
    year: 2025,
    grade: "scripts",
    heading: "rmsymlink.sh",
    description:
      "Removes a symbolic link together with the file it points to.",
    tags: ["Workflow", "Shell"],
    link: "https://github.com/karnull/gists/blob/main/rmsymlink.sh",
  },
  {
    year: 2026,
    grade: "scripts",
    heading: "watch_file.sh",
    description:
      "Tails a file and sends a notification when new content is added.",
    tags: ["Monitoring", "Shell"],
    link: "https://github.com/karnull/gists/blob/main/watch_file.sh",
  },
  {
    year: 2023,
    grade: "scripts",
    heading: "colors.sh",
    description:
      "Prints every terminal colour alongside its escape sequence.",
    tags: ["Reference", "Shell"],
    link: "https://github.com/karnull/gists/blob/main/colors.sh",
  },
  {
    year: 2023,
    grade: "scripts",
    heading: "periodic.sh",
    description:
      "Renders the periodic table in the terminal, colour-coded by group.",
    tags: ["Reference", "Shell"],
    link: "https://github.com/karnull/gists/blob/main/periodic.sh",
  },
  {
    year: 2021,
    grade: "scripts",
    heading: "battery_cap.sh",
    description:
      "Caps a laptop's maximum charge with a systemd service, on supported models.",
    tags: ["Maintenance", "Shell", "systemd"],
    link: "https://github.com/karnull/gists/blob/main/battery_cap.sh",
  },
  {
    year: 2022,
    grade: "scripts",
    heading: "refresh.sh",
    description:
      "Drops system caches and reports memory usage before and after.",
    tags: ["Maintenance", "Shell"],
    link: "https://github.com/karnull/gists/blob/main/refresh.sh",
  },
  {
    year: 2026,
    grade: "scripts",
    heading: "disk_usage_summary.sh",
    description:
      "Lists the directories and files taking up the most disk space.",
    tags: ["Monitoring", "Shell"],
    link: "https://github.com/karnull/gists/blob/main/disk_usage_summary.sh",
  },
  {
    year: 2026,
    grade: "scripts",
    heading: "monitor_temp.sh",
    description:
      "Watches CPU and GPU temperatures and alerts when they pass a threshold.",
    tags: ["Monitoring", "Shell"],
    link: "https://github.com/karnull/gists/blob/main/monitor_temp.sh",
  },
  {
    year: 2026,
    grade: "templates",
    heading: "uplink",
    description:
      "Small REST server that lets a container act on its host through fixed, named routes, without the Docker socket or a shell.",
    tags: ["Python", "REST"],
    link: "https://github.com/karshosphere/uplink",
  },
  {
    year: 2026,
    grade: "templates",
    heading: "agent-base",
    description:
      "Container setup for my self-hosted agentic workflow.",
    tags: ["Shell", "Docker"],
    link: "https://github.com/karshosphere/agent-base",
  },
  {
    year: 2026,
    grade: "templates",
    heading: "dev-base",
    description:
      "Lightweight Alpine dev container with vim, git and Claude Code built in, plus compose templates for new projects.",
    tags: ["Shell", "Docker"],
    link: "https://github.com/karshosphere/dev-base",
  },
  {
    year: 2026,
    grade: "templates",
    heading: "template-github-ci",
    description:
      "Copier template for my generic GitHub Actions workflows.",
    tags: ["Copier", "GitHub Actions"],
    link: "https://github.com/karshosphere/template-github-ci",
  },
  {
    year: 2026,
    grade: "templates",
    heading: "template-go",
    description:
      "Copier template for my Go projects.",
    tags: ["Copier", "Go"],
    link: "https://github.com/karshosphere/template-go",
  },
  {
    year: 2026,
    grade: "templates",
    heading: "template-python",
    description:
      "Copier template for my Python projects.",
    tags: ["Copier", "Python"],
    link: "https://github.com/karshosphere/template-python",
  },
  {
    year: 2026,
    grade: "templates",
    heading: "template-cxx",
    description:
      "Copier template for my C and C++ projects.",
    tags: ["Copier", "C/C++"],
    link: "https://github.com/karshosphere/template-cxx",
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
];

const gradeLabels: Record<Grade, string> = {
  projects: "Tools & Plugins",
  scripts: "Scripts",
  templates: "Scaffolding",
  contributions: "Contributions",
};

const grades: Grade[] = [
  "projects",
  "scripts",
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
    scripts: false,
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
      </div>
    </PageLayout>
  );
};

export default Codebase;
