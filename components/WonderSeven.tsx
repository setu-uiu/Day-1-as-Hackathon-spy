
import React, { useState } from 'react';
import { getTacticalRoute } from '../services/geminiService';

interface WonderSevenProps {
  onBack: () => void;
}

const WonderSeven: React.FC<WonderSevenProps> = ({ onBack }) => {
  const [location, setLocation] = useState('');
  const [objective, setObjective] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [routeIntel, setRouteIntel] = useState<{ text: string, sources: any[] } | null>(null);

  const handleGenerateRoute = async () => {
    if (!location || !objective) return;
    setIsLoading(true);
    
    // Attempt to get real location for more accurate grounding
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const result = await getTacticalRoute(location, objective, pos.coords.latitude, pos.coords.longitude);
        setRouteIntel(result);
        setIsLoading(false);
      },
      async () => {
        const result = await getTacticalRoute(location, objective);
        setRouteIntel(result);
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={onBack} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest transition-colors font-bold">
          ← Return to Dashboard
        </button>
        <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Shadow Path Vectoring
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-glass p-8 rounded-2xl border border-emerald-500/20 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Vector Input</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
              Identify safe routes and drop points for "unseen travel" in specific operational zones.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-2 block">Target Region</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Connaught Place, Delhi"
                className="w-full bg-black/40 border border-gray-800 rounded p-3 text-sm text-emerald-100 placeholder:text-gray-700 focus:border-emerald-500/50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-2 block">Mission Objective</label>
              <textarea 
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="e.g., Discreet extraction of deep-cover asset without alerting local police."
                className="w-full h-24 bg-black/40 border border-gray-800 rounded p-3 text-sm text-emerald-100 placeholder:text-gray-700 focus:border-emerald-500/50 outline-none transition-all"
              />
            </div>
          </div>

          <button 
            onClick={handleGenerateRoute}
            disabled={isLoading || !location || !objective}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-black py-4 rounded font-bold uppercase tracking-[0.2em] text-xs disabled:opacity-30 transition-all"
          >
            {isLoading ? 'CALCULATING VECTORS...' : 'INITIATE ROUTE ANALYSIS'}
          </button>

          {/* Stylized Tactical Map Graphic */}
          <div className="aspect-video bg-[#0a0f0a] border border-gray-800 rounded-xl overflow-hidden relative group">
             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00f5a011 1px, transparent 1px), linear-gradient(90deg, #00f5a011 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full border border-emerald-500/10 group-hover:scale-110 transition-transform duration-1000"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[8px] font-mono text-emerald-500/40 uppercase tracking-[0.5em] text-center">
                   {isLoading ? 'GROUNDING MAP DATA...' : location ? `MAPPING: ${location.toUpperCase()}` : 'AWAITING VECTOR'}
                </div>
             </div>
             {/* Random markers */}
             {location && !isLoading && (
               <>
                <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-red-500 rounded-full opacity-50"></div>
               </>
             )}
          </div>
        </div>

        <div className="bg-glass p-8 rounded-2xl border border-emerald-500/10 min-h-[500px] flex flex-col">
          <h3 className="text-xl font-bold text-emerald-400 uppercase tracking-widest mb-6">Tactical Assessment</h3>
          
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-[10px] text-emerald-400 uppercase tracking-[0.4em] animate-pulse">Consulting Maps Grounding</p>
            </div>
          ) : routeIntel ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="bg-black/40 p-5 border-l-2 border-emerald-500 rounded-r text-sm font-light text-emerald-100 leading-relaxed italic whitespace-pre-wrap">
                {routeIntel.text}
              </div>

              {routeIntel.sources.length > 0 && (
                <div className="space-y-3 pt-6 border-t border-gray-800">
                  <h4 className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Operational Points of Interest</h4>
                  <div className="grid gap-2">
                    {routeIntel.sources.map((src, i) => {
                      if (!src.maps) return null;
                      return (
                        <a 
                          key={i} 
                          href={src.maps.uri} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 rounded transition-all group"
                        >
                          <span className="text-[10px] font-bold text-emerald-400 group-hover:underline uppercase tracking-wider">{src.maps.title}</span>
                          <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-4">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800 opacity-40">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <p className="text-[10px] text-gray-700 uppercase tracking-widest font-bold">Awaiting Vector Parameters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WonderSeven;
