import { AnimatePresence, motion } from "motion/react";
import logo from "../assets/logoPrepMate.png";
import text from "../assets/textPrepMate.png";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle, logoutUser } from "../services/api";

function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits || 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sign in Func
  const handleGoogleAuth = async () => {
    if (loading) return;

    setLoading(true);

    const user = await loginWithGoogle(dispatch);

    setLoading(false);

    if (user) {
      navigate("/");
    }
  };

  // Sign out func
  const handleSignOut = async () => {
    await logoutUser();

    dispatch(setUserData(null));
    localStorage.removeItem("selectedNoteId");
    navigate("/");
  };

  // Scroll Func
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {(showProfile || showCredits) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowCredits(false);
            setShowProfile(false);
          }}
        />
      )}

      <div
        className={`sticky top-0 z-50 flex items-center justify-between lg:px-20 px-6 py-4 transition-all duration-500 ${
          scrolled ? "bg-black/20 backdrop-blur-lg" : ""
        }`}
      >
        {/* Left Side */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-1 select-none cursor-pointer"
        >
          <img
            src={logo}
            alt="prepmate logo"
            className="h-11 hidden md:block"
          />
          <img src={text} alt="prepmate text" className="md:h-10 h-9" />
        </div>

        {/* Right Side */}
        <div className="flex items-center md:gap-3 gap-2 relative select-none">
          {/* NOT LOGGED IN */}
          {!userData && (
            <motion.button
              onClick={handleGoogleAuth}
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 border border-white/20 text-white text-md md:text-lg font-semibold shadow-md cursor-pointer"
            >
              {loading ? "Logging in..." : "Get Started"}
              <FaArrowRight size={20} />
            </motion.button>
          )}

          {/* LOGGED IN */}
          {userData && (
            <div className="flex items-center md:gap-3 gap-2 relative select-none">
              {/* Credits */}
              <div className="relative">
                <motion.div
                  onClick={() => {
                    setShowCredits(!showCredits);
                    setShowProfile(false);
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1 md:px-3 px-2 py-1 rounded-full bg-white/20 border border-white/20 text-white text-sm shadow-md cursor-pointer"
                >
                  <span className="md:text-xl text-lg">🔷</span>
                  <span className="md:text-xl text-lg font-semibold">
                    {credits}
                  </span>
                  <span className="ml-1 md:h-6 h-5 md:w-6 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold">
                    ➕
                  </span>
                </motion.div>

                <AnimatePresence>
                  {showCredits && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 10, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="absolute -translate-x-1/2 mt-4 w-60 rounded-2xl bg-black/80 backdrop-blur-xl border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-white"
                    >
                      <h4 className="font-semibold mb-2">Buy Credits</h4>
                      <p className="text-sm text-gray-300 mb-4">
                        Use credits to generate AI notes, diagrams & PDFs.
                      </p>
                      <button
                        onClick={() => {
                          setShowCredits(false);
                          navigate("/pricing");
                        }}
                        className="w-full py-2 rounded-lg bg-linear-to-br from-white to-gray-200 text-black font-semibold hover: opacity-90 cursor-pointer"
                      >
                        Buy More Credits
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div className="relative">
                <motion.div
                  onClick={() => {
                    setShowProfile(!showProfile);
                    setShowCredits(false);
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-white text-sm shadow-md cursor-pointer"
                >
                  <span className="md:text-xl text-lg font-semibold">
                    {userData?.name.slice(0, 1).toUpperCase()}
                  </span>
                </motion.div>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 10, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="absolute right-0 mt-4 w-45 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-white"
                    >
                      <MenuItem
                        text="Your Notes"
                        onClick={() => {
                          setShowProfile(false);
                          navigate("/history");
                        }}
                      />

                      <div className="h-px bg-white/10 mx-3"></div>

                      <MenuItem text="Sign Out" red onClick={handleSignOut} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function MenuItem({ onClick, text, red }) {
  return (
    <div
      onClick={onClick}
      className={`w-full text-left px-5 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-colors ${red ? "text-red-400 hover:bg-red-500/10" : "text-gray-200 hover:bg-white/10"}`}
    >
      {text}
    </div>
  );
}

export default Navbar;
