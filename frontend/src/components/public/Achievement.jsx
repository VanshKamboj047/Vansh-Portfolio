import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAchievements } from "../../api/achievementsApi";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const response = await getAchievements();

        setAchievements(response.data.data || []);
      } catch (err) {
        console.error("Achievements fetch error:", err);
        setError("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    }

    fetchAchievements();
  }, []);

  // Loading
  if (loading) {
    return (
      <section className="bg-[#f4f4f4] py-24 px-6">
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-3 w-28 bg-zinc-200 rounded mx-auto mb-5" />

          <div className="h-12 w-72 max-w-full bg-zinc-200 rounded mx-auto mb-4" />

          <div className="h-4 w-80 max-w-full bg-zinc-200 rounded mx-auto mb-14" />

          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 rounded-2xl bg-white border border-zinc-200"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="bg-[#f4f4f4] py-20 px-6">
        <p className="text-center text-red-500 text-sm">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section
      id="achievements"
      className="relative scroll-mt-20 bg-[#f4f4f4] text-zinc-900 py-12 sm:py-14 px-6 overflow-hidden"
    >
  

      <div className="relative max-w-5xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          variants={fadeUp}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            Achievements
          </span>

          <div className="w-10 h-[2px] bg-lime-500 rounded-full mx-auto mt-4 mb-5" />

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
            Achieve
            <span className="text-lime-600">
              ments
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-500">
            Milestones, recognition and things I'm proud of.
          </p>
        </motion.div>

        {/* Achievements */}
        {achievements.length > 0 ? (
          <div className="space-y-5">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                variants={fadeUp}
                transition={{
                  delay: index * 0.08,
                }}
                className="
                  group
                  relative
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  gap-5
                  bg-white
                  border
                  border-zinc-200
                  rounded-2xl
                  p-5
                  sm:p-6
                  shadow-sm
                  hover:shadow-md
                  hover:border-lime-400/50
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                {/* Top Accent */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-lime-400/40 to-transparent" />

                {/* Achievement Icon */}
                <div className="
                  shrink-0
                  w-12
                  h-12
                  rounded-xl
                  bg-lime-50
                  border
                  border-lime-200
                  flex
                  items-center
                  justify-center
                  group-hover:bg-lime-100
                  transition-colors
                  duration-300
                ">
                  <i className="ti ti-trophy text-lime-600 text-xl" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                  <h3 className="text-lg sm:text-xl font-semibold text-zinc-900">
                    {achievement.title}
                  </h3>

                  {achievement.description && (
                    <p className="mt-1.5 text-sm leading-6 text-zinc-600">
                      {achievement.description}
                    </p>
                  )}

                </div>

                {/* Date */}
                {achievement.date && (
                  <span className="
                    shrink-0
                    self-start
                    sm:self-center
                    rounded-full
                    bg-lime-50
                    border
                    border-lime-200
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-lime-700
                  ">
                    {formatDate(achievement.date)}
                  </span>
                )}

              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-500 text-sm">
            No achievements available.
          </p>
        )}

        {/* Bottom Line */}
        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="origin-left mt-14 h-px bg-gradient-to-r from-lime-500/40 via-zinc-300 to-transparent"
        />

      </div>
    </section>
  );
}