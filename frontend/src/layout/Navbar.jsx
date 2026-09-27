import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaChartLine, FaPalette } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-900"
        >
          <FaChartLine className="text-blue-600" />
          SocialPulse
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`transition-colors ${
              isActive("/") ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          <Link
            to="/brands"
            className={`transition-colors ${
              isActive("/brands") || location.pathname.startsWith("/brand/")
                ? "text-blue-600 font-bold"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Brands
          </Link>

          {/* 🎨 MAKE YOUR DESIGN */}
          <Link
            to="/make-your-design"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              isActive("/make-your-design")
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 font-bold"
                : "text-indigo-600 bg-indigo-50/80 hover:bg-indigo-100 hover:text-indigo-800"
            }`}
          >
            <FaPalette className={isActive("/make-your-design") ? "text-cyan-300" : "text-indigo-600"} />
            <span>Make Your Design</span>
            <span className="hidden md:inline-block text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950 ml-0.5">
              NEW
            </span>
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-gray-700 hover:text-red-500 transition-colors"
          >
            <FaUserCircle size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
