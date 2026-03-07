import React, { useState } from "react";
import { Send, X, Paperclip, Minimize2, Maximize2 } from "lucide-react";

const ContactWindow = () => {
  const [status, setStatus] = useState("idle"); // idle, sending, sent
  const [formData, setFormData] = useState({ subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate network request
    setTimeout(() => {
      setStatus("sent");
      // Reset after showing success
      setTimeout(() => {
        setStatus("idle");
        setFormData({ subject: "", message: "" });
      }, 3000);
    }, 1500);
  };

  const handleRealEmail = () => {
    window.location.href = `mailto:kiruthik2006@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
  };

  return (
    <div className="w-full h-full bg-[#0d0d0d] flex flex-col text-white font-sans">
      {/* Toolbar */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-white/5 bg-[#111]">
        <div className="flex gap-4 text-xs font-medium text-gray-400">
          <span className="hover:text-white cursor-pointer transition-colors">
            File
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            Edit
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            View
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            Insert
          </span>
        </div>
      </div>

      {/* Email Header */}
      <div className="px-6 py-4 space-y-3 border-b border-white/5 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-12 text-right">To:</span>
          <div className="flex-1 bg-white/5 px-3 py-1.5 rounded-md text-sm text-blue-300 font-mono border border-white/5">
            kiruthik2006@gmail.com
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-12 text-right">Cc:</span>
          <div className="flex-1 border-b border-white/5 pb-1"></div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-12 text-right">
            Subject:
          </span>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-600"
            placeholder="Project Inquiry..."
          />
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 p-6 relative">
        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full h-full bg-transparent border-none outline-none resize-none text-sm text-gray-300 placeholder-gray-700 font-mono leading-relaxed"
          placeholder="Hi Kiruthik, I saw your portfolio and..."
        />

        {/* Success Overlay */}
        {status === "sent" && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d0d]/90 backdrop-blur-sm transition-all z-10">
            <div className="flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
                <Send className="text-green-500" size={20} />
              </div>
              <span className="text-green-400 font-bold tracking-wide text-sm">
                Message Sent!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Send Bar */}
      <div className="p-4 border-t border-white/5 bg-[#111] flex justify-between items-center">
        <div className="flex gap-4 text-gray-500">
          <Paperclip
            size={18}
            className="hover:text-white cursor-pointer transition-colors"
          />
          <span className="text-xs">Formatting Options</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRealEmail}
            className="text-xs text-gray-400 hover:text-white px-3 py-2 transition-colors"
          >
            Open in Gmail
          </button>

          <button
            onClick={handleSubmit}
            disabled={status !== "idle" || !formData.message}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${
              status === "idle" && formData.message
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                : "bg-white/10 text-gray-500 cursor-not-allowed"
            }`}
          >
            {status === "sending" ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                Send Message <Send size={12} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
