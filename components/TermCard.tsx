import React, { useState, useRef } from 'react';
import { Term } from '../types';
import { playPronunciation } from '../services/geminiService';

interface TermCardProps {
  term: Term;
  onSelect: (term: Term) => void;
}

const TermCard: React.FC<TermCardProps> = ({ term, onSelect }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;

    setIsPlaying(true);
    try {
      await playPronunciation(term.word);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div 
      ref={divRef}
      onClick={() => onSelect(term)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full rounded-xl cursor-pointer transition-transform duration-300 hover:scale-[1.02] bg-[#0b1120]"
    >
      {/* Spotlight Border Effect */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(56, 189, 248, 0.4), transparent 40%)`,
          opacity: opacity
        }}
      />
      
      {/* Inner Content Container */}
      <div className="relative h-full bg-[#0f172a]/90 backdrop-blur-xl rounded-xl p-4 border border-white/5 overflow-hidden ring-1 ring-white/5 flex flex-col">
        
        <div 
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
                background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(56, 189, 248, 0.06), transparent 40%)`,
                opacity: opacity
            }}
        />

        <div className="relative z-10 flex flex-col h-full gap-3">
          
          {/* Header: Category & IPA */}
          <div className="flex justify-between items-center text-[10px] font-medium text-slate-500">
             <div className="flex items-center gap-2">
                <span className="text-cyan-500/80 tracking-wider uppercase">{term.category}</span>
                {term.ipa && (
                  <>
                    <span className="w-0.5 h-0.5 rounded-full bg-slate-600"></span>
                    <span className="font-sans text-slate-400 tracking-wide">/{term.ipa}/</span>
                  </>
                )}
             </div>
          </div>

          {/* Title & Play Row */}
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-code font-bold text-slate-100 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all break-words leading-tight">
              {term.word}
            </h3>
            
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className={`flex-shrink-0 ml-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isPlaying 
                  ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/50' 
                  : 'bg-white/5 text-slate-400 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              }`}
            >
              {isPlaying ? (
                <div className="flex items-end gap-[2px] h-3 w-3 justify-center pb-0.5">
                   <div className="audio-bar w-[2px] bg-current"></div>
                   <div className="audio-bar w-[2px] bg-current"></div>
                   <div className="audio-bar w-[2px] bg-current"></div>
                </div>
              ) : (
                <svg className="w-3.5 h-3.5 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Comparison Bar - Compact Modern Design */}
          <div className="grid grid-cols-2 gap-px bg-white/5 rounded-lg overflow-hidden border border-white/5 mt-1">
             {/* Good */}
             <div className="bg-[#0b1120]/50 p-2 flex flex-col justify-center group/good hover:bg-emerald-500/5 transition-colors">
                <div className="flex items-center gap-1.5 mb-0.5">
                   <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                   <span className="text-[9px] font-bold text-emerald-500/70 uppercase tracking-wider">Good</span>
                </div>
                <span className="text-xs font-mono text-emerald-100 truncate pl-0.5">
                   {term.simplePhonetic}
                </span>
             </div>
             {/* Bad */}
             <div className="bg-[#0b1120]/50 p-2 flex flex-col justify-center group/bad hover:bg-red-500/5 transition-colors relative">
                {/* Divider Line */}
                <div className="absolute left-0 top-2 bottom-2 w-px bg-white/5"></div>
                
                <div className="flex items-center gap-1.5 mb-0.5">
                   <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                   <span className="text-[9px] font-bold text-red-500/70 uppercase tracking-wider">Bad</span>
                </div>
                <span className="text-xs font-mono text-red-300/50 line-through decoration-red-500/30 truncate pl-0.5">
                   {term.commonError}
                </span>
             </div>
          </div>
          
          {/* Footer: Description */}
          <div className="mt-auto pt-2 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-500 font-medium truncate leading-relaxed">
                {term.description}
              </span>
              <svg className="w-3 h-3 text-slate-700 group-hover:text-cyan-500/50 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermCard;