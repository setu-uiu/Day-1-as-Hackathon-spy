
import React, { useState } from 'react';
import { UserSession, WonderType } from '../types';
import VisualPattern from './VisualPattern';
import VectorPath from './VectorPath';
import SignalCipher from './SignalCipher';
import CommLink from './CommLink';

interface DashboardProps {
  session: UserSession;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ session, onLogout }) => {
  const [activeWonder, setActiveWonder] = useState<WonderType | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#00f5a0]/20 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-[#00f5a0]/10 border border-[#00f5a0]/50 flex items-center justify-center">
             <div className="w-4 h-4 bg-[#00f5a0]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-[#00f5a0]">APEX PROTOCOL</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">OPERATOR: {session.username} [{session.role}]</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 overflow-hidden max-w-xl">
          <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap text-[9px] font-mono text-[#00f5a0]/60 uppercase tracking-widest">
            CIPHER STATUS: ACTIVE ... KEY ROTATION: 360s ... ENCRYPTION: QUANTUM-GHOST ... SIGNAL: STABLE ...
          </div>
          <style>{`
            @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
          `}</style>
        </div>
        
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setActiveWonder(null)}
             className={`px-6 py-2 rounded text-[10px] uppercase tracking-widest border border-gray-800 hover:border-[#00f5a0] transition-all ${!activeWonder ? 'bg-[#00f5a0] text-black font-bold' : ''}`}
           >
             Terminal Hub
           </button>
           <button 
             onClick={onLogout}
             className="px-6 py-2 rounded text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-900/20 transition-all border border-transparent"
           >
             Logout
           </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {!activeWonder ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-700">
              {/* Visual Pattern (Wonder 5) */}
              <div className="bg-glass p-6 rounded-2xl border border-indigo-500/20 flex flex-col items-center text-center group hover:border-indigo-500/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h2 className="text-xl font-bold mb-2 uppercase tracking-widest text-indigo-400">Visual Cipher</h2>
                <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-wider leading-relaxed">
                  Encode/Decode messages into visual frequency noise. Only key-holders can reveal the true feeling.
                </p>
                <button 
                  onClick={() => setActiveWonder(WonderType.VISUAL_PATTERN)}
                  className="mt-auto w-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 py-3 rounded uppercase tracking-widest text-[10px] font-bold hover:bg-indigo-500 hover:text-white transition-all"
                >
                  Access Pattern Console
                </button>
              </div>

              {/* Vector Path (Wonder 7) */}
              <div className="bg-glass p-6 rounded-2xl border border-emerald-500/20 flex flex-col items-center text-center group hover:border-emerald-500/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                </div>
                <h2 className="text-xl font-bold mb-2 uppercase tracking-widest text-emerald-400">Vector Pathing</h2>
                <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-wider leading-relaxed">
                  Stealth navigation. Map ghost routes through high-surveillance zones for unseen deployment.
                </p>
                <button 
                  onClick={() => setActiveWonder(WonderType.VECTOR_PATH)}
                  className="mt-auto w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 py-3 rounded uppercase tracking-widest text-[10px] font-bold hover:bg-emerald-500 hover:text-white transition-all"
                >
                  Initialize Map
                </button>
              </div>

              {/* Signal Cipher (Wonder 9) */}
              <div className="bg-glass p-6 rounded-2xl border border-amber-500/20 flex flex-col items-center text-center group hover:border-amber-500/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </div>
                <h2 className="text-xl font-bold mb-2 uppercase tracking-widest text-amber-400">Signal Decrypt</h2>
                <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-wider leading-relaxed">
                  Convert code, signs, and intercepted signals into text. Misleads outsiders with dummy intel.
                </p>
                <button 
                  onClick={() => setActiveWonder(WonderType.SIGNAL_CIPHER)}
                  className="mt-auto w-full bg-amber-500/10 border border-amber-500/30 text-amber-400 py-3 rounded uppercase tracking-widest text-[10px] font-bold hover:bg-amber-500 hover:text-white transition-all"
                >
                  Open Decryptor
                </button>
              </div>
            </div>
          ) : activeWonder === WonderType.VISUAL_PATTERN ? (
            <VisualPattern onBack={() => setActiveWonder(null)} />
          ) : activeWonder === WonderType.VECTOR_PATH ? (
            <VectorPath onBack={() => setActiveWonder(null)} />
          ) : (
            <SignalCipher onBack={() => setActiveWonder(null)} />
          )}
        </div>

        <div className="w-full lg:w-80 flex flex-col h-[500px] lg:h-auto">
          <CommLink />
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center opacity-30 pointer-events-none">
        <div className="text-[10px] font-mono uppercase tracking-widest">PROTOCOL: OMEGA</div>
        <div className="text-[10px] font-mono uppercase tracking-widest">ENCRYPTION: QUANTUM-LOCK</div>
      </div>
    </div>
  );
};

export default Dashboard;
