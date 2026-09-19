import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getExperience } from "../../api/experienceApi";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
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

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatDateRange(startDate, endDate) {
  const start = formatDate(startDate);

  if (!start) {
    return endDate ? formatDate(endDate) : "Present";
  }

  const end = endDate ? formatDate(endDate) : "Present";

  return `${start} — ${end}`;
}

export default function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchExperience() {
      try {
        const response = await getExperience();

        setExperience(response.data.data || []);
      } catch (err) {
        console.error("Experience fetch error:", err);
        setError("Failed to load experience");
      } finally {
        setLoading(false);
      }
    }

    fetchExperience();
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <section className="bg-[#f4f4f4] py-24 px-6">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-3 w-24 bg-zinc-200 rounded mx-auto mb-5" />

          <div className="h-12 w-72 max-w-full bg-zinc-200 rounded mx-auto mb-4" />

          <div className="h-4 w-96 max-w-full bg-zinc-200 rounded mx-auto mb-16" />

          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 bg-white border border-zinc-200 rounded-2xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <section className="bg-[#f4f4f4] py-20 px-6">
        <p className="text-center text-red-500 text-sm">
          {error}
        </p>
      </section>
    );
  }

  /* ================= EMPTY ================= */

  if (!experience.length) {
    return (
      <section
        id="experience"
        className="scroll-mt-20 bg-[#f4f4f4] py-24 px-6"
      >
        <p className="text-center text-zinc-500 text-sm">
          No experience available.
        </p>
      </section>
    );
  }

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 bg-[#f4f4f4] text-zinc-900 py-12 sm:py-14 px-6 overflow-hidden"
    >

     

      <div className="relative max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            Experience
          </span>

          <div className="w-10 h-[2px] bg-lime-500 rounded-full mx-auto mt-4 mb-5" />

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
            Where I've{" "}
            <span className="text-lime-600">
              Worked
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-2xl mx-auto">
            My professional journey so far
          </p>
        </motion.div>

        {/* ================= TIMELINE ================= */}

        <div className="relative">

          {/* Desktop center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-300 -translate-x-1/2" />

          <div className="space-y-8 md:space-y-14">

            {experience.map((exp, index) => {
              const isRight = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative md:min-h-[180px]"
                >

                  {/* ================= MOBILE ================= */}

                  <div className="md:hidden flex gap-4">

                    <div className="relative flex flex-col items-center">

                      <span className="relative z-10 mt-8 w-3.5 h-3.5 rounded-full bg-lime-500 border-[3px] border-[#f4f4f4] shadow-[0_0_0_2px_rgba(132,204,22,0.25)] shrink-0" />

                      {index < experience.length - 1 && (
                        <span className="absolute top-11 bottom-[-56px] w-px bg-lime-400/50" />
                      )}

                    </div>

                    <div className="flex-1">
                      <ExperienceCard exp={exp} />
                    </div>

                  </div>

                  {/* ================= DESKTOP ================= */}

                  <div className="hidden md:block">

                    {/* Timeline Node */}

                    <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20">

                      <div className="w-5 h-5 rounded-full bg-[#f4f4f4] border-2 border-lime-500 flex items-center justify-center shadow-[0_0_0_4px_rgba(132,204,22,0.10)]">

                        <span className="w-2.5 h-2.5 rounded-full bg-lime-500" />

                      </div>

                    </div>

                    {/* Connector */}

                    <div
                      className={`absolute top-[38px] h-px w-[calc(50%-14px)] bg-lime-500/40 ${
                        isRight
                          ? "left-1/2"
                          : "right-1/2"
                      }`}
                    />

                    {/* Card */}

                    <div
                      className={`w-[calc(50%-48px)] ${
                        isRight
                          ? "ml-[calc(50%+48px)]"
                          : "mr-[calc(50%+48px)]"
                      }`}
                    >
                      <ExperienceCard exp={exp} />
                    </div>

                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>

        {/* ================= BOTTOM LINE ================= */}

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
          className="origin-left mt-16 h-px bg-gradient-to-r from-lime-500/40 via-zinc-300 to-transparent"
        />

      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE CARD
========================================================= */

function ExperienceCard({ exp }) {
  return (
    <div
      className="
        group
        relative
        bg-white
        border border-zinc-200
        rounded-2xl
        p-5 sm:p-6
        shadow-sm
        hover:shadow-md
        hover:border-lime-400/50
        transition-all
        duration-300
      "
    >

      {/* Top Accent */}

      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-lime-400/40 to-transparent" />

      {/* Date */}

      <div className="mb-4">

        <span
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-lime-50
            border border-lime-200
            px-3 py-1.5
            text-xs
            font-medium
            text-lime-700
          "
        >
          <i className="ti ti-calendar-event text-sm" />

          {formatDateRange(
            exp.start_date,
            exp.end_date
          )}
        </span>

      </div>

      {/* Role */}

      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
        {exp.role}
      </h3>

      {/* Company */}

      <p className="mt-1.5 text-sm sm:text-base font-medium text-zinc-500">
        {exp.company_name}
      </p>

      {/* Description */}

      {exp.description && (
        <p className="mt-4 text-sm leading-7 text-zinc-600">
          {exp.description}
        </p>
      )}

    </div>
  );
}