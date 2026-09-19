import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getProject } from "../../api/projectsApi";

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

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        setError("");

        const response = await getProject(id);

        setProject(response.data.data);
      } catch (err) {
        console.error("Project details fetch error:", err);
        setError("Project not found");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#f4f4f4] px-6 py-20">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-8 w-32 bg-zinc-200 rounded mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="h-[360px] sm:h-[440px] bg-zinc-200 rounded-2xl" />

            <div>
              <div className="h-12 w-3/4 bg-zinc-200 rounded mb-5" />
              <div className="h-4 w-full bg-zinc-200 rounded mb-3" />
              <div className="h-4 w-5/6 bg-zinc-200 rounded mb-8" />

              <div className="space-y-3">
                <div className="h-4 w-full bg-zinc-200 rounded" />
                <div className="h-4 w-full bg-zinc-200 rounded" />
                <div className="h-4 w-4/5 bg-zinc-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-zinc-600 text-sm mb-6">
            {error || "Project not found"}
          </p>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors"
          >
            <i className="ti ti-arrow-left text-base" />
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  const storageUrl = import.meta.env.VITE_STORAGE_BASE_URL;

  return (
    <section
      id="project-details"
      className="relative min-h-screen scroll-mt-20 bg-[#f4f4f4] text-zinc-900 py-20 sm:py-24 px-6 overflow-hidden"
    >

      <div className="relative max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <i className="ti ti-arrow-left text-base" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Main Project Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Project Image */}
          {project.image && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="relative"
            >
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <img
                  src={`${storageUrl}/${project.image}`}
                  alt={project.title}
                  className="w-full h-[300px] sm:h-[400px] lg:h-[460px] object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Project Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {project.title && (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
                {project.title}
              </h1>
            )}

            <div className="mt-5 w-12 h-[3px] rounded-full bg-lime-500" />

            {project.short_description && (
              <p className="mt-7 text-lg sm:text-xl leading-8 text-zinc-600">
                {project.short_description}
              </p>
            )}

            {/* Project Link */}
            {project.project_link && (
              <div className="mt-8">
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-zinc-900 text-white text-sm font-semibold shadow-sm hover:bg-zinc-800 hover:-translate-y-0.5 transition-all duration-200"
                >
                  View Project
                  <i className="ti ti-external-link text-base" />
                </a>
              </div>
            )}
          </motion.div>
        </div>

        {/* Description Card */}
        {project.description && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mt-14 sm:mt-20"
          >
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[3px] rounded-full bg-lime-500" />

                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
                  Project Description
                </h2>
              </div>

              <p className="text-[15px] sm:text-base leading-8 text-zinc-600 whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </motion.div>
        )}

        {/* Bottom Navigation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-10 sm:mt-14 flex justify-start"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-zinc-300 bg-white text-zinc-800 text-sm font-semibold hover:border-zinc-400 hover:bg-zinc-50 transition-colors"
          >
            <i className="ti ti-arrow-left text-base" />
            Back to Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}