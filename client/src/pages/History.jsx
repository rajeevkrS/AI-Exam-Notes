import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { AnimatePresence, motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../services/api";
import { setUserData } from "../redux/userSlice";
import MenuToggleIcon from "../components/MenuToggleIcon";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import FinalResult from "../components/FinalResult";

function History() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showProfile, setShowProfile] = useState(false);
  const [topics, setTopics] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // Handle Sign Out
  const handleSignOut = async () => {
    await logoutUser();
    dispatch(setUserData(null));

    // Remove selected note
    localStorage.removeItem("selectedNoteId");

    // if user sign out in history page then also removing notesResult key from local storage (no old data should be rendered)
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("notesResult_")) {
        localStorage.removeItem(key);
      }
    });

    navigate("/auth");
  };

  // Get all notes
  useEffect(() => {
    const myNotes = async () => {
      try {
        const res = await axios.get(backendUrl + "/api/notes/getnotes", {
          withCredentials: true,
        });

        // console.log(res.data);

        setTopics(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(`Error in displaying your notes: ${error}`);
      }
    };

    myNotes();
  }, []);

  // Get single note
  const openNotes = async (noteId) => {
    setLoading(true);
    try {
      const res = await axios.get(backendUrl + `/api/notes/${noteId}`, {
        withCredentials: true,
      });

      setSelectedNote(res.data.content);
      setSelectedNoteId(noteId);

      localStorage.setItem("selectedNoteId", noteId);
    } catch (error) {
      console.log(`Error getting Single Notes: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Note Close on click
  const handleNoteClick = (id) => {
    openNotes(id);

    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Load selected note on refresh
  useEffect(() => {
    const savedId = localStorage.getItem("selectedNoteId");

    if (savedId) {
      setSelectedNoteId(savedId); // for highlight
      openNotes(savedId); // fetch content again
    }
  }, []);

  // Filter notes based on search
  const filteredTopics = topics.filter((item) =>
    item.topic?.toLowerCase().includes(search.toLowerCase()),
  );

  // Sidebar default open on desktop
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-4">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed lg:hidden bottom-6 right-6 z-100 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-full shadow-lg text-white"
      >
        <MenuToggleIcon open={isSidebarOpen} />
      </button>

      <div className="flex gap-6 mt-8">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed top-0 left-0 z-50 w-72 h-screen lg:h-screen bg-black/90 lg:bg-black/80 backdrop-blur-xl border border-white/10 shadow-lg p-5"
            >
              <div className="h-full flex flex-col">
                {/* 🔥 HEADER */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div
                      onClick={() => navigate("/")}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <img src="/logoPrepMate.png" className="h-8 w-8" />
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <div
                        onClick={() => setShowProfile((prev) => !prev)}
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 text-white cursor-pointer"
                      >
                        {userData?.name?.[0]?.toUpperCase()}
                      </div>

                      <AnimatePresence>
                        {showProfile && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 10 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-3 w-40 bg-black border border-white/10 rounded-xl p-2"
                          >
                            <div
                              onClick={() => navigate("/pricing")}
                              className="px-3 py-2 text-sm text-white hover:bg-white/10 rounded cursor-pointer"
                            >
                              Pricing
                            </div>

                            <div className="h-px bg-white/10 my-1"></div>

                            <div
                              onClick={handleSignOut}
                              className="px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                            >
                              Sign Out
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="flex items-center bg-white/10 border border-white/10 rounded-lg px-3 py-2">
                    <FiSearch className="text-gray-400 mr-2" size={18} />
                    <input
                      type="text"
                      placeholder="Search Topic"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                    />
                  </div>

                  {/* New Notes */}
                  <button
                    onClick={() => navigate("/notes")}
                    className="flex items-center w-full px-3 py-2 rounded-lg text-md font-semibold text-gray-200 hover:bg-white/20 gap-2 cursor-pointer"
                  >
                    <FaEdit size={18} /> New Notes
                  </button>

                  <hr className="border-white/10" />

                  <h2 className="ml-1.5 text-md font-semibold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                    Your Notes
                  </h2>
                </div>

                {/* SCROLLABLE NOTES */}
                <div className="mt-3 flex-1 overflow-y-auto pr-1 custom-scroll">
                  {filteredTopics.length === 0 && (
                    <p className="ml-1.5 text-sm text-gray-400">
                      No notes found!
                    </p>
                  )}

                  <ul>
                    {filteredTopics.map((t, i) => (
                      <li
                        onClick={() => handleNoteClick(t._id)}
                        key={i}
                        className={`cursor-pointer mb-1 rounded-xl p-3 hover:bg-white/10 ${
                          selectedNoteId === t._id ? "bg-white/20" : ""
                        }`}
                      >
                        <p className="text-sm font-semibold text-white">
                          {t.topic}
                        </p>

                        <div className="mt-2 text-xs">
                          {t.examType && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                              Exam Type: {t.examType}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-3 mt-2 text-xs text-gray-300">
                          {t.revisionMode && <span>⚡Revision</span>}
                          {t.includeDiagram && <span>📊 Diagram</span>}
                          {t.includeChart && <span>📈 Chart</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Section */}
        <motion.div
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="flex-1 rounded-2xl bg-white shadow-lg p-6 min-h-[75vh] lg:ml-72"
        >
          {loading && (
            <p className="text-center text-gray-500">Loading notes...</p>
          )}

          {!loading && !selectedNote && (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a topic from Sidebar
            </div>
          )}

          {!loading && selectedNote && <FinalResult result={selectedNote} />}
        </motion.div>
      </div>
    </div>
  );
}

export default History;
