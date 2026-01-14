
import React, { useState } from 'react';
import { decryptSignalIntel } from '../services/geminiService';

interface SignalCipherProps {
  onBack: () => void;
}

const SignalCipher: React.FC<SignalCipherProps> = ({ onBack }) => {
  const [signal, setSignal] = useState('');
  const [audienceKey, setAudienceKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [intel, setIntel] = useState<{ text: string, sources: any[] } | null>(null);
  const [logs, setLogs] = useState<string[]>(["SIGNAL SCANNER STANDBY"]);

  const handleDecrypt = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!signal || !audienceKey) return;
    
    setIsLoading(true);
    setLogs(prev => [`ATTEMPTING DECRYPTION WITH KEY: ${audienceKey.toUpperCase()}`, ...prev]);
    
    const result = await decryptSignalIntel(signal, audienceKey);
    setIntel(result);
    setIsLoading(false);
    setLogs(prev => ["PROCESS COMPLETE. VERIFYING AUDIENCE...", ...prev]);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={onBack} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest transition-colors font-bold">
          &larr; Terminal Hub
        </button>
        <span className="text-amber-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          Signal/Code to Text Processor
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-glass p-6 rounded-2xl border border-amber-500/20">
            <h3 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-4">Tactical Intercept</h3>
            <form onSubmit={handleDecrypt} className="space-y-4">
              <div>
                <label className="text-[9px] text-gray-500 uppercase tracking-widest mb-2 block">Signal/Code Input</label>
                <textarea 
                  value={signal}
                  onChange={(e) => setSignal(e.target.value)}
                  placeholder="Enter Morse, Signs, or RAW codes..."
                  className="w-full h-32 bg-black/40 border border-gray-800 rounded p-4 text-sm font-mono text-amber-100 placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50"
                />
              </div>
              <div>
                <label className="text-[9px] text-gray-500 uppercase tracking-widest mb-2 block">Audience Key</label>
                <input 
                  type="text"
                  value={audienceKey}
                  onChange={(e) => setAudienceKey(e.target.value)}
                  placeholder="Secret key for true decrypt..."
                  className="w-full bg-black/40 border border-gray-800 rounded py-3 px-4 text-sm font-mono text-amber-200 placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50"
                />
              </div>
              <button 
                type="submit"
                disabled={isLoading || !signal || !audienceKey}
                className="w-full bg-amber-600 hover:bg-amber-500 text-black py-4 rounded font-bold uppercase tracking-widest text-[10px] disabled:opacity-30 transition-all"
              >
                {isLoading ? 'DECRYPTING...' : 'INITIALIZE DECRYPTION'}
              </button>
            </form>
          </div>

          <div className="bg-glass p-6 rounded-2xl border border-gray-800 h-40 overflow-hidden">
            <h3 className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-4">Console Logs</h3>
            <div className="space-y-1 font-mono text-[9px] text-gray-600 overflow-y-auto h-full pr-2">
              {logs.map((log, i) => (
                <div key={i}>
                  <span className="text-amber-500/40">&gt;&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-glass p-8 rounded-2xl border border-amber-500/10 min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
              <h2 className="text-2xl font-bold uppercase tracking-[0.3em] text-amber-500">Decrypted Intel</h2>
              <div className="px-3 py-1 bg-amber-900/20 border border-amber-500/30 text-amber-500 text-[9px] uppercase tracking-widest font-bold rounded">
                Verified: {isLoading ? '...' : intel ? 'CONFIRMED' : 'WAITING'}
              </div>
            </div>

            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-amber-500 animate-[loading_2s_linear_infinite]"></div>
                </div>
                <style>{`@keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`}</style>
                <p className="text-[10px] text-amber-400 uppercase tracking-[0.6em] animate-pulse">Scanning Code Markers</p>
              </div>
            ) : intel ? (
              <div className="space-y-6 animate-in fade-in duration-700">
                <div className="bg-black/40 p-6 rounded-lg border border-gray-800 font-mono text-sm text-amber-100 leading-relaxed whitespace-pre-wrap">
                  {intel.text}
                </div>
                {intel.sources.length > 0 && (
                  <div className="pt-6 border-t border-gray-800 grid sm:grid-cols-2 gap-3">
                    {intel.sources.map((src, i) => src.web && (
                      <a key={i} href={src.web.uri} target="_blank" rel="noreferrer" className="block p-3 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 rounded transition-all">
                        <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1">{src.web.title}</div>
                        <div className="text-[9px] text-gray-600 truncate">{src.web.uri}</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-30">
                <svg className="w-16 h-16 text-amber-500/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Input Signal Packet to Proceed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalCipher;
