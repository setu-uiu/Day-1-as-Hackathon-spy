
import React, { useState } from 'react';
import { UserSession } from '../types';

interface ChiefLoginProps {
  onBack: () => void;
  onLogin: (session: UserSession) => void;
}

const ChiefLogin: React.FC<ChiefLoginProps> = ({ onBack, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin({ role: 'CHIEF', username });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0a0a0a]">
       <div className="bg-glass p-10 rounded-2xl w-full max-w-md border border-[#00f5a0]/20 text-center">
        <div className="w-12 h-12 rounded-full border border-[#00f5a0]/50 mx-auto flex items-center justify-center mb-6">
           <svg className="w-6 h-6 text-[#00f5a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
        <h2 className="text-3xl font-bold tracking-[0.2em] text-[#00f5a0] mb-2 uppercase">Military Chief Portal</h2>
        <p className="text-gray-500 text-xs tracking-[0.3em] uppercase mb-10">Command-Level Access Only</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              <input 
                type="text" 
                placeholder="ADMIN USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#111] border border-gray-800 rounded py-3 pl-10 pr-4 text-[#00f5a0] font-mono text-sm placeholder:text-gray-700 focus:outline-none focus:border-[#00f5a0]/50"
              />
            </div>
          </div>
          
          <div className="text-left">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input 
                type="password" 
                placeholder="ADMIN PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111] border border-gray-800 rounded py-3 pl-10 pr-4 text-[#00f5a0] font-mono text-sm placeholder:text-gray-700 focus:outline-none focus:border-[#00f5a0]/50"
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-4 rounded font-bold uppercase tracking-[0.2em]">
            Admin Login
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00f5a0] animate-pulse"></div>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Encrypted Connection</span>
        </div>
      </div>
      
      <div className="mt-6 py-2 px-6 bg-[#111] border border-gray-800 rounded text-[10px] font-mono tracking-widest text-gray-500 uppercase">
        CHIEF / APEX-CHIEF-2026
      </div>

      <button onClick={onBack} className="mt-8 text-xs text-gray-600 hover:text-white uppercase tracking-widest">
        ← Return to Mainframe
      </button>
    </div>
  );
};

export default ChiefLogin;
