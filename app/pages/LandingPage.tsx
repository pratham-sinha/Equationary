import { FeatureCard } from "@/components/general/FeatureCard";

const features = [
  {
    title: "Live Leaderboard",
    desc: "Scores update in real-time as users answer. Instant feedback and ranking dynamics.",
    badge: "Real-Time",
  },
  {
    title: "Fast & Fair Evaluation",
    desc: "Answers are validated immediately. Scoring rewards accuracy and speed.",
    badge: "Scoring",
  },
  {
    title: "Educational Blogs",
    desc: "Concept-driven blogs to strengthen your basics and dive deeper into topics.",
    badge: "Learning",
  },
  {
    title: "Rich Problem Set",
    desc: "Handpicked MCQs across topics with LaTeX and interactive diagrams.",
    badge: "Curated",
  },
  {
    title: "Contest Hosting",
    desc: "Create and manage contests easily with our dashboard.",
    badge: "Creator",
  },
  {
    title: "Mobile Responsive",
    desc: "Optimized for all screen sizes, works great on phones too.",
    badge: "Responsive",
  },
];


export default function LandingPage() {
  return (
    

    <main className="min-h-screen  bg-gradient-to-br  text-gray-800 flex flex-col items-center ">
     
      <section className="w-full max-w-5xl text-center py-24 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Battle of Brains
        </h1>
        <p className="text-lg md:text-xl mt-6 max-w-2xl mx-auto text-gray-600">
          Real-time MCQ contests with intelligent rankings and a growing educational ecosystem.
        </p>
        
        
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-6 pb-20">
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 border-t w-full">
        © {new Date().getFullYear()} EQUATIONARY
      </footer>
    </main>
  
  );
}
