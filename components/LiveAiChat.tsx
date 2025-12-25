
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
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 h-[500px] bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col mb-4">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-white flex items-center justify-center font-black text-[10px]">AI</div>
              <span className="font-black uppercase text-xs tracking-widest">Travel Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="font-black text-lg hover:text-gray-400 transition-colors">×</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 border-2 border-black text-xs font-medium leading-relaxed ${
                  msg.role === 'user' ? 'bg-black text-white' : 'bg-white text-black'
                }`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-black p-3 space-x-1 flex">
                  <div className="w-1.5 h-1.5 bg-black animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-black animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-black animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t-2 border-black bg-white flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-grow border-2 border-black p-2 text-xs font-bold outline-none focus:bg-gray-50"
            />
            <button 
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-black text-white rounded-full border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(255,255,255,1),_8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
      >
        {isOpen ? (
          <span className="font-black text-2xl">×</span>
        ) : (
          <div className="flex flex-col items-center">
            <span className="font-black text-[10px] leading-none mb-0.5">LIVE</span>
            <span className="font-black text-lg leading-none">AI</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default LiveAiChat;
