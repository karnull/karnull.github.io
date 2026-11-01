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
    heading: "Withdrawing from Grad School",
    date: "31 August 2025",
    description:
      "Why I left Babson College to grow as an engineer through real work instead.",
    tags: ["Babson College", "Entrepreneurship", "Graduate School"],
    slug: "/writing/withdrawing-from-grad-school",
  },
  {
    id: 2,
    heading: "What automation should be for",
    date: "2 May 2025",
    description:
      "What automation is actually for: less burden, wider access and more independence, not just efficiency.",
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
          Notes, reflections and the odd technical piece, on code and life.
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
