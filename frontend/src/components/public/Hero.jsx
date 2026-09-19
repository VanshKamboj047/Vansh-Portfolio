import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPersonalInfo } from "../../api/personalInfoApi";
import { getSocialProfiles } from "../../api/socialProfilesApi";

const skillBadges = [
  {
    icon: "ti-brand-react",
    label: "React",
    style: { top: "10px", left: "-30px" },
  },
  {
    icon: "ti-brand-laravel",
    label: "Laravel",
    style: { top: "70px", right: "-44px" },
  },
  {
    icon: "ti-database",
    label: "MySQL",
    style: { bottom: "56px", left: "-40px" },
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const socialIconMap = {
  github: "ti-brand-github",
  linkedin: "ti-brand-linkedin",
  twitter: "ti-brand-twitter",
  x: "ti-brand-x",
  instagram: "ti-brand-instagram",
  facebook: "ti-brand-facebook",
  youtube: "ti-brand-youtube",
};

function getSocialIcon(platformName) {
  if (!platformName) {
    return "ti-link";
  }

  const key = platformName.toLowerCase().trim();

  return socialIconMap[key] || "ti-link";
}

export default function Hero({ onLoaded }) {
  const [info, setInfo] = useState(null);
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [infoRes, socialsRes] = await Promise.all([
          getPersonalInfo(),
          getSocialProfiles(),
        ]);

        setInfo(infoRes.data.data);
        setSocials(socialsRes.data.data || []);
      } catch (err) {
        console.error("Hero data fetch error:", err);
      } finally {
        setLoading(false);

        // Important:
        // Parent component ko inform karega ki Hero loading complete ho gaya.
        if (onLoaded) {
          onLoaded();
        }
      }
    }

    fetchData();
  }, [onLoaded]);

  if (loading) {
    return <div className="h-[600px] bg-[#0e0e10]" />;
  }

  if (!info) {
    return null;
  }

  const nameParts = info.full_name?.trim().split(" ") || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  return (
    <section
      id="hero"
      className="relative bg-transparent overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.025]"
        />
      </div>

      {/* Main Hero */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center px-6 sm:px-10 py-8 md:py-14 max-w-6xl mx-auto">
        {/* ================= LEFT CONTENT ================= */}
        <div>
          {/* Availability */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.14] px-3.5 py-1.5 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />

            <span className="text-xs text-white/75 font-medium">
              Available for opportunities
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.05}
            variants={fadeUp}
            className="text-white/50 text-base mb-1.5"
          >
            Hi 👋 I'm
          </motion.p>

          {/* First Name */}
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight"
          >
            {firstName}
          </motion.h1>

          {/* Last Name */}
          {lastName && (
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0.15}
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-zinc-500 leading-tight tracking-tight mb-5"
            >
              {lastName}
            </motion.h1>
          )}

          {/* Title */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.25}
            variants={fadeUp}
            className="text-white/50 text-[15.5px] leading-relaxed mb-8 max-w-md"
          >
            {info.title}
          </motion.p>

          {/* Skill Badges */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="flex flex-wrap items-center gap-2.5 mb-8"
          >
            <span className="text-[11px] text-white/70 bg-white/[0.05] border border-white/[0.1] px-3 py-1.5 rounded-full">
              React
            </span>

            <span className="text-[11px] text-white/70 bg-white/[0.05] border border-white/[0.1] px-3 py-1.5 rounded-full">
              Laravel
            </span>

            <span className="text-[11px] text-white/70 bg-white/[0.05] border border-white/[0.1] px-3 py-1.5 rounded-full">
              PHP
            </span>

            <span className="text-[11px] text-white/70 bg-white/[0.05] border border-white/[0.1] px-3 py-1.5 rounded-full">
              MySQL
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.35}
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            {/* View Projects */}
            <a
              href="/projects"
              className="bg-white text-zinc-900 px-5 py-3 rounded-lg text-sm font-semibold flex items-center gap-1.5 hover:scale-105 transition-transform duration-200"
            >
              View Projects
              <i className="ti ti-arrow-right text-base" />
            </a>

            {/* Download Resume */}
            {info.resume_path && (
              <a
                href={`${import.meta.env.VITE_STORAGE_BASE_URL}/${info.resume_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/[0.14] text-white px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-white/10 hover:scale-105 transition-all duration-200"
              >
                <i className="ti ti-download text-base" />
                Download Resume
              </a>
            )}

            {/* Hire Me */}
            <a
              href="#contact"
              className="bg-transparent border border-white/10 text-white/70 px-5 py-3 rounded-lg text-sm font-medium hover:bg-white/5 hover:text-white hover:scale-105 transition-all duration-200"
            >
              Hire Me
            </a>
          </motion.div>

          {/* Social Profiles */}
          {socials.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.45}
              variants={fadeUp}
              className="flex gap-2.5"
            >
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform_name}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <i
                    className={`ti ${getSocialIcon(
                      social.platform_name
                    )} text-white/65 text-base`}
                  />
                </a>
              ))}
            </motion.div>
          )}
        </div>

        {/* ================= RIGHT PROFILE ================= */}
        <div className="flex justify-center relative">
          <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
            {/* Outer Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-6 rounded-full opacity-60"
              style={{
                border: "1.5px solid transparent",
                borderTopColor: "#e4e4e7",
                borderRightColor: "#71717a",
              }}
            />

            {/* Dashed Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-3.5 rounded-full border border-dashed border-white/20"
            />

            {/* Profile Circle */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: {
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                },
                scale: {
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                },
              }}
              className="w-full h-full rounded-full bg-[#242427] border-2 border-white/[0.14] flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.08)]"
            >
              {info.profile_image ? (
                <img
                  src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${info.profile_image}`}
                  alt={info.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <i
                  className="ti ti-user text-white/15"
                  style={{ fontSize: "90px" }}
                />
              )}
            </motion.div>

            {/* Skill Badges */}
            {skillBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, index % 2 === 0 ? -8 : 8, 0],
                }}
                transition={{
                  opacity: {
                    duration: 0.5,
                    delay: 0.6 + index * 0.1,
                  },
                  scale: {
                    duration: 0.5,
                    delay: 0.6 + index * 0.1,
                  },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }}
                style={badge.style}
                className="absolute flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.15] px-3 py-1.5 rounded-full backdrop-blur-sm"
              >
                <i
                  className={`ti ${badge.icon} text-zinc-300`}
                  style={{ fontSize: "13px" }}
                />

                <span className="text-[11px] text-zinc-200 font-medium">
                  {badge.label}
                </span>
              </motion.div>
            ))}

            {/* Experience Badge */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, 8, 0],
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                  delay: 0.9,
                },
                scale: {
                  duration: 0.5,
                  delay: 0.9,
                },
                y: {
                  duration: 4.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.3,
                },
              }}
              style={{
                bottom: "0",
                right: "-20px",
              }}
              className="absolute flex items-center gap-1.5 bg-lime-400/10 border border-lime-400/[0.28] px-3 py-1.5 rounded-full backdrop-blur-sm"
            >
              <i
                className="ti ti-bolt text-lime-400"
                style={{ fontSize: "13px" }}
              />

              <span className="text-[11px] text-lime-200 font-medium">
                1+ yrs
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}