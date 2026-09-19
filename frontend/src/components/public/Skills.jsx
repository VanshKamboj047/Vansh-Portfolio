import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSkills } from "../../api/skillsApi";

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

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await getSkills();
        setSkills(response.data.data || []);
      } catch (err) {
        console.error("Skills fetch error:", err);
        setError("Failed to load skills");
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#0e0e10] py-24 px-6">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-3 w-28 bg-white/10 rounded mx-auto mb-5" />

          <div className="h-12 w-48 bg-white/10 rounded mx-auto mb-4" />

          <div className="h-4 w-72 bg-white/10 rounded mx-auto mb-14" />

          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 rounded-2xl bg-white/[0.03] border border-white/[0.07]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#0e0e10] py-20 px-6">
        <p className="text-center text-red-400 text-sm">
          {error}
        </p>
      </section>
    );
  }

  if (!skills.length) {
    return (
      <section
        id="skills"
        className="scroll-mt-20 bg-[#0e0e10] py-24 px-6"
      >
        <p className="text-center text-white/40 text-sm">
          No skills available.
        </p>
      </section>
    );
  }

  // Group skills dynamically by category
  const groupedSkills = skills.reduce((groups, skill) => {
    const category = skill.category?.trim() || "Other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(skill);

    return groups;
  }, {});

  const categories = Object.entries(groupedSkills);

  return (
    <section
      id="skills"
      className="relative scroll-mt-20 bg-[#0e0e10] text-white py-12 sm:py-14 px-6 overflow-hidden"
    >

      <div className="relative max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
            What I Work With
          </span>

          <div className="w-10 h-[2px] bg-lime-400 rounded-full mx-auto mt-4 mb-5" />

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            My{" "}
            <span className="text-lime-400">
              Skills
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/40">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* ================= CATEGORY BOXES ================= */}

        <div className="space-y-4">
          {categories.map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={fadeUp}
              transition={{
                delay: categoryIndex * 0.05,
              }}
              className="
                relative
                rounded-2xl
                border
                border-white/[0.09]
                bg-white/[0.025]
                px-5
                py-5
                sm:px-7
                sm:py-6
                hover:border-white/[0.14]
                transition-colors
                duration-300
              "
            >
              {/* ================= CATEGORY HEADER ================= */}

              <div className="flex items-center gap-3 mb-5">

                {/* Green Accent */}
                <span className="w-1 h-7 rounded-full bg-lime-400 shrink-0" />

                {/* Dynamic Category */}
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {category}
                </h3>

                {/* Divider */}
                <div className="h-px bg-white/[0.08] flex-1 ml-2" />

                {/* Dynamic Skill Count */}
                <span className="shrink-0 text-xs text-white/45 bg-white/[0.05] border border-white/[0.08] px-3 py-1 rounded-full">
                  {categorySkills.length}{" "}
                  {categorySkills.length === 1 ? "Skill" : "Skills"}
                </span>
              </div>

              {/* ================= SKILLS ================= */}

              <div className="flex flex-wrap gap-2.5">
                {categorySkills.map((skill) => (
                  <motion.span
                    key={skill.id}
                    whileHover={{
                      y: -2,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-white/[0.12]
                      bg-[#15181c]
                      px-4
                      py-2
                      text-sm
                      text-white/70
                      hover:text-white
                      hover:border-lime-400/40
                      hover:bg-lime-400/[0.06]
                      transition-all
                      duration-200
                    "
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= BOTTOM ACCENT ================= */}

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
          }}
          className="origin-left mt-14 h-px bg-gradient-to-r from-lime-400/40 via-white/[0.08] to-transparent"
        />
      </div>
    </section>
  );
}