
import React, { useState, useEffect, useRef } from 'react';
import { sendHqMessage } from '../services/geminiService';

const CommLink: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'HQ' | 'YOU', text: string}[]>([
    { role: 'HQ', text: 'APEX Command Online. System secure. Awaiting agent status.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'YOU', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await sendHqMessage(userMsg);
      setMessages(prev => [...prev, { role: 'HQ', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'HQ', text: 'Error: Signal Lost. Retrying...' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-glass rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-black/40">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse"></div>
           <span className="text-[10px] font-bold text-[#00f5a0] uppercase tracking-widest">HQ Comm-Link</span>
        </div>
        <span className="text-[8px] font-mono text-gray-600">ID: DELTA-9</span>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[11px] leading-relaxed custom-scrollbar"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'YOU' ? 'items-end' : 'items-start'}`}>
            <span className={`text-[8px] mb-1 font-bold ${m.role === 'YOU' ? 'text-gray-500' : 'text-[#00f5a0]'}`}>
              {m.role}
            </span>
            <div className={`max-w-[85%] p-3 rounded-lg ${m.role === 'YOU' ? 'bg-gray-800 text-gray-300' : 'bg-[#00f5a0]/5 border border-[#00f5a0]/20 text-[#00f5a0]'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-col items-start animate-pulse">
            <span className="text-[8px] mb-1 font-bold text-[#00f5a0]">HQ</span>
            <div className="bg-[#00f5a0]/5 border border-[#00f5a0]/10 p-3 rounded-lg text-[#00f5a0]/50 italic">
              Encrypting response...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-3 bg-black/40 border-t border-gray-800">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="TYPE MESSAGE TO HQ..."
            className="w-full bg-[#0a0a0a] border border-gray-800 rounded py-2 px-3 text-[10px] text-[#00f5a0] font-mono placeholder:text-gray-700 focus:outline-none focus:border-[#00f5a0]/40 transition-all"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#00f5a0] hover:scale-110 transition-transform">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommLink;
