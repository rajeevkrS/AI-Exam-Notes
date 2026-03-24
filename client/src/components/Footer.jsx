import logo from "../assets/logoPrepMate.png";
import text from "../assets/textPrepMate.png";
import { useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { FaInstagram, FaLinkedinIn, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <div className="z-10 mt-10 bg-white/20 border-t border-white/20 backdrop-blur-lg px-10 py-8 shadow-[0_25px_60px_rgba(0,0,0,0,0,0.7)]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-4 transform-gpu">
          <div
            className="flex items-center gap-3 cursor-pointer"
            style={{ transform: "translateZ(20px)" }}
          >
            <img src={logo} alt="logo" className="h-10" />
            <img src={text} alt="" className="h-9" />
          </div>

          <p className="text-sm text-gray-300 max-w-sm font-semibold">
            PrepMate AI helps students generate exam-focused notes, revision
            material, diagrams, and printable PDFs using AI.
          </p>

          {/* Newsletter */}
          <div className="mt-4">
            <p className="text-sm font-bold text-white mb-3">Stay Connected</p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm rounded-l-md bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
              />
              <button className="px-3 rounded-r-md bg-white text-black flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
                <IoSend className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h1 className="text-sm font-bold text-white mb-4">Quick Links</h1>

          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/")}
              className="text-gray-300 font-semibold hover:text-white transition-colors cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/notes")}
              className="text-gray-300 font-semibold hover:text-white transition-colors cursor-pointer"
            >
              Notes
            </li>
            <li
              onClick={() => navigate("/history")}
              className="text-gray-300 font-semibold hover:text-white transition-colors cursor-pointer"
            >
              History
            </li>
            <li
              onClick={() => navigate("/pricing")}
              className="text-gray-300 font-semibold hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </li>
            <li className="text-gray-300 font-semibold hover:text-white transition-colors cursor-pointer">
              Contact
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-center">
          <h1 className="text-sm font-bold text-white mb-4">Contact Us</h1>

          <ul className="space-y-2 text-sm text-gray-300 font-semibold">
            <li>123 Innovation Street</li>
            <li>Tech City, TC 12345</li>
            <li>Phone: (123) 456-7890</li>
            <li>Email: support@prepmateai.com</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col items-center">
          <h1 className="text-sm font-bold text-white mb-4">Follow Us</h1>

          <div className="flex gap-4 text-gray-300">
            <div className="p-2 rounded-full border border-white/10 cursor-pointer hover:text-white hover:border-white hover:scale-110 transition">
              <FaXTwitter className="text-lg" />
            </div>

            <div className="p-2 rounded-full border border-white/10 cursor-pointer hover:text-white hover:border-white hover:scale-110 transition">
              <FaDiscord className="text-lg" />
            </div>

            <div className="p-2 rounded-full border border-white/10 cursor-pointer hover:text-white hover:border-white hover:scale-110 transition">
              <FaInstagram className="text-lg" />
            </div>

            <div className="p-2 rounded-full border border-white/10 cursor-pointer hover:text-white hover:border-white hover:scale-110 transition">
              <FaLinkedinIn className="text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <p>
          © {year} <span className="font-bold">PrepMate AI</span>. All rights
          reserved.
        </p>

        <div className="flex gap-6">
          <span className="cursor-pointer font-semibold hover:text-white">
            Privacy Policy
          </span>
          <span className="cursor-pointer font-semibold hover:text-white">
            Terms of Service
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
