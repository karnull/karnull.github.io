import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import imgGreekClub1 from "../assets/GreekClub/committee1.jpg";
import imgGreekClub2 from "../assets/GreekClub/IMG_3497.png";
import imgGreekClub3 from "../assets/GreekClub/IMG_3503.png";
import imgGreekClub4 from "../assets/GreekClub/IMG_3578.png";
import imgIn2Science1 from "../assets/In2Science/finalist.png";
import imgIn2Science2 from "../assets/In2Science/group.jpg";
import imgIn2Science3 from "../assets/In2Science/student.jpg";
import imgRoundSquare1 from "../assets/RoundSquare/DSC_0744.jpg";
import imgRoundSquare2 from "../assets/RoundSquare/IMG_20180406_100611.jpg";
import imgRoundSquare3 from "../assets/RoundSquare/IMG_20180409_110537.jpg";
import imgRoundSquare4 from "../assets/RoundSquare/IMG_3408.jpg";
import imgRoundSquare5 from "../assets/RoundSquare/IMG_3777.jpg";
import imgRoundSquare6 from "../assets/RoundSquare/IMG_7347.jpg";
import imgRoundSquare7 from "../assets/RoundSquare/m2.jpg";
import imgRoundSquare8 from "../assets/RoundSquare/newspaper.png";
import imgRoundSquare9 from "../assets/RoundSquare/thumbnail_IMG_0365.jpg";

const Community = () => {
  const cards = [
    {
      title: "Swinburne Hellenic Society",
      images: [imgGreekClub1, imgGreekClub2, imgGreekClub3, imgGreekClub4],
      content: (
        <>
          Having a passion for exploring new cultures and traditions, I was an
          active member of the
          <a
            href="https://linktr.ee/swinhellenicsociety?fbclid=PAZXh0bgNhZW0CMTEAAaeg3ZLN-OKxYLaZfhDSmytNuAzw7K0UrTpQ3RkGOkv6Xs5DUCGi2wdyGhLvcg_aem_Sravt4iOX4C1bI5zYLetSw"
            target="_blank"
            rel="noopener noreferrer"
            className="home-link text-accent"
          >
            {" "}
            University Greek Club{" "}
          </a>
          during my final years at university. I progressed from a general
          committee member to the executive committee as the Treasurer. Despite
          not having a Greek background, I was entrusted by the community to
          hold this title and fulfil the associated responsibilities.
          <br />
          <br />
          During my six months as Treasurer, I contributed to organising events,
          managing club finances, and promoting Greek culture within the
          university. This opportunity allowed me to meet many wonderful
          individuals, not just from my university but from across Melbourne, as
          our club is affiliated with
          <a
            href="https://www.facebook.com/nugasvic/"
            target="_blank"
            rel="noopener noreferrer"
            className="home-link text-accent"
          >
            {" "}
            NUGAS
          </a>
          . I had an incredible time learning about Greek culture and embraced
          every opportunity to enjoy Souvlaki.
        </>
      ),
    },
    {
      title: "In2Science",
      images: [imgIn2Science1, imgIn2Science2, imgIn2Science3],
      content: (
        <>
          I have always been passionate about math and I believe that anyone can
          engage with it given the right guidance. This belief motivated me to
          volunteer as a maths mentor with the
          <a
            href="https://in2science.org.au"
            target="_blank"
            className="home-link text-accent"
          >
            {" "}
            In2Science
          </a>{" "}
          programme in 2022 and 2023. I worked with Year 10 students, helping
          them grasp mathematical concepts and providing insight into what it’s
          like to study STEM at university.
          <br />
          <br />
          Many people are put off by math because they perceive it as merely a
          "subject of numbers," which I find quite unfortunate. When viewed as a
          "language of logic," it becomes significantly more engaging. I have
          tried to share this perspective with my students, and it has been
          rewarding to witness their growing enjoyment of the language.
          Additionally, it was a lovely to be nominated for Best Mentor in 2022
          and to be a finalist for Best Communicator in 2023.
        </>
      ),
    },
    {
      title: "Sweebs Club",
      images: [],
      content: (
        <>
          Starting university during COVID was rather disappointing,
          particularly as the first year is typically a time for meeting new
          people. However, with online classes and limited socialising, I was
          determined not to miss out on the opportunity. Consequently, I decided
          to establish a new university club called Sweebs, which focused on
          Asian animated entertainment, including Japanese and Korean comics,
          cartoons, J-pop, and K-pop.
          <br />
          <br />
          As I began this venture, I realised that the club could be more than
          just a niche interest group. I recognised that all university students
          were likely seeking ways to connect with one another, even while we
          were confined to online interactions. Therefore, I shifted the focus
          to creating a social space for students to gather and network.
          <br />
          <br />
          This approach proved to be highly successful, and we grew to over 400
          members in just a few months. It became one of the largest university
          clubs at the time, and it was wonderful to see individuals from across
          the university coming together. I also initiated an "all committee
          community" to facilitate collaboration among different clubs for
          events. It was a straightforward idea, but it turned out to be a
          significant success, with representatives from over 20 clubs
          participating and working together within just a month - that was, for
          as long as I was incharge.
        </>
      ),
    },
    {
      title: "Round Square: Eye Camp",
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
      content: (
        <>
          In my final year of high school, I participated in a volunteer
          programme organised by
          <a
            href="https://www.roundsquare.org"
            target="_blank"
            className="home-link text-accent"
          >
            {" "}
            Round Square
          </a>
          , which involved travelling to underprivileged areas in India. Our
          mission was to raise awareness about eye health and provide free eye
          tests and glasses to those in need. Prior to our work, we received
          training from professionals on how to conduct eye tests, which was an
          invaluable experience.
          <br />
          <br />
          It was eye-opening to witness how many individuals were struggling
          with blurry vision, often unaware that it was a treatable condition.
          We were able to make a significant difference by offering free eye
          tests and glasses to those who required them. It was a deeply
          rewarding experience that has stayed with me.
          <br />
          <br />
          The programme was a tremendous success, garnering considerable local
          attention and media coverage. Local news agencies even came to
          document our efforts, and I was fortunate enough to be featured in one
          of the articles. Below is a section from the local newspaper that
          highlights our experience.
        </>
      ),
    },
  ];

  const [currentImageIndices, setCurrentImageIndices] = useState(
    cards.map(() => 0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndices((prev) =>
        prev.map((index, i) => (index + 1) % cards[i].images.length)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen tech-grid">
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 p-6">
        <div className="max-w-4xl mx-auto py-12">
          <div className="mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 glow-text">
              Community
            </h1>
            <p className="text-xl text-muted-foreground">
              Building bridges, sharing knowledge, and fostering growth within
              the developer community.
            </p>
          </div>

          <div className="space-y-8">
            {cards.map((card, idx) => {
              const currentImage = card.images[currentImageIndices[idx]];

              return (
                <div
                  key={idx}
                  className="card-elegant rounded-lg overflow-hidden group animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Conditional rendering for the images */}
                  {card.images.length > 0 && (
                    <div className="relative h-96 overflow-hidden">
                      <img
                        src={currentImage}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {card.images.map((_, imgIdx) => (
                          <div
                            key={imgIdx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              imgIdx === currentImageIndices[idx]
                                ? "w-8 bg-accent"
                                : "w-1.5 bg-accent/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    <h2 className="text-3xl font-serif mb-6 group-hover:text-accent transition-colors duration-300">
                      {card.title}
                    </h2>
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                      {card.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
