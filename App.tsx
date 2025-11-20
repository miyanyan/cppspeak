import React, { useState, useMemo, useEffect } from 'react';
import { CPP_TERMS } from './constants';
import { Term, TermCategory } from './types';
import TermCard from './components/TermCard';
import ExplanationModal from './components/ExplanationModal';
import Playground from './components/Playground';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TermCategory | '全部'>('全部');
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const termId = params.get('term');
    if (termId) {
      const found = CPP_TERMS.find(
        t => t.id === termId || t.word.toLowerCase() === termId.toLowerCase()
      );
      if (found) {
        setSelectedTerm(found);
      }
    }
  }, []);

  const handleSelectTerm = (term: Term) => {
    setSelectedTerm(term);
    const url = new URL(window.location.href);
    url.searchParams.set('term', term.id);
    window.history.pushState({}, '', url);
  };

  const handleCloseModal = () => {
    setSelectedTerm(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('term');
    window.history.pushState({}, '', url);
  };

  const filteredTerms = useMemo(() => {
    return CPP_TERMS.filter((term) => {
      const matchesSearch = term.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            term.commonError.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            term.description.includes(searchTerm);
      const matchesCategory = selectedCategory === '全部' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categories = ['全部', ...Object.values(TermCategory)];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-900/20 rounded-full blur-[128px] mix-blend-screen animate-pulse" style={{animationDuration: '4s'}}></div>
         <div className="absolute top-[20%] right-[-5%] w-[30rem] h-[30rem] bg-cyan-900/20 rounded-full blur-[96px] mix-blend-screen opacity-60"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[50rem] h-[50rem] bg-indigo-900/10 rounded-full blur-[128px] mix-blend-screen"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-30 border-b border-white/5 bg-[#020617]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-[#020617]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = './'}>
             <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                <span className="font-code font-bold text-white text-xs">C++</span>
             </div>
             <h1 className="text-lg font-bold tracking-tight text-slate-100">
                Cpp<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Speak</span>
             </h1>
          </div>
          <div className="flex items-center gap-4">
             <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
             </a>
          </div>
        </div>
      </nav>

      <main className="flex-grow relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium mb-6 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                专为中国 C++ 开发者打造
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                别再读 <span className="relative inline-block">
                    <span className="absolute inset-0 bg-red-500/20 skew-y-3 blur-sm"></span>
                    <span className="relative text-red-400 decoration-red-500/50 line-through decoration-4">"App"</span>
                </span> (A-P-P) 了。
                <br />
                是时候 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">Professional</span> 一点了。
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                使用最前沿的 Gemini AI 语音合成技术，<br className="block sm:hidden"/>纠正那些让你在 Code Review 中尴尬的中式发音。
            </p>
        </div>

        {/* Controls Section */}
        <div className="sticky top-20 z-20 mb-12">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/50 flex flex-col md:flex-row gap-2 md:items-center max-w-4xl mx-auto">
                {/* Search */}
                <div className="relative flex-grow group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-11 pr-4 py-3 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none sm:text-sm font-medium"
                        placeholder="搜索关键词 (如 'daemon', 'suite', 'null')..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>

                {/* Categories */}
                <div className="flex gap-1 overflow-x-auto no-scrollbar p-1 md:p-0">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat as any)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                selectedCategory === cat
                                    ? 'bg-slate-800 text-white shadow-sm ring-1 ring-white/10'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filteredTerms.length > 0 ? (
                filteredTerms.map((term) => (
                    <TermCard 
                        key={term.id} 
                        term={term} 
                        onSelect={handleSelectTerm} 
                    />
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-24 border border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
                    <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-slate-400 text-lg font-medium">未找到匹配的术语</p>
                    <button 
                        onClick={() => {setSearchTerm(''); setSelectedCategory('全部');}}
                        className="mt-4 px-6 py-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 rounded-full font-medium transition-colors border border-blue-500/20"
                    >
                        清除所有筛选
                    </button>
                </div>
            )}
        </div>

        {/* Playground Section */}
        <div className="max-w-4xl mx-auto">
            <Playground />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-auto bg-[#020617]">
        <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                 {/* Google Gemini Logo Mockup */}
                 <span className="text-slate-400 text-sm font-medium">Powered by</span>
                 <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Google Gemini</span>
            </div>
            <p className="text-slate-600 text-xs text-center max-w-md">
                Built for the community. Open Source. 
                <br/>
                Disclaimer: Pronunciations are generated by AI and optimized for US Tech context.
            </p>
        </div>
      </footer>

      {/* Modal */}
      {selectedTerm && (
        <ExplanationModal 
            term={selectedTerm} 
            onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default App;