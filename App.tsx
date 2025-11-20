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
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#000205]">
      
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
         {/* Top Gradient fade */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#000205] via-transparent to-[#000205] z-10"></div>
         {/* Moving Grid */}
         <div className="perspective-grid opacity-30"></div>
         {/* Glow Orbs */}
         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-[#000205]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = './'}>
             <div className="relative w-7 h-7 flex items-center justify-center rounded bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300">
                <span className="font-code font-bold text-white text-[10px]">C++</span>
             </div>
             <h1 className="text-base font-bold tracking-tight text-slate-100 flex items-center gap-1">
                Cpp<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Speak</span>
             </h1>
          </div>
          <div className="flex items-center gap-4">
             <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
             </a>
          </div>
        </div>
      </nav>

      <main className="flex-grow relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section - Condensed */}
        <div className="text-center mb-16 relative">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-[10px] font-medium mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)] animate-fade-in-up">
                <span className="relative flex h-1.5 w-1.5 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                </span>
                SYSTEM: ONLINE
            </div>
            
            <h2 className="glitch-wrapper text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-tight">
                <span className="block mb-1 text-slate-500 text-2xl sm:text-3xl font-light tracking-normal">Stop saying</span>
                <span className="glitch-text text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400" data-text="APP (A-P-P)">APP (A-P-P)</span>
            </h2>
            
            <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-light">
                Correct your C++ vocabulary pronunciation.
            </p>
        </div>

        {/* Controls Section */}
        <div className="sticky top-16 z-30 mb-8">
            <div className="bg-[#0b1120]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-1.5 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-2 md:items-center max-w-4xl mx-auto ring-1 ring-white/5">
                {/* Search */}
                <div className="relative flex-grow group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-9 pr-3 py-2 bg-transparent text-slate-200 placeholder-slate-600 focus:outline-none font-code text-xs md:text-sm"
                        placeholder="SEARCH_TERM..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>

                {/* Categories */}
                <div className="flex gap-1 overflow-x-auto no-scrollbar p-1 md:p-0">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat as any)}
                            className={`px-3 py-1.5 rounded-md text-[10px] md:text-xs font-code font-medium whitespace-nowrap transition-all duration-200 ${
                                selectedCategory === cat
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Grid - Adjusted for better readability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {filteredTerms.length > 0 ? (
                filteredTerms.map((term) => (
                    <TermCard 
                        key={term.id} 
                        term={term} 
                        onSelect={handleSelectTerm} 
                    />
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20 backdrop-blur-sm">
                    <p className="text-slate-500 font-code text-sm">ERROR: 404_TERM_NOT_FOUND</p>
                    <button 
                        onClick={() => {setSearchTerm(''); setSelectedCategory('全部');}}
                        className="mt-4 px-6 py-2 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 rounded border border-cyan-500/30 font-code text-xs transition-all"
                    >
                        RESET
                    </button>
                </div>
            )}
        </div>

        {/* Playground Section */}
        <div className="max-w-4xl mx-auto relative">
            <div className="absolute -left-20 top-20 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute -right-20 bottom-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
            <Playground />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-auto bg-[#000205] relative z-10">
        <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col items-center">
            <p className="text-slate-700 text-[10px] font-code text-center">
                CPPSPEAK_V2.0 <br/>
                © {new Date().getFullYear()} OPEN SOURCE
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