
import React from 'react';

interface AccessSelectionProps {
  onBack: () => void;
  onSelect: (role: 'AGENT' | 'CHIEF') => void;
}

const AccessSelection: React.FC<AccessSelectionProps> = ({ onBack, onSelect }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center mb-12">
        <div className="w-12 h-12 rounded-full border-2 border-[#00f5a0] flex items-center justify-center mb-6">
          <div className="w-6 h-6 rounded-full border border-[#00f5a0]/50" />
        </div>
        <h2 className="text-4xl font-bold tracking-widest text-[#00f5a0] mb-2 uppercase">Select Access Type</h2>
        <p className="text-gray-500 text-sm tracking-widest uppercase font-bold">Choose your authorization level</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        <div className="bg-glass p-8 rounded-xl flex flex-col items-center text-center transition-all hover:border-[#00f5a0]/50">
          <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-6 border border-gray-700">
             <svg className="w-8 h-8 text-[#00f5a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-[#00f5a0] mb-4 uppercase tracking-widest">Field Agent</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Operational personnel with verified access codes. Authorized for classified mission briefings and tactical operations.
          </p>
          <ul className="text-xs text-gray-500 text-left w-full space-y-2 mb-8 uppercase tracking-wider list-none">
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#00f5a0] rounded-full"></span> Access Code Authentication</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#00f5a0] rounded-full"></span> Mission Access</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#00f5a0] rounded-full"></span> Tactical Resources</li>
          </ul>
          <button 
            onClick={() => onSelect('AGENT')}
            className="w-full btn-primary py-3 rounded text-sm uppercase tracking-widest"
          >
            Login as Agent
          </button>
        </div>

        <div className="bg-glass p-8 rounded-xl flex flex-col items-center text-center transition-all hover:border-[#00f5a0]/50">
          <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-6 border border-gray-700">
             <svg className="w-8 h-8 text-[#00f5a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-[#00f5a0] mb-4 uppercase tracking-widest">Military Chief</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Command-level authority with full administrative privileges. Generate access codes and manage operational personnel.
          </p>
          <ul className="text-xs text-gray-500 text-left w-full space-y-2 mb-8 uppercase tracking-wider list-none">
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#00f5a0] rounded-full"></span> Credential Authentication</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#00f5a0] rounded-full"></span> Code Generator Access</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[#00f5a0] rounded-full"></span> Full Command Control</li>
          </ul>
          <button 
            onClick={() => onSelect('CHIEF')}
            className="w-full btn-primary py-3 rounded text-sm uppercase tracking-widest"
          >
            Login as Chief
          </button>
        </div>
      </div>

      <button onClick={onBack} className="mt-8 text-xs text-gray-500 hover:text-white uppercase tracking-widest font-bold">
        ← Back to System Hub
      </button>
    </div>
  );
};

export default AccessSelection;
