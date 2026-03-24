import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What can I generate with PrepMate AI?",
    answer:
      "You can generate exam-focused notes, project documentation, charts, diagrams, and structured study material.",
  },
  {
    question: "How do credits work?",
    answer:
      "Each note or document generation uses a small number of credits. This ensures high-quality output and fair usage for all users.",
  },
  {
    question: "Can I download notes as PDF?",
    answer:
      "Yes, you can download clean, well-formatted PDFs that are ready for revision or submission.",
  },
  {
    question: "Which subjects are supported?",
    answer:
      "PrepMate AI supports a wide range of subjects including science, engineering, commerce, and more.",
  },
  {
    question: "What happens when my free credits are used?",
    answer:
      "Once your credits are used, you can upgrade your plan to continue generating notes without interruption.",
  },
  {
    question: "Can I use it on mobile?",
    answer:
      "Yes, PrepMate AI is fully responsive and works smoothly on mobile, tablet, and desktop devices.",
  },
];

function Faq() {
  // ✅ Auto-open first FAQ (index 0)
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index) => {
    // ✅ One-open-at-a-time logic
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-20 text-white">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
        <p className="mt-4 text-gray-100">
          Everything you need to know about PrepMate AI
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`rounded-xl py-2 border border-white/20 backdrop-blur-lg transition-all duration-100 ${
                isOpen
                  ? "bg-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
                  : "hover:bg-white/10"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left"
              >
                <h3
                  className={`text-base font-medium transition ${
                    isOpen ? "text-white" : "text-gray-100"
                  }`}
                >
                  {item.question}
                </h3>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-gray-100"
                >
                  <FaChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="px-6 pb-4 text-sm text-gray-100"
                    >
                      {item.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Faq;
