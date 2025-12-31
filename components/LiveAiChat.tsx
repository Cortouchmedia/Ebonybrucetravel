
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const LiveAiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I am your Ebony Bruce AI assistant. How can I help you with your travel plans today?' }
  ]);
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
        config: {
          systemInstruction: 'You are a helpful, professional travel assistant for Ebony Bruce Travels. You specialize in flights, hotels, and car rentals in Nigeria and internationally. Keep answers concise, helpful, and professional. You are helping a user navigate a global travel booking platform.',
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. How else can I help?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 h-[550px] bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/20 flex flex-col mb-6 border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#002D5B] text-white p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#1F93D0] rounded-lg flex items-center justify-center font-black text-xs">EB</div>
              <span className="font-bold text-xs uppercase tracking-widest">AI Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-2xl font-light hover:opacity-60 transition-opacity">×</button>
          </div>
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm border ${
                  msg.role === 'user' ? 'bg-[#002D5B] text-white border-transparent' : 'bg-white text-slate-700 border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex space-x-1">
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
              className="flex-grow bg-slate-50 border border-transparent focus:border-[#1F93D0] focus:bg-white rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all"
            />
            <button 
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-[#002D5B] text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-lg hover:bg-[#1F93D0] transition-all disabled:opacity-20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#002D5B] text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-blue-900/40 hover:scale-105 hover:bg-[#1F93D0] transition-all duration-300 group"
      >
        {isOpen ? (
          <span className="text-2xl font-light">×</span>
        ) : (
          <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
        )}
      </button>
    </div>
  );
};

export default LiveAiChat;
