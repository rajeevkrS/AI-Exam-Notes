import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa6";

function Hero({ userData, handleGoogleAuth, navigate, img }) {
  return (
    <section className="relative pt-10 md:pt-20 min-h-[90vh] max-w-6xl mx-auto flex flex-col items-center justify-center text-center px-6">
      {/* Top Badge */}
      <motion.div className="mb-6 inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/90 text-sm font-medium shadow-lg">
        Study Smarter, Not Harder
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-xl">
          AI-Powered Notes, Built for Exam Success
        </h1>

        {!userData ? (
          <>
            <p className="mt-8 text-lg text-white/90 leading-relaxed">
              You get <span className="font-extrabold">100 FREE credits</span>{" "}
              to create exam notes, project notes, charts, graphs and download
              clean PDFs - instantly using AI.
            </p>

            <div className="mt-3 text-sm font-semibold text-white/80">
              Start with 50 free credits • Upgrade anytime for more credits •
              Instant access
            </div>
          </>
        ) : (
          <p className="mt-8 text-lg text-white/90 leading-relaxed">
            Generate exam-focused notes, project documentation, flow diagrams
            and revision-ready content using AI – faster, cleaner and smarter.
          </p>
        )}
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={() => {
          if (!userData) handleGoogleAuth();
          else navigate("/notes");
        }}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        whileTap={{ scale: 0.96 }}
        className="mt-10 px-8 py-3 rounded-xl flex items-center gap-3 bg-white text-black font-semibold text-lg shadow-xl cursor-pointer"
      >
        Start Generating
        <FaArrowRight size={18} />
      </motion.button>

      {/* Laptop Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9 }}
        className="mt-16 w-full flex justify-center"
      >
        <div className="relative w-full max-w-7xl">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>

          {/* Laptop Frame */}
          <div className="bg-gray-900 rounded-2xl p-2 md:p-3 shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10">
            {/* Screen */}
            <div className="relative bg-black rounded-xl overflow-hidden">
              {/* Glass Reflection */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent opacity-40"></div>

              {/* Light Sweep Animation */}
              <motion.div
                initial={{ x: "-200%" }}
                animate={{ x: "200%" }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear",
                  repeatDelay: 1.5,
                }}
                className="pointer-events-none absolute top-0 left-0 h-full w-[60%] bg-linear-to-r from-transparent via-white/20 to-transparent blur-2xl"
              />

              <img src={img} alt="preview" className="w-full object-cover" />
            </div>
          </div>

          {/* Bottom Base (Mac style) */}
          <div className="h-5 bg-gray-300/20 rounded-b-2xl blur-sm mx-10"></div>
        </div>
      </motion.div>

      {/* Bottom Fade Blur */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-50 bg-linear-to-b from-transparent via-gray/80 to-[#0b1d3a] blur-xl"></div>
    </section>
  );
}

export default Hero;
