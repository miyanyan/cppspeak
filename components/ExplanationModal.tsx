import React, { useEffect, useState } from 'react';
import { Term } from '../types';
import { generateExplanation, playPronunciation } from '../services/geminiService';

interface ExplanationModalProps {
  term: Term | null;
  onClose: () => void;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ term, onClose }) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (term) {
      setLoading(true);
      generateExplanation(term.word)
        .then(setExplanation)
        .catch(() => setExplanation("无法加载解释。"))
        .finally(() => setLoading(false));
    } else {
      setExplanation('');
    }
  }, [term]);

  const handlePlay = async () => {
    if(audioLoading || !term) return;
    setAudioLoading(true);
    try {
        await playPronunciation(term.word);
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
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md animate-fade-in"></div>

      <div className="relative bg-[#0f172a] border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[85vh] animate-scale-up ring-1 ring-white/5" onClick={e => e.stopPropagation()}>
        
        {/* Glowing top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"></div>

        {/* Header */}
        <div className="p-8 pb-4 border-b border-white/5 flex justify-between items-start bg-gradient-to-b from-slate-800/50 to-transparent">
            <div className="flex flex-col gap-1">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Detail View</div>
                <div className="flex items-center gap-4">
                    <h2 className="text-4xl font-code font-bold text-white">{term.word}</h2>
                    <button 
                        onClick={handlePlay}
                        className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-full transition-all shadow-lg shadow-blue-600/20 hover:scale-105"
                        disabled={audioLoading}
                        title="播放标准发音"
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
                    className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                    title="复制链接"
                >
                    {copied ? (
                        <span className="text-xs text-emerald-400 font-bold px-1">已复制</span>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    )}
                </button>
                <button 
                    onClick={onClose}
                    className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-xl backdrop-blur-sm">
                    <span className="text-emerald-500 text-xs uppercase font-bold tracking-widest mb-2 block">Correct Pronunciation</span>
                    <p className="text-3xl font-mono text-emerald-300 font-medium">/{term.simplePhonetic}/</p>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-xl backdrop-blur-sm">
                    <span className="text-red-400 text-xs uppercase font-bold tracking-widest mb-2 block">Common Mistake</span>
                    <p className="text-2xl text-red-300/80 decoration-red-500/40 line-through decoration-2 font-medium">{term.commonError}</p>
                </div>
            </div>

          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-4 bg-slate-800 rounded w-full"></div>
              <div className="h-4 bg-slate-800 rounded w-5/6"></div>
              <div className="h-32 bg-slate-800 rounded-xl w-full mt-6 border border-slate-800"></div>
            </div>
          ) : (
            <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-white max-w-none">
                <div className="text-slate-300 whitespace-pre-wrap font-sans text-lg leading-relaxed">
                     {explanation.split('```').map((part, index) => {
                        if (index % 2 === 1) {
                            // Code block style
                            return (
                                <div key={index} className="relative group my-6">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                    <pre className="relative bg-[#0b1120] p-5 rounded-lg border border-white/10 font-code text-sm text-blue-200 overflow-x-auto shadow-inner">
                                        <code>{part.replace(/^cpp\n/, '').replace(/^c\+\+\n/, '')}</code>
                                    </pre>
                                </div>
                            );
                        }
                        return <p key={index} className="mb-4">{part}</p>;
                     })}
                </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-[#0b1120] border-t border-white/5 text-xs text-slate-600 text-center font-mono flex justify-between px-8">
            <span>ID: {term.id}</span>
            <span>Generated by Gemini 2.5 Flash</span>
        </div>
      </div>
    </div>
  );
};

export default ExplanationModal;