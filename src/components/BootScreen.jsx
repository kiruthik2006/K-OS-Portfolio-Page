import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Power, Cpu, ArrowRight, User } from "lucide-react";
import avatarImg from "@/assets/Ima_logo.png";
import Squares from "./Squares";

const BootScreen = ({ onComplete }) => {
  const [bootState, setBootState] = useState("off"); // 'off', 'booting', 'login'
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING_SYSTEM...");
  const [password, setPassword] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handlePowerOn = () => {
    setBootState("booting");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  // --- SCI-FI PROGRESS BAR LOGIC ---
  useEffect(() => {
    if (bootState === "booting") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setBootState("login"), 800);
            return 100;
          }
          const random = Math.random();
          if (random < 0.1) return prev;
          if (random < 0.05) return Math.min(prev + 15, 100);
          return Math.min(prev + Math.random() * 2, 100);
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [bootState]);

  // --- SCI-FI TEXT LOGIC ---
  useEffect(() => {
    if (progress > 0 && progress < 20) setStatusText("LOADING_KERNEL_V5.4...");
    else if (progress >= 20 && progress < 40)
      setStatusText("VERIFYING_FILESYSTEM_INTEGRITY...");
    else if (progress >= 40 && progress < 60)
      setStatusText("MOUNTING_USER_DATA...");
    else if (progress >= 60 && progress < 80)
      setStatusText("STARTING_GRAPHICAL_INTERFACE...");
    else if (progress >= 80 && progress < 100)
      setStatusText("ESTABLISHING_SECURE_CONNECTION...");
    else if (progress === 100) setStatusText("SYSTEM_READY");
  }, [progress]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black z-[9999] overflow-hidden font-mono text-white selection:bg-blue-500/30">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

      {bootState === "login" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 w-full h-full opacity-30">
            <Squares
              direction="diagonal"
              speed={0.5}
              borderColor="#333"
              squareSize={40}
              hoverFillColor="#222"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)] pointer-events-none"></div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {/* === PHASE 1: SCI-FI POWER BUTTON === */}
        {bootState === "off" && (
          <motion.div
            key="power-btn"
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center h-full gap-12 relative z-10"
          >
            <div className="text-center space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 select-none"
              >
                KIRUTHIK.OS
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 text-xs text-gray-500 tracking-[0.5em]"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                SYSTEM OFFLINE
              </motion.div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-8 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute -inset-16 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-50"></div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePowerOn}
                className="relative w-32 h-32 rounded-full border border-white/10 bg-black flex items-center justify-center cursor-pointer shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(59,130,246,0.5)] transition-all duration-500 group"
              >
                <div className="absolute inset-2 rounded-full bg-gradient-to-b from-gray-800 to-black border border-white/10 group-hover:border-blue-500/50 transition-colors"></div>
                <Power
                  size={40}
                  className="relative z-10 text-gray-500 group-hover:text-blue-400 transition-colors duration-300"
                />
              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1 }}
              className="absolute bottom-10 text-[10px] text-gray-600 font-mono"
            >
              SECURE BOOT ENABLED // V2.4.0
            </motion.p>
          </motion.div>
        )}

        {/* === PHASE 2: SCI-FI LOADING BIOS === */}
        {bootState === "booting" && (
          <motion.div
            key="boot-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full w-full max-w-xl mx-auto z-10 px-6"
          >
            <div className="mb-16 relative">
              <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div>
              <div className="relative w-32 h-32 bg-black border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                <Cpu size={48} className="text-white animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent h-[50%] animate-[scan_2s_linear_infinite]"></div>
              </div>
            </div>

            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs text-gray-400 font-mono">
                <span>{statusText}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-white relative shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
            </div>

            <div className="mt-8 h-24 w-full overflow-hidden relative opacity-50">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <div className="text-[10px] text-green-500/80 font-mono space-y-1">
                <p>&gt; checking_memory_banks... [OK]</p>
                <p>&gt; verifying_secure_boot_keys... [OK]</p>
                <p>&gt; loading_gpu_drivers... [OK]</p>
                <p>&gt; establishing_neural_link... [PENDING]</p>
                <p>&gt; mounting_drive_C... [OK]</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* === PHASE 3: ORIGINAL CLEAN LOGIN SCREEN === */}
        {bootState === "login" && (
          <motion.div
            key="login-screen"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="relative z-20 flex flex-col items-center justify-between h-full py-16"
          >
            <div className="flex-1"></div>

            <div className="flex flex-col items-center justify-center flex-[2]">
              {/* Silhouette Avatar */}
              <div className="relative mb-8 group">
                <div className="w-32 h-32 rounded-full p-1 border-2 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden relative z-10">
                  <img
                    src={avatarImg}
                    alt="User"
                    className="w-full h-full rounded-full object-cover
                                     opacity-80 group-hover:opacity-100 transition-all duration-500 scale-105
                                     grayscale brightness-[1.2] contrast-[1.2] sepia-[1] hue-rotate-[190deg] saturate-[2]"
                  />
                </div>
                {/* Ring */}
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md group-hover:blur-xl transition-all duration-500"></div>
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-[3px] border-black flex items-center justify-center z-20"></div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-8 tracking-wide drop-shadow-lg">
                Kiruthik.K
              </h2>

              {/* Original Input Style */}
              <form
                onSubmit={handleLogin}
                className="flex flex-col items-center gap-4 w-full max-w-xs"
              >
                <div className="relative group w-full flex justify-center">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 pr-12 py-2.5 text-sm text-center text-white placeholder-gray-500 focus:outline-none focus:border-white/20 focus:bg-white/10 w-56 transition-all duration-300 shadow-lg"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isLoginLoading}
                    className="absolute ml-[12.5rem] top-1/2 -translate-y-1/2 p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {isLoginLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <ArrowRight size={16} />
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="flex-1 flex flex-col justify-end pb-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
              <div className="flex gap-10">
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <Power size={16} />
                  </div>
                  <span className="text-[9px] tracking-widest uppercase">
                    Shut Down
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <User size={16} />
                  </div>
                  <span className="text-[9px] tracking-widest uppercase">
                    Guest
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
};

export default BootScreen;
