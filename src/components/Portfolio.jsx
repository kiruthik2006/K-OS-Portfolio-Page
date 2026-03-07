import React, { useState } from 'react';
import Draggable from 'react-draggable'; // npm install react-draggable
import { motion, AnimatePresence } from 'framer-motion'; // npm install framer-motion
import { Terminal, Folder, Mail, X, Minus, Maximize2 } from 'lucide-react';

// Import your components
import FinderWindow from './FinderWindow';
import TerminalWindow from './TerminalWindow';

// 1. The Generic "Window Frame" Component (Draggable Shell)
const WindowFrame = ({ title, children, onClose, isActive, onClick, minWidth = "w-[800px]", minHeight = "h-[500px]" }) => {
  return (
    <Draggable handle=".window-header" onMouseDown={onClick}>
      <div 
        className={`absolute top-20 left-10 ${minWidth} ${minHeight} rounded-xl shadow-2xl overflow-hidden border border-white/10 bg-[#1e1e1e] flex flex-col transition-shadow duration-200 ${isActive ? 'z-50 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'z-40 opacity-90'}`}
      >
        {/* Window Header (The handle for dragging) */}
        <div className="window-header h-8 bg-[#2d2d2d] border-b border-black/50 flex items-center justify-between px-4 cursor-default">
          <div className="flex gap-2 group">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E] hover:bg-red-700 flex items-center justify-center">
              <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24] hover:bg-yellow-600 flex items-center justify-center">
              <Minus size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29] hover:bg-green-600 flex items-center justify-center">
              <Maximize2 size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
          <span className="text-xs font-medium text-gray-400">{title}</span>
          <div className="w-14"></div> {/* Spacer for centering */}
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </div>
    </Draggable>
  );
};

// 2. The Main Desktop Component
const Portfolio = () => {
  const [activeWindows, setActiveWindows] = useState([]); // Tracks all open windows
  const [focusedWindow, setFocusedWindow] = useState(null); // Tracks which window is on top

  // Logic to open/focus windows
  const openWindow = (id) => {
    if (!activeWindows.includes(id)) {
      setActiveWindows([...activeWindows, id]);
    }
    setFocusedWindow(id);
  };

  const closeWindow = (id) => {
    setActiveWindows(activeWindows.filter(w => w !== id));
    if (focusedWindow === id) {
      setFocusedWindow(activeWindows[activeWindows.length - 2] || null);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-cover bg-center font-sans text-white" 
         style={{ backgroundImage: `url('/path-to-your-wallpaper.jpg')` }}>
      
      {/* A. Top Menu Bar */}
      <div className="absolute top-0 w-full h-8 bg-black/20 backdrop-blur-xl flex items-center justify-between px-5 z-[100] text-xs font-medium border-b border-white/5">
        <div className="flex items-center gap-4">
          <span className="text-base"></span>
          <span className="font-bold">Kiruthik.K</span>
          <span className="hidden sm:block opacity-80">File</span>
          <span className="hidden sm:block opacity-80">View</span>
          <span className="hidden sm:block opacity-80">Go</span>
          <span className="hidden sm:block opacity-80">Window</span>
          <span className="hidden sm:block opacity-80">Help</span>
        </div>
        <div className="flex items-center gap-4 opacity-90">
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* B. The "Desktop Area" (Windows go here) */}
      <div className="absolute inset-0 top-8 bottom-24 p-4">
        
        {/* Your Original Profile Card (Optional: Keep it as a desktop widget) */}
        {!activeWindows.length && (
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              {/* Insert your existing Profile Card component here */}
              <h1 className="text-4xl font-bold drop-shadow-lg">Kiruthik.K</h1>
              <p className="text-gray-300">Select an app to begin</p>
           </div>
        )}

        {/* Finder Window */}
        <AnimatePresence>
          {activeWindows.includes('finder') && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <WindowFrame 
                title="Portfolio — Finder" 
                isActive={focusedWindow === 'finder'}
                onClick={() => setFocusedWindow('finder')}
                onClose={() => closeWindow('finder')}
              >
                <FinderWindow />
              </WindowFrame>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terminal Window */}
        <AnimatePresence>
          {activeWindows.includes('terminal') && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
               <WindowFrame 
                title="kiurthik — -zsh — 80x24" 
                isActive={focusedWindow === 'terminal'}
                onClick={() => setFocusedWindow('terminal')}
                onClose={() => closeWindow('terminal')}
                minWidth="w-[600px]"
              >
                <TerminalWindow />
              </WindowFrame>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* C. The Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100]">
        <div className="flex items-end gap-3 px-4 py-3 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl transition-all hover:scale-105">
          
          {/* Finder Icon */}
          <DockItem 
            label="Finder" 
            isOpen={activeWindows.includes('finder')} 
            onClick={() => openWindow('finder')}
          >
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-b from-blue-400 to-blue-600">
               <span className="text-2xl">☺︎</span>
            </div>
          </DockItem>

          {/* Terminal Icon */}
          <DockItem 
            label="Terminal" 
            isOpen={activeWindows.includes('terminal')} 
            onClick={() => openWindow('terminal')}
          >
             <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-700">
               <span className="text-green-500 font-mono font-bold text-xs">_&gt;</span>
            </div>
          </DockItem>

           {/* Mail Icon (Placeholder) */}
           <DockItem label="Contact" onClick={() => window.location.href = 'mailto:kiruthikk911@gmail.com'}>
             <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-b from-blue-300 to-blue-500">
               <Mail className="text-white" size={24} />
            </div>
          </DockItem>

        </div>
      </div>
    </div>
  );
};

// Helper: Dock Item Component
const DockItem = ({ children, label, isOpen, onClick }) => (
  <div className="group relative flex flex-col items-center gap-1 cursor-pointer transition-transform hover:-translate-y-2 active:scale-95" onClick={onClick}>
    {/* Tooltip */}
    <span className="absolute -top-10 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
      {label}
    </span>
    {children}
    {/* Active Dot indicator */}
    <div className={`w-1 h-1 rounded-full bg-white/80 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
  </div>
);

export default Portfolio;