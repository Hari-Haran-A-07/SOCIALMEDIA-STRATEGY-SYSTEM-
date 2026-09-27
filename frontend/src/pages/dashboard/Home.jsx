import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GlassCard from "../../components/ui/GlassCard";
import API from "../../services/api";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import ChartCard from "../../components/analytics/ChartCard";

import {
  FaLayerGroup,
  FaCalendarAlt,
  FaRegFileAlt,
  FaLink,
  FaArrowUp,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { FaPalette, FaFigma } from "react-icons/fa6";
import { SiCanva } from "react-icons/si";

const AdobeIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14.58 2H24v20h-5.26l-4.16-10.37h.01V2zm-5.16 0H0v20h5.26l4.16-10.37V2zm2.58 8.16L16.27 22h-3.41l-1.32-3.41h-2.1L8.12 22H4.71l7.29-11.84z" />
  </svg>
);

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const StatCard = ({ title, value, icon }) => {
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400"></div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-3xl font-bold mt-1 text-gray-900">{value}</p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl">
          {icon}
        </div>
      </div>
    </GlassCard>
  );
};

const Home = () => {

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    brands: 0,
    posts: 0,
    planned: 0,
    backlinks: 0,
    alerts: {},
    upcoming: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard/stats");
        setStats(res.data);
      } catch (error) {
        console.error(
          "Stats fetch failed:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <LoadingSkeleton />;

  const contentData = [
    { name: "Reel", value: 5 },
    { name: "Carousel", value: 3 },
    { name: "Static", value: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <GlassCard className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back 👋</h1>
            <p className="text-sm text-blue-100 mt-1">
              Here’s what’s happening with your social strategy today.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
            <FaArrowUp />
            Productivity Up
          </div>
        </div>
      </GlassCard>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Brands"
          value={stats.brands}
          icon={<FaLayerGroup />}
        />
        <StatCard
          title="Posts Created"
          value={stats.posts}
          icon={<FaRegFileAlt />}
        />
        <StatCard
          title="Posts Planned"
          value={stats.planned}
          icon={<FaCalendarAlt />}
        />
        <StatCard
          title="Backlinks Built"
          value={stats.backlinks}
          icon={<FaLink />}
        />
      </div>

      {/* 🎨 MAKE YOUR DESIGN SHOWCASE BANNER */}
      <GlassCard className="relative overflow-hidden p-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-white border border-indigo-500/30">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <FaPalette className="text-cyan-400" />
              Creative Studio Hub
            </div>
            <h2 className="text-2xl font-bold">Need Visuals for Your Next Campaign?</h2>
            <p className="text-sm text-indigo-100/90 leading-relaxed">
              Design high-converting posts directly on <strong>Canva</strong>, <strong>Adobe Express</strong>, <strong>Figma</strong>, or generate social banners inside our in-app canvas studio.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.canva.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-white/10 hover:bg-white/20 text-cyan-200 px-3 py-1.5 rounded-lg border border-white/15 transition flex items-center gap-1.5"
              >
                <SiCanva size={14} /> Open Canva
              </a>
              <a
                href="https://www.adobe.com/express/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-white/10 hover:bg-white/20 text-red-300 px-3 py-1.5 rounded-lg border border-white/15 transition flex items-center gap-1.5"
              >
                <AdobeIcon size={14} /> Open Adobe Express
              </a>
              <a
                href="https://www.figma.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-white/10 hover:bg-white/20 text-pink-300 px-3 py-1.5 rounded-lg border border-white/15 transition flex items-center gap-1.5"
              >
                <FaFigma size={14} /> Open Figma
              </a>
            </div>
          </div>

          <Link
            to="/make-your-design"
            className="self-start lg:self-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-xl transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Launch Make Your Design <FaArrowRight size={14} />
          </Link>
        </div>
      </GlassCard>

      {/* ALERT + UPCOMING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-lg font-semibold mb-4">Attention Required</h3>

          <div className="space-y-3 text-sm">
            {stats.alerts?.missedPosts > 0 && (
              <p className="text-red-600">
                ⚠️ {stats.alerts.missedPosts} posts missed schedule
              </p>
            )}

            {stats.alerts?.drafts > 0 && (
              <p className="text-yellow-600">
                📝 {stats.alerts.drafts} drafts pending
              </p>
            )}

            {stats.alerts?.missedPosts === 0 && stats.alerts?.drafts === 0 && (
              <p className="text-green-600">✅ All good</p>
            )}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-4">Upcoming (Next 24h)</h3>

          {stats.upcoming?.length === 0 ? (
            <p className="text-sm text-gray-500">No upcoming posts</p>
          ) : (
            <div className="space-y-3 text-sm">
              {stats.upcoming.map((p) => (
                <div
                  key={p._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>{p.title}</span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <FaClock />
                    {new Date(p.scheduledAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>


      {/* ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Content Mix">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={contentData} dataKey="value" outerRadius={80}>
                {contentData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Smart Insight</h3>

          <p className="text-sm text-gray-600 leading-7">
            Your posting consistency is improving. Scheduling at least 5 quality
            posts per week can significantly improve engagement and reach.
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Home;
