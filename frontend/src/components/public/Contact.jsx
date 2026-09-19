import { useState } from "react";
import { motion } from "framer-motion";
import { sendMessage } from "../../api/messagesApi";

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      await sendMessage(formData);

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 bg-[#f4f4f4] text-zinc-900 py-12 sm:py-12 px-6 overflow-hidden"
    >


      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
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
            Get In Touch
          </span>

          <div className="w-10 h-[2px] bg-lime-500 rounded-full mx-auto mt-4 mb-5" />

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
            Let&apos;s Work{" "}
            <span className="text-lime-600">
              Together
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello?
            Feel free to reach out.
          </p>
        </motion.div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={fadeUp}
            className="max-w-lg"
          >
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Contact Me
            </span>

            <div className="w-10 h-[2px] bg-lime-500 rounded-full mt-4 mb-5" />

            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              Let&apos;s Build
              <br />
              Something Great
            </h3>

            <p className="mt-5 text-sm sm:text-base leading-7 text-zinc-600">
              I&apos;m always open to discussing new opportunities,
              interesting projects, and ideas. Feel free to send
              me a message.
            </p>

            {/* Decorative Text */}
            <div className="mt-10">
              <p className="text-sm font-medium text-zinc-400 tracking-wide">
                LET&apos;S TURN
              </p>

              <p className="text-sm font-medium text-zinc-400 tracking-wide">
                IDEAS INTO
              </p>

              <p className="text-sm font-medium text-zinc-400 tracking-wide">
                REALITY.
              </p>

              <div className="w-8 h-[2px] bg-lime-500 mt-3" />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={fadeUp}
            className="
              bg-white
              border
              border-zinc-200
              rounded-2xl
              p-6
              sm:p-8
              shadow-sm
            "
          >
            {/* Form Header */}
            <div className="flex items-center gap-4 mb-7">
              <div className="
                w-12
                h-12
                rounded-xl
                bg-lime-50
                border
                border-lime-200
                flex
                items-center
                justify-center
              ">
                <i className="ti ti-send text-lime-600 text-xl" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-zinc-900">
                  Send Me a Message
                </h3>

                <p className="text-sm text-zinc-500 mt-1">
                  Fill out the form and I&apos;ll get back to you.
                </p>
              </div>
            </div>

            {/* Success Message */}
            {status === "success" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  flex
                  items-center
                  gap-2
                  bg-lime-50
                  border
                  border-lime-200
                  text-lime-700
                  p-3
                  rounded-lg
                  mb-5
                  text-sm
                "
              >
                <i className="ti ti-circle-check text-base" />
                Message sent successfully!
              </motion.div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  flex
                  items-center
                  gap-2
                  bg-red-50
                  border
                  border-red-200
                  text-red-600
                  p-3
                  rounded-lg
                  mb-5
                  text-sm
                "
              >
                <i className="ti ti-alert-circle text-base" />
                Something went wrong. Please try again.
              </motion.div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Name */}
              <div className="relative">
                <i className="
                  ti
                  ti-user
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-400
                " />

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    bg-zinc-50
                    border
                    border-zinc-200
                    rounded-xl
                    pl-11
                    pr-4
                    py-3.5
                    text-sm
                    text-zinc-900
                    placeholder:text-zinc-400
                    outline-none
                    focus:border-lime-400
                    focus:ring-2
                    focus:ring-lime-100
                    transition-all
                  "
                />
              </div>

              {/* Email */}
              <div className="relative">
                <i className="
                  ti
                  ti-mail
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-400
                " />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    bg-zinc-50
                    border
                    border-zinc-200
                    rounded-xl
                    pl-11
                    pr-4
                    py-3.5
                    text-sm
                    text-zinc-900
                    placeholder:text-zinc-400
                    outline-none
                    focus:border-lime-400
                    focus:ring-2
                    focus:ring-lime-100
                    transition-all
                  "
                />
              </div>

              {/* Message */}
              <div className="relative">
                <i className="
                  ti
                  ti-message
                  absolute
                  left-4
                  top-4
                  text-zinc-400
                " />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="
                    w-full
                    bg-zinc-50
                    border
                    border-zinc-200
                    rounded-xl
                    pl-11
                    pr-4
                    py-3.5
                    text-sm
                    text-zinc-900
                    placeholder:text-zinc-400
                    outline-none
                    resize-none
                    focus:border-lime-400
                    focus:ring-2
                    focus:ring-lime-100
                    transition-all
                  "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-lime-500
                  text-white
                  py-3.5
                  rounded-xl
                  text-sm
                  font-semibold
                  hover:bg-lime-600
                  hover:-translate-y-0.5
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  disabled:hover:translate-y-0
                  transition-all
                  duration-200
                "
              >
                <i
                  className={`ti ${
                    loading
                      ? "ti-loader-2 animate-spin"
                      : "ti-send"
                  } text-base`}
                />

                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>

            {/* Privacy Note */}
            <div className="flex items-center justify-center gap-2 mt-5">
              <i className="ti ti-lock text-zinc-400 text-sm" />

              <p className="text-xs text-zinc-400">
                Your information is safe with me.
              </p>
            </div>
          </motion.div>

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