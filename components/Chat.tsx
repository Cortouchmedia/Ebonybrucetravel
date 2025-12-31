import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I am your Ebony Bruce assistant. How can I help with your global travel plans today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: { systemInstruction: 'You are a professional travel assistant for Ebony Bruce Travels. Keep answers helpful, warm, and professional.' },
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I understand. How else can I assist you?" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a bit of trouble connecting to the network. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen && (
        <div 
          className="w-80 md:w-96 h-[550px] bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/20 flex flex-col mb-6 border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          role="complementary"
          aria-label="AI Travel Assistant"
        >
          <div className="bg-[#002D5B] text-white p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#1F93D0] rounded-lg flex items-center justify-center font-black text-xs" aria-hidden="true">EB</div>
              <span className="font-bold text-xs uppercase tracking-widest">AI Concierge</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              aria-label="Close Assistant"
              className="text-2xl font-light hover:opacity-60 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50" aria-live="polite">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm border ${
                  msg.role === 'user' ? 'bg-[#002D5B] text-white border-transparent' : 'bg-white text-slate-700 border-slate-100'
                }`}>
                  <span className="sr-only">{msg.role === 'user' ? 'You:' : 'Assistant:'}</span>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex space-x-1" aria-label="Assistant is typing">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSend} className="p-6 border-t border-slate-100 bg-white flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How can we help?"
              aria-label="Message to assistant"
              className="flex-grow bg-slate-50 border border-transparent focus:border-[#1F93D0] focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all"
            />
            <button 
              type="submit"
              disabled={isTyping || !input.trim()}
              aria-label="Send Message"
              className="bg-[#002D5B] text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-lg hover:bg-[#1F93D0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002D5B] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close travel assistant" : "Open travel assistant"}
        aria-expanded={isOpen}
        className="w-16 h-16 bg-[#002D5B] text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-blue-900/40 hover:scale-105 hover:bg-[#1F93D0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002D5B] transition-all duration-300 group"
      >
        {isOpen ? (
          <span className="text-2xl font-light" aria-hidden="true">×</span>
        ) : (
          <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
        )}
      </button>
    </div>
  );
};

export default Chat;