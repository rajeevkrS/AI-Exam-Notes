import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import PricingCard from "../components/PricingCard";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { backendUrl } from "../App";
import { FiCopy } from "react-icons/fi";

function Pricing() {
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);
  const [copied, setCopied] = useState(false);

  const CREDIT_MAP = {
    100: 50,
    200: 150,
    500: 300,
  };

  // Func for handling payments
  const handlePaying = async (amount) => {
    if (paying) return;
    if (![100, 200, 500].includes(amount)) return;

    try {
      setPayingAmount(amount);
      setPaying(true);

      // ✅ Store selected credits locally
      localStorage.setItem("creditsToAdd", CREDIT_MAP[amount]);

      const result = await axios.post(
        backendUrl + "/api/credit/order",
        { amount },
        { withCredentials: true },
      );

      if (result.data.url) {
        window.location.href = result.data.url;
        return;
      }

      setPaying(false);
    } catch (error) {
      setPaying(false);
      alert("Payment failed. Please try again.");
      console.log(`Handle Paying error: ${error}`);
    }
  };

  // Func for handling copy clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText("4242 4242 4242 4242");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 relative">
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-sm hover:bg-black transition shadow-sm mb-6"
      >
        <FaArrowLeft className="text-xs" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold">Choose Your Credits</h1>
        <p className="text-gray-600 mt-2">
          Unlock the full potential of AI with our premium plans designed for
          every stage of your journey.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl px-5 py-4 flex items-center justify-between gap-4 max-w-md w-full">
            {/* Left Content */}
            <div className="text-left">
              <p className="text-xs text-gray-500 mb-1">Test Card</p>
              <p className="font-mono text-lg text-gray-900">
                4242 4242 4242 4242
              </p>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition"
            >
              <FiCopy />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingCard
          title={"Starter"}
          price={"₹100"}
          amount={100}
          credits="50 Credits"
          description={"Perfect for quick revisions"}
          features={[
            "5 AI projects per month",
            "Exam-focused answers",
            "Diagram & Charts support",
            "1GB cloud storage",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          title={"Popular"}
          price={"₹200"}
          amount={200}
          credits="150 Credits"
          description={"Best value for students"}
          features={[
            "All starter features",
            "Fast generation",
            "More credits per ₹",
            "Priority AI response",
            "100GB cloud storage",
            "Priority support",
          ]}
          popular={true}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          title={"Pro Learner"}
          price={"₹500"}
          amount={500}
          credits="300 Credits"
          description={"For serious exam preparation"}
          features={[
            "Maximum credit value",
            "Unlimited revisions",
            "Charts & Diagrams",
            "Ideal for full syllabus",
            "Advanced security",
            "Unlimited cloud storage",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />
      </div>
    </div>
  );
}

export default Pricing;
