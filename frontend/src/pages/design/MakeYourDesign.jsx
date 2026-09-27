import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import GlassCard from "../../components/ui/GlassCard";
import {
  ExternalLink,
  Download,
  Copy,
  Check,
  Search,
  Sparkles,
  Layers,
  Palette,
  Sliders,
  RefreshCw,
  Zap,
  LayoutTemplate,
  Monitor,
  Smartphone,
  Quote,
  CheckCircle2,
  Brush,
  ArrowRight,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
  FaTiktok,
  FaPinterest,
  FaFigma,
} from "react-icons/fa6";
import { SiCanva } from "react-icons/si";

/* -------------------------------------------------------------
   STANDALONE PIXEL-PERFECT ICONS
------------------------------------------------------------- */
const AdobeIcon = ({ size = 22, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14.58 2H24v20h-5.26l-4.16-10.37h.01V2zm-5.16 0H0v20h5.26l4.16-10.37V2zm2.58 8.16L16.27 22h-3.41l-1.32-3.41h-2.1L8.12 22H4.71l7.29-11.84z" />
  </svg>
);

const PhotoshopIcon = ({ size = 22, className = "" }) => (
  <div
    style={{ width: size, height: size }}
    className={`bg-[#001E36] text-[#31A8FF] rounded font-bold flex items-center justify-center text-xs tracking-tighter ${className}`}
  >
    Ps
  </div>
);

const IllustratorIcon = ({ size = 22, className = "" }) => (
  <div
    style={{ width: size, height: size }}
    className={`bg-[#330000] text-[#FF9A00] rounded font-bold flex items-center justify-center text-xs tracking-tighter ${className}`}
  >
    Ai
  </div>
);

/* -------------------------------------------------------------
   DESIGN PLATFORMS DIRECTORY DATA
------------------------------------------------------------- */
const DESIGN_PLATFORMS = [
  {
    id: "canva",
    name: "Canva Pro",
    category: "Social Media & Graphics",
    badge: "Most Popular",
    color: "from-cyan-500 to-blue-600",
    borderGlow: "hover:border-cyan-400",
    url: "https://www.canva.com",
    description:
      "The #1 all-in-one graphic design platform. Create Instagram posts, carousels, reels, stories, YouTube thumbnails, and marketing materials in minutes.",
    features: ["100K+ Templates", "AI Magic Studio", "Brand Kit & Fonts", "Instant Resizing"],
    quickLinks: [
      { label: "Instagram Posts", url: "https://www.canva.com/create/instagram-posts/" },
      { label: "Carousels & Slides", url: "https://www.canva.com/create/instagram-carousels/" },
      { label: "YouTube Thumbnails", url: "https://www.canva.com/create/youtube-thumbnails/" },
    ],
    iconType: "canva",
  },
  {
    id: "adobe-express",
    name: "Adobe Express",
    category: "Social Media & Video",
    badge: "AI Powered",
    color: "from-red-500 to-amber-500",
    borderGlow: "hover:border-red-400",
    url: "https://www.adobe.com/express/",
    description:
      "Fast, easy social media graphic design and video creation powered by Adobe Firefly Generative AI. Remove backgrounds, animate, and generate text-to-image instantly.",
    features: ["Adobe Firefly Generative AI", "Quick Background Removal", "One-Click Video Resize", "Adobe Stock Assets"],
    quickLinks: [
      { label: "Create Social Post", url: "https://www.adobe.com/express/create/social-media-graphic" },
      { label: "Reels & TikTok Video", url: "https://www.adobe.com/express/create/video/tiktok" },
      { label: "Banner & Flyer Maker", url: "https://www.adobe.com/express/create/banner" },
    ],
    iconType: "adobe",
  },
  {
    id: "adobe-creative-cloud",
    name: "Adobe Creative Cloud",
    category: "Professional Creative Suite",
    badge: "Industry Standard",
    color: "from-purple-600 to-red-600",
    borderGlow: "hover:border-purple-400",
    url: "https://www.adobe.com/creativecloud.html",
    description:
      "The ultimate suite for creative pros: Photoshop, Illustrator, Premiere Pro, InDesign, and After Effects for uncompromised graphic fidelity and video production.",
    features: ["Photoshop & Illustrator", "Vector Graphics", "High-End Video Editing", "Cloud Asset Sync"],
    quickLinks: [
      { label: "Photoshop Web", url: "https://photoshop.adobe.com" },
      { label: "Illustrator Online", url: "https://www.adobe.com/products/illustrator.html" },
      { label: "Adobe Firefly AI", url: "https://firefly.adobe.com" },
    ],
    iconType: "adobe-pro",
  },
  {
    id: "figma",
    name: "Figma",
    category: "UI/UX & Vector Design",
    badge: "Collaboration",
    color: "from-violet-500 to-pink-500",
    borderGlow: "hover:border-pink-400",
    url: "https://www.figma.com",
    description:
      "Collaborative cloud vector design tool. Perfect for crafting brand design systems, social media layout grids, reusable post templates, and device mockups.",
    features: ["Auto-Layout & Grids", "Component Libraries", "Real-Time Collaboration", "Community Templates"],
    quickLinks: [
      { label: "Social Media Templates", url: "https://www.figma.com/community/search?model_type=hub_files&q=social+media" },
      { label: "Open Figma Web", url: "https://www.figma.com" },
    ],
    iconType: "figma",
  },
  {
    id: "photopea",
    name: "Photopea",
    category: "Photo & Raster Editing",
    badge: "100% Free / No Login",
    color: "from-emerald-500 to-teal-600",
    borderGlow: "hover:border-emerald-400",
    url: "https://www.photopea.com",
    description:
      "A free, powerful browser-based Photoshop clone. Open and edit PSD, AI, XD, Sketch, and RAW image files directly in your web browser with zero installation.",
    features: ["PSD / AI / RAW Support", "Layers & Masks", "Filters & Smart Objects", "Completely Free in Browser"],
    quickLinks: [
      { label: "Open Online PSD Editor", url: "https://www.photopea.com" },
      { label: "Templates Library", url: "https://www.photopea.com/templates/" },
    ],
    iconType: "photopea",
  },
  {
    id: "freepik-wepik",
    name: "Freepik & Wepik",
    category: "Stock Vectors & AI Maker",
    badge: "Millions of Assets",
    color: "from-blue-500 to-indigo-600",
    borderGlow: "hover:border-indigo-400",
    url: "https://www.freepik.com",
    description:
      "Vast repository of premium vectors, illustrations, PSD mockups, icons, and Wepik online editor for instant social template customization.",
    features: ["Vector Illustrations", "Ready-made PSD Mockups", "Wepik Online Editor", "AI Image Generator"],
    quickLinks: [
      { label: "Wepik Social Editor", url: "https://wepik.com" },
      { label: "Free Vector Graphics", url: "https://www.freepik.com/vectors" },
    ],
    iconType: "freepik",
  },
  {
    id: "pixlr",
    name: "Pixlr Suite",
    category: "AI Photo Editing",
    badge: "Fast & Smart",
    color: "from-amber-500 to-rose-500",
    borderGlow: "hover:border-rose-400",
    url: "https://pixlr.com",
    description:
      "Cloud-based photo editor with generative AI tools: AI generative fill, background remover, object remover, and quick collage maker.",
    features: ["AI Background Remover", "Generative Fill", "Batch Photo Editor", "Collage & Social Presets"],
    quickLinks: [
      { label: "Pixlr Express", url: "https://pixlr.com/express/" },
      { label: "AI Background Remover", url: "https://pixlr.com/remove-background/" },
    ],
    iconType: "pixlr",
  },
  {
    id: "linearity-curve",
    name: "Linearity Curve (Vectornator)",
    category: "Vector & Illustration",
    badge: "Vector Powerhouse",
    color: "from-fuchsia-500 to-purple-600",
    borderGlow: "hover:border-purple-400",
    url: "https://www.linearity.io/curve/",
    description:
      "Next-gen vector graphic design tool for marketing teams. Create custom vector badges, illustrations, typography layouts, and brand assets.",
    features: ["Auto Trace Vectors", "Shape Builder", "Pen Tool Precision", "Marketing Asset Templates"],
    quickLinks: [
      { label: "Linearity Curve", url: "https://www.linearity.io/curve/" },
      { label: "Linearity Move (Animation)", url: "https://www.linearity.io/move/" },
    ],
    iconType: "linearity",
  },
  {
    id: "snappa",
    name: "Snappa",
    category: "Quick Social Graphics",
    badge: "Beginner Friendly",
    color: "from-blue-600 to-cyan-400",
    borderGlow: "hover:border-blue-400",
    url: "https://snappa.com",
    description:
      "Ultra-fast graphic design software for non-designers. Built-in perfect social dimensions, high-resolution stock photos, and drag-and-drop vector shapes.",
    features: ["Pre-sized Dimensions", "5M+ Free Stock Photos", "Vector Shapes & Graphics", "Direct Scheduling Sync"],
    quickLinks: [
      { label: "Social Media Graphics", url: "https://snappa.com/templates" },
    ],
    iconType: "snappa",
  },
  {
    id: "vistacreate",
    name: "VistaCreate (Crello)",
    category: "Animated Graphics",
    badge: "Video & Motion",
    color: "from-indigo-500 to-cyan-500",
    borderGlow: "hover:border-cyan-400",
    url: "https://create.vista.com",
    description:
      "Free graphic design platform with 100,000+ professionally designed static and animated templates for Instagram, TikTok, Facebook, and ads.",
    features: ["Animated Social Posts", "Music & Audio Tracks", "Brand Kit Manager", "Stickers & Badges"],
    quickLinks: [
      { label: "Explore Templates", url: "https://create.vista.com/templates/" },
    ],
    iconType: "vistacreate",
  },
  {
    id: "piktochart",
    name: "Piktochart",
    category: "Infographics & Data Visuals",
    badge: "Data Storytelling",
    color: "from-teal-500 to-emerald-600",
    borderGlow: "hover:border-teal-400",
    url: "https://piktochart.com",
    description:
      "Transform data and complex information into clean infographics, statistical social carousel slides, charts, and executive visual reports.",
    features: ["Interactive Charts & Maps", "Infographic Layouts", "Report Builder", "Carousel Slide Packs"],
    quickLinks: [
      { label: "Infographics Creator", url: "https://piktochart.com/formats/infographics/" },
    ],
    iconType: "piktochart",
  },
  {
    id: "remove-bg",
    name: "Remove.bg",
    category: "Quick Photo Utility",
    badge: "Instant 1-Click",
    color: "from-slate-700 to-slate-900",
    borderGlow: "hover:border-slate-500",
    url: "https://www.remove.bg",
    description:
      "Remove backgrounds from product photos, portrait headshots, and brand assets automatically in 5 seconds with 100% precision.",
    features: ["Zero Manual Cutouts", "Transparent PNG Output", "Product Photo Optimization", "HD Export"],
    quickLinks: [
      { label: "Upload & Cut Out", url: "https://www.remove.bg/upload" },
    ],
    iconType: "removebg",
  },
];

/* -------------------------------------------------------------
   PLATFORM DIMENSIONS DATA
------------------------------------------------------------- */
const DIMENSIONS_DATA = [
  {
    platform: "Instagram",
    icon: FaInstagram,
    color: "text-pink-600",
    presets: [
      { name: "Square Post", size: "1080 x 1080 px", ratio: "1:1", note: "Standard feed post & carousel" },
      { name: "Portrait Post", size: "1080 x 1350 px", ratio: "4:5", note: "Max feed real-estate & high engagement" },
      { name: "Story & Reel", size: "1080 x 1920 px", ratio: "9:16", note: "Full screen vertical story / reel video" },
      { name: "Landscape Post", size: "1080 x 566 px", ratio: "1.91:1", note: "Wide landscape photo" },
    ],
    canvaUrl: "https://www.canva.com/create/instagram-posts/",
    adobeUrl: "https://www.adobe.com/express/create/post/instagram",
  },
  {
    platform: "LinkedIn",
    icon: FaLinkedin,
    color: "text-blue-600",
    presets: [
      { name: "Feed Image Post", size: "1200 x 627 px", ratio: "1.91:1", note: "Standard single image feed post" },
      { name: "Square / Carousel Slide", size: "1080 x 1080 px", ratio: "1:1", note: "Multi-page PDF carousel document" },
      { name: "Company Cover Banner", size: "1128 x 191 px", ratio: "5.9:1", note: "Company page header banner" },
      { name: "Personal Profile Banner", size: "1584 x 396 px", ratio: "4:1", note: "Personal profile background banner" },
    ],
    canvaUrl: "https://www.canva.com/create/linkedin-banners/",
    adobeUrl: "https://www.adobe.com/express/create/banner/linkedin",
  },
  {
    platform: "X (Twitter)",
    icon: FaXTwitter,
    color: "text-gray-900",
    presets: [
      { name: "In-Stream Post Image", size: "1600 x 900 px", ratio: "16:9", note: "Best aspect for feed timeline visibility" },
      { name: "Square Tweet Image", size: "1200 x 1200 px", ratio: "1:1", note: "Alternative square image" },
      { name: "Header Banner", size: "1500 x 500 px", ratio: "3:1", note: "Profile header banner" },
    ],
    canvaUrl: "https://www.canva.com/create/twitter-headers/",
    adobeUrl: "https://www.adobe.com/express/create/banner/twitter",
  },
  {
    platform: "YouTube",
    icon: FaYoutube,
    color: "text-red-600",
    presets: [
      { name: "Video Thumbnail", size: "1280 x 720 px", ratio: "16:9", note: "High CTR thumbnail (under 2MB)" },
      { name: "Channel Art Banner", size: "2560 x 1440 px", ratio: "16:9", note: "Channel header art (safe area 1546x423)" },
      { name: "YouTube Shorts", size: "1080 x 1920 px", ratio: "9:16", note: "Vertical short-form video" },
    ],
    canvaUrl: "https://www.canva.com/create/youtube-thumbnails/",
    adobeUrl: "https://www.adobe.com/express/create/thumbnail/youtube",
  },
  {
    platform: "Facebook",
    icon: FaFacebook,
    color: "text-blue-700",
    presets: [
      { name: "Feed Post Image", size: "1200 x 630 px", ratio: "1.91:1", note: "Standard newsfeed shared post" },
      { name: "Page Cover Photo", size: "820 x 312 px", ratio: "2.6:1", note: "Business page cover photo" },
      { name: "Story", size: "1080 x 1920 px", ratio: "9:16", note: "Facebook vertical story" },
    ],
    canvaUrl: "https://www.canva.com/create/facebook-posts/",
    adobeUrl: "https://www.adobe.com/express/create/post/facebook",
  },
  {
    platform: "TikTok & Reels",
    icon: FaTiktok,
    color: "text-slate-900",
    presets: [
      { name: "TikTok Video Fullscreen", size: "1080 x 1920 px", ratio: "9:16", note: "Vertical 60fps HD video" },
      { name: "Profile Photo", size: "200 x 200 px", ratio: "1:1", note: "Square / circular profile avatar" },
    ],
    canvaUrl: "https://www.canva.com/create/tiktok-videos/",
    adobeUrl: "https://www.adobe.com/express/create/video/tiktok",
  },
];

/* -------------------------------------------------------------
   BACKGROUND PRESETS FOR IN-APP CANVAS
------------------------------------------------------------- */
const CANVAS_THEMES = [
  { id: "cosmic", name: "Cosmic Nebula", bg: "bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950", textColor: "text-white", subColor: "text-indigo-200", badgeBg: "bg-purple-500/20 text-purple-300 border-purple-400/30" },
  { id: "sunset", name: "Sunset Horizon", bg: "bg-gradient-to-br from-orange-500 via-rose-600 to-purple-900", textColor: "text-white", subColor: "text-orange-100", badgeBg: "bg-white/20 text-white border-white/30" },
  { id: "emerald", name: "Emerald Luxe", bg: "bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900", textColor: "text-white", subColor: "text-emerald-200", badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30" },
  { id: "ocean", name: "Ocean Deep", bg: "bg-gradient-to-br from-blue-900 via-cyan-900 to-slate-950", textColor: "text-white", subColor: "text-cyan-200", badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30" },
  { id: "cyber", name: "Cyber Neon", bg: "bg-gradient-to-br from-slate-950 via-gray-900 to-black", textColor: "text-cyan-400", subColor: "text-pink-400", badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/50" },
  { id: "warm", name: "Warm Amber", bg: "bg-gradient-to-br from-amber-600 via-orange-600 to-red-700", textColor: "text-white", subColor: "text-amber-100", badgeBg: "bg-amber-400/20 text-amber-200 border-amber-300/30" },
  { id: "royal", name: "Royal Violet", bg: "bg-gradient-to-br from-violet-950 via-fuchsia-950 to-slate-900", textColor: "text-white", subColor: "text-fuchsia-200", badgeBg: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/30" },
  { id: "modern-dark", name: "Minimal Slate", bg: "bg-gradient-to-b from-slate-900 to-slate-950", textColor: "text-slate-100", subColor: "text-slate-400", badgeBg: "bg-slate-800 text-slate-300 border-slate-700" },
  { id: "clean-light", name: "Clean Pearl", bg: "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100", textColor: "text-gray-900", subColor: "text-gray-600", badgeBg: "bg-blue-100 text-blue-800 border-blue-200" },
];

/* -------------------------------------------------------------
   TRENDY SOCIAL MEDIA COLOR PALETTES
------------------------------------------------------------- */
const COLOR_PALETTES = [
  { name: "Modern SaaS Tech", colors: ["#0F172A", "#3B82F6", "#06B6D4", "#F8FAFC"] },
  { name: "Cyberpunk Glow", colors: ["#090A0F", "#FF007F", "#00F0FF", "#7928CA"] },
  { name: "Warm Sunset Luxe", colors: ["#2B0938", "#FF4500", "#FF8C00", "#FFD700"] },
  { name: "Eco Earth Minimal", colors: ["#1C2826", "#4D7C0F", "#84CC16", "#FEFCE8"] },
  { name: "Editorial Noir", colors: ["#121212", "#E5E5E5", "#A3A3A3", "#FFFFFF"] },
  { name: "Pastel Dreamscape", colors: ["#FDE2E4", "#FFCAD4", "#B5E2FA", "#03045E"] },
];

/* -------------------------------------------------------------
   AI DESIGN PROMPTS GENERATOR DATA
------------------------------------------------------------- */
const PROMPT_NICHES = [
  "Tech & SaaS Startup",
  "Fashion & Lifestyle",
  "Fitness & Health",
  "Food & Restaurant",
  "E-Commerce & Retail",
  "Digital Marketing Agency",
  "Real Estate & Architecture",
  "Finance & Crypto",
];

const PROMPT_GOALS = [
  "High-Converting Product Launch",
  "Engaging Social Quote / Thought Leadership",
  "Educational Carousel Infographic",
  "Special Offer / Flash Sale Banner",
  "Feature Highlight Announcement",
  "Customer Review & Social Proof",
];

const PROMPT_AESTHETICS = [
  "3D Claymorphism & Vibrant Glass",
  "Clean Modern Minimalist with Bold Typography",
  "Futuristic Cyberpunk with Neon Rim Lighting",
  "Studio Product Photography with Soft Shadows",
  "Editorial Magazine Style with High Contrast",
  "Retro 90s Grainy Film Aesthetic",
];

const MakeYourDesign = () => {
  const [activeTab, setActiveTab] = useState("platforms"); // 'platforms' | 'canvas' | 'dimensions' | 'prompts' | 'palettes'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // In-App Canvas State
  const canvasRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [canvasRatio, setCanvasRatio] = useState("1:1"); // '1:1' | '4:5' | '16:9' | '9:16'
  const [canvasTheme, setCanvasTheme] = useState(CANVAS_THEMES[0]);
  const [headline, setHeadline] = useState("Scale Your Brand to 100k Followers in 90 Days");
  const [bodyText, setBodyText] = useState("Consistency is the secret weapon of modern digital strategy. Plan, schedule, and automate.");
  const [badgeText, setBadgeText] = useState("PRO STRATEGY TIP");
  const [authorName, setAuthorName] = useState("SocialPulse Studio");
  const [brandHandle, setBrandHandle] = useState("@socialpulsehq");
  const [fontStyle, setFontStyle] = useState("sans"); // 'sans' | 'serif' | 'mono'
  const [selectedPlatformIcon, setSelectedPlatformIcon] = useState("instagram");
  const [showWatermark, setShowWatermark] = useState(true);

  // AI Prompt State
  const [niche, setNiche] = useState(PROMPT_NICHES[0]);
  const [goal, setGoal] = useState(PROMPT_GOALS[0]);
  const [aesthetic, setAesthetic] = useState(PROMPT_AESTHETICS[0]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Filtered Platforms
  const filteredPlatforms = DESIGN_PLATFORMS.filter((platform) => {
    const matchesSearch =
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === "All" ||
      platform.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  // Export Canvas as PNG
  const handleExportCanvas = async () => {
    if (!canvasRef.current) return;
    try {
      setIsExporting(true);
      toast.loading("Rendering high-res graphic...", { id: "export-toast" });

      const canvas = await html2canvas(canvasRef.current, {
        scale: 3, // 3x high-resolution crisp export
        useCORS: true,
        backgroundColor: null,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `social-design-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Graphic downloaded! Ready to schedule.", { id: "export-toast" });
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Failed to render graphic. Try again.", { id: "export-toast" });
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Dimension or Hex
  const handleCopyText = (text, label = "Copied to clipboard!") => {
    navigator.clipboard.writeText(text);
    toast.success(label);
  };

  // Generate dynamic prompt
  const generatedAiPrompt = `Create a high-impact social media creative visual for a ${niche} brand. 
Objective: ${goal}. 
Visual Style: ${aesthetic}. 
Composition details: ultra-crisp focus, clean negative space for typography overlay, modern color grading, high aesthetic quality, trending on Behance and Dribbble, 8k resolution, photorealistic studio lighting, dynamic depth of field.`;

  // Aspect ratio styles
  const getRatioClass = (ratio) => {
    switch (ratio) {
      case "1:1":
        return "aspect-square max-w-[460px]";
      case "4:5":
        return "aspect-[4/5] max-w-[420px]";
      case "16:9":
        return "aspect-[16/9] max-w-[540px]";
      case "9:16":
        return "aspect-[9/16] max-w-[340px]";
      default:
        return "aspect-square max-w-[460px]";
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 🚀 HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 md:p-10 shadow-2xl border border-blue-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-pink-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
            <Sparkles size={14} className="animate-spin text-cyan-400" />
            Creative Hub & Design Studio
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
            Make Your Design
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
            Directly launch industry-standard platforms like <strong className="text-white">Canva</strong>, <strong className="text-white">Adobe Express</strong>, <strong className="text-white">Figma</strong>, create instant graphics with our built-in Banner Studio, and access social dimensions & AI prompts.
          </p>

          {/* QUICK SHORTCUT BADGES */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveTab("platforms")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "platforms"
                  ? "bg-white text-blue-900 shadow-lg font-bold"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              🚀 Direct Platform Launchpad
            </button>
            <button
              onClick={() => setActiveTab("canvas")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "canvas"
                  ? "bg-white text-blue-900 shadow-lg font-bold"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              🎨 In-App Banner Creator
            </button>
            <button
              onClick={() => setActiveTab("dimensions")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "dimensions"
                  ? "bg-white text-blue-900 shadow-lg font-bold"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              📐 Dimensions Cheatsheet
            </button>
            <button
              onClick={() => setActiveTab("prompts")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "prompts"
                  ? "bg-white text-blue-900 shadow-lg font-bold"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              🤖 AI Design Prompts
            </button>
            <button
              onClick={() => setActiveTab("palettes")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "palettes"
                  ? "bg-white text-blue-900 shadow-lg font-bold"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              🎨 Color Palettes
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          TAB 1: DIRECT DESIGN PLATFORMS LAUNCHPAD
         ========================================================= */}
      {activeTab === "platforms" && (
        <div className="space-y-6">
          {/* SEARCH & FILTERS */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search Adobe, Canva, Figma, Photopea, vectors, AI photo tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {["All", "Social", "Video", "Vector", "AI", "Infographics"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* SPOTLIGHT CARDS: CANVA & ADOBE EXPRESS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CANVA SPOTLIGHT */}
            <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-950 text-white shadow-xl border border-cyan-500/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                    <SiCanva size={32} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-300 font-bold">Featured Platform</span>
                    <h2 className="text-2xl font-bold">Canva Pro Studio</h2>
                  </div>
                </div>
                <span className="bg-cyan-400/20 text-cyan-200 text-xs px-2.5 py-1 rounded-full border border-cyan-400/30">
                  Most Popular
                </span>
              </div>
              <p className="mt-4 text-sm text-cyan-100/90 leading-relaxed">
                Create visually stunning social media posts, carousel decks, reels, stories, and presentations. Tap into hundreds of thousands of pre-built templates.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href="https://www.canva.com/create/instagram-posts/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5"
                >
                  Instagram Post <ExternalLink size={12} />
                </a>
                <a
                  href="https://www.canva.com/create/instagram-carousels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5"
                >
                  Carousels <ExternalLink size={12} />
                </a>
                <a
                  href="https://www.canva.com/create/youtube-thumbnails/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5"
                >
                  YouTube Thumbnails <ExternalLink size={12} />
                </a>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-cyan-200">Official Canva Website</span>
                <a
                  href="https://www.canva.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-gray-950 font-bold text-sm shadow-lg transition transform hover:scale-105 active:scale-95"
                >
                  Open Canva Directly <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* ADOBE EXPRESS SPOTLIGHT */}
            <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-red-950 via-rose-950 to-slate-950 text-white shadow-xl border border-red-500/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-400/40 flex items-center justify-center text-red-400">
                    <AdobeIcon size={32} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-red-300 font-bold">Featured Platform</span>
                    <h2 className="text-2xl font-bold">Adobe Express & Firefly</h2>
                  </div>
                </div>
                <span className="bg-red-400/20 text-red-200 text-xs px-2.5 py-1 rounded-full border border-red-400/30">
                  Generative AI
                </span>
              </div>
              <p className="mt-4 text-sm text-red-100/90 leading-relaxed">
                Generate AI images, remove backgrounds in 1 click, resize video clips for TikTok/Reels, and design standout social collateral with Adobe generative tools.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href="https://www.adobe.com/express/create/social-media-graphic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5"
                >
                  Social Graphics <ExternalLink size={12} />
                </a>
                <a
                  href="https://firefly.adobe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5"
                >
                  Firefly AI <ExternalLink size={12} />
                </a>
                <a
                  href="https://www.adobe.com/express/feature/image/remove-background"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5"
                >
                  Remove Background <ExternalLink size={12} />
                </a>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-red-200">Official Adobe Website</span>
                <a
                  href="https://www.adobe.com/express/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-400 hover:from-red-400 hover:to-rose-300 text-white font-bold text-sm shadow-lg transition transform hover:scale-105 active:scale-95"
                >
                  Open Adobe Express <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* ALL PLATFORMS GRID */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Layers className="text-blue-600" size={20} />
              All Graphic Design & Creative Platforms ({filteredPlatforms.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPlatforms.map((platform) => (
                <GlassCard
                  key={platform.id}
                  className={`flex flex-col justify-between p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 ${platform.borderGlow}`}
                >
                  <div>
                    {/* CARD HEADER */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} text-white flex items-center justify-center font-bold text-xl shadow-md`}>
                          {platform.iconType === "canva" && <SiCanva size={22} />}
                          {platform.iconType === "adobe" && <AdobeIcon size={22} />}
                          {platform.iconType === "adobe-pro" && <PhotoshopIcon size={26} />}
                          {platform.iconType === "figma" && <FaFigma size={20} />}
                          {platform.iconType === "photopea" && <IllustratorIcon size={26} />}
                          {!["canva", "adobe", "adobe-pro", "figma", "photopea"].includes(platform.iconType) && (
                            <Brush size={22} />
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{platform.name}</h4>
                          <span className="text-xs text-gray-500">{platform.category}</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        {platform.badge}
                      </span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-xs text-gray-600 leading-relaxed mt-2 line-clamp-3">
                      {platform.description}
                    </p>

                    {/* FEATURE PILLS */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {platform.features.map((feat, i) => (
                        <span key={i} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>

                    {/* QUICK LINKS */}
                    {platform.quickLinks && platform.quickLinks.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                          Quick Presets:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {platform.quickLinks.map((ql, idx) => (
                            <a
                              key={idx}
                              href={ql.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition flex items-center gap-1"
                            >
                              {ql.label} <ExternalLink size={10} />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* DIRECT BUTTON */}
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 hover:bg-blue-600 text-white text-xs font-semibold shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  >
                    Open {platform.name} Website <ExternalLink size={14} />
                  </a>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: IN-APP INSTANT BANNER & QUOTE GENERATOR
         ========================================================= */}
      {activeTab === "canvas" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CONTROLS COLUMN (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Sliders className="text-blue-600" size={20} />
                  Graphic Studio Controls
                </h3>
                <button
                  onClick={() => {
                    const quotes = [
                      { h: "Build in Public & Grow Relentlessly", b: "The best marketing strategy is authenticity and undeniable value." },
                      { h: "Strategy Without Execution is Hallucination", b: "Plan your weekly social calendar in 15 minutes and automate posting." },
                      { h: "Quality Over Quantity Every Single Time", b: "One high-value carousel post outperforms 10 low-effort tweets." },
                    ];
                    const random = quotes[Math.floor(Math.random() * quotes.length)];
                    setHeadline(random.h);
                    setBodyText(random.b);
                    setCanvasTheme(CANVAS_THEMES[Math.floor(Math.random() * CANVAS_THEMES.length)]);
                    toast.success("Loaded inspiration template!");
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
                >
                  <RefreshCw size={12} /> Randomize
                </button>
              </div>

              {/* ASPECT RATIO */}
              <div>
                <label className="form-label text-xs">Aspect Ratio</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "1:1", label: "Square (1:1)", icon: Monitor },
                    { id: "4:5", label: "Portrait (4:5)", icon: Smartphone },
                    { id: "16:9", label: "Wide (16:9)", icon: Monitor },
                    { id: "9:16", label: "Story (9:16)", icon: Smartphone },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setCanvasRatio(r.id)}
                      className={`p-2 rounded-xl text-center border text-xs font-semibold transition ${
                        canvasRatio === r.id
                          ? "bg-blue-600 text-white border-blue-600 shadow-md"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {r.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* BACKGROUND THEME PRESETS */}
              <div>
                <label className="form-label text-xs">Color Theme & Background</label>
                <div className="grid grid-cols-3 gap-2">
                  {CANVAS_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setCanvasTheme(theme)}
                      className={`h-11 rounded-xl border p-1 text-[11px] font-medium transition flex items-center justify-center text-center ${theme.bg} ${
                        canvasTheme.id === theme.id ? "ring-2 ring-blue-500 ring-offset-2 scale-105" : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      <span className={theme.textColor}>{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="space-y-3">
                <div>
                  <label className="form-label text-xs">Badge / Category Tag</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="input-field text-xs py-2"
                    placeholder="e.g. MARKETING TIP, BREAKING NEWS"
                  />
                </div>

                <div>
                  <label className="form-label text-xs">Headline Title</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="input-field text-xs py-2"
                    placeholder="Main bold title..."
                  />
                </div>

                <div>
                  <label className="form-label text-xs">Supporting Text / Quote</label>
                  <textarea
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    className="textarea-field text-xs py-2 min-h-[70px]"
                    placeholder="Body text or quote..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="form-label text-xs">Brand Name</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="input-field text-xs py-2"
                    />
                  </div>
                  <div>
                    <label className="form-label text-xs">Handle (@)</label>
                    <input
                      type="text"
                      value={brandHandle}
                      onChange={(e) => setBrandHandle(e.target.value)}
                      className="input-field text-xs py-2"
                    />
                  </div>
                </div>
              </div>

              {/* PLATFORM BADGE ICON */}
              <div>
                <label className="form-label text-xs">Platform Icon Accent</label>
                <div className="flex gap-2">
                  {[
                    { id: "instagram", icon: FaInstagram, color: "text-pink-500" },
                    { id: "linkedin", icon: FaLinkedin, color: "text-blue-500" },
                    { id: "x", icon: FaXTwitter, color: "text-gray-900" },
                    { id: "youtube", icon: FaYoutube, color: "text-red-500" },
                    { id: "none", icon: CheckCircle2, color: "text-gray-400" },
                  ].map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPlatformIcon(p.id)}
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${
                          selectedPlatformIcon === p.id
                            ? "border-blue-600 bg-blue-50 shadow-sm"
                            : "border-gray-200 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <Icon className={p.color} size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FONT STYLE */}
              <div>
                <label className="form-label text-xs">Typography Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "sans", label: "Modern Sans" },
                    { id: "serif", label: "Elegant Serif" },
                    { id: "mono", label: "Tech Mono" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFontStyle(f.id)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition ${
                        fontStyle === f.id
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* CANVAS PREVIEW & EXPORT COLUMN (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="p-6 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-500" /> Live Canvas Render ({canvasRatio})
                </span>
                <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-semibold border border-green-200">
                  Ready to Download
                </span>
              </div>

              {/* ACTUAL GRAPHIC CANVAS (DOM ELEMENT FOR HTML2CANVAS) */}
              <div className="w-full flex justify-center py-4 bg-slate-900/5 rounded-2xl border border-dashed border-gray-300 overflow-hidden">
                <div
                  ref={canvasRef}
                  className={`w-full ${getRatioClass(
                    canvasRatio
                  )} ${canvasTheme.bg} rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 select-none ${
                    fontStyle === "serif"
                      ? "font-serif"
                      : fontStyle === "mono"
                      ? "font-mono"
                      : "font-sans"
                  }`}
                >
                  {/* AMBIENT GLOW ACCENT */}
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

                  {/* TOP ROW: BADGE + PLATFORM ICON */}
                  <div className="flex justify-between items-center relative z-10">
                    {badgeText && (
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-md ${canvasTheme.badgeBg}`}>
                        {badgeText}
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      {selectedPlatformIcon === "instagram" && <FaInstagram className="text-pink-400" size={20} />}
                      {selectedPlatformIcon === "linkedin" && <FaLinkedin className="text-blue-400" size={20} />}
                      {selectedPlatformIcon === "x" && <FaXTwitter className="text-white" size={20} />}
                      {selectedPlatformIcon === "youtube" && <FaYoutube className="text-red-400" size={20} />}
                    </div>
                  </div>

                  {/* MIDDLE ROW: QUOTE / HEADLINE / BODY */}
                  <div className="my-auto space-y-4 relative z-10">
                    <Quote className="text-white/20" size={32} />
                    <h2 className={`text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight ${canvasTheme.textColor}`}>
                      {headline}
                    </h2>
                    {bodyText && (
                      <p className={`text-xs md:text-sm leading-relaxed ${canvasTheme.subColor} opacity-90`}>
                        {bodyText}
                      </p>
                    )}
                  </div>

                  {/* BOTTOM ROW: AUTHOR & BRAND FOOTER */}
                  <div className="pt-4 border-t border-white/15 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-white text-xs">
                        {authorName.charAt(0) || "S"}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${canvasTheme.textColor} flex items-center gap-1`}>
                          {authorName}
                          <CheckCircle2 size={12} className="text-cyan-400 inline" />
                        </div>
                        <span className={`text-[11px] ${canvasTheme.subColor} block`}>
                          {brandHandle}
                        </span>
                      </div>
                    </div>

                    {showWatermark && (
                      <span className="text-[10px] text-white/40 tracking-wider uppercase font-semibold">
                        SocialPulse
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="w-full mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleExportCanvas}
                  disabled={isExporting}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  {isExporting ? "Rendering..." : "Download High-Res PNG"}
                </button>

                <button
                  onClick={() => handleCopyText(`${headline}\n\n${bodyText}\n\n— ${authorName} (${brandHandle})`, "Quote text copied!")}
                  className="py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm transition flex items-center justify-center gap-2"
                >
                  <Copy size={16} /> Copy Text
                </button>
              </div>

              {/* POST SCHEDULER DIRECT LINK */}
              <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 flex items-center justify-between w-full">
                <span>Created your graphic? Head to your Brands workspace to schedule it!</span>
                <Link
                  to="/brands"
                  className="font-bold text-blue-700 hover:underline flex items-center gap-1"
                >
                  Go to Brands <ArrowRight size={14} />
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: SOCIAL MEDIA DIMENSIONS CHEATSHEET
         ========================================================= */}
      {activeTab === "dimensions" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Official Social Media Dimension Cheat Sheet (2026)</h3>
              <p className="text-xs text-gray-500 mt-1">
                Zero blurry graphics. Exact pixel dimensions and aspect ratios for all major social networks with 1-click Canva & Adobe Express launch.
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href="https://www.canva.com/create/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow"
              >
                <SiCanva size={14} /> Open Canva Custom Size
              </a>
              <a
                href="https://www.adobe.com/express/feature/image/resize"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow"
              >
                <AdobeIcon size={14} /> Adobe Resizer
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIMENSIONS_DATA.map((platform) => {
              const Icon = platform.icon;
              return (
                <GlassCard key={platform.platform} className="p-6 flex flex-col justify-between border border-gray-200">
                  <div>
                    {/* PLATFORM HEADER */}
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                      <div className="flex items-center gap-2.5">
                        <Icon className={platform.color} size={24} />
                        <h4 className="text-lg font-bold text-gray-900">{platform.platform}</h4>
                      </div>
                      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        Guidelines
                      </span>
                    </div>

                    {/* PRESETS LIST */}
                    <div className="space-y-3">
                      {platform.presets.map((preset, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50/50 border border-gray-100 transition flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-gray-900">{preset.name}</div>
                            <div className="text-[11px] text-gray-500 mt-0.5">{preset.note}</div>
                          </div>
                          <div className="text-right">
                            <button
                              onClick={() => handleCopyText(preset.size, `Copied ${preset.size}`)}
                              className="text-xs font-mono font-bold text-blue-600 bg-blue-100/60 hover:bg-blue-200 px-2 py-1 rounded transition flex items-center gap-1"
                              title="Click to copy dimension"
                            >
                              {preset.size}
                              <Copy size={10} />
                            </button>
                            <span className="text-[10px] text-gray-400 block mt-0.5">{preset.ratio}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* LAUNCH LINKS */}
                  <div className="mt-6 pt-3 border-t border-gray-100 flex gap-2">
                    <a
                      href={platform.canvaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 px-3 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-xs font-semibold transition flex items-center justify-center gap-1"
                    >
                      <SiCanva size={12} /> Canva
                    </a>
                    <a
                      href={platform.adobeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-800 text-xs font-semibold transition flex items-center justify-center gap-1"
                    >
                      <AdobeIcon size={12} /> Adobe
                    </a>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: AI DESIGN PROMPTS GENERATOR
         ========================================================= */}
      {activeTab === "prompts" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="p-6 space-y-5">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="text-purple-600" size={20} />
                AI Creative Prompt Studio
              </h3>
              <p className="text-xs text-gray-500">
                Generate prompt formulas for <strong className="text-gray-800">Midjourney, Adobe Firefly, DALL-E 3, and Canva Magic Media</strong>.
              </p>

              <div>
                <label className="form-label text-xs">Target Industry / Niche</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="select-field text-xs py-2.5"
                >
                  {PROMPT_NICHES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label text-xs">Campaign Goal / Format</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="select-field text-xs py-2.5"
                >
                  {PROMPT_GOALS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label text-xs">Visual Vibe & Aesthetic</label>
                <select
                  value={aesthetic}
                  onChange={(e) => setAesthetic(e.target.value)}
                  className="select-field text-xs py-2.5"
                >
                  {PROMPT_AESTHETICS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="p-6 space-y-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-indigo-500/30">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-400" /> Generated AI Prompt
                </span>
                <span className="text-[11px] bg-purple-500/20 text-purple-200 px-2.5 py-1 rounded-full border border-purple-400/30">
                  Ready for Firefly & Midjourney
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-sm leading-relaxed text-gray-200 font-mono select-all">
                {generatedAiPrompt}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    handleCopyText(generatedAiPrompt, "Prompt copied to clipboard!");
                    setCopiedPrompt(true);
                    setTimeout(() => setCopiedPrompt(false), 2500);
                  }}
                  className="py-2.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2"
                >
                  {copiedPrompt ? <Check size={16} /> : <Copy size={16} />}
                  {copiedPrompt ? "Copied!" : "Copy AI Prompt"}
                </button>

                <a
                  href="https://firefly.adobe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition flex items-center gap-1.5"
                >
                  <AdobeIcon size={14} /> Open Adobe Firefly <ExternalLink size={12} />
                </a>

                <a
                  href="https://www.canva.com/ai-image-generator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition flex items-center gap-1.5"
                >
                  <SiCanva size={14} /> Open Canva Magic Media <ExternalLink size={12} />
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: TRENDY COLOR PALETTES
         ========================================================= */}
      {activeTab === "palettes" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900">Curated Social Media Color Palettes</h3>
            <p className="text-xs text-gray-500 mt-1">
              Click any color swatch to copy its HEX code directly for Canva, Adobe Illustrator, or Figma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLOR_PALETTES.map((palette, idx) => (
              <GlassCard key={idx} className="p-5 border border-gray-200 space-y-4">
                <h4 className="text-sm font-bold text-gray-900">{palette.name}</h4>
                <div className="grid grid-cols-4 gap-2 h-16 rounded-xl overflow-hidden border border-gray-200 p-1 bg-white">
                  {palette.colors.map((hex, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleCopyText(hex, `Copied ${hex}`)}
                      style={{ backgroundColor: hex }}
                      className="h-full rounded-lg transition transform hover:scale-105 active:scale-95 shadow-inner relative group"
                      title={`Click to copy ${hex}`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 text-[10px] font-mono font-bold text-white bg-black/70 px-1 py-0.5 rounded absolute inset-x-1 bottom-1 text-center transition">
                        {hex}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono text-gray-500">
                  {palette.colors.map((hex, cIdx) => (
                    <span
                      key={cIdx}
                      onClick={() => handleCopyText(hex, `Copied ${hex}`)}
                      className="cursor-pointer hover:text-blue-600"
                    >
                      {hex}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeYourDesign;
