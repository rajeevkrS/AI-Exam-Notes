import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./services/api";
import History from "./pages/History";
import Notes from "./pages/Notes";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const dispatch = useDispatch();
  const { userData, isCheckingAuth } = useSelector((state) => state.user);

  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  // 🧠 Prevent flicker
  if (isCheckingAuth) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/history"
          element={userData ? <History /> : <Navigate to="/" replace />}
        />

        <Route
          path="/notes"
          element={userData ? <Notes /> : <Navigate to="/" replace />}
        />

        <Route
          path="/pricing"
          element={userData ? <Pricing /> : <Navigate to="/" replace />}
        />

        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
    </>
  );
}

export default App;
