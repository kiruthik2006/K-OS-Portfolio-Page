import React from "react";
import { motion } from "framer-motion";
// UNCOMMENTED Terminal
import Terminal from "./TerminalWindow";
import ProjectsWindow from "./ProjectsWindow";
import GamesWindow from "./GamesWindow";
import ContactWindow from "./ContactWindow"; // ✅ IMPORT THIS

const WindowFrame = ({
  title,
  children,
  onClose,
  isActive,
  onClick,
  minWidth = "w-[600px] h-[400px]",
}) => (
  <div
    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${minWidth} bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col ${isActive ? "z-50 ring-1 ring-white/20" : "z-40 opacity-90"}`}
    onClick={onClick}
  >
    <div className="h-9 bg-[#111] border-b border-white/5 flex items-center justify-between px-3 select-none">
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
        />
        <button className="w-3 h-3 rounded-full bg-yellow-500" />
        <button className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-xs font-mono text-gray-400">{title}</span>
      <div className="w-10"></div>
    </div>
    <div className="flex-1 relative overflow-hidden">{children}</div>
  </div>
);

const DesktopWindows = ({
  activeWindows,
  focusedWindow,
  onFocus,
  onClose,
  onOpenGame,
}) => {
  return (
    <>
      {/* 1. FINDER (Projects) */}
      {activeWindows.includes("projects") && (
        <motion.div
          drag
          dragMomentum={false}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <WindowFrame
              title="~/finder"
              isActive={focusedWindow === "projects"}
              onClick={() => onFocus("projects")}
              onClose={() => onClose("projects")}
              minWidth="w-[700px] h-[450px]"
            >
              <ProjectsWindow onLaunchGame={onOpenGame} />
            </WindowFrame>
          </div>
        </motion.div>
      )}

      {/* 2. MINECRAFT WINDOW */}
      {activeWindows.includes("minecraft") && (
        <motion.div
          drag
          dragMomentum={false}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <WindowFrame
              title="Minecraft Classic (Web)"
              isActive={focusedWindow === "minecraft"}
              onClick={() => onFocus("minecraft")}
              onClose={() => onClose("minecraft")}
              minWidth="w-[800px] h-[600px]"
            >
              <iframe
                src="https://classic.minecraft.net/"
                className="w-full h-full border-none bg-black"
                title="Minecraft"
              />
            </WindowFrame>
          </div>
        </motion.div>
      )}

      {/* 3. TERMINAL WINDOW */}
      {activeWindows.includes("skills") && (
        <motion.div
          drag
          dragMomentum={false}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <WindowFrame
              title="root@kiruthik-os:~"
              isActive={focusedWindow === "skills"}
              onClick={() => onFocus("skills")}
              onClose={() => onClose("skills")}
            >
              <Terminal />
            </WindowFrame>
          </div>
        </motion.div>
      )}

      {/* 4. CONTACT/MAIL WINDOW (UPDATED) */}
      {activeWindows.includes("contact") && (
        <motion.div
          drag
          dragMomentum={false}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <WindowFrame
              title="Compose Message"
              isActive={focusedWindow === "contact"}
              onClick={() => onFocus("contact")}
              onClose={() => onClose("contact")}
              minWidth="w-[600px] h-[500px]"
            >
              {/* ✅ Replaced placeholder with real component */}
              <ContactWindow />
            </WindowFrame>
          </div>
        </motion.div>
      )}
      {/* 5. GAMES FOLDER WINDOW */}
      {activeWindows.includes("games") && (
        <motion.div
          drag
          dragMomentum={false}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <WindowFrame
              title="~/games"
              isActive={focusedWindow === "games"}
              onClick={() => onFocus("games")}
              onClose={() => onClose("games")}
              minWidth="w-[700px] h-[500px]"
            >
              {/* Pass the onOpenGame function so clicking Minecraft opens the game window */}
              <GamesWindow onLaunchGame={onOpenGame} />
            </WindowFrame>
          </div>
        </motion.div>
      )}
      {/* 3. 2048 WINDOW */}
      {activeWindows.includes("2048") && (
        <motion.div
          drag
          dragMomentum={false}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <WindowFrame
              title="2048"
              isActive={focusedWindow === "2048"}
              onClick={() => onFocus("2048")}
              onClose={() => onClose("2048")}
              minWidth="w-[500px] h-[650px]"
            >
              {/* CHANGED URL: The original GitHub version allows embedding */}
              <iframe
                src="https://gabrielecirulli.github.io/2048/"
                className="w-full h-full border-none bg-white"
                title="2048"
              />
            </WindowFrame>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default DesktopWindows;
