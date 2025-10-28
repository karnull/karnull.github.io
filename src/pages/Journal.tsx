import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Journal = () => {
  const posts = [
    {
      title: "Dropping Out to Innovate",
      date: "August 31, 2025",
      readTime: "5 min read",
      excerpt:
        "About my decision to leave grad school and find a path that truly resonates with who I am and what I want to achieve.",
      tags: ["Dropping Out", "Entrepreneurship"],
    },
    {
      title: "Crafting My Purpose",
      date: "May 2, 2025",
      readTime: "5 min read",
      excerpt:
        "Understanding the transformative potential of automation to reshape work, welfare, and accessibility in society.",
      tags: ["Motivation", "Purpose", "View on Future"],
    },
  ];

  return (
    <div className="min-h-screen tech-grid">
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 p-6">
        <div className="max-w-5xl mx-auto py-12">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-8 back-home-btn">
              <ArrowLeft className="mr-2" />
              <span>Back to Home</span>
            </Button>
          </Link>

          <div className="mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 glow-text">
              Journal
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Technical writings, reflections, and insights on code and life.
            </p>
          </div>

          <div className="space-y-16">
            {posts.map((post, idx) => {
              const postLinks = ["/journal/dropout", "/journal/motivation"];

              return (
                <Link to={postLinks[idx]} key={idx}>
                  <article
                    className="card-elegant rounded-lg p-8 group animate-slide-in cursor-pointer"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-serif mb-3 group-hover:text-accent transition-colors duration-300">
                          {post.title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
