import { motion } from "motion/react";
import { useState } from "react";

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisonMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto rounded-2xl bg-linear-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.4)] p-8 space-y-6 text-white"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">AI Notes Generator</h2>
          <p className="text-sm text-gray-400">
            Generate structured notes powered by AI
          </p>
        </div>

        <div className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
          Gemini
        </div>
      </div>

      {/* Inputes */}
      <input
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
        type="text"
        placeholder="Enter topic (e.g. Web Development)"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
      />

      <input
        onChange={(e) => setClassLevel(e.target.value)}
        value={classLevel}
        type="text"
        placeholder="Class / Level (e.g. Class 10)"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
      />

      <input
        onChange={(e) => setExamType(e.target.value)}
        value={examType}
        type="text"
        placeholder="Exam Type (e.g. CBSE, JEE, NEET)"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
      />

      {/* Toggle Buttons */}
      <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
        <h3 className="text-sm text-gray-400 mb-4">AI Enhancements</h3>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Toggle
              label="Exam Revision Mode"
              checked={revisionMode}
              onChange={() => setRevisonMode(!revisionMode)}
            />

            <Toggle
              label="Include Diagram"
              checked={includeDiagram}
              onChange={() => setIncludeDiagram(!includeDiagram)}
            />

            <Toggle
              label="Include Charts"
              checked={includeChart}
              onChange={() => setIncludeChart(!includeChart)}
            />
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        whileTap={!loading ? { scale: 0.97 } : {}}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
        disabled={loading}
        className={`relative w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 overflow-hidden transition-all duration-300
        ${
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-linear-to-r from-cyan-400 via-purple-500 to-indigo-500 text-white shadow-[0_10px_40px_rgba(139,92,246,0.4)] cursor-pointer"
        }`}
      >
        {/* Animated Shine Effect */}
        {!loading && (
          <span className="absolute inset-0 overflow-hidden rounded-xl">
            <span className="absolute -left-20 top-0 h-full w-20 bg-white/20 blur-md rotate-12 animate-[shine_2.5s_linear_infinite]" />
          </span>
        )}

        {/* Button Text */}
        <span className="relative z-10">
          {loading ? "Generating..." : "Generate Notes"}
        </span>
      </motion.button>
    </motion.div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div
      onClick={onChange}
      className="flex items-center gap-4 cursor-pointer select-none"
    >
      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgba(34, 197, 94, 0.35)"
            : "rgba(255, 255, 255, 0.15)",
          boxShadow: checked
            ? "0 0 12px rgba(34,197,94,0.5)"
            : "inset 0 0 6px rgba(0,0,0,0.4)",
        }}
        transition={{ duration: 0.25 }}
        className="relative w-12 h-6 rounded-full border border-white/20 backdrop-blur-lg flex items-center px-1"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 600, damping: 35 }}
          animate={{ x: checked ? 20 : 0 }}
          className="h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
        />
      </motion.div>

      <span
        className={`text-sm font-semibold transition-colors duration-200 ${
          checked ? "text-green-300" : "text-gray-300"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default TopicForm;
