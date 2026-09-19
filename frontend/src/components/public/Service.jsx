import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getServices } from "../../api/servicesApi";

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

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await getServices();
        setServices(response.data.data || []);
      } catch (err) {
        console.error("Services fetch error:", err);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  // Loading
  if (loading) {
    return (
      <section className="bg-[#f4f4f4] py-24 px-6">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-3 w-24 bg-zinc-200 rounded mx-auto mb-5" />

          <div className="h-12 w-80 max-w-full bg-zinc-200 rounded mx-auto mb-4" />

          <div className="h-4 w-72 max-w-full bg-zinc-200 rounded mx-auto mb-14" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 rounded-2xl bg-white border border-zinc-200"
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

  // Empty
  if (!services.length) {
    return (
      <section
        id="services"
        className="scroll-mt-20 bg-[#f4f4f4] py-24 px-6"
      >
        <p className="text-center text-zinc-500 text-sm">
          No services available.
        </p>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="relative scroll-mt-20 bg-[#f4f4f4] text-zinc-900 py-12 sm:py-14 px-6 overflow-hidden"
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
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
            Services
          </span>

          <div className="w-10 h-[2px] bg-lime-500 rounded-full mx-auto mt-4 mb-5" />

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
            What I Can{" "}
            <span className="text-lime-600">
              Do for You
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-500">
            What I can help you with
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
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
                rounded-2xl
                border border-zinc-200
                bg-white
                p-6 sm:p-7
                shadow-sm
                hover:shadow-md
                hover:border-lime-400/50
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              {/* Top Lime Accent */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-lime-400/50 to-transparent" />

              {/* Service Icon */}
              <div className="
                w-12
                h-12
                rounded-xl
                bg-lime-50
                border border-lime-200
                flex
                items-center
                justify-center
                mb-6
                group-hover:bg-lime-100
                transition-colors
                duration-300
              ">
                {service.icon ? (
                  <img
                    src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${service.icon}`}
                    alt={service.title}
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <i className="ti ti-code text-lime-600 text-xl" />
                )}
              </div>

              {/* Service Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-zinc-900">
                {service.title}
              </h3>

              {/* Small Lime Line */}
              <div className="w-8 h-[2px] bg-lime-500 rounded-full mt-3 mb-4" />

              {/* Service Description */}
              {service.description && (
                <p className="text-sm leading-6 text-zinc-600">
                  {service.description}
                </p>
              )}

            </motion.div>
          ))}
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
          className="origin-left mt-14 h-px bg-gradient-to-r from-lime-500/40 via-zinc-300 to-transparent"
        />

      </div>
    </section>
  );
}