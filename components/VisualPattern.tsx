
import React, { useState, useEffect } from 'react';
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
  const [matrix, setMatrix] = useState<number[]>(Array(64).fill(0).map(() => Math.random()));

  useEffect(() => {
    const interval = setInterval(() => {
      setMatrix(prev => prev.map(v => Math.min(1, Math.max(0, v + (Math.random() - 0.5) * 0.1))));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleProcess = async () => {
    if (!data || !secretKey) return;
    setIsProcessing(true);
    try {
      const res = await processVisualCipher(data, secretKey, mode);
      setResult(res);
    } catch (err) {
      setResult({
        resultMessage: "The frequency was too complex to unify. The feeling remains hidden.",
        cipherLogic: "Neural Singularity Encountered",
        audienceVerification: "UNDETERMINED"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom duration-700">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button onClick={onBack} className="text-[10px] text-gray-500 hover:text-[#00f5a0] uppercase tracking-[0.3em] transition-colors font-bold flex items-center gap-2">
            <span className="text-lg">&larr;</span> TERMINAL HUB
          </button>
          <h1 className="text-2xl font-black tracking-tighter mt-2 text-white italic">
            MODALITY V: <span className="text-[#00f5a0] not-italic">THE FEELING ARCHIVE</span>
          </h1>
        </div>
        
        <div className="flex bg-[#111] border border-gray-800 rounded-full p-1 self-start md:self-center">
          <button 
            onClick={() => { setMode('ENCODE'); setResult(null); }}
            className={`px-6 py-2 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all ${mode === 'ENCODE' ? 'bg-[#00f5a0] text-black' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Hide Feeling
          </button>
          <button 
            onClick={() => { setMode('DECODE'); setResult(null); }}
            className={`px-6 py-2 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all ${mode === 'DECODE' ? 'bg-[#00f5a0] text-black' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Reveal Feeling
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Input Section */}
        <div className="bg-glass p-8 rounded-3xl border border-white/5 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#00f5a0] uppercase tracking-[0.4em]">Subliminal Frequency</h3>
            <p className="text-sm text-gray-400 italic font-light leading-relaxed">
              "Could a feeling hide inside a visual pattern, waiting for someone to understand?"
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <label className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-3 block">
                {mode === 'ENCODE' ? 'THE EMOTION TO BE EMBEDDED' : 'THE VISUAL NOISE PATTERN'}
              </label>
              <textarea 
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder={mode === 'ENCODE' ? "Describe the raw feeling you want to turn into a pattern..." : "Describe the visual pattern that holds the secret..."}
                className="w-full h-40 bg-black/60 border border-gray-800 rounded-2xl p-5 text-sm font-light text-[#00f5a0] focus:outline-none focus:border-[#00f5a0]/40 transition-all placeholder:text-gray-800 resize-none shadow-inner"
              />
            </div>

            <div className="relative">
              <label className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-3 block">Synchronization Key (Target Eye)</label>
              <input 
                type="text"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="The unique key that unlocks the understanding..."
                className="w-full bg-black/60 border border-gray-800 rounded-xl py-4 px-5 text-sm font-mono text-white placeholder:text-gray-800 focus:outline-none focus:border-[#00f5a0]/40"
              />
            </div>
          </div>
          
          <button 
            onClick={handleProcess}
            disabled={isProcessing || !data || !secretKey}
            className="w-full btn-primary py-5 rounded-2xl uppercase tracking-[0.3em] text-xs font-black disabled:opacity-20 transition-all active:scale-[0.98]"
          >
            {isProcessing ? 'CALIBRATING FEELING MATRIX...' : `INITIATE ${mode} SEQUENCE`}
          </button>
        </div>

        {/* Right Output Section */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-glass p-8 rounded-3xl border border-white/5 flex-1 min-h-[450px] flex flex-col relative overflow-hidden">
            {/* Generative Background Matrix - Represents the hidden feeling */}
            <div className="absolute inset-0 grid grid-cols-8 gap-1 p-8 opacity-[0.05] pointer-events-none">
              {matrix.map((val, i) => (
                <div key={i} className="bg-white rounded-sm" style={{ opacity: val, transform: `scale(${0.5 + val}) rotate(${val * 90}deg)` }}></div>
              ))}
            </div>

            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.4em] mb-8 relative z-10">Neural Response</h3>
            
            {isProcessing ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 relative z-10">
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-[#00f5a0]/10 border-t-[#00f5a0] rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#00f5a0]/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <p className="text-[10px] text-[#00f5a0] uppercase tracking-[0.6em] animate-pulse font-bold">Unveiling Patterns</p>
              </div>
            ) : result ? (
              <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700 relative z-10">
                <div className="p-8 bg-[#00f5a0]/5 border-l-4 border-[#00f5a0] rounded-2xl">
                  <h4 className="text-[9px] text-[#00f5a0] uppercase tracking-widest mb-4 font-black opacity-60">
                    {mode === 'ENCODE' ? 'PATTERN BLUEPRINT' : 'UNBURIED FEELING'}
                  </h4>
                  <p className="text-xl text-white font-light italic leading-relaxed">
                    "{result.resultMessage}"
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Pattern Geometry</h4>
                    <p className="text-[11px] text-gray-300 leading-relaxed font-mono bg-black/40 p-3 rounded-lg border border-gray-800/50">
                      {result.cipherLogic}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Resonance Check</h4>
                    <div className={`inline-block w-full px-4 py-3 border rounded-xl text-[10px] text-center uppercase tracking-widest font-black ${result.audienceVerification.includes('VERIFIED') || result.audienceVerification.includes('SUCCESS') ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                      {result.audienceVerification}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-8 relative z-10">
                <div className="w-24 h-24 bg-gray-900/40 rounded-full flex items-center justify-center border border-white/5">
                   <div className="w-12 h-12 bg-[#00f5a0]/10 rounded-full flex items-center justify-center animate-pulse">
                     <div className="w-4 h-4 bg-[#00f5a0]/30 rounded-full" />
                   </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em] font-black italic">Waiting for someone to understand</p>
                  <p className="text-[9px] text-gray-700 uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
                    Provide the emotional metadata to begin the neural transformation.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-[#111] p-5 rounded-3xl border border-white/5 flex items-center justify-between">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f5a0] animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f5a0]/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f5a0]/10"></div>
            </div>
            <span className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.4em]">Subliminal Feed: ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualPattern;
