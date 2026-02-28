import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CallToAction() {
  const navigate = useNavigate();
  return (
    <section className="max-w-6xl mx-auto mt-32 px-6">
      <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-bold text-black">
            Unlock Your Study Potential
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-xl">
            Join thousands of students using PrepMate AI to generate smarter
            notes, structured documentation and exam-ready material in seconds.
          </p>
        </div>

        {/* Right Button */}
        <button
          onClick={() => navigate("/notes")}
          className="px-8 py-3 rounded-xl flex items-center gap-3 bg-linear-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semibold text-lg cursor-pointer"
        >
          Begin Your Journey
          <FaArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

export default CallToAction;

{
  /* <section className="py-10 text-center">
  <h2 className="text-4xl font-bold">Ready To Study Smarter?</h2>
  <p className="mt-6 text-gray-800">
    Start generating AI-powered notes in seconds.
  </p>

  <button
    onClick={() => navigate("/notes")}
    className="mt-10 px-8 py-3 rounded-xl bg-black text-white font-semibold cursor-pointer"
  >
    Try PrepMate AI Now
  </button>
</section> */
}
