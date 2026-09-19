import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getEducation } from "../../api/educationApi";

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

function formatDateRange(startDate, endDate) {
  const start = formatDate(startDate);

  if (!start) {
    return endDate ? formatDate(endDate) : "Present";
  }

  const end = endDate ? formatDate(endDate) : "Present";

  return `${start} — ${end}`;
}

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEducation() {
      try {
        const response = await getEducation();

        setEducation(response.data.data || []);
      } catch (err) {
        console.error("Education fetch error:", err);
        setError("Failed to load education");
      } finally {
        setLoading(false);
      }
    }

    fetchEducation();
  }, []);

  // Loading
  if (loading) {
    return (
      <section className="bg-[#0e0e10] py-24 px-6">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-3 w-24 bg-white/10 rounded mx-auto mb-5" />

          <div className="h-12 w-72 max-w-full bg-white/10 rounded mx-auto mb-4" />

          <div className="h-4 w-96 max-w-full bg-white/10 rounded mx-auto mb-14" />

          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 rounded-xl bg-white/[0.03] border border-white/[0.07]"
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
      <section className="bg-[#0e0e10] py-20 px-6">
        <p className="text-center text-red-400 text-sm">
          {error}
        </p>
      </section>
    );
  }

  // Empty
  if (!education.length) {
    return (
      <section
        id="education"
        className="scroll-mt-20 bg-[#0e0e10] py-24 px-6"
      >
        <p className="text-center text-white/40 text-sm">
          No education available.
        </p>
      </section>
    );
  }

  return (
    <section
      id="education"
      className="relative scroll-mt-20 bg-[#0e0e10] text-white py-12 sm:py-14 px-6 overflow-hidden"
    >

      <div className="relative max-w-6xl mx-auto">

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
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/45">
            Education
          </span>

          <div className="w-10 h-[2px] bg-lime-400 rounded-full mx-auto mt-4 mb-5" />

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            My{" "}
            <span className="text-lime-400">
              Academic Journey
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/40">
            My educational background and learning journey
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-[11px] top-0 bottom-0 w-px bg-lime-400/30" />

          <div className="space-y-6 sm:space-y-7">

            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
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
                className="relative pl-9"
              >

                {/* Timeline Dot */}
                <div className="absolute left-0 top-7 z-10">
                  <div className="w-[23px] h-[23px] rounded-full bg-[#0e0e10] border-2 border-lime-400 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
                  </div>
                </div>

                {/* Education Card */}
                <div className="group relative rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 py-5 sm:px-7 sm:py-6 hover:border-lime-400/30 hover:bg-white/[0.035] transition-all duration-300">

                  {/* Top accent */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-lime-400/30 to-transparent" />

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                    <div className="min-w-0">

                      {/* Degree */}
                      <h3 className="text-base sm:text-lg font-semibold text-white">
                        {edu.degree}
                      </h3>

                      {/* Institution */}
                      <p className="mt-1 text-sm text-white/45">
                        {edu.institution_name}
                      </p>

                    </div>

                    {/* Date */}
                    <span className="shrink-0 inline-flex items-center gap-2 self-start rounded-full bg-lime-400/[0.08] border border-lime-400/20 px-3 py-1.5 text-[11px] sm:text-xs font-medium text-lime-300">

                      <i className="ti ti-calendar-event text-sm" />

                      {formatDateRange(
                        edu.start_date,
                        edu.end_date
                      )}

                    </span>

                  </div>

                  {/* Description */}
                  {edu.description && (
                    <p className="mt-4 text-sm leading-6 text-white/45 max-w-4xl">
                      {edu.description}
                    </p>
                  )}

                </div>
              </motion.div>
            ))}

          </div>
        </div>

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
          className="origin-left mt-14 h-px bg-gradient-to-r from-lime-400/40 via-white/[0.08] to-transparent"
        />

      </div>
    </section>
  );
}