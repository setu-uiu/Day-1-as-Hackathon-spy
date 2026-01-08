
import React, { useState, useEffect } from 'react';
import { getSpyIntel } from '../services/geminiService';

interface WonderNineProps {
  onBack: () => void;
}

const WonderNine: React.FC<WonderNineProps> = ({ onBack }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [intel, setIntel] = useState<{ text: string, sources: any[] } | null>(null);
  const [logs, setLogs] = useState<string[]>(["SYSTEM READY", "ENCRYPTION ACTIVE"]);

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev.slice(0, 5)]);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query) return;
    
    setIsLoading(true);
    addLog(`INITIATING SIGNAL SWEEP: ${query.toUpperCase()}`);
    addLog("ACCESSING GLOBAL INTELLIGENCE GROUNDING...");
    
    const result = await getSpyIntel(query);
    setIntel(result);
    setIsLoading(false);
    addLog("INTELLIGENCE RETRIEVED. DECRYPTING...");
  };

  return (
    <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={onBack} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest transition-colors font-bold">
          ← Return to Command
        </button>
        <span className="text-amber-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          Unseen Signal Intelligence
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Sidebar: Control & Logs */}
        <div className="space-y-6">
          <div className="bg-glass p-6 rounded-2xl border border-amber-500/20">
            <h3 className="text-sm font-bold text-amber-500 uppercase tracking-[0.2em] mb-4">Tactical Input</h3>
            <form onSubmit={handleSearch} className="space-y-4">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Topic (e.g., WWII Ciphers, RAW techniques)..."
                className="w-full bg-black/40 border border-gray-800 rounded py-3 px-4 text-sm font-mono text-amber-200 placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50 transition-all"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-600 hover:bg-amber-500 text-black py-3 rounded font-bold uppercase tracking-widest text-[10px] disabled:opacity-30 transition-all"
              >
                {isLoading ? 'SEARCHING...' : 'INITIATE INTELLIGENCE SWEEP'}
              </button>
            </form>
          </div>

          <div className="bg-glass p-6 rounded-2xl border border-gray-800 h-64 overflow-hidden flex flex-col">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Signal Logs</h3>
            <div className="flex-1 space-y-2 font-mono text-[10px] overflow-y-auto pr-2 custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-amber-500/50">[{new Date().toLocaleTimeString()}]</span>
                  <span className={i === 0 ? "text-amber-300" : "text-gray-600"}>{log}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square rounded-2xl border border-amber-500/10 bg-black/40 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-full h-px bg-amber-500"></div>
              <div className="h-full w-px bg-amber-500 absolute"></div>
            </div>
            {/* Simulated Radar Sweep */}
            <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-conic-gradient from-amber-500/20 to-transparent animate-spin duration-[4s]" style={{ backgroundImage: 'conic-gradient(from 0deg, rgba(245, 158, 11, 0.2), transparent 60deg)' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 border border-amber-500/20 rounded-full"></div>
              <div className="w-1/2 h-1/2 border border-amber-500/10 rounded-full absolute"></div>
              <div className="w-1/4 h-1/4 border border-amber-500/5 rounded-full absolute"></div>
            </div>
            <div className="absolute bottom-4 left-4 text-[8px] font-mono text-amber-500 uppercase tracking-widest">Radar Status: SCANNING</div>
          </div>
        </div>

        {/* Main Briefing Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-glass p-8 rounded-2xl border border-amber-500/10 min-h-[600px] flex flex-col">
             <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                <h2 className="text-2xl font-bold uppercase tracking-[0.3em] text-amber-500">Mission Briefing</h2>
                <div className="px-3 py-1 bg-amber-900/20 border border-amber-500/30 text-amber-500 text-[9px] uppercase tracking-widest font-bold rounded">Top Secret</div>
             </div>

             {isLoading ? (
               <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-amber-500 animate-[loading_2s_ease-in-out_infinite]"></div>
                  </div>
                  <style>{`
                    @keyframes loading {
                      0% { transform: translateX(-100%); }
                      100% { transform: translateX(100%); }
                    }
                  `}</style>
                  <div className="text-center space-y-2">
                    <p className="text-[10px] text-amber-400 uppercase tracking-[0.6em] animate-pulse">Accessing Secure Channels</p>
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest">Bypassing local firewalls...</p>
                  </div>
               </div>
             ) : intel ? (
               <div className="space-y-8 animate-in fade-in duration-700">
                 <div className="prose prose-invert max-w-none">
                    <div className="text-amber-100/90 leading-relaxed font-light text-sm whitespace-pre-wrap font-mono bg-black/20 p-6 rounded-lg border border-gray-800">
                      {intel.text}
                    </div>
                 </div>

                 {intel.sources.length > 0 && (
                   <div className="space-y-4 pt-6 border-t border-gray-800">
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Source Intelligence Links</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {intel.sources.map((chunk: any, i: number) => {
                          if (!chunk.web) return null;
                          return (
                            <a 
                              key={i} 
                              href={chunk.web.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block p-3 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 rounded transition-all group"
                            >
                              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1 group-hover:underline">{chunk.web.title}</div>
                              <div className="text-[9px] text-gray-600 truncate">{chunk.web.uri}</div>
                            </a>
                          );
                        })}
                      </div>
                   </div>
                 )}
               </div>
             ) : (
               <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
                  <div className="w-24 h-24 bg-amber-500/5 rounded-full flex items-center justify-center border border-amber-500/10 opacity-40">
                    <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">Terminal Idle</p>
                    <p className="text-[10px] text-gray-700 uppercase tracking-widest">Enter a tactical topic to generate unseen intelligence</p>
                  </div>
               </div>
             )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-black/60 border border-gray-800 p-3 rounded-lg flex items-center justify-between px-4">
              <span className="text-[8px] text-gray-500 uppercase tracking-widest">Signal Encryption: ACTIVE</span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => <div key={i} className="w-3 h-1 bg-amber-500/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>)}
              </div>
            </div>
            <div className="bg-black/60 border border-gray-800 p-3 rounded-lg px-6 flex items-center">
              <span className="text-[8px] text-gray-500 uppercase tracking-widest">Bandwidth: 1.2 GBPS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WonderNine;
