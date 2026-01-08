
import React, { useState } from 'react';
import { UserSession } from '../types';

interface AgentLoginProps {
  onBack: () => void;
  onLogin: (session: UserSession) => void;
}

const AgentLogin: React.FC<AgentLoginProps> = ({ onBack, onLogin }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onLogin({ role: 'AGENT', username: 'Agent-7' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0a0a0a]">
       <div className="bg-glass p-10 rounded-2xl w-full max-w-md border border-[#00f5a0]/20 text-center">
        <div className="w-12 h-12 rounded-full border border-[#00f5a0]/50 mx-auto flex items-center justify-center mb-6">
           <svg className="w-6 h-6 text-[#00f5a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h2 className="text-3xl font-bold tracking-[0.2em] text-[#00f5a0] mb-2 uppercase">Classified Access</h2>
        <p className="text-gray-500 text-xs tracking-[0.3em] uppercase mb-10">Authorization Required</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Access Code</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input 
                type="password" 
                placeholder="ENTER-ACCESS-CODE"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full bg-[#111] border border-gray-800 rounded py-3 pl-10 pr-4 text-[#00f5a0] font-mono text-sm placeholder:text-gray-700 focus:outline-none focus:border-[#00f5a0]/50"
              />
            </div>
          </div>
          <button type="submit" className="w-full btn-primary py-4 rounded font-bold uppercase tracking-[0.2em]">
            Verify Access
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00f5a0] animate-pulse"></div>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Secure Connection Active</span>
        </div>
      </div>
      
      <div className="mt-6 py-2 px-6 bg-[#111] border border-gray-800 rounded text-[10px] font-mono tracking-widest text-gray-500 uppercase">
        Demo Access Code: <span className="text-[#00f5a0]">DELTA-7-ECH0</span>
      </div>
      
      <button onClick={onBack} className="mt-8 text-xs text-gray-600 hover:text-white uppercase tracking-widest">
        ← Cancel Initialization
      </button>
    </div>
  );
};

export default AgentLogin;
