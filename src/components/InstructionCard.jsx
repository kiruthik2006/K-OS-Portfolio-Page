import React from "react";
import { motion } from "framer-motion"; // Import Motion
import { Info, Folder, Terminal, Mail, Command } from "lucide-react";

const InstructionCard = ({ onHighlight }) => {
  return (
    <motion.div
      // --- HOVER ANIMATION (Rotate slightly towards center) ---
      whileHover={{
        scale: 1.03,
        rotateY: -2,
        borderColor: "rgba(255, 255, 255, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      // --------------------------------------------------------
      className="w-[360px] h-[540px] min-w-[360px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 text-left flex flex-col shadow-2xl relative overflow-hidden group"
    >
      {/* Decorative Orb */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-blue-500/30 transition-colors duration-500"></div>

      {/* --- HEADER --- */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-blue-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
          <Info size={18} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">
            System Guide
          </h3>
          <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
            Kiruthik OS v1.0
          </span>
        </div>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar relative z-10 flex-1">
        {/* 1. THE "YAP" */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-[10px] uppercase tracking-widest opacity-80 border-b border-white/10 pb-2 flex items-center gap-2">
            <Command size={10} /> /usr/readme.md
          </h4>

          <div className="relative">
            {/* Vertical Gradient Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent"></div>

            <div className="pl-3 space-y-3">
              <p className="text-gray-300 text-xs leading-5 font-light">
                Welcome to my digital workspace. I believe a portfolio shouldn't
                just <em className="text-white not-italic font-medium">list</em>{" "}
                skills—it should{" "}
                <em className="text-white not-italic font-medium">
                  demonstrate
                </em>{" "}
                them.
              </p>

              <p className="text-gray-400 text-xs leading-5 font-light">
                This simulated environment is built with <strong>React</strong>{" "}
                and <strong>Framer Motion</strong>, featuring a custom window
                manager and physics-based animations.
              </p>
            </div>
          </div>
        </div>

        {/* 2. NAVIGATION BUTTONS */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-[10px] uppercase tracking-widest opacity-80">
            Navigation
          </h4>

          <div className="grid gap-2">
            {/* FINDER */}
            <button
              onClick={() => onHighlight("projects")}
              className="group/btn flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all text-left w-full active:scale-95"
            >
              <div className="p-1.5 bg-blue-500/10 rounded-lg group-hover/btn:scale-110 transition-transform">
                <Folder size={14} className="text-blue-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Finder</span>
                <span className="text-[10px] text-gray-500">
                  Browse Projects
                </span>
              </div>
            </button>

            {/* TERMINAL */}
            <button
              onClick={() => onHighlight("skills")}
              className="group/btn flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-green-500/30 transition-all text-left w-full active:scale-95"
            >
              <div className="p-1.5 bg-green-500/10 rounded-lg group-hover/btn:scale-110 transition-transform">
                <Terminal size={14} className="text-green-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Terminal</span>
                <span className="text-[10px] text-gray-500">
                  Run Diagnostics
                </span>
              </div>
            </button>

            {/* MAIL */}
            <button
              onClick={() => onHighlight("contact")}
              className="group/btn flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all text-left w-full active:scale-95"
            >
              <div className="p-1.5 bg-purple-500/10 rounded-lg group-hover/btn:scale-110 transition-transform">
                <Mail size={14} className="text-purple-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Mail</span>
                <span className="text-[10px] text-gray-500">
                  Connect with Me
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
      `}</style>
    </motion.div>
  );
};

export default InstructionCard;
