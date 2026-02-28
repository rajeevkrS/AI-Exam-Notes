import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import TopicForm from "../components/TopicForm";
import { useState } from "react";

function Notes() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-6 py-8">
      <Navbar />

      {/* Input Form Section */}
      <motion.div className="mt-12">
        <TopicForm
          setResult={setResult}
          loading={loading}
          setLoading={setLoading}
          setError={setError}
        />
      </motion.div>

      {/* Generated Notes Section */}
      {!result && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="h-64 mt-12 rounded-2xl flex flex-col items-center justify-center bg-white/60 backdrop-blur-lg border border-dashed border-r-gray-300 text-gray-500 shadow-inner"
        >
          <span className="text-4xl mb-3">
            📘
            <p className="text-sm">Generated notes will appear here</p>
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default Notes;
