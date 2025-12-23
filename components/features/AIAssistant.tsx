
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, Loader2, Sparkles } from 'lucide-react';
import { SPACES } from '../../data/spaces';
import { cn } from '../../lib/utils';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Olá! Sou o assistente inteligente da Yevent. Como posso te ajudar a encontrar o espaço perfeito para seu evento hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        Você é o assistente inteligente da Yevent, uma plataforma de reserva de espaços corporativos.
        Seu objetivo é ajudar usuários a encontrarem o melhor espaço baseado nas necessidades deles.
        
        Aqui estão os espaços disponíveis:
        ${JSON.stringify(SPACES)}
        
        Instruções:
        1. Seja profissional, solícito e direto.
        2. Use o Thinking Mode para analisar qual espaço melhor se adapta à quantidade de pessoas e tipo de evento mencionado.
        3. Se o usuário perguntar algo fora do contexto de eventos, redirecione educadamente para o foco da Yevent.
        4. Cite nomes de espaços específicos e preços quando relevante.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction,
          thinkingConfig: { thinkingBudget: 32768 },
        },
      });

      const modelText = response.text || "Desculpe, tive um problema ao processar sua solicitação.";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Houve um erro técnico. Por favor, tente novamente em instantes." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[90vw] max-w-[400px] h-[550px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="bg-blue-600 p-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest">Yevent AI</h3>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-100 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Online agora
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={cn(
                "flex flex-col max-w-[85%]",
                msg.role === 'user' ? "ml-auto items-end" : "items-start"
              )}>
                <div className={cn(
                  "px-5 py-4 rounded-[1.5rem] text-sm font-medium leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-100" 
                    : "bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" />
                Analisando com Thinking Mode...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input 
                type="text"
                placeholder="Como posso ajudar?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full pl-6 pr-14 py-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 border border-transparent focus:border-blue-500/30 transition-all font-medium text-slate-800"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 group",
          isOpen ? "bg-slate-900 rotate-90 scale-90" : "bg-blue-600 hover:scale-110 hover:shadow-blue-200"
        )}
      >
        {isOpen ? (
          <X className="text-white w-7 h-7" />
        ) : (
          <div className="relative">
             <MessageSquare className="text-white w-7 h-7" />
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
               <Sparkles className="w-2 h-2 text-blue-600" />
             </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default AIAssistant;
