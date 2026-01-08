
import React, { useState } from 'react';
import { decodeVisualPattern } from '../services/geminiService';

interface WonderFiveProps {
  onBack: () => void;
}

const WonderFive: React.FC<WonderFiveProps> = ({ onBack }) => {
  const [feeling, setFeeling] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [result, setResult] = useState<{decodedMessage: string, cipherLogic: string, targetAudience: string} | null>(null);

  const handleProcess = async () => {
    if (!feeling) return;
    setIsDecoding(true);
    const data = await decodeVisualPattern(feeling);
    setResult(data);
    setIsDecoding(false);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={onBack} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest transition-colors font-bold">
          ← Return to Command
        </button>
        <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Visual Steganography Modality
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-glass p-8 rounded-2xl border border-indigo-500/20 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Input Pattern Data</h3>
            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider font-medium">
              Encode a message into the noise. Describe a feeling that will be translated into a visual artifact frequency matrix.
            </p>
          </div>

          <textarea 
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="Describe the hidden feeling inside the visual pattern (e.g., 'The quiet before a winter storm', 'A betrayal disguised as a smile')..."
            className="w-full h-40 bg-black/40 border border-gray-800 rounded-lg p-4 text-sm font-light text-indigo-300 focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-gray-700"
          />
          
          <button 
            onClick={handleProcess}
            disabled={isDecoding || !feeling}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-lg uppercase tracking-widest text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-900/20"
          >
            {isDecoding ? 'DECODING PATTERN...' : 'GENERATE PATTERN DECODE'}
          </button>

          <div className="space-y-3">
             <div className="grid grid-cols-8 gap-1.5 p-3 bg-black/60 rounded-xl border border-gray-800/50">
              {Array.from({ length: 64 }).map((_, i) => (
                 <div 
                   key={i} 
                   className="aspect-square rounded-sm transition-all duration-700 ease-in-out" 
                   style={{ 
                     backgroundColor: feeling 
                        ? `rgba(99, 102, 241, ${0.2 + (Math.random() * 0.8)})` 
                        : 'rgba(31, 41, 55, 0.3)',
                     transform: feeling ? `scale(${0.8 + Math.random() * 0.4})` : 'scale(1)',
                     filter: feeling ? `hue-rotate(${i * (feeling.length % 10)}deg) brightness(1.2)` : 'none',
                     boxShadow: feeling ? '0 0 10px rgba(99, 102, 241, 0.2)' : 'none'
                   }} 
                 />
              ))}
            </div>
            <div className="flex justify-between items-center px-1">
              <span className="text-[9px] text-gray-600 uppercase tracking-[0.3em]">Frequency Domain</span>
              <span className="text-[9px] text-gray-600 uppercase tracking-[0.3em]">Artifact: {feeling ? 'DETECTED' : 'NULL'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-glass p-8 rounded-2xl border border-indigo-500/10 min-h-[400px] flex flex-col">
            <h3 className="text-xl font-bold text-indigo-400 uppercase tracking-widest mb-6">Decoded Insight</h3>
            
            {isDecoding ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                <p className="text-[10px] text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Scanning Visual Noise</p>
              </div>
            ) : result ? (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="p-6 bg-indigo-500/5 border-l-4 border-indigo-500 rounded-r-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <svg className="w-12 h-12 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01705C7.91248 16 7.01705 16.8954 7.01705 18V21M14.017 21H18.017C19.1216 21 20.017 20.1046 20.017 19V10C20.017 8.89543 19.1216 8 18.017 8H6.01705C4.91248 8 4.01705 8.89543 4.01705 10V19C4.01705 20.1046 4.91248 21 6.01705 21H7.01705M14.017 21V18M7.01705 21V18M15.017 4H9.01705" /></svg>
                  </div>
                  <h4 className="text-[10px] text-indigo-400 uppercase tracking-widest mb-3 font-bold opacity-70">Secret Message</h4>
                  <p className="text-lg text-indigo-100 font-light italic leading-relaxed">"{result.decodedMessage}"</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Cipher Logic</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-mono">{result.cipherLogic}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Target Audience</h4>
                    <div className="inline-block px-3 py-1 bg-indigo-900/20 border border-indigo-500/30 rounded text-[10px] text-indigo-300 uppercase tracking-widest font-bold">
                      {result.targetAudience}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
                <div className="w-20 h-20 bg-gray-900/50 rounded-full flex items-center justify-center border border-gray-800/50">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">System Awaiting Input</p>
                  <p className="text-[10px] text-gray-700 uppercase tracking-widest">Provide feeling metadata to initialize decoding</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-[#111] p-4 rounded-xl border border-gray-800 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
            </div>
            <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Logic Stream: Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WonderFive;
