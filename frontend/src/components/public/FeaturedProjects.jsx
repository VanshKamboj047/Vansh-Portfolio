import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjects } from "../../api/projectsApi";

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

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await getProjects();

        const allProjects = response.data.data || [];

        const featured = allProjects
          .filter((project) => project.is_featured)
          .sort(
            (a, b) =>
              (a.display_order ?? 0) - (b.display_order ?? 0)
          )
          .slice(0, 3);

        setProjects(featured);
      } catch (err) {
        console.error("Projects fetch error:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Loading
  if (loading) {
    return (
      <section className="bg-[#0e0e10] py-24 px-6">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-3 w-24 bg-white/10 rounded mx-auto mb-5" />

          <div className="h-12 w-80 max-w-full bg-white/10 rounded mx-auto mb-4" />

          <div className="h-4 w-96 max-w-full bg-white/10 rounded mx-auto mb-14" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[470px] rounded-2xl bg-white/[0.03] border border-white/[0.08]"
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

  return (
    <section
      id="projects"
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
            Projects
          </span>

          <div className="w-10 h-[2px] bg-lime-400 rounded-full mx-auto mt-4 mb-5" />

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Featured{" "}
            <span className="text-lime-400">
              Projects
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/40">
            A showcase of my recent work and personal projects.
          </p>
        </motion.div>

        {/* Project Cards */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
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
                  overflow-hidden
                  rounded-2xl
                  border border-white/[0.09]
                  bg-white/[0.025]
                  hover:border-lime-400/30
                  hover:bg-white/[0.035]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                {/* Project Image */}
                {project.image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${project.image}`}
                      alt={project.title}
                      className="
                        w-full
                        h-48
                        sm:h-52
                        object-cover
                        group-hover:scale-[1.03]
                        transition-transform
                        duration-500
                      "
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/30 to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Card Content */}
                <div className="p-5 sm:p-6">

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {project.title}
                  </h3>

                  {/* Accent Line */}
                  <div className="w-8 h-[2px] bg-lime-400 rounded-full mt-3 mb-4" />

                  {/* Description */}
                  {project.short_description && (
                    <p className="text-sm leading-6 text-white/45">
                      {project.short_description}
                    </p>
                  )}

                  {/* View Project */}
                  <Link
                    to={`/projects/${project.id}`}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      mt-6
                      text-sm
                      font-semibold
                      text-white
                      hover:text-lime-400
                      transition-colors
                    "
                  >
                    View Project
                    <i className="ti ti-arrow-right text-base transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Top Accent */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-lime-400/35 to-transparent" />
              </motion.div>
            ))}
          </div>
        )}

        {/* No Featured Projects */}
        {!projects.length && (
          <p className="text-center text-white/40 text-sm">
            No featured projects available.
          </p>
        )}

        {/* View All Projects */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex justify-center mt-12"
        >
          <Link
            to="/projects"
            className="
              inline-flex
              items-center
              gap-2
              bg-white
              text-zinc-900
              px-6
              py-3
              rounded-lg
              text-sm
              font-semibold
              hover:bg-lime-400
              hover:-translate-y-0.5
              transition-all
              duration-200
            "
          >
            View All Projects
            <i className="ti ti-arrow-right text-base" />
          </Link>
        </motion.div>

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