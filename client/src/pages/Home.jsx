import Navbar from "../components/Navbar";
import { motion } from "motion/react";
import img from "../assets/img1.png";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Testimonial from "../components/Testimonial";
import Stats from "../components/Stats";
import UseCase from "../components/UseCase";
import CallToAction from "../components/CallToAction";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white text-black px-6 lg:px-8">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto pt-28 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <div className="">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -6 }}
          >
            <motion.h1
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
              className="text-5xl lg:text-6xl font-extrabold leading-tight bg-linear-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent"
            >
              Create Smart <br /> AI Notes In Seconds
            </motion.h1>

            <motion.p
              whileHover={{ y: -2 }}
              className="mt-6 max-w-xl text-lg font-semibold bg-linear-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent"
              style={{
                transform: "transleteZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25",
              }}
            >
              Generate exam-focused notes, project documentation, flow diagrams
              and revision-ready content using AI – faster, cleaner and smarter.
            </motion.p>

            <motion.button
              onClick={() => navigate("/notes")}
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
              className="mt-10 px-8 py-3 rounded-xl flex items-center gap-3 bg-linear-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.4)] cursor-pointer"
            >
              Get Started
              <FaArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="overflow-hidden">
            <img src={img} alt="img" />
          </div>
        </motion.div>
      </section>

      {/* Info */}
      <section className="max-w-7xl mx-auto py-10 text-center text-gray-500 font-semibold">
        Trusted by 5,000+ students across 50+ subjects
      </section>

      {/* Featuers Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">
            Everything You Need To Ace Exams
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            <span className="font-bold">PrepMate AI</span> combines smart
            summarization, structured documentation and visual generation into
            one powerful study tool.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <Feature
            icon={"📘"}
            title={"Exam Notes"}
            desc={
              "AI-generated high-yield notes focused on important concepts, definitions and exam-ready structure."
            }
            badge="Most Used"
          />

          <Feature
            icon={"📂"}
            title={"Project Documentation"}
            desc={
              "Well-structured assignments, technical reports and documentation formatted professionally."
            }
          />

          <Feature
            icon={"📊"}
            title={"Charts & Diagrams"}
            desc={
              "Automatically generate flowcharts, graphs and visual explanations instantly."
            }
            badge="New"
          />

          <Feature
            icon={"⬇️"}
            title={"Instant PDF Export"}
            desc={
              "Download clean, print-ready PDFs formatted for revision and submission."
            }
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">How PrepMate AI Works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl font-bold text-gray-300 mb-4">01</div>
            <h3 className="text-xl font-semibold">Enter Topic</h3>
            <p className="mt-3 text-gray-600">
              Type your subject, chapter or concept you want to study.
            </p>
          </div>

          <div>
            <div className="text-5xl font-bold text-gray-300 mb-4">02</div>
            <h3 className="text-xl font-semibold">AI Generates Notes</h3>
            <p className="mt-3 text-gray-600">
              Get structured notes, diagrams, charts and key questions
              instantly.
            </p>
          </div>

          <div>
            <div className="text-5xl font-bold text-gray-300 mb-4">03</div>
            <h3 className="text-xl font-semibold">Revise & Download</h3>
            <p className="mt-3 text-gray-600">
              Switch to revision mode or download clean PDF for exam prep.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Use Case Section */}
      <UseCase />

      {/* Testimonial Section */}
      <Testimonial />

      {/* Call-To-Action Section */}
      <CallToAction />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
