'use client';

import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { FaPaperPlane } from 'react-icons/fa6';

export default function Chatbox({ authToken }: { authToken: string }) {
  const [messages, setMessages] = useState<
    { role: 'user' | 'bot'; content: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    const userMessage = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/chatbot`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      const resJson = await response.json();
      const botReply = resJson.data.response;

      setMessages((prev) => [...prev, { role: 'bot', content: botReply }]);
    } catch (err) {
      console.error('Error fetching chatbot response:', err);

      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Lỗi kết nối, vui lòng thử lại sau.' },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white">
      <h2 className="font-semibold text-2xl mb-6 flex gap-2 items-center font-title">
        Hỗ trợ tự động từ Ryxel Store
      </h2>

      <div className="h-64 overflow-y-auto rounded mb-8">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 ${
              msg.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block px-4 py-3 rounded-3xl max-w-[80%] break-words whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {loading && (
          <p className="loading-container selection:text-gray-500 italic text-sm">
            Đang trả lời...
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          className="flex-grow border rounded-lg p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Nhập câu hỏi..."
        />
        <Button onClick={sendMessage} disabled={loading}>
          <FaPaperPlane />
        </Button>
      </div>
    </div>
  );
}
