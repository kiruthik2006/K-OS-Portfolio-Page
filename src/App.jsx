import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DotGrid from "@/components/LightRays";
import Dock from "@/components/Dock";
import ProfileCard from "@/components/ProfileCard";
import avatarImg from "@/assets/Ima.png";
import DesktopWindows from "@/components/DesktopWindows";
import { Home, Folder, Mail, Terminal, Gamepad2 } from "lucide-react";
import BootScreen from "@/components/BootScreen";
import AboutCard from "@/components/AboutCard";
import InstructionCard from "@/components/InstructionCard";
import MenuBar from "@/components/MenuBar";

export default function App() {
  const [hasBooted, setHasBooted] = useState(false);
  const [showUI, setShowUI] = useState(false);
  const [interactionReady, setInteractionReady] = useState(false);

  // FIX 1: Ensure this is empty [] to start with no windows open
  const [activeWindows, setActiveWindows] = useState([]);
  const [focusedWindow, setFocusedWindow] = useState(null);

  const [dockHighlight, setDockHighlight] = useState(null);

  useEffect(() => {
    if (hasBooted) {
      setTimeout(() => setShowUI(true), 100);
      setTimeout(() => setInteractionReady(true), 2500);
    }
  }, [hasBooted]);

  useEffect(() => {
    if (activeWindows.length > 0) {
      const lastWindow = activeWindows[activeWindows.length - 1];
      if (focusedWindow !== lastWindow) {
        setFocusedWindow(lastWindow);
      }
    }
  }, [activeWindows, focusedWindow]);

  const toggleWindow = (id) => {
    if (dockHighlight === id) setDockHighlight(null);

    if (activeWindows.includes(id)) {
      setFocusedWindow(id);
    } else {
      setActiveWindows((prev) => Array.from(new Set([...prev, id])));
      setFocusedWindow(id);
    }
  };

  const triggerDockHighlight = (id) => {
    setDockHighlight(id);
    setTimeout(() => setDockHighlight(null), 3000);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans selection:bg-blue-500/30">
      {/* 1. BOOT SCREEN */}
      <AnimatePresence mode="wait">
        {!hasBooted && (
          <div className="absolute inset-0 z-[9999]">
            <BootScreen onComplete={() => setHasBooted(true)} />
          </div>
        )}
      </AnimatePresence>

      {/* 2. BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <DotGrid />
      </div>

      {/* 3. MENU BAR */}
      {hasBooted && <MenuBar />}

      {/* 4. WINDOWS LAYER (Absolute top, allows clicks) */}
      <div className="absolute inset-0 pt-8 z-40 pointer-events-none">
        <DesktopWindows
          activeWindows={activeWindows}
          focusedWindow={focusedWindow}
          onFocus={setFocusedWindow}
          onClose={(id) =>
            setActiveWindows((prev) => prev.filter((w) => w !== id))
          }
          onOpenGame={(id) => toggleWindow(id)}
        />
      </div>

      {/* 5. MAIN INTERACTIVE DASHBOARD (The 3 Cards) */}
      <div
        className={`relative z-10 w-full h-full flex flex-col items-center justify-center transition-all duration-700 ease-out ${activeWindows.length > 0 ? "blur-lg scale-90 opacity-20 pointer-events-none" : "opacity-100 scale-100"}`}
      >
        {/* FIX 2: Responsive Scaling Wrapper. Shrinks on smaller screens to fit all 3 cards. */}
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none scale-[0.65] md:scale-[0.8] lg:scale-100 transition-transform duration-500">
          {/* Cluster BG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            animate={
              showUI ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" } : {}
            }
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute left-1/2 top-1/2 z-0 w-[1200px] h-[640px] bg-white/[0.02] border border-white/[0.05] rounded-[50px] backdrop-blur-sm hidden md:block"
          />

          {/* A. ABOUT CARD (Left) */}
          <motion.div
            initial={{
              x: 0,
              opacity: 0,
              scale: 0.9,
              rotateY: -10,
              filter: "blur(10px)",
            }}
            // FIX 3: Reduced spacing from -460 to -380 to fit on laptops
            animate={
              showUI
                ? {
                    x: -380,
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    filter: "blur(0px)",
                  }
                : {}
            }
            transition={{
              delay: 1.4,
              duration: 1.2,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="absolute z-20 hidden md:block pointer-events-auto"
          >
            <AboutCard />
          </motion.div>

          {/* B. PROFILE CARD (Center) */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 50, filter: "blur(20px)" }}
            animate={
              showUI ? { scale: 1, opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{
              duration: 1.5,
              type: "spring",
              stiffness: 120,
              damping: 15,
              delay: 0.2,
            }}
            className="absolute z-30 pointer-events-auto"
          >
            <div className="relative">
              <ProfileCard
                name="Kiruthik.K"
                title="Software Engineer"
                handle="Kiruthik_2006"
                status="Online"
                contactText="Contact Me"
                avatarUrl={avatarImg}
                showUserInfo={true}
                enableTilt={interactionReady}
                enableMobileTilt={false}
                onContactClick={() => toggleWindow("contact")}
              />
            </div>
          </motion.div>

          {/* C. INSTRUCTION CARD (Right) */}
          <motion.div
            initial={{
              x: 0,
              opacity: 0,
              scale: 0.9,
              rotateY: 10,
              filter: "blur(10px)",
            }}
            // FIX 3: Reduced spacing from 460 to 380
            animate={
              showUI
                ? {
                    x: 380,
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    filter: "blur(0px)",
                  }
                : {}
            }
            transition={{
              delay: 1.6,
              duration: 1.2,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="absolute z-10 hidden md:block pointer-events-auto"
          >
            <InstructionCard onHighlight={triggerDockHighlight} />
          </motion.div>
        </div>
      </div>

      {/* 6. DOCK */}
      <div className="absolute bottom-6 w-full flex justify-center z-[100]">
        <Dock
          highlightedItem={dockHighlight}
          items={[
            {
              id: "home",
              label: "Home",
              icon: <Home />,
              onClick: () => setActiveWindows([]),
            },
            {
              id: "projects",
              label: "Projects",
              icon: (
                <Folder
                  className={
                    activeWindows.includes("projects") ? "text-blue-400" : ""
                  }
                />
              ),
              isOpen: activeWindows.includes("projects"),
              onClick: () => toggleWindow("projects"),
            },
            {
              id: "skills",
              label: "Terminal",
              icon: (
                <Terminal
                  className={
                    activeWindows.includes("skills") ? "text-green-400" : ""
                  }
                />
              ),
              isOpen: activeWindows.includes("skills"),
              onClick: () => toggleWindow("skills"),
            },
            {
              id: "contact",
              label: "Contact",
              icon: (
                <Mail
                  className={
                    activeWindows.includes("contact") ? "text-blue-400" : ""
                  }
                />
              ),
              isOpen: activeWindows.includes("contact"),
              onClick: () => toggleWindow("contact"),
            },
            {
              id: "games",
              label: "Games",
              // Green icon when active
              icon: (
                <Gamepad2
                  className={
                    activeWindows.includes("games") ? "text-green-400" : ""
                  }
                />
              ),
              isOpen: activeWindows.includes("games"),
              onClick: () => toggleWindow("games"),
            },
          ]}
        />
      </div>
    </div>
  );
}
