import { motion } from "motion/react";

function Feature({ icon, title, desc, badge }) {
  return (
    <motion.div
      whileHover={{ y: -5, rotateX: 5, rotateY: -5 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 20,
      }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative rounded-2xl p-8 bg-white/20 border border-white/20 backdrop-blur-lg text-white overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-white/5 via-transparent to-white/5" />

      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        {/* Optional Badge */}
        {badge && (
          <span className="inline-block mb-4 px-3 py-1 text-xs rounded-full bg-white/10 text-gray-200 border border-white/20">
            {badge}
          </span>
        )}

        <div className="text-4xl mb-4">{icon}</div>

        <h3 className="text-xl font-semibold mb-3">{title}</h3>

        <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default Feature;
