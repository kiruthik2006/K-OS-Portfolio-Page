import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, Search, Command } from 'lucide-react';

const MenuBar = () => {
  const [time, setTime] = useState(new Date());

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Time (e.g., "10:20 PM")
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Format Date (e.g., "Fri Dec 26")
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-9 bg-black border-b border-white/10 flex items-center justify-between px-4 z-[500] text-xs font-medium text-white select-none shadow-2xl">
      
      {/* LEFT SIDE: Brand Identity Only */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/5 hover:bg-white/20 transition-colors cursor-pointer group">
          <Command size={12} className="text-blue-400 group-hover:text-white transition-colors" />
          <span className="font-bold tracking-wider text-[10px] text-gray-200 group-hover:text-white">KIRUTHIK OS</span>
        </div>
      </div>

      {/* RIGHT SIDE: Status Icons */}
      <div className="flex items-center gap-5">
        
        {/* Control Center Group */}
        <div className="flex items-center gap-3 text-gray-400">
           <div className="hover:text-white transition-colors cursor-pointer">
             <Wifi size={14} />
           </div>
           <div className="hover:text-white transition-colors cursor-pointer">
             <Volume2 size={14} />
           </div>
           <div className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
             <Battery size={14} />
             {/* Battery level only shows on larger screens to save space */}
             <span className="hidden sm:inline text-[10px] font-mono">100%</span>
           </div>
        </div>

        {/* Separator Line */}
        <div className="w-[1px] h-4 bg-white/10"></div>

        {/* Search Icon */}
        <div className="hover:text-white text-gray-400 transition-colors cursor-pointer">
           <Search size={14} />
        </div>

        {/* Clock & Date */}
        <div className="flex items-center gap-2 cursor-default pl-2">
           <span className="hidden sm:inline text-gray-400 font-medium">{formatDate(time)}</span>
           <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded-md">{formatTime(time)}</span>
        </div>

      </div>
    </div>
  );
};

export default MenuBar;