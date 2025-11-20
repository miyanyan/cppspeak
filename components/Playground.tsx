import React, { useState } from 'react';
import { playPronunciation } from '../services/geminiService';

const Playground: React.FC = () => {
  const [text, setText] = useState('std::vector<int> v = {1, 2, 3};');
  const [loading, setLoading] = useState(false);

  const handleSpeak = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await playPronunciation(text, "code_snippet");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 relative group">
       {/* Decor glow */}
       <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
       
       <div className="relative bg-[#0b1120] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        
        {/* Fake Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b]/50 border-b border-slate-800">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="text-xs font-mono text-slate-500">playground.cpp — Gemini TTS</div>
            <div className="w-10"></div> 
        </div>

        <div className="flex">
            {/* Line Numbers */}
            <div className="hidden sm:flex flex-col items-end px-3 py-4 text-slate-600 font-mono text-sm bg-[#0b1120] select-none border-r border-slate-800/50">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
            </div>
            
            {/* Editor Area */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-[#0b1120] text-blue-100 font-code text-sm md:text-base p-4 outline-none resize-none min-h-[120px] selection:bg-blue-500/30"
                spellCheck="false"
                placeholder="// 在此输入 C++ 代码..."
            />
        </div>

        {/* Footer Actions */}
        <div className="bg-[#1e293b]/30 p-3 border-t border-slate-800 flex justify-between items-center">
            <div className="text-xs text-slate-500 font-mono hidden sm:block">
                Ln 1, Col {text.length}
            </div>
            <button
                onClick={handleSpeak}
                disabled={loading}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    loading 
                    ? 'bg-slate-800 text-slate-400 cursor-wait' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                }`}
            >
            {loading ? (
                <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Compiling Audio...</span>
                </>
            ) : (
                <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                <span>Run Code (Speak)</span>
                </>
            )}
            </button>
        </div>
      </div>
      <div className="mt-4 text-center">
          <p className="text-slate-500 text-xs">
            Tip: 输入任何复杂的 C++ 声明，听 AI 如何断句和发音。
          </p>
      </div>
    </div>
  );
};

export default Playground;