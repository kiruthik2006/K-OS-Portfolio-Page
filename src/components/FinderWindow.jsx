import React, { useState } from 'react';
import { finderItems } from '../data/portfolioData';
import { Folder, FileText, Image as ImageIcon, Github } from 'lucide-react';

const FinderWindow = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('All');

  const filteredItems = filter === 'All' 
    ? finderItems 
    : finderItems.filter(item => item.tag.includes(filter) || item.type === filter);

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-white font-sans">
      {/* Finder Toolbar */}
      <div className="h-10 bg-[#2d2d2d] flex items-center justify-between px-4 border-b border-black/50">
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
          <span className="font-semibold text-xs text-gray-300">Portfolio</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-40 bg-[#252525]/90 backdrop-blur-md border-r border-black/50 p-3 flex flex-col gap-4 text-xs text-gray-400 font-medium">
          <div>
            <span className="pl-2 text-[10px] uppercase tracking-wider opacity-50">Favorites</span>
            <ul className="mt-2 space-y-1">
              {['All', 'Applications', 'Course'].map((item) => (
                <li 
                  key={item}
                  onClick={() => setFilter(item === 'Applications' ? 'React' : item)}
                  className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${filter === (item === 'Applications' ? 'React' : item) ? 'bg-blue-600 text-white' : 'hover:bg-white/5'}`}
                >
                  <span className={`w-3 h-3 rounded ${item === 'Applications' ? 'bg-blue-400' : 'bg-gray-400'}`}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 bg-[#1e1e1e] p-4 overflow-y-auto">
          <div className="grid grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`flex flex-col items-center gap-2 p-2 rounded border ${selectedItem?.id === item.id ? 'bg-[#2a2d40] border-blue-500/50' : 'border-transparent hover:bg-white/5'} cursor-pointer`}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  {item.type === 'folder' ? <Folder size={48} fill="#60a5fa" className="text-blue-400" /> : 
                   item.type === 'image' ? <ImageIcon size={48} className="text-purple-400" /> :
                   <FileText size={48} className="text-gray-400" />}
                </div>
                <span className={`text-[11px] text-center px-1.5 py-0.5 rounded leading-tight ${selectedItem?.id === item.id ? 'bg-blue-600 text-white' : 'text-gray-300'}`}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Preview Pane */}
        {selectedItem && (
          <div className="w-56 bg-[#252525] border-l border-black/50 p-4 flex flex-col items-center text-center animate-in slide-in-from-right duration-200">
            <div className="w-20 h-20 bg-white/5 rounded-xl flex items-center justify-center mb-3 shadow-lg">
               {selectedItem.type === 'folder' ? <Folder size={40} className="text-blue-400" /> : <FileText size={40} className="text-gray-400" />}
            </div>
            
            <h3 className="text-sm font-bold text-white mb-1">{selectedItem.title}</h3>
            <p className="text-[10px] text-gray-500 mb-3">{selectedItem.tag}</p>
            
            <div className="w-full h-[1px] bg-white/10 mb-3"></div>
            
            <div className="text-left w-full space-y-3">
              <div>
                <span className="text-[9px] uppercase text-gray-500 font-bold">Description</span>
                <p className="text-[11px] text-gray-300 mt-1 leading-snug">
                  {selectedItem.desc}
                </p>
              </div>

              <div>
                <span className="text-[9px] uppercase text-gray-500 font-bold">Tech Stack</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedItem.tech.map(t => (
                    <span key={t} className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinderWindow;