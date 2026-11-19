import PageLayout from "@/components/PageLayout";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { codebasePosts, type CodePost, type Grade } from "@/lib/codebase";

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
