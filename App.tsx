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

  const handleRandomTerm = () => {
    const random = CPP_TERMS[Math.floor(Math.random() * CPP_TERMS.length)];
    handleSelectTerm(random);
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

  // Generate floating particles
  const particles = useMemo(() => {
    const symbols = ['::', '->', '{}', '//', '<<', '>>', '++', '--', '*', '&', '[]', '!=', '0x', '();'];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      left: `${Math.random() * 100}%`,
      animationDuration: `${15 + Math.random() * 20}s`,
      animationDelay: `${Math.random() * 10}s`,
      fontSize: `${10 + Math.random() * 14}px`,
      opacity: 0.1 + Math.random() * 0.3
    }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#000205]">
      
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
         {/* Top Gradient fade */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#000205] via-transparent to-[#000205] z-10"></div>
         {/* Moving Grid */}
         <div className="perspective-grid opacity-30"></div>
         
         {/* Floating C++ Particles */}
         {particles.map((p) => (
             <div 
                key={p.id}
                className="particle text-cyan-500"
                style={{
                    left: p.left,
                    animationDuration: p.animationDuration,
                    animationDelay: p.animationDelay,
                    fontSize: p.fontSize,
                    opacity: p.opacity
                }}
             >
                {p.symbol}
             </div>
         ))}

         {/* Glow Orbs */}
         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-[#000205]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#000205]/60">
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

      <main className="flex-grow relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
            
            <div className="flex items-center justify-center gap-6 sm:gap-12 mb-6">
                <h2 className="glitch-wrapper text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-tight">
                    <span className="block mb-2 text-slate-500 text-2xl sm:text-3xl font-light tracking-wide font-code">
                    &lt;Stop saying /&gt;
                    </span>
                    <span className="glitch-text text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-500 drop-shadow-2xl" data-text="Deque (Di-Q)">Deque (Di-Q)</span>
                </h2>
            </div>
            
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                Correct your C++ vocabulary pronunciation.
            </p>
        </div>

        {/* Controls Section - Cyber Deck Style */}
        <div className="sticky top-16 z-30 mb-10">
            <div className="bg-[#0b1120]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-3 max-w-5xl mx-auto ring-1 ring-white/5 relative overflow-hidden">
                
                {/* Search Input */}
                <div className="relative flex-grow group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-cyan-500/50 font-code font-bold mr-1">&gt;</span>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-12 py-3 bg-[#0f172a]/50 border border-white/5 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:bg-[#0f172a] focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/30 font-code text-sm transition-all"
                        placeholder="Search term (e.g. 'cout')..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* Clear button if has text */}
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-12 flex items-center pr-2 text-slate-600 hover:text-white"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    )}
                    
                    {/* Random Dice Button */}
                    <div className="absolute inset-y-0 right-1 flex items-center">
                        <button 
                            onClick={handleRandomTerm}
                            className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                            title="Random Term"
                        >
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </button>
                    </div>
                </div>

                <div className="h-auto w-[1px] bg-white/10 hidden md:block mx-1"></div>

                {/* Categories - Scrollable Pill List */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-1 md:py-0 items-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat as any)}
                            className={`px-4 py-2 rounded-lg text-xs font-code font-bold whitespace-nowrap transition-all duration-300 relative overflow-hidden group/btn ${
                                selectedCategory === cat
                                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                    : 'text-slate-500 bg-[#0f172a]/30 hover:text-slate-200 hover:bg-[#0f172a] border border-transparent'
                            }`}
                        >
                            <span className="relative z-10">{cat}</span>
                            {selectedCategory === cat && (
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-50 animate-pulse"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Grid */}
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
                    <div className="w-16 h-16 mb-4 text-slate-700 opacity-50">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-slate-500 font-code text-sm">ERROR: 404_TERM_NOT_FOUND</p>
                    <button 
                        onClick={() => {setSearchTerm(''); setSelectedCategory('全部');}}
                        className="mt-4 px-6 py-2 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 rounded border border-cyan-500/30 font-code text-xs transition-all"
                    >
                        RESET FILTERS
                    </button>
                </div>
            )}
        </div>

        {/* Playground Section */}
        <div className="max-w-4xl mx-auto relative mt-32">
            <div className="absolute -left-20 top-20 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute -right-20 bottom-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
            
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="text-cyan-500 font-code">~/</span> Playground
                </h3>
                <span className="text-xs text-slate-500 font-code border border-slate-800 px-2 py-1 rounded bg-[#0b1120]">beta_feature</span>
            </div>
            <Playground />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-auto bg-[#000205] relative z-10">
        <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[8px] font-bold text-white">C++</div>
                <span className="font-bold text-slate-300">CppSpeak</span>
            </div>
            <p className="text-slate-600 text-[10px] font-code text-center leading-relaxed">
                ENGINEERED FOR EXCELLENCE <br/>
                © {new Date().getFullYear()} OPEN SOURCE INITIATIVE
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