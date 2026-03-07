import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Dock = ({ items, highlightedItem }) => {
  return (
    <div className="flex gap-4 p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl mb-4 relative z-[100]">
      {items.map((item) => {
        
        const isHighlighted = highlightedItem === item.id;

        return (
          <div key={item.label} className="relative group flex flex-col items-center">
            
            {/* --- THE PROMPT TOOLTIP --- */}
            <AnimatePresence>
              {isHighlighted && (
                <motion.div
                  // FIX: We moved x: "-50%" HERE so Framer doesn't delete it
                  initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                  exit={{ opacity: 0, x: "-50%", scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  
                  // REMOVED '-translate-x-1/2' from className because it conflicts with Framer
                  className="absolute bottom-full mb-3 left-1/2 whitespace-nowrap bg-white text-black px-3 py-1.5 rounded-lg text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.5)] pointer-events-none z-50"
                >
                  Press Here!
                  {/* Arrow */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* --- DOCK ICON --- */}
            <motion.button
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={item.onClick}
              animate={isHighlighted ? { 
                y: [0, -15, 0], 
                boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 30px rgba(59, 130, 246, 0.8)", "0px 0px 0px rgba(0,0,0,0)"]
              } : {}}
              transition={isHighlighted ? { 
                duration: 1, 
                repeat: Infinity,
                repeatType: "reverse" 
              } : { type: "spring", stiffness: 300 }}
              className={`p-3 rounded-xl transition-colors relative ${
                isHighlighted 
                  ? 'bg-blue-500/20 border border-blue-500 text-white' 
                  : 'bg-white/5 border border-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              
              {/* Active Dot */}
              {item.isOpen && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
              )}
            </motion.button>
            
            {/* Standard Hover Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Dock;