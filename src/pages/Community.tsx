import PageLayout from "@/components/PageLayout";
import { useState, useEffect } from "react";

// Import local community images
import imgGreekClub1 from "@/assets/community/GreekClub/committee1.jpg";
import imgGreekClub2 from "@/assets/community/GreekClub/IMG_3497.png";
import imgGreekClub3 from "@/assets/community/GreekClub/IMG_3503.png";
import imgGreekClub4 from "@/assets/community/GreekClub/IMG_3578.png";
import imgIn2Science1 from "@/assets/community/In2Science/finalist.png";
import imgIn2Science2 from "@/assets/community/In2Science/group.jpg";
import imgIn2Science3 from "@/assets/community/In2Science/student.jpg";
import imgRoundSquare1 from "@/assets/community/RoundSquare/DSC_0744.jpg";
import imgRoundSquare2 from "@/assets/community/RoundSquare/IMG_20180406_100611.jpg";
import imgRoundSquare3 from "@/assets/community/RoundSquare/IMG_20180409_110537.jpg";
import imgRoundSquare4 from "@/assets/community/RoundSquare/IMG_3408.jpg";
import imgRoundSquare5 from "@/assets/community/RoundSquare/IMG_3777.jpg";
import imgRoundSquare6 from "@/assets/community/RoundSquare/IMG_7347.jpg";
import imgRoundSquare7 from "@/assets/community/RoundSquare/m2.jpg";
import imgRoundSquare8 from "@/assets/community/RoundSquare/newspaper.png";
import imgRoundSquare9 from "@/assets/community/RoundSquare/thumbnail_IMG_0365.jpg";

const samplePosts = [
  {
    id: 1,
    heading: "Swinburne Hellenic Society",
    paragraph: [
      "I joined the Swinburne Hellenic Society in the final years of university out of a genuine interest in culture, community, and meeting people outside my usual circles. Over time, I moved from being a general member to the committee, and eventually served as Treasurer. Being trusted with that role, despite not coming from a Greek background, meant a lot to me.",
      "The club gave me more than just events to help organise. It gave me a sense of how much community is built through small, consistent effort - showing up, helping things run well, and making people feel welcome. Through the society and its connection to NUGAS, I met people from across Melbourne and had the chance to learn from a culture that was not originally my own, which made the experience even more meaningful.",
      "What stayed with me most was the warmth of it all. It was one of those experiences that reminded me that community is not always built through big ideas. Often it comes from shared meals, regular effort, and people who genuinely care about keeping something alive.",
    ],
    images: [imgGreekClub1, imgGreekClub2, imgGreekClub3, imgGreekClub4],
  },
  {
    id: 2,
    heading: "In2Science",
    paragraph: [
      "I volunteered with In2Science in 2022 and 2023 as a maths mentor, working with Year 10 students and helping them build confidence around ideas that often feel more intimidating than they need to be. Maths has always mattered to me, not just as a subject, but as a way of thinking clearly and making sense of the world.",
      "A lot of students grow up seeing maths as something dry or inaccessible. In contrast, to me, it is closer to a language of logic than a collection of rules, and that shift in perspective can make a real difference. Mentoring gave me the chance to share that view and help students see that STEM is not reserved for a certain type of person.",
      "I was nominated for Best Mentor and recognised as a finalist for Best Communicator during my two years with In2Science.",
    ],
    images: [imgIn2Science1, imgIn2Science2, imgIn2Science3],
  },
  {
    id: 3,
    heading: "Sweebs Club",
    paragraph: [
      "I started Sweebs during the COVID years at university, when a lot of student life felt distant and half-formed. The original idea was simple: a space built around shared interest in Asian animated media, including Japanese and Korean comics, animation, and music. But very quickly it became clear that the real need was not just for a niche club — it was for connection.",
      "As things grew, the club became more of a social space than a fandom space. Students from across the university were looking for somewhere to meet people, talk, and feel part of something while so much of university life was still happening at a distance. Within a few months, Sweebs had grown to more than 400 members and became one of the larger student communities on campus at the time.",
      "What mattered most to me was not the size of the club, but what it represented. It showed me that even a simple idea can become meaningful if it answers the right need. I also started an all-committee community to help clubs collaborate more easily, which quickly brought together representatives from more than 20 societies. Looking back, that period taught me a lot about building things for people: if you pay attention to what is missing, even a small initiative can create real momentum.",
    ],
    images: [],
  },
  {
    id: 4,
    heading: "Round Square: Eye Camp",
    paragraph: [
      "In my final year of high school, I took part in a Round Square volunteer programme in India focused on eye health in under-served communities. Before the trip, we were trained by professionals to carry out basic eye tests, and once there we helped raise awareness, assess vision, and provide glasses to people who otherwise had little access to that kind of care.",
      "What stayed with me was how many people had been living with poor vision without realising that their situation could be improved so simply. Watching something as ordinary as a basic eye test make such an immediate difference was deeply affecting. It was a reminder that meaningful service is not always complicated. Sometimes it is practical, direct, and quietly life-changing.",
      "The programme also received local media attention, which was unexpected, but the lasting value of the experience was much more personal. It gave me an early sense of what it means to contribute to something larger than yourself, and that idea has stayed with me ever since.",
    ],
    images: [
      imgRoundSquare1,
      imgRoundSquare2,
      imgRoundSquare3,
      imgRoundSquare4,
      imgRoundSquare5,
      imgRoundSquare6,
      imgRoundSquare7,
      imgRoundSquare8,
      imgRoundSquare9,
    ],
  },
];

interface PostCardProps {
  heading: string;
  paragraph: string[];
  images: string[];
}

const parseParagraph = (paragraph: string[]) => {
  return paragraph.map((line, index) => (
    <div key={index}>
      {line.split(/(\[.*?\]\(.*?\))/g).map((part, idx) => {
        const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (match) {
          return (
            <a key={idx} href={match[2]} className="text-primary underline">
              {match[1]}
            </a>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
      {index < paragraph.length - 1 && (
        <>
          <br />
          <br />
        </>
      )}
    </div>
  ));
};

const PostCard = ({ heading, paragraph, images }: PostCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const validImages = images.filter((img) => img && img !== "");

  useEffect(() => {
    if (validImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [validImages.length]);

  return (
    <div className="cyber-box border-primary/40 bg-card/70 mb-6">
      <h3 className="text-primary font-display text-xl uppercase tracking-wider mb-4 text-glow-primary">
        {heading}
      </h3>
      <p className="text-foreground/70 font-mono text-sm leading-relaxed mb-6">
        {parseParagraph(paragraph)}
      </p>
      {validImages.length > 0 && (
        <div className="relative aspect-video overflow-hidden border border-primary/20">
          {validImages.map((img, index) => (
            <img
              key={img}
              src={img}
              alt={`Post visual ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {validImages.length > 1 && (
            <div className="absolute bottom-2 right-2 flex gap-1">
              {validImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 border border-primary/50 ${
                    index === currentImageIndex
                      ? "bg-primary"
                      : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
        </div>
      )}
    </div>
  );
};

const Community = () => {
  return (
    <PageLayout title="community">
      <div className="space-y-8">
        <p className="text-foreground/70">
          A lot of the most meaningful parts of my life so far have happened
          around people — mentoring, organising, volunteering, and helping make
          communities feel more alive.
        </p>

        <div className="mt-8">
          {samplePosts.map((post) => (
            <PostCard
              key={post.id}
              heading={post.heading}
              paragraph={post.paragraph}
              images={post.images}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Community;
