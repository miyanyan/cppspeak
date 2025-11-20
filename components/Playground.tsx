import React, { useState } from 'react';
import { playPronunciation } from '../services/geminiService';

const Playground: React.FC = () => {
  const [text, setText] = useState('std::vector<int> v = {1, 2, 3};');
  const [loading, setLoading] = useState(false);

  const handleSpeak = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      // Default to US accent for code snippets
      await playPronunciation(text, 'US');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 relative group">
       {/* Cyber Border Gradient */}
       <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl opacity-50 blur-sm group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
       
       <div className="relative bg-[#050a14] rounded-xl overflow-hidden shadow-2xl">
        {/* Scanline Overlay */}
        <div className="absolute inset-0 scanlines z-10 pointer-events-none opacity-50"></div>

        {/* Fake Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-slate-800 relative z-20">
            <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-red-500 transition-colors"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-yellow-500 transition-colors"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-slate-600 group-hover:bg-green-500 transition-colors"></div>
                </div>
            </div>
            <div className="text-[10px] font-code tracking-widest text-cyan-500/50 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                playground.cpp
            </div>
            <div className="w-10"></div> 
        </div>

        <div className="flex relative z-20">
            {/* Line Numbers */}
            <div className="hidden sm:flex flex-col items-end px-4 py-6 text-slate-700 font-code text-sm bg-[#050a14] select-none border-r border-slate-800/50 min-w-[50px]">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
            </div>
            
            {/* Editor Area */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-[#050a14]/90 text-cyan-100 font-code text-sm md:text-base p-6 outline-none resize-none min-h-[160px] selection:bg-cyan-500/30 focus:bg-[#050a14]"
                spellCheck="false"
                placeholder="// Initialize voice synthesis sequence..."
            />
        </div>

        {/* Footer Actions */}
        <div className="bg-[#0f172a] p-3 border-t border-slate-800 flex justify-between items-center relative z-20">
            <div className="text-[10px] text-slate-500 font-code hidden sm:flex items-center gap-3">
                <span>UTF-8</span>
                <span>CPP_MODE</span>
                <span className="text-cyan-500/70">READY</span>
            </div>
            <button
                onClick={handleSpeak}
                disabled={loading}
                className={`relative overflow-hidden flex items-center gap-2 py-2 px-6 rounded text-xs font-bold font-code tracking-wider uppercase transition-all ${
                    loading 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                    : 'bg-cyan-950 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]'
                }`}
            >
            {loading ? (
                <>
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                <span>Compiling...</span>
                </>
            ) : (
                <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Execute</span>
                </>
            )}
            </button>
        </div>
      </div>
      <div className="mt-4 text-center">
          <p className="text-slate-600 text-[10px] font-code uppercase tracking-widest">
            System Tip: Complex declarations supported
          </p>
      </div>
    </div>
  );
};

export default Playground;