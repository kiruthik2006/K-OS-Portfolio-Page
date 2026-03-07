import React from "react";
import { motion } from "framer-motion"; // Import Motion
import { User, Code, Trophy, Sparkles } from "lucide-react";

const AboutCard = () => {
  const skills = [
    "Java",
    "Python",
    "React",
    "TensorFlow",
    "OpenCV",
    "SQL",
    "Docker",
    "Figma",
  ];

  return (
    <motion.div
      // --- HOVER ANIMATION ---
      whileHover={{
        scale: 1.03,
        rotateY: 2,
        borderColor: "rgba(255, 255, 255, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      // -----------------------
      className="w-[360px] h-[540px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[30px] p-8 text-left flex flex-col shadow-2xl relative overflow-hidden group cursor-default"
    >
      {/* --- DECORATIVE BACKGROUND --- */}
      {/* Purple Orb Top-Right */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-purple-500/30 transition-colors duration-500"></div>
      {/* Blue Orb Bottom-Left */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500"></div>

      {/* --- HEADER --- */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-purple-300 shadow-inner group-hover:scale-110 transition-transform duration-300">
          <User size={18} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">
            About Me
          </h3>
          <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
            Kiruthik.K // Dev
          </span>
        </div>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar relative z-10 flex-1">
        {/* BIO SECTION */}
        <div className="relative">
          {/* Accent Line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent"></div>
          <p className="text-gray-300 text-xs leading-relaxed pl-3 font-light">
            I am a{" "}
            <span className="text-white font-medium">
              CS & Data Analytics Scholar
            </span>{" "}
            building scalable apps and exploring AI. I specialize in solving
            complex problems, from{" "}
            <span className="text-blue-300">winning hackathons</span> to rooting
            Android kernels.
          </p>
        </div>

        {/* SKILLS SECTION */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            <Code size={10} /> <span>Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* HIGHLIGHTS SECTION */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            <Trophy size={10} /> <span>Highlights</span>
          </div>
          <div className="space-y-2">
            {/* Highlight 1 */}
            <div className="p-2.5 bg-gradient-to-r from-white/5 to-transparent border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/10 transition-colors group/item">
              <h4 className="text-[11px] font-bold text-white flex justify-between items-center">
                Fixit Hackathon
                <span className="text-yellow-400 text-[9px] border border-yellow-400/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Sparkles size={8} /> WINNER
                </span>
              </h4>
              <p className="text-[10px] text-gray-500 mt-1 group-hover/item:text-gray-300 transition-colors">
                Built an IoT Auto-Parking System.
              </p>
            </div>

            {/* Highlight 2 */}
            <div className="p-2.5 bg-gradient-to-r from-white/5 to-transparent border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/10 transition-colors group/item">
              <h4 className="text-[11px] font-bold text-white flex justify-between items-center">
                Bit Buddies
                <span className="text-blue-400 text-[9px] border border-blue-400/30 px-1.5 py-0.5 rounded">
                  1ST PLACE
                </span>
              </h4>
              <p className="text-[10px] text-gray-500 mt-1 group-hover/item:text-gray-300 transition-colors">
                Internal coding competition champion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SCROLLBAR STYLE --- */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
      `}</style>
    </motion.div>
  );
};

export default AboutCard;
