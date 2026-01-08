
import React, { useState } from 'react';
import { processVisualCipher } from '../services/geminiService';

interface VisualPatternProps {
  onBack: () => void;
}

const VisualPattern: React.FC<VisualPatternProps> = ({ onBack }) => {
  const [data, setData] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'ENCODE' | 'DECODE'>('ENCODE');
  const [result, setResult] = useState<{resultMessage: string, cipherLogic: string, audienceVerification: string} | null>(null);

  const handleProcess = async () => {
    if (!data || !secretKey) return;
    setIsProcessing(true);
    const result = await processVisualCipher(data, secretKey, mode);
    setResult(result);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={onBack} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest transition-colors font-bold">
          ← Terminal Hub
        </button>
        <div className="flex bg-gray-900 rounded p-1">
          <button 
            onClick={() => { setMode('ENCODE'); setResult(null); }}
            className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest rounded ${mode === 'ENCODE' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-500'}`}
          >
            Encode
          </button>
          <button 
            onClick={() => { setMode('DECODE'); setResult(null); }}
            className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest rounded ${mode === 'DECODE' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-500'}`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-glass p-8 rounded-2xl border border-indigo-500/20 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white uppercase tracking-widest">{mode} Pattern</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
              Only agents with the matching AUDIENCE KEY can reveal the true message.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-2 block">Data Input</label>
              <textarea 
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder={mode === 'ENCODE' ? "Describe the feeling or message to hide..." : "Paste the visual pattern metadata to decode..."}
                className="w-full h-32 bg-black/40 border border-gray-800 rounded-lg p-4 text-sm font-light text-indigo-300 focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-gray-700"
              />
            </div>

            <div>
              <label className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-2 block">Audience Secret Key</label>
              <input 
                type="text"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Unique key for targeted audience..."
                className="w-full bg-black/40 border border-gray-800 rounded py-3 px-4 text-sm font-mono text-indigo-200 placeholder:text-gray-700 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>
          
          <button 
            onClick={handleProcess}
            disabled={isProcessing || !data || !secretKey}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-lg uppercase tracking-widest text-xs font-bold disabled:opacity-30 transition-all shadow-lg shadow-indigo-900/20"
          >
            {isProcessing ? 'SCANNING...' : `EXECUTE ${mode}`}
          </button>

          <div className="grid grid-cols-8 gap-1.5 p-3 bg-black/60 rounded-xl border border-gray-800/50 h-32 overflow-hidden">
            {Array.from({ length: 64 }).map((_, i) => (
               <div 
                 key={i} 
                 className="aspect-square rounded-sm transition-all duration-1000" 
                 style={{ 
                   backgroundColor: data 
                      ? `rgba(99, 102, 241, ${0.1 + (Math.random() * 0.9)})` 
                      : 'rgba(31, 41, 55, 0.2)',
                   transform: `scale(${0.5 + Math.random() * 0.5}) rotate(${Math.random() * 360}deg)`
                 }} 
               />
            ))}
          </div>
        </div>

        <div className="bg-glass p-8 rounded-2xl border border-indigo-500/10 min-h-[400px] flex flex-col">
          <h3 className="text-xl font-bold text-indigo-400 uppercase tracking-widest mb-6">Output Terminal</h3>
          
          {isProcessing ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <p className="text-[10px] text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Running Cryptographic Algorithm</p>
            </div>
          ) : result ? (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="p-6 bg-indigo-500/5 border-l-4 border-indigo-500 rounded-r-lg relative">
                <h4 className="text-[10px] text-indigo-400 uppercase tracking-widest mb-3 font-bold">Result Message</h4>
                <p className="text-lg text-indigo-100 font-light italic leading-relaxed">"{result.resultMessage}"</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Algorithm Logic</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-mono">{result.cipherLogic}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Audience Status</h4>
                  <div className={`inline-block px-3 py-1 border rounded text-[10px] uppercase tracking-widest font-bold ${result.audienceVerification.includes('VERIFIED') ? 'bg-green-900/20 border-green-500/50 text-green-400' : 'bg-red-900/20 border-red-500/50 text-red-400'}`}>
                    {result.audienceVerification}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-40">
              <svg className="w-16 h-16 text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Awaiting Key Authorization</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualPattern;
