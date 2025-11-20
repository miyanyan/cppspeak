import React, { useState } from 'react';
import { Term } from '../types';
import { playPronunciation } from '../services/geminiService';

interface TermCardProps {
  term: Term;
  onSelect: (term: Term) => void;
}

const TermCard: React.FC<TermCardProps> = ({ term, onSelect }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;

    setIsPlaying(true);
    try {
      await playPronunciation(term.word);
    } catch (err) {
      // alert("播放失败"); // Remove alert for cleaner UI, maybe just log
      console.error(err);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div 
      onClick={() => onSelect(term)}
      className="group relative bg-white/[0.02] backdrop-blur-md border border-white/[0.05] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 overflow-hidden"
    >
      {/* Hover Glow Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/20">
                    {term.category}
                </span>
            </div>
            <h3 className="text-3xl font-code font-bold text-slate-100 tracking-tight group-hover:text-blue-400 transition-colors">
              {term.word}
            </h3>
          </div>
          
          <button
            onClick={handlePlay}
            disabled={isPlaying}
            className={`relative p-3 rounded-xl transition-all duration-300 group/btn ${
              isPlaying 
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40' 
                : 'bg-white/5 text-slate-400 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/30'
            }`}
            aria-label="Play"
          >
             {/* Button Glow */}
             <div className="absolute inset-0 rounded-xl bg-blue-400 blur opacity-0 group-hover/btn:opacity-30 transition-opacity"></div>

            {isPlaying ? (
              <div className="relative flex items-center justify-center w-6 h-6">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
                  <svg className="relative w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              </div>
            ) : (
              <svg className="relative w-6 h-6 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
             <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">Correct</span>
             <span className="text-emerald-400 font-mono text-xl font-medium tracking-wide">
                /{term.simplePhonetic}/
            </span>
          </div>
          
          <div className="flex items-baseline gap-2">
             <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">Wrong</span>
             <span className="text-red-400/80 font-medium text-sm line-through decoration-red-500/40">
                {term.commonError}
            </span>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-slate-500 truncate max-w-[80%]">{term.description}</span>
            <span className="text-blue-400">
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </span>
        </div>
      </div>
    </div>
  );
};

export default TermCard;