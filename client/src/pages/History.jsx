import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "../components/Navbar";
import MenuToggleIcon from "../components/MenuToggleIcon";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

function History() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Func to get Notes
  useEffect(() => {
    const myNotes = async () => {
      try {
        const res = await axios.get(backendUrl + "/api/notes/getnotes", {
          withCredentials: true,
        });

        console.log(res.data);

        setTopics(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(`Error in displaying your notes: ${error}`);
      }
    };

    myNotes();
  }, []);

  // Filter notes based on search
  const filteredTopics = topics.filter((item) =>
    item.topic?.toLowerCase().includes(search.toLowerCase()),
  );

  //
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-6 py-8">
      <Navbar />

      {/* Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed lg:hidden bottom-6 right-6 z-100 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-full shadow-lg text-white"
      >
        <MenuToggleIcon open={isSidebarOpen} />
      </button>

      {/* Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed lg:static top-0 left-0 z-50 lg:z-auto w-72 h-full lg:h-[80vh] lg:rounded-xl lg:col-span-1 bg-black/90 lg:bg-black/80 backdrop-blur-xl border border-white/10 shadow-lg p-5 "
            >
              <div className="h-full flex flex-col">
                <div className="space-y-3">
                  {/* Search Bar */}
                  <div className="flex items-center bg-white/10 border border-white/10 rounded-lg px-3 py-2">
                    <FiSearch className="text-gray-400 mr-2" size={18} />
                    <input
                      type="text"
                      placeholder="Search"
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
                        key={i}
                        className="cursor-pointer rounded-xl p-3 hover:bg-white/10"
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
      </div>
    </div>
  );
}

export default History;
