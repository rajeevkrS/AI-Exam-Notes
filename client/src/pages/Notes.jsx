import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import TopicForm from "../components/TopicForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import FinalResult from "../components/FinalResult";

function Notes() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { userData } = useSelector((state) => state.user);

  const storageKey = userData?._id ? `notesResult_${userData._id}` : null;

  // Load saved result when page opens
  useEffect(() => {
    if (!storageKey) return;

    const savedResult = localStorage.getItem(storageKey);

    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      setResult(null); // 🔥 important (new user case)
    }
  }, [storageKey]);

  // Save result whenever it changes
  useEffect(() => {
    if (!storageKey) return;

    if (result) {
      localStorage.setItem(storageKey, JSON.stringify(result));
    }
  }, [result, storageKey]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/back.jpg')" }}
    >
      <Navbar />

      {/* Topic Form Section */}
      <motion.div className="mt-12 max-w-7xl mx-auto px-6 py-8">
        <TopicForm
          setResult={setResult}
          loading={loading}
          setLoading={setLoading}
          setError={setError}
        />
      </motion.div>

      {/* Info Section */}
      {!result && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-72 mt-12 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl border border-gray-300 text-gray-600 shadow-sm"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 mb-4 shadow-sm">
            <span className="text-3xl select-none">📘</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            No Notes Generated Yet
          </h3>

          <p className="text-sm text-gray-500 text-center max-w-sm">
            Enter a topic above and let PrepMate AI generate structured exam
            notes, diagrams, and important questions instantly.
          </p>

          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 text-xs text-gray-100"
          >
            Waiting for your topic...
          </motion.div>
        </motion.div>
      )}

      {/* Error Section */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto mt-12 flex flex-col items-center justify-center bg-red-50 border border-red-200 text-red-600 p-8 shadow-sm"
        >
          <div className="text-3xl mb-3">⚠️</div>

          <h3 className="text-lg font-semibold mb-1">Something went wrong</h3>

          <p className="text-sm text-red-500 text-center max-w-md">{error}</p>
        </motion.div>
      )}

      {/* Generated Notes Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col lg:grid lg:grid-cols-4 gap-6 mt-12 px-6 py-8"
        >
          <div className="lg:col-span-1">
            <Sidebar result={result} />
          </div>

          <div className="lg:col-span-3 rounded-2xl bg-white shadow-sm p-6">
            <FinalResult result={result} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Notes;
