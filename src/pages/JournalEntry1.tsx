import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";

const JournalEntry1 = () => {
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
              Withdrawing frm Grad School
            </h1>
            <span className="text-muted-foreground font-mono text-sm">
              August 31, 2025
            </span>
          </header>

          <div className="font-mono text-foreground/80 space-y-4 leading-relaxed">
            <p>
              When I finished engineering, I felt a strong need to understand
              not just how to build, but what was worth building in the first
              place.
            </p>
            <p>
              That curiosity was what led me to Babson College. After years
              focused on technical depth, graduate study in entrepreneurship
              seemed like a way to step back and think more seriously about
              direction, judgement, and the broader context around building -
              what problems are worth solving, and what kind of work is worth
              committing yourself to.
            </p>
            <p>
              Once in the United States, I spent time talking with founders,
              engineers, and people working across different industries.
              Those conversations were valuable. They helped surface
              questions I hadn't fully answered yet—about responsibility,
              long‑term craft, and what kind of engineer I wanted to become.
            </p>
            <p>
              Over time, one thing became clear: stepping away from engineering              
              that early did not make sense for me. I wanted to stay close to the
              craft, build depth through real work, and let any understanding of
              business grow alongside practice rather than apart from it.
            </p>
            <p>
              Around the same period, I was also thinking more seriously about
              service, discipline, and responsibility. Those ideas weren't new
              to me, but they gained clarity through experience. The common
              thread was simple: meaningful work matters most when it is
              grounded in contribution and carried forward through consistent
              effort, not distance from the work itself.
            </p>
            <p>
              Returning to Australia was a practical decision. I wanted to keep
              building as an engineer, learn through shipping real systems, and
              refine my sense of direction through practice rather than
              abstraction. Engineering was still where I felt closest to the work
              that mattered to me, and it felt premature to step away from that
              before I had really begun.
            </p>
            <p>
              Looking back, I don't see leaving Babson as a reversal or a misstep.
              I see it as part of the same process—testing assumptions,
              recalibrating, and choosing to stay close to the things I wanted to
              get good at. The question of what to build still matters, but I came
              to believe I would answer it better by continuing to build while
              asking it.
            </p>
            <p>
              For now, that means engineering, real work, and learning in motion.
            </p>
          </div>

          <div className="flex flex-wrap pt-4 border-t border-border/30">
            {[
              "Babson College",
              "Entrepreneurship",
              "GradSchool - Withdraw",
            ].map((tag) => (
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

export default JournalEntry1;
