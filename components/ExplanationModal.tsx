import React, { useEffect, useState } from 'react';
import { Term } from '../types';
import { playPronunciation } from '../services/geminiService';

interface ExplanationModalProps {
  term: Term | null;
  onClose: () => void;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ term, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (term) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [term]);

  const handlePlay = async () => {
    if(audioLoading || !term) return;
    setAudioLoading(true);
    try {
        // Default to US accent for modal currently
        await playPronunciation(term.word, 'US');
    } catch(e) {
        console.error(e);
    } finally {
        setAudioLoading(false);
    }
  }

  const handleCopyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  }

  if (!term) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop with heavy blur */}
      <div className="absolute inset-0 bg-[#000000]/80 backdrop-blur-xl animate-fade-in"></div>

      <div className="relative bg-[#050a14] border border-white/10 w-full max-w-2xl rounded-xl shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[85vh] animate-scale-up ring-1 ring-white/5 group" onClick={e => e.stopPropagation()}>
        
        {/* Decorative Tech Corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-xl pointer-events-none"></div>
        
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

        {/* Header */}
        <div className="p-8 pb-4 border-b border-white/5 flex justify-between items-start bg-[#0b1120]">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                   <div className="text-[10px] font-code font-bold text-cyan-500 uppercase tracking-widest px-2 py-0.5 bg-cyan-950 rounded border border-cyan-900">
                      DATA_ID: {term.id}
                   </div>
                   <div className="text-[10px] font-code font-bold text-emerald-500 uppercase tracking-widest px-2 py-0.5 bg-emerald-950 rounded border border-emerald-900">
                      LOCAL_DB_ACCESS
                   </div>
                </div>
                <div className="flex items-center gap-4 mt-1">
                    <h2 className="text-4xl md:text-5xl font-code font-bold text-white tracking-tight">{term.word}</h2>
                    <button 
                        onClick={handlePlay}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-full transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:scale-105 active:scale-95"
                        disabled={audioLoading}
                        title="播放发音"
                    >
                        {audioLoading ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        )}
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <button
                    onClick={handleCopyLink}
                    className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-white/5 group-copy"
                    title="复制链接"
                >
                    {copied ? (
                        <span className="text-xs text-emerald-400 font-code font-bold px-1">COPIED</span>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    )}
                </button>
                <button 
                    onClick={onClose}
                    className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar bg-[#050a14]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-lg backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 opacity-10">
                         <svg className="w-24 h-24 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                    <span className="text-emerald-500 text-[10px] font-code uppercase font-bold tracking-widest mb-2 block">Correct Syntax</span>
                    <p className="text-3xl font-code text-emerald-300 font-medium">/{term.simplePhonetic}/</p>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-lg backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 opacity-10">
                         <svg className="w-24 h-24 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    </div>
                    <span className="text-red-400 text-[10px] font-code uppercase font-bold tracking-widest mb-2 block">Syntax Error</span>
                    <p className="text-2xl font-code text-red-300/80 decoration-red-500/40 line-through decoration-2 font-medium">{term.commonError}</p>
                </div>
            </div>

          {loading ? (
            <div className="space-y-6">
              <div className="flex gap-2">
                  <div className="h-2 w-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                  <div className="h-2 w-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="h-2 w-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <div className="h-4 bg-slate-800/50 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-800/50 rounded w-full animate-pulse"></div>
              <div className="h-32 bg-[#0b1120] border border-slate-800/50 rounded-lg w-full mt-6 animate-pulse"></div>
            </div>
          ) : (
            <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-white max-w-none">
                <div className="text-slate-300 whitespace-pre-wrap font-sans text-lg leading-relaxed">
                     <p className="mb-4">{term.detailedExplanation}</p>
                     
                     {term.codeSnippet && (
                        <div className="relative group my-8">
                            <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-600/30 to-purple-600/30 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                            <pre className="relative bg-[#080d19] p-6 rounded-lg border border-white/10 font-code text-sm text-cyan-100 overflow-x-auto shadow-inner">
                                <div className="absolute top-2 right-3 text-[10px] text-slate-600 font-code uppercase">C++ Snippet</div>
                                <code>{term.codeSnippet}</code>
                            </pre>
                        </div>
                     )}
                </div>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-[#0b1120] border-t border-white/5 text-[10px] text-slate-600 text-center font-code flex justify-between px-8 uppercase tracking-widest">
            <span>Offline Mode</span>
            <span>Verified Data</span>
        </div>
      </div>
    </div>
  );
};

export default ExplanationModal;