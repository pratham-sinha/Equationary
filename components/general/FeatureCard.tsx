type FeatureCardProps = {
  title: string;
  desc: string;
  badge: string;
};

export function FeatureCard({ title, desc, badge }: FeatureCardProps) {
  

  return (
    <div className="relative p-6 rounded-xl shadow transition-all hover:shadow-xl  duration-300 hover:-translate-y-2  border-gray-600 bg-white dark:bg-zinc-900 border dark:border-zinc-700 "
      
    >
      <span
        className="absolute -top-3 -right-3 text-xs font-semibold px-3 py-1 rounded-full shadow text-white bg-gradient-to-r from-indigo-500 to-cyan-500"
      >
        {badge}
      </span>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-zinc-300">{desc}</p>
    </div>
  );
}
