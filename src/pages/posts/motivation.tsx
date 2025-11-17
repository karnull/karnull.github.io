import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SystemDesign = () => {
  return (
    <div className="min-h-screen tech-grid">
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 p-6">
        <div className="max-w-4xl mx-auto py-12">
          <article className="prose prose-lg max-w-none">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Crafting My Purpose
            </h1>
            <div className="text-sm text-muted-foreground mb-8">
              May 2, 2025 · 5 min read
            </div>

            <div className="text-foreground leading-relaxed space-y-6">
              <p>
                As we navigate an era defined by rapid advancements in
                artificial intelligence and robotics, the role of humans in the
                workforce is increasingly called into question. Many people
                express concern about the potential for robots to replace human
                jobs, but I believe the underlying issue is more complex than
                mere job displacement.
              </p>
              <p>
                Take factory workers, for instance. If it weren't for the
                financial necessity of their jobs, many would likely welcome
                robots taking over their roles. The fear surrounding automation
                isn't about the technology itself; it's about the loss of income
                that comes with losing a job. Workers are not inherently afraid
                of AI; they are concerned about how losing their jobs would
                impact their ability to pay bills and support their families.
              </p>
              <p>
                This brings us to a critical point: if robots can perform all
                repetitive tasks, we should reconsider our economic model.
                Instead of viewing automation as a threat, we could envision a
                future where machines handle essential work- like farming and
                manufacturing, providing goods such as food and shelter at
                little to no cost. In this scenario, money could become less of
                a necessity, and more of a luxury, allowing people to focus on
                pursuits that truly matter to them.
              </p>
              <p>
                While this may sound too idealistic, it reflects a fundamental
                principle: we have the opportunity to utilise technology to
                improve human life. This belief is what drives my ambition to
                create digital solutions, particularly in the field of
                prosthetics.
              </p>
              <p>
                Currently, many individuals with disabilities face significant
                challenges in accessing affordable and effective prosthetic
                solutions. For those in remote areas, even basic maintenance of
                their devices can be a struggle. Unfortunately, advanced
                technology is often out of reach for those who need it the most.
                I envision a future where innovative prosthetic solutions are
                accessible to everyone, enabling individuals to lead more
                independent lives without the burden of financial constraints.
              </p>
              <p>
                This vision may seem ambitious, but it highlights the potential
                of technology to reshape our lives. By embracing AI and
                robotics, we can explore new ways to address fundamental human
                needs, such as accessibility and independence. The possibilities
                are vast, and they extend beyond mere efficiency; they offer a
                chance to rethink how we structure our society and economy.
              </p>
              <p>
                As an engineer, I am particularly interested in how these
                advancements can be applied to improve the lives of individuals
                with disabilities. While my focus is not solely on my personal
                journey, I recognise the importance of contributing to this
                conversation. I aim to play a role in developing innovative
                solutions that make prosthetics more accessible and effective
                for those who need them. In doing so, I hope to be part of a
                broader movement that embraces the potential of technology to
                enhance human life.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default SystemDesign;
