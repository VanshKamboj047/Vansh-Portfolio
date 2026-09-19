import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjects } from "../../api/projectsApi";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";

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

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await getProjects();

        setProjects(response.data.data || []);
      } catch (err) {
        console.error("Projects fetch error:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />

      <main className="relative bg-[#f4f4f4] min-h-screen text-zinc-900 overflow-hidden">

        <section
          id="all-projects"
          className="relative px-6 py-20 sm:py-24"
        >
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-100 text-zinc-800 text-xs sm:text-sm font-semibold">
                  <i className="ti ti-folder text-sm" />
                  My Work
                </span>
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
                All{" "}
                <span className="text-lime-500">
                  Projects
                </span>
              </h1>

              <div className="mt-5 mx-auto w-14 h-[3px] rounded-full bg-lime-500" />
            </motion.div>

            {/* Loading */}
            {loading && (
              <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm animate-pulse"
                  >
                    <div className="h-52 bg-zinc-200" />

                    <div className="p-6">
                      <div className="h-5 w-3/4 bg-zinc-200 rounded mb-4" />

                      <div className="h-3 w-full bg-zinc-200 rounded mb-2" />
                      <div className="h-3 w-5/6 bg-zinc-200 rounded mb-6" />

                      <div className="h-4 w-28 bg-zinc-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="mt-14 text-center">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && projects.length === 0 && (
              <div className="mt-14 text-center">
                <p className="text-zinc-500 text-sm">
                  No projects available.
                </p>
              </div>
            )}

            {/* Projects */}
            {!loading && !error && projects.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.08,
                }}
                variants={fadeUp}
                className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="group"
                  >
                    <article className="h-full bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      {/* Image */}
                      {project.image ? (
                        <div className="relative overflow-hidden">
                          <img
                            src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${project.image}`}
                            alt={project.title || "Project"}
                            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ) : (
                        <div className="w-full h-52 bg-zinc-100 flex items-center justify-center">
                          <i className="ti ti-photo text-4xl text-zinc-300" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        {project.title && (
                          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 line-clamp-2">
                            {project.title}
                          </h2>
                        )}

                        <div className="mt-3 w-8 h-[2px] rounded-full bg-lime-500 group-hover:w-12 transition-all duration-300" />

                        {project.short_description && (
                          <p className="mt-4 text-sm leading-6 text-zinc-600 line-clamp-3">
                            {project.short_description}
                          </p>
                        )}

                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
                          View Project

                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-lime-100 text-zinc-900 group-hover:bg-lime-400 group-hover:translate-x-1 transition-all duration-300">
                            <i className="ti ti-arrow-right text-sm" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}