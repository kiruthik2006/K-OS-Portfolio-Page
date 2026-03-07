import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Initializing Kiruthik OS kernel...' },
    { type: 'system', content: 'Loading shell environment v1.0...' },
    { type: 'success', content: 'Access Granted. Type "help" for commands.' },
    { type: 'break', content: '' }
  ]);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep focus on input
  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page reload
    
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    // Handle Clear
    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    // Logic
    let outputLines = [];
    switch (cmd) {
      case 'help':
        outputLines = [
          { type: 'info', content: 'Available Commands:' },
          { type: 'output', content: '  about     - Who am I?' },
          { type: 'output', content: '  projects  - View my work' },
          { type: 'output', content: '  skills    - Technical stack' },
          { type: 'output', content: '  contact   - Get in touch' },
          { type: 'output', content: '  clear     - Clean terminal' },
        ];
        break;
      case 'about':
        outputLines = [
           { type: 'output', content: 'Kiruthik.K // Software Engineer' },
           { type: 'output', content: 'Specializing in Java, Python, and Full Stack Development.' },
        ];
        break;
      case 'skills':
        outputLines = [
          { type: 'success', content: 'Frontend: React, Tailwind, Framer Motion' },
          { type: 'success', content: 'Backend:  Node.js, Java, Python' },
          { type: 'success', content: 'AI/ML:    TensorFlow, OpenCV, MediaPipe' },
        ];
        break;
      case 'projects':
        outputLines = [
          { type: 'info', content: 'Fetching repositories...' },
          { type: 'output', content: '1. Auto-Parking IoT System' },
          { type: 'output', content: '2. Blue Carbon Registry (Blockchain)' },
          { type: 'output', content: '3. Kiruthik OS (You are here)' },
        ];
        break;
      case 'contact':
        outputLines = [
          { type: 'output', content: 'Email: kiruthik@example.com' },
          { type: 'output', content: 'GitHub: @Kiruthik_2006' },
        ];
        break;
      default:
        outputLines = [
          { type: 'error', content: `Command not found: ${cmd}` },
          { type: 'output', content: 'Type "help" for a list of commands.' }
        ];
    }

    setHistory(prev => [
      ...prev, 
      { type: 'command', content: cmd },
      ...outputLines
    ]);
    
    setInput('');
  };

  return (
    <div 
      className="w-full h-full bg-[#0a0a0a] font-mono text-sm p-4 overflow-hidden flex flex-col cursor-text" 
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
        {history.map((line, i) => (
          <div key={i} className={`${
            line.type === 'command' ? 'text-white font-bold mt-3 mb-1' :
            line.type === 'error' ? 'text-red-400' :
            line.type === 'success' ? 'text-green-400' :
            line.type === 'info' ? 'text-blue-400' :
            line.type === 'system' ? 'text-gray-500 italic' :
            'text-gray-300'
          }`}>
            {line.type === 'command' ? (
              <span className="flex gap-2">
                <span className="text-green-500">➜</span>
                <span className="text-blue-500">~</span>
                {line.content}
              </span>
            ) : (
              <span>{line.content}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2 text-white">
        <span className="text-green-500">➜</span>
        <span className="text-blue-500">~</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 font-mono text-white caret-white"
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
        {/* Invisible submit button to handle Enter key natively */}
        <button type="submit" className="hidden" />
      </form>
      
       <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default Terminal;