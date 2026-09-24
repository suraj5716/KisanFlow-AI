import React, { useState } from 'react';
import { Icon, PageHeader, Badge } from '../ui';

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

  const handleSend = async (textToSend?: string) => {
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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.reply,
            time: 'Just now',
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Sorry, I encountered an error communicating with the server.',
            time: 'Just now',
          },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch from API:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I could not reach the server.',
          time: 'Just now',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="kf-fade-up flex h-full flex-col">
      <PageHeader
        title="Ask KisanFlow"
        eyebrow="Agronomist & Policy Assistant"
        subtitle="Grounded in APMC Mandi, e-NAM & IMD data — real-time answers on pooling, price arbitrage, cold chain and escrow protocols."
      />

      {/* Preset prompts */}
      <div className="mt-5 flex flex-wrap gap-2">
        {presets.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(p)}
            className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11.5px] font-medium text-muted transition-colors hover:border-primary hover:text-primary"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div className="mt-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Icon name="smart_toy" size={18} />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-ink">KisanFlow Decision Engine</p>
              <p className="kf-helper">Gemini API · live mandi feed</p>
            </div>
          </div>
          <Badge tone="good" dot>Online</Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div key={idx} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon name="smart_toy" size={17} />
                  </span>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                    isUser
                      ? 'rounded-tr-sm bg-primary text-on-primary'
                      : 'rounded-tl-sm border border-line bg-subtle text-ink'
                  }`}
                >
                  <p>{m.content}</p>
                  <span className={`mt-1.5 block text-[10px] ${isUser ? 'text-on-primary/80' : 'text-faint'}`}>
                    {m.time}
                  </span>
                </div>
                {isUser && (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy">
                    <Icon name="person" size={16} />
                  </span>
                )}
              </div>
            );
          })}
          {isTyping && (
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon name="sync" size={16} className="animate-spin" />
              </span>
              <div className="rounded-2xl rounded-tl-sm border border-line bg-subtle px-4 py-3 text-[12.5px] text-muted">
                KisanFlow AI analyzing mandi data...
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="border-t border-line bg-subtle p-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about pooling, prices, crop preservation, or routing..."
              className="h-11 flex-1 rounded-lg border border-line bg-surface px-4 text-[13px] text-ink placeholder:text-faint focus:border-primary focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-on-primary transition-colors hover:bg-primary-strong disabled:opacity-50"
            >
              <Icon name="send" size={18} />
            </button>
          </div>
          <p className="kf-helper mt-2">Responses grounded in APMC Mandi, e-NAM & IMD datasets. Verify critical decisions with an analyst.</p>
        </div>
      </div>
    </div>
  );
};