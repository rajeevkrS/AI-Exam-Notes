import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../services/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import img from "../assets/Screenshot3.jpg";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import Testimonial from "../components/Testimonial";
import Stats from "../components/Stats";
import UseCase from "../components/UseCase";
import Faq from "../components/FAQ";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const handleGoogleAuth = async () => {
    const user = await loginWithGoogle(dispatch);

    if (user) {
      navigate("/notes");
    }
  };

  return (
    <div
      className="relative min-h-screen text-white bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/back.jpg')",
        backgroundPosition: "top center",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <Hero
        userData={userData}
        handleGoogleAuth={handleGoogleAuth}
        navigate={navigate}
        img={img}
      />

      {/* Info */}
      <section className="py-20 text-center text-white font-semibold">
        Trusted by 5,000+ students across 50+ subjects
      </section>

      {/* Featuers Section */}
      <section className="px-8 py-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">
            Everything You Need To Ace Exams
          </h2>
          <p className="mt-4 text-white max-w-2xl mx-auto">
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
      <section className="px-8 py-20">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">How PrepMate AI Works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl font-bold text-gray-300 mb-4">01</div>
            <h3 className="text-xl font-semibold">Enter Topic</h3>
            <p className="mt-3 text-gray-100">
              Type your subject, chapter or concept you want to study.
            </p>
          </div>

          <div>
            <div className="text-5xl font-bold text-gray-300 mb-4">02</div>
            <h3 className="text-xl font-semibold">AI Generates Notes</h3>
            <p className="mt-3 text-gray-100">
              Get structured notes, diagrams, charts and key questions
              instantly.
            </p>
          </div>

          <div>
            <div className="text-5xl font-bold text-gray-300 mb-4">03</div>
            <h3 className="text-xl font-semibold">Revise & Download</h3>
            <p className="mt-3 text-gray-100">
              Switch to revision mode or download clean PDF for exam prep.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Use Case Section */}
      <UseCase />

      {/* FAQ */}
      <Faq />

      {/* Testimonial Section */}
      <Testimonial />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
