import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSocialProfiles } from "../../api/socialProfilesApi";

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

export default function SocialProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const response = await getSocialProfiles();

        setProfiles(response.data.data || []);
      } catch (err) {
        console.error("Social profiles fetch error:", err);
        setError("Failed to load social profiles");
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  // Loading
  if (loading) {
    return (
      <section className="bg-[#0e0e10] py-24 px-6">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-3 w-28 bg-white/10 rounded mx-auto mb-5" />

          <div className="h-12 w-80 max-w-full bg-white/10 rounded mx-auto mb-4" />

          <div className="h-4 w-96 max-w-full bg-white/10 rounded mx-auto mb-14" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-24 rounded-xl bg-white/[0.03] border border-white/[0.08]"
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
      id="social-profiles"
      className="relative scroll-mt-20 bg-[#0e0e10] text-white py-12 sm:py-12 px-6 overflow-hidden"
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
            Social Profiles
          </span>

          <div className="w-10 h-[2px] bg-lime-400 rounded-full mx-auto mt-4 mb-5" />

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Connect With{" "}
            <span className="text-lime-400">
              Me
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/40">
            Find me and connect with me across these platforms.
          </p>
        </motion.div>

        {/* Social Profiles */}
        {profiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profiles.map((profile, index) => (
              <motion.a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                variants={fadeUp}
                transition={{
                  delay: index * 0.06,
                }}
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  border
                  border-white/[0.09]
                  bg-white/[0.025]
                  px-5
                  py-4
                  hover:border-lime-400/35
                  hover:bg-white/[0.045]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                {/* Top Accent */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-lime-400/30 to-transparent" />

                {/* Icon */}
                <div className="
                  shrink-0
                  w-11
                  h-11
                  rounded-xl
                  bg-white/[0.05]
                  border border-white/[0.10]
                  flex
                  items-center
                  justify-center
                  group-hover:border-lime-400/30
                  group-hover:bg-lime-400/[0.06]
                  transition-all
                  duration-300
                ">
                  {profile.icon ? (
                    <img
                      src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${profile.icon}`}
                      alt={profile.platform_name}
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <i className="ti ti-link text-lime-400 text-xl" />
                  )}
                </div>

                {/* Platform Name */}
                <div className="flex-1 min-w-0">
                  <h3 className="
                    text-sm
                    sm:text-base
                    font-semibold
                    text-white
                    truncate
                    group-hover:text-lime-300
                    transition-colors
                  ">
                    {profile.platform_name}
                  </h3>

                  <p className="text-xs text-white/35 mt-1">
                    Visit Profile
                  </p>
                </div>

                {/* External Link */}
                <i className="
                  ti
                  ti-external-link
                  shrink-0
                  text-white/35
                  text-base
                  group-hover:text-lime-400
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                  transition-all
                  duration-200
                " />
              </motion.a>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/40 text-sm">
            No social profiles available.
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
          className="origin-left mt-14 h-px bg-gradient-to-r from-lime-400/40 via-white/[0.08] to-transparent"
        />

      </div>
    </section>
  );
}