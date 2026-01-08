
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <div className="w-8 h-8 rounded border-2 border-[#00f5a0] flex items-center justify-center">
          <div className="w-4 h-4 rounded-sm bg-[#00f5a0]" />
        </div>
        <span className="font-bold tracking-widest text-[#00f5a0]">APEX PROTOCOL</span>
      </div>

      <div className="max-w-4xl space-y-8">
        <div className="inline-block px-3 py-1 border border-[#00f5a0]/30 rounded-full bg-[#00f5a0]/10 text-[#00f5a0] text-xs font-bold tracking-widest mb-4">
          • CLASSIFIED SYSTEM ACTIVE
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
          Secure Access to <br />
          <span className="text-[#00f5a0]">Classified Operations</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Enter the most advanced tactical intelligence platform. Military-grade encryption ensures your mission stays confidential.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button 
            onClick={onStart}
            className="btn-primary px-10 py-4 rounded-md text-sm uppercase tracking-[0.2em]"
          >
            Request Access
          </button>
          <button className="px-10 py-4 rounded-md text-sm border border-gray-700 hover:border-[#00f5a0] transition-colors uppercase tracking-[0.2em] font-bold">
            Learn More
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-gray-800">
          <div>
            <div className="text-3xl font-bold text-white mb-1">256-bit</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Encryption</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">99.9%</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">&lt;50ms</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Latency</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Monitoring</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
