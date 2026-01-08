
import React, { useState } from 'react';
import { getTacticalRoute } from '../services/geminiService';

interface VectorPathProps {
  onBack: () => void;
}

const VectorPath: React.FC<VectorPathProps> = ({ onBack }) => {
  const [location, setLocation] = useState('');
  const [objective, setObjective] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [routeIntel, setRouteIntel] = useState<{ text: string, sources: any[] } | null>(null);

  const handleGenerateRoute = async () => {
    if (!location || !objective) return;
    setIsLoading(true);
    
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
          ← Terminal Hub
        </button>
        <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Vector Pathing
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-glass p-8 rounded-2xl border border-emerald-500/20 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Tactical Entry</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
              Stealth navigation through high-surveillance zones.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-2 block">Operational Area</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Region for unseen travel..."
                className="w-full bg-black/40 border border-gray-800 rounded p-3 text-sm text-emerald-100 placeholder:text-gray-700 focus:border-emerald-500/50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-2 block">Objective</label>
              <textarea 
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="Tactical extraction, deployment, etc..."
                className="w-full h-24 bg-black/40 border border-gray-800 rounded p-3 text-sm text-emerald-100 placeholder:text-gray-700 focus:border-emerald-500/50 outline-none transition-all"
              />
            </div>
          </div>

          <button 
            onClick={handleGenerateRoute}
            disabled={isLoading || !location || !objective}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-black py-4 rounded font-bold uppercase tracking-widest text-xs disabled:opacity-30 transition-all"
          >
            {isLoading ? 'MAPPING GHOST ROUTE...' : 'CALCULATE VECTORS'}
          </button>
        </div>

        <div className="bg-glass p-8 rounded-2xl border border-emerald-500/10 min-h-[500px] flex flex-col">
          <h3 className="text-xl font-bold text-emerald-400 uppercase tracking-widest mb-6">Route Intelligence</h3>
          
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-[10px] text-emerald-400 uppercase tracking-[0.4em] animate-pulse">Syncing with Ground Satellites</p>
            </div>
          ) : routeIntel ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="bg-black/40 p-5 border-l-2 border-emerald-500 rounded-r text-sm font-light text-emerald-100 leading-relaxed font-mono">
                {routeIntel.text}
              </div>
              {routeIntel.sources.length > 0 && (
                <div className="space-y-3 pt-6 border-t border-gray-800">
                  <h4 className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Key Coordinates</h4>
                  <div className="grid gap-2">
                    {routeIntel.sources.map((src, i) => src.maps && (
                      <a key={i} href={src.maps.uri} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 rounded transition-all group">
                        <span className="text-[10px] font-bold text-emerald-400 group-hover:underline uppercase tracking-wider">{src.maps.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-30">
              <svg className="w-16 h-16 text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              <p className="text-[10px] text-gray-700 uppercase tracking-widest font-bold">Awaiting Vector Lock</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VectorPath;
