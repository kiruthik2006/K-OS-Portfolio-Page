import React from "react";
import { User, Code, Heart, Trophy, MapPin } from "lucide-react";

const AboutWindow = () => {
  return (
    <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex flex-col font-sans text-white">
      {/* --- BACKGROUND EFFECTS (Matching InfoCard) --- */}
      {/* Purple Orb Top-Right */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
      {/* Blue Orb Bottom-Left */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="flex-1 overflow-y-auto p-6 relative z-10 custom-scrollbar">
        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full border-2 border-white/10 bg-white/5 shadow-2xl mb-4 overflow-hidden relative group">
            {/* Ensure you import your image or use a placeholder */}
            <img
              src="/src/assets/Ima.png"
              alt="Kiruthik"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Kiruthik.K</h2>
          <div className="flex items-center gap-2 text-xs text-blue-400 mt-1 font-medium bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
            <MapPin size={10} />
            <span>Tiruppur, India</span>
          </div>
        </div>

        {/* BIO SECTION */}
        <div className="space-y-6">
          {/* Intro */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <User size={12} /> <span>Who I Am</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-light border-l-2 border-white/10 pl-3">
              I am a{" "}
              <span className="text-white font-medium">
                Computer Science & Data Analytics Scholar
              </span>{" "}
              with a passion for building scalable applications and exploring
              AI. I love solving complex problems, from winning hackathons to
              rooting Android kernels.
            </p>
          </div>

          {/* What I Do */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <Code size={12} /> <span>Tech Arsenal</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Java",
                "Python",
                "React.js",
                "TensorFlow",
                "MediaPipe",
                "SQL",
                "C++",
                "Docker",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] text-gray-300 hover:bg-white/10 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <Trophy size={12} /> <span>Highlights</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="p-3 bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-xl flex items-start gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                  <Trophy size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    Winner - Fixit 24Hr Hackathon
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Developed an auto-parking IoT system.
                  </p>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-xl flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Code size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    Winner - Bit Buddies
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    1st place in internal coding competition.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-mono">
              <Heart size={10} />{" "}
              <span>Loves: Photography, Chess, Blender 3D</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
};

export default AboutWindow;
