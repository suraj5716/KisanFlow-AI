import React, { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

export const AskKisanFlowScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Namaste! I am KisanFlow AI Decision Engine for the Gujarat Anand Agricultural Cluster. How can I assist with virtual pooling, APMC mandi arbitrage, cold-chain transport, or MSP compliance today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const presets = [
    'How does Virtual Pool #VPL-AHM-902 increase farmer revenue?',
    'What is the current Mandi price vs BigBasket tender quote?',
    'Why is cold-chain reefer routing critical for Lot TOM-0042?',
    'How does backhaul matching eliminate empty-mile freight?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      role: 'user',
      content: query,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('pool') || lower.includes('vpl')) {
        reply =
          'Virtual Pool #VPL-AHM-902 combines 8.0 MT from Anand Krishak FPO with 5.0 MT from Kheda Green and 5.0 MT from Charotar Krishi into a 22.0 MT tender for BigBasket. This achieves bulk volume qualification, bypassing single-FPO capacity ceilings and locking in ₹30.20/kg net realization (compared to ₹19.35/kg at APMC), delivering a +₹54,250 net gain.';
      } else if (lower.includes('mandi') || lower.includes('price')) {
        reply =
          'Today, Anand APMC Mandi bids average ₹24.00/kg gross, but after 8.5% commission/cess (-₹2.04), arhatiya cuts, and loading fees, net farmer realization drops to ₹19.35/kg. The BigBasket institutional contract bids ₹32.50/kg with only ₹2.30 in shared reefer freight, netting ₹30.20/kg — an immediate +28.4% direct arbitrage.';
      } else if (lower.includes('cold') || lower.includes('tom-0042') || lower.includes('shelf')) {
        reply =
          'Lot LOT-TOM-2026-0042 has only 30 hours of freshness window remaining under ambient temperature (31.2°C ambient spike detected in Zone B). Placing it inside an active refrigerated reefer held at 8.2°C slows down ethylene emission and preserves 94% quality for expedited delivery to the Ahmedabad consumption hub.';
      } else if (lower.includes('backhaul') || lower.includes('empty')) {
        reply =
          'Refrigerated E-Truck GJ-23-AX-8912 delivers dairy & packaged goods from Anand to Ahmedabad, returning empty. KisanFlow algorithmically matches this empty return leg to carry 40 crates of fresh produce back down the NE-1 expressway corridor, cutting logistics freight from ₹3.40/kg down to ₹1.65/kg (saving ₹400/trip).';
      } else {
        reply =
          'Under the MoCA & Food & Public Distribution guidelines for National Agri-Grid, KisanFlow integrates XGBoost deficit forecasting, Prophet seasonality, and Google OR-Tools multi-stop routing to empower 1,420 smallholders with transparent escrow settlements within 24 hours.';
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: reply,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-12 space-y-4 max-w-4xl mx-auto">
      {/* Header Context */}
      <div>
        <div className="flex items-center gap-2 mb-0.5 text-[11px] text-on-surface-variant">
          <span className="text-primary font-semibold">Agronomist &amp; Policy Assistant</span>
          <span>·</span>
          <span>Grounded in APMC Mandi, e-NAM &amp; IMD Data</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Ask KisanFlow
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant text-[12.5px] mt-0.5">
          Ask real-time questions about virtual supply pooling logic, regional APMC price arbitrage, cold chain preservation guidelines, and institutional contract escrow protocols.
        </p>
      </div>

      {/* Preset Prompts */}
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface text-[11.5px] font-medium text-left border border-outline-variant/30 transition-all"
            type="button"
          >
            "{p}"
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/20 flex flex-col h-[460px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-space-md space-y-4">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={idx}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                  </div>
                )}
                <div
                  className={`max-w-xl p-3.5 rounded-xl text-[13px] leading-relaxed ${
                    isUser
                      ? 'bg-primary-container text-on-primary rounded-tr-none'
                      : 'bg-surface-container-low text-on-surface rounded-tl-none border border-outline-variant/20'
                  }`}
                >
                  <p>{m.content}</p>
                  <span className={`block text-[10px] mt-1 ${isUser ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>
                    {m.time}
                  </span>
                </div>
                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-secondary text-on-primary flex items-center justify-center flex-shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                  </div>
                )}
              </div>
            );
          })}
          {isTyping && (
            <div className="flex gap-3 items-center text-on-surface-variant text-[12px]">
              <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl rounded-tl-none border border-outline-variant/20">
                <span>KisanFlow AI analyzing mandi data...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-space-md bg-surface-container-low border-t border-outline-variant/20 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about pooling, prices, crop preservation, or routing..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface border border-outline-variant/30 text-[13px] focus:outline-none focus:border-primary"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="px-5 py-2.5 bg-primary text-on-primary rounded-lg font-bold hover:bg-primary-container disabled:opacity-50 transition-all flex items-center gap-1.5 text-[13px]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
