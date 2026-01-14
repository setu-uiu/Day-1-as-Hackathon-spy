
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
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 pb-8 mb-10">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-[#00f5a0]/5 border border-[#00f5a0]/20 flex items-center justify-center">
             <div className="w-5 h-5 bg-[#00f5a0] rounded-sm" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest text-[#00f5a0]">APEX PROTOCOL</h1>
            <p className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-bold mt-1">OPERATOR: {session.username} // AUTH: LEVEL_{session.role}</p>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center px-10">
          <div className="w-full bg-black/40 border border-white/5 rounded-full py-2 px-6 flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse"></div>
             <div className="overflow-hidden flex-1">
               <div className="animate-[marquee_25s_linear_infinite] whitespace-nowrap text-[10px] font-mono text-[#00f5a0]/40 uppercase tracking-[0.3em]">
                 NEURAL ENCRYPTION: ACTIVE ... LATENCY: 22MS ... PACKETS: SYNCED ... ROTATING KEYS IN 120s ... STANDBY FOR HQ UPLINK ...
               </div>
             </div>
          </div>
          <style>{`
            @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
          `}</style>
        </div>
        
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setActiveWonder(null)}
             className={`px-6 py-3 rounded-xl text-[10px] uppercase font-black tracking-[0.2em] transition-all border ${!activeWonder ? 'bg-[#00f5a0] text-black border-[#00f5a0]' : 'border-gray-800 text-gray-500 hover:border-[#00f5a0]/40'}`}
           >
             Terminal Hub
           </button>
           <button 
             onClick={onLogout}
             className="px-6 py-3 rounded-xl text-[10px] uppercase font-black tracking-[0.2em] text-red-500 hover:bg-red-500/10 transition-all"
           >
             Exit System
           </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {!activeWonder ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {/* Visual Pattern (Wonder 5) */}
              <div className="bg-glass p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-indigo-500/30 transition-all duration-500">
                <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
                   <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h2 className="text-lg font-black mb-3 uppercase tracking-[0.2em] text-white">Visual Cipher</h2>
                <p className="text-[11px] text-gray-500 mb-10 uppercase tracking-widest leading-loose font-medium px-4">
                  Hide complex emotions inside generative noise. Reveal patterns only intended for authorized eyes.
                </p>
                <button 
                  onClick={() => setActiveWonder(WonderType.VISUAL_PATTERN)}
                  className="mt-auto w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl uppercase tracking-[0.3em] text-[10px] font-black hover:bg-indigo-500 hover:text-white transition-all duration-300"
                >
                  Enter Modality
                </button>
              </div>

              {/* Vector Path (Wonder 7) */}
              <div className="bg-glass p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-emerald-500/30 transition-all duration-500">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
                   <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                </div>
                <h2 className="text-lg font-black mb-3 uppercase tracking-[0.2em] text-white">Vector Pathing</h2>
                <p className="text-[11px] text-gray-500 mb-10 uppercase tracking-widest leading-loose font-medium px-4">
                  Shadow-map clandestine routes through urban surveillance. Ghost your physical footprint.
                </p>
                <button 
                  onClick={() => setActiveWonder(WonderType.VECTOR_PATH)}
                  className="mt-auto w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl uppercase tracking-[0.3em] text-[10px] font-black hover:bg-emerald-500 hover:text-white transition-all duration-300"
                >
                  Map Trajectory
                </button>
              </div>

              {/* Signal Cipher (Wonder 9) */}
              <div className="bg-glass p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-amber-500/30 transition-all duration-500">
                <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
                   <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </div>
                <h2 className="text-lg font-black mb-3 uppercase tracking-[0.2em] text-white">Signal Decrypt</h2>
                <p className="text-[11px] text-gray-500 mb-10 uppercase tracking-widest leading-loose font-medium px-4">
                  Intercept and process raw cryptic signals. Extract intelligence from the unseen background noise.
                </p>
                <button 
                  onClick={() => setActiveWonder(WonderType.SIGNAL_CIPHER)}
                  className="mt-auto w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl uppercase tracking-[0.3em] text-[10px] font-black hover:bg-amber-500 hover:text-white transition-all duration-300"
                >
                  Initiate Sweep
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

        <div className="w-full lg:w-96 flex flex-col h-[500px] lg:h-auto animate-in slide-in-from-right-4 duration-1000">
          <CommLink />
          <div className="mt-4 p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
             <div className="flex flex-col gap-1">
               <span className="text-[8px] text-gray-600 uppercase font-black">System Uptime</span>
               <span className="text-[10px] font-mono text-[#00f5a0]">14H 22M 09S</span>
             </div>
             <div className="flex flex-col items-end gap-1">
               <span className="text-[8px] text-gray-600 uppercase font-black">Region</span>
               <span className="text-[10px] font-mono text-[#00f5a0]">GLOBAL-S7</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
