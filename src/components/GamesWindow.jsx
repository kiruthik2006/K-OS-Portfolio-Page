import React from "react";
import { Box, Gamepad2, Info, Grid } from "lucide-react"; // Changed Skull to Grid

const GamesWindow = ({ onLaunchGame }) => {
  return (
    <div className="w-full h-full bg-[#0d0d0d] flex flex-col text-white font-sans selection:bg-yellow-500/30">
      {/* Header */}
      <div className="flex-none p-6 border-b border-white/5 bg-gradient-to-r from-green-900/10 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl border-2 border-white/10 p-1 bg-white/5 flex items-center justify-center shadow-lg shadow-green-900/20">
            <Gamepad2 size={32} className="text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Game Library
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                ONLINE
              </span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Explore and play web-based classics.
            </p>
          </div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#0a0a0a]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* GAME 1: MINECRAFT */}
          <button
            onClick={() => onLaunchGame("minecraft")}
            className="group relative flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-green-500/50 transition-all active:scale-95 text-left"
          >
            <div className="w-full aspect-square bg-green-800 rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg group-hover:shadow-green-500/20 transition-shadow">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent"></div>
              <Box
                size={40}
                className="text-white drop-shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  PLAY NOW
                </span>
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-sm font-bold text-gray-200 group-hover:text-green-300 transition-colors">
                Minecraft Classic
              </h3>
              <p className="text-[10px] text-gray-500 mt-0.5">Mojang Studios</p>
            </div>
          </button>

          {/* GAME 2: 2048 (REPLACED DOOM) */}
          <button
            onClick={() => onLaunchGame("2048")}
            className="group relative flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-yellow-500/50 transition-all active:scale-95 text-left"
          >
            <div className="w-full aspect-square bg-yellow-600/20 rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg group-hover:shadow-yellow-500/20 transition-shadow">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent"></div>
              <Grid
                size={40}
                className="text-yellow-400 drop-shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  SOLVE IT
                </span>
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-sm font-bold text-gray-200 group-hover:text-yellow-400 transition-colors">
                2048
              </h3>
              <p className="text-[10px] text-gray-500 mt-0.5">
                Gabriele Cirulli
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-white/5 bg-[#111] text-center">
        <p className="text-[10px] text-gray-600 font-mono flex items-center justify-center gap-2">
          <Info size={10} /> Games run in isolated sandboxes.
        </p>
      </div>
    </div>
  );
};

export default GamesWindow;
