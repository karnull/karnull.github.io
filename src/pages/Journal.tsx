import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";

interface JournalEntry {
  id: number;
  heading: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
}

const journalEntries: JournalEntry[] = [
  {
    id: 1,
    heading: "Withdrawing frm Grad School",
    date: "August 31, 2025",
    description:
      "About my decision to withdraw from Babson College and build myself as a professionally.",
    tags: ["Babson College", "Entrepreneurship", "GradSchool - Withdraw"],
    slug: "/writing/withdrawing-from-grad-school",
  },
  {
    id: 2,
    heading: "What automation should be for",
    date: "May 2, 2025",
    description:
      "Understanding the transformative potential of automation to reshape work, welfare, and accessibility in society.",
    tags: ["Automation", "AI", "Systems Design"],
    slug: "/writing/automation-and-purpose",
  },
];

const TagBadge = ({ tag }: { tag: string }) => (
  <span className="inline-block px-2 py-1 text-xs font-mono border border-secondary/40 text-secondary/80 bg-secondary/5 mr-2 mb-2 hover:border-secondary hover:text-secondary transition-colors">
    {tag}
  </span>
);

const JournalCard = ({ entry }: { entry: JournalEntry }) => (
  <Link to={entry.slug} className="block">
    <div className="cyber-box border-primary/30 bg-card/60 mb-4 hover:border-primary/60 transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-primary font-display text-lg uppercase tracking-wider">
          {entry.heading}
        </h4>
        <span className="text-muted-foreground font-mono text-xs">
          {entry.date}
        </span>
      </div>
      <p className="text-foreground/60 font-mono text-sm mb-4">
        {entry.description}
      </p>
      <div className="flex flex-wrap">
        {entry.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  </Link>
);

const Journal = () => {
  return (
    <PageLayout title="Writing">
      <div className="space-y-8">
        <p className="text-foreground/70">
          Technical writings, reflections, and insights on code and life.
        </p>

        <div className="space-y-4">
          {journalEntries.map((entry) => (
            <JournalCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Journal;
