import React, { useState, useRef, useEffect } from 'react';
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
      className="group relative rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-[1.02] bg-[#0b1120]"
      style={{
        // Define CSS variables for the spotlight effect
      } as React.CSSProperties}
    >
      {/* Spotlight Border Effect */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(56, 189, 248, 0.4), transparent 40%)`,
          opacity: opacity
        }}
      />
      
      {/* Inner Content Container (blocks the border background to create a thin line) */}
      <div className="relative h-full bg-[#0f172a]/90 backdrop-blur-xl rounded-2xl p-6 border border-white/5 overflow-hidden ring-1 ring-white/5">
        
        {/* Inner Spotlight Glow (subtle) */}
        <div 
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
                background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(56, 189, 248, 0.06), transparent 40%)`,
                opacity: opacity
            }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                      {term.category}
                  </span>
              </div>
              <h3 className="text-3xl font-code font-bold text-slate-100 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all">
                {term.word}
              </h3>
            </div>
            
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className={`relative p-3 rounded-xl transition-all duration-300 group/btn overflow-hidden ${
                isPlaying 
                  ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/50' 
                  : 'bg-white/5 text-slate-400 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
              }`}
            >
              {isPlaying ? (
                <div className="flex items-end gap-[3px] h-5 w-5 justify-center pb-1">
                   <div className="audio-bar"></div>
                   <div className="audio-bar"></div>
                   <div className="audio-bar"></div>
                   <div className="audio-bar"></div>
                </div>
              ) : (
                <svg className="relative w-6 h-6 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
               <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider min-w-[40px]">Good</span>
               <span className="text-emerald-300 font-mono text-lg font-medium tracking-wide">
                  /{term.simplePhonetic}/
              </span>
            </div>
            
            <div className="flex items-center gap-3 p-2 rounded-lg bg-red-500/5 border border-red-500/10">
               <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider min-w-[40px]">Bad</span>
               <span className="text-red-400/70 font-medium text-sm line-through decoration-red-500/40">
                  {term.commonError}
              </span>
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium truncate max-w-[85%] group-hover:text-slate-400 transition-colors">
                {term.description}
              </span>
              <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all">
                <svg className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermCard;