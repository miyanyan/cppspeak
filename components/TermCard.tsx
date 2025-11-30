import React, { useState, useRef } from 'react';
import { Term } from '../types';
import { playPronunciation } from '../services/geminiService';

interface TermCardProps {
  term: Term;
  onSelect: (term: Term) => void;
}

const TermCard: React.FC<TermCardProps> = ({ term, onSelect }) => {
  // Track which accent is currently playing to show animation on the specific badge
  const [playingAccent, setPlayingAccent] = useState<'US' | 'UK' | null>(null);
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

  const handlePlay = async (e: React.MouseEvent, accent: 'US' | 'UK') => {
    e.stopPropagation();
    if (playingAccent) return; // Prevent overlapping playback

    setPlayingAccent(accent);
    try {
      await playPronunciation(term.word, accent);
    } catch (err) {
      console.error(err);
    } finally {
      setPlayingAccent(null);
    }
  };

  const openYouGlish = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Clean up term for better search results (e.g. "std::vector" -> "std vector")
    const query = term.word.replace(/::/g, ' ');
    window.open(`https://youglish.com/pronounce/${encodeURIComponent(query)}/english`, '_blank');
  };

  const ipaUS = term.ipaUS || term.ipa;
  const ipaUK = term.ipaUK || term.ipa;

  return (
    <div 
      ref={divRef}
      onClick={() => onSelect(term)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-[1.02] bg-[#0b1120]"
    >
      {/* Spotlight Border Effect */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(56, 189, 248, 0.4), transparent 40%)`,
          opacity: opacity
        }}
      />
      
      {/* Inner Content Container */}
      <div className="relative h-full bg-[#0f172a]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/5 overflow-hidden flex flex-col shadow-lg group-hover:shadow-cyan-900/10 transition-shadow">
        
        {/* Subtle background glow */}
        <div 
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
                background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(56, 189, 248, 0.04), transparent 40%)`,
                opacity: opacity
            }}
        />

        <div className="relative z-10 flex flex-col h-full gap-4">
          
          {/* Header: Category and Pronunciation Badges */}
          <div className="flex justify-between items-center mb-1">
             <span className="text-cyan-500/80 tracking-wider uppercase text-[9px] font-bold border border-cyan-500/20 bg-cyan-950/30 px-2 py-1 rounded-md self-center shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                {term.category}
             </span>

             {/* Accent Pills Row - Horizontal Alignment */}
             <div className="flex flex-row gap-2 items-center z-20">
                {/* US Badge */}
                <button
                  onClick={(e) => handlePlay(e, 'US')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-300 group/us ${
                    playingAccent === 'US' 
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-cyan-300 hover:border-cyan-500/30'
                  }`}
                >
                   <span className="text-[10px] font-bold bg-white/5 px-1.5 rounded text-slate-300 group-hover/us:text-white transition-colors">美</span>
                   <span className="font-sans text-[11px] font-medium tracking-wide opacity-80 hidden sm:inline">/{ipaUS}/</span>
                   <svg className={`w-3 h-3 transition-colors ${playingAccent === 'US' ? 'text-cyan-400' : 'opacity-50 group-hover/us:opacity-100'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>

                {/* UK Badge */}
                <button
                  onClick={(e) => handlePlay(e, 'UK')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-300 group/uk ${
                    playingAccent === 'UK' 
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.3)]' 
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-indigo-300 hover:border-indigo-500/30'
                  }`}
                >
                   <span className="text-[10px] font-bold bg-white/5 px-1.5 rounded text-slate-300 group-hover/uk:text-white transition-colors">英</span>
                   <span className="font-sans text-[11px] font-medium tracking-wide opacity-80 hidden sm:inline">/{ipaUK}/</span>
                   <svg className={`w-3 h-3 transition-colors ${playingAccent === 'UK' ? 'text-indigo-400' : 'opacity-50 group-hover/uk:opacity-100'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
             </div>
          </div>

          {/* Title */}
          <h3 className="text-3xl font-code font-bold text-slate-100 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all break-words leading-none mt-1">
              {term.word}
          </h3>

          {/* Comparison Bar - Compact Modern Design */}
          <div className="grid grid-cols-2 gap-px bg-white/5 rounded-lg overflow-hidden border border-white/5 mt-auto">
             {/* Good */}
             <div className="bg-[#0b1120]/40 p-3 flex flex-col justify-center group/good hover:bg-emerald-500/5 transition-colors">
                <div className="flex items-center gap-1.5 mb-0.5">
                   <div className="bg-emerald-500/10 p-0.5 rounded-full">
                       <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">Correct</span>
                </div>
                <span className="text-sm font-mono font-bold text-emerald-100 truncate pl-0.5">
                   {term.simplePhonetic}
                </span>
             </div>
             {/* Bad */}
             <div className="bg-[#0b1120]/40 p-3 flex flex-col justify-center group/bad hover:bg-red-500/5 transition-colors relative">
                {/* Divider Line */}
                <div className="absolute left-0 top-2 bottom-2 w-px bg-white/5"></div>
                
                <div className="flex items-center gap-1.5 mb-0.5">
                   <div className="bg-red-500/10 p-0.5 rounded-full">
                       <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                   </div>
                   <span className="text-[10px] font-bold text-red-500/80 uppercase tracking-wider">Wrong</span>
                </div>
                <span className="text-sm font-mono font-medium text-red-200/50 line-through decoration-red-500/40 truncate pl-0.5">
                   {term.commonError}
                </span>
             </div>
          </div>
          
          {/* Footer: Description & Actions */}
          <div className="pt-3 flex items-center justify-between gap-2 border-t border-white/5 mt-auto">
              <span className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-1 flex-grow">
                {term.description}
              </span>
              
              <div className="flex items-center gap-2">
                {/* YouGlish Button */}
                <button
                    onClick={openYouGlish}
                    className="h-6 w-6 rounded-full flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    title="Watch on YouGlish"
                >
                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </button>

                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 text-slate-600 transition-all flex-shrink-0">
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermCard;