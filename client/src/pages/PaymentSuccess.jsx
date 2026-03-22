import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { LuCircleCheckBig } from "react-icons/lu";
import { getCurrentUser } from "../services/api";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { backendUrl } from "../App";
import axios from "axios";

function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [creditsAdded, setCreditsAdded] = useState(0);

  // Redirection to home page
  // useEffect(() => {
  //   getCurrentUser(dispatch);

  //   const t = setTimeout(() => {
  //     navigate("/");
  //   }, 5000);

  //   return () => clearTimeout(t);
  // }, []);

  useEffect(() => {
    const verify = async () => {
      const session_id = params.get("session_id");

      // Get stored credits
      const storedCredits = localStorage.getItem("creditsToAdd");

      if (storedCredits) {
        setCreditsAdded(Number(storedCredits));

        // REMOVE AFTER USING (THIS LINE YOU ASKED)
        localStorage.removeItem("creditsToAdd");
      }

      if (!session_id) return;

      try {
        await axios.post(
          `${backendUrl}/api/credit/verify-payment`,
          { session_id },
          { withCredentials: true },
        );

        getCurrentUser(dispatch);
      } catch (error) {
        console.error("Verification failed:", error);
      }
    };

    verify();

    const t = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-center p-4 gap-4">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="text-green-500 text-6xl"
      >
        <LuCircleCheckBig />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-green-600"
      >
        Payment Successful! 🎉
      </motion.h1>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
        className="text-4xl font-bold bg-linear-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent"
      >
        +{creditsAdded} Credits
      </motion.div>

      <motion.p
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-md text-gray-400"
      >
        Redirecting to home...
      </motion.p>
    </div>
  );
}

export default PaymentSuccess;
