import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPersonalInfo } from "../../api/personalInfoApi";

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

export default function About() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInfo() {
      try {
        const response = await getPersonalInfo();
        setInfo(response.data.data);
      } catch (err) {
        console.error("About data fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchInfo();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-zinc-100">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-3 w-20 bg-zinc-200 rounded mx-auto mb-5" />
            <div className="h-10 w-40 bg-zinc-200 rounded mx-auto mb-10" />

            <div className="space-y-3 max-w-4xl mx-auto">
              <div className="h-4 bg-zinc-200 rounded" />
              <div className="h-4 bg-zinc-200 rounded" />
              <div className="h-4 bg-zinc-200 rounded" />
              <div className="h-4 w-4/5 bg-zinc-200 rounded mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!info) {
    return null;
  }

  return (
    <section
      id="about"
      className="relative scroll-mt-20 bg-zinc-200 py-10 sm:py-12 px-6 overflow-hidden"
    >
      

      <div className="relative max-w-5xl mx-auto text-center">

        {/* Section Label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col items-center"
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-zinc-500">
            Get To Know
          </span>

          <span className="mt-3 w-12 h-[3px] rounded-full bg-lime-500" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900"
        >
          About{" "}
          <span className="text-lime-500">
            Me
          </span>
        </motion.h2>

        {/* Bio */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-9 max-w-4xl mx-auto"
        >
          <p className="text-[15px] sm:text-base lg:text-[17px] leading-8 text-zinc-600">
            {info.bio}
          </p>
        </motion.div>

        {/* Resume */}
        {info.resume_path && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mt-10"
          >
            <a
              href={`${import.meta.env.VITE_STORAGE_BASE_URL}/${info.resume_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-zinc-900 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-sm hover:bg-zinc-800 hover:-translate-y-0.5 transition-all duration-200"
            >
              <i className="ti ti-download text-base" />
              Download Resume
            </a>
          </motion.div>
        )}

      </div>
    </section>
  );
}