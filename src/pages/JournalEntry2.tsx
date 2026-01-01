import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";

const JournalEntry2 = () => {
  return (
    <PageLayout title="journal entry">
      <div className="space-y-8">
        <Link
          to="/journal"
          className="text-primary/60 font-mono text-sm hover:text-primary transition-colors"
        >
          ← back to journal
        </Link>

        <article className="space-y-6">
          <header className="border-b border-border/30 pb-4">
            <h1 className="text-primary font-display text-2xl uppercase tracking-wider mb-2">
              What automation should be for
            </h1>
            <span className="text-muted-foreground font-mono text-sm">
              May 2, 2025
            </span>
          </header>

          <div className="font-mono text-foreground/80 space-y-4 leading-relaxed">
            <p>
              A lot of conversations about automation begin with fear. People
              worry that machines will replace jobs, remove purpose, and leave
              human beings with less to do. I understand that concern, but I
              think it often misses the deeper issue. The real problem is not
              that work can be automated. It is that many people depend on work
              for survival, which makes any change to work feel like a threat.
            </p>
            <p>
              That is why I find automation interesting in the first place. To
              me, the question is not simply whether machines can do more. The
              better question is what that extra capability is actually for. If
              technology only increases efficiency while leaving people more
              insecure, then it has solved very little. If it removes burden,
              expands access, and gives people more room to live with
              independence and dignity, then it starts to feel worthwhile.
            </p>
            <p>
              That way of thinking is also why I care about assistive
              technology. Some of the most meaningful uses of engineering are
              not flashy at all. They are practical. They help someone move more
              freely, communicate more easily, or maintain a degree of
              independence that would otherwise be difficult to hold on to. In
              those cases, technology is not replacing the human being. It is
              extending what a human being is able to do.
            </p>
            <p>
              Prosthetics sit close to that idea for me. There is still a large
              gap between what is technically possible and what is actually
              accessible to the people who need it. Cost, maintenance, distance,
              and complexity can all become barriers. That matters, especially
              for people living far from specialist support or working with
              limited resources. If engineering is serious about improving
              lives, then accessibility has to matter just as much as
              capability.
            </p>
            <p>
              I do not think automation should be treated as a spectacle, or as
              proof that the future has arrived. What matters more is whether
              the systems we build reduce friction, widen access, and give
              people more control over their own lives. That applies just as
              much to a simple tool as it does to advanced robotics or AI.
              Better technology should not only do more. It should help people
              do more too.
            </p>
            <p>
              That is the thread I keep coming back to. I am interested in
              automation, AI, and systems design not because they feel
              futuristic, but because they raise an important question: what
              kinds of human lives are these tools helping make possible? The
              work that interests me most sits where that question becomes
              concrete — in useful systems, accessible devices, and technology
              that increases human capability in a way that is practical, not
              just impressive.
            </p>
          </div>

          <div className="flex flex-wrap pt-4 border-t border-border/30">
            {["Automation", "AI", "Systems Design"].map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs font-mono border border-secondary/40 text-secondary/80 bg-secondary/5 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </div>
    </PageLayout>
  );
};

export default JournalEntry2;
