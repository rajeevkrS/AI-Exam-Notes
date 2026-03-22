import { motion } from "motion/react";
import { useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { getCurrentUser } from "../services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirection to home page
  useEffect(() => {
    getCurrentUser(dispatch);

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
        className="text-red-500 text-6xl"
      >
        <IoMdCloseCircleOutline />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-red-600"
      >
        Payment Failed!
      </motion.h1>

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

export default PaymentFailed;
