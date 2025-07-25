export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
          About Equationary
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Where contests meet learning.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-blue-500 dark:text-blue-300 mb-2">What is Equationary?</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          <strong>Equationary</strong> is a real-time contest platform that turns competitive learning into an exciting game.
          We host live MCQ-based contests in math, physics, tech, and more — compete with peers and learn from a vibrant community.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-blue-500 dark:text-blue-300 mb-2">Our Mission</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          We believe learning shouldn&apos;t be boring. Our goal is to build a gamified environment where solving problems feels like leveling up in a game — engaging, challenging, and fun.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-blue-500 dark:text-blue-300 mb-2">Built By</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          Equationary is created by <strong> <a href="https://www.linkedin.com/in/prathamsinha" target="_blank" rel="noopener noreferrer">Pratham Sinha</a></strong>, an engineering undergrad and a developer passionate about building . This platform started as a side project — now it&apos;s evolving into a full-fledged space for competitive learners.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-blue-500 dark:text-blue-300 mb-4">What’s Next?</h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-6">
          <li>AI-generated question sets</li>
          <li>Topic-wise practice mode</li>
          <li>Community-contributed blogs and tutorials</li>
          <li>Mobile-first experience with real-time updates</li>
          <li>
            We&apos;re currently limiting contest creation to admins only as we scale our infrastructure. Full user access will be available soon!
          </li>
        </ul>
      </section>

      <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
       Have suggestions or feedback ? I&apos;d love to connect — reach out via <a href="https://www.linkedin.com/in/prathamsinha" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
      </footer>
    </div>
  );
}
