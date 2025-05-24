"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { FaPaperPlane } from "react-icons/fa6";

export default function Chatbox() {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const userMessage = input;
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/chatbot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        },
      );

      const resJson = await response.json();
      const botReply = resJson.data.response;

      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (err) {
      console.error("Error fetching chatbot response:", err);

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Lỗi kết nối, vui lòng thử lại sau." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-md bg-white">
      <h2 className="mb-6 flex items-center gap-2 font-title text-2xl font-semibold">
        Hỗ trợ tự động từ Ryxel Store
      </h2>

      <div className="mb-8 h-64 overflow-y-auto rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block max-w-[80%] whitespace-pre-line break-words rounded-3xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {loading && (
          <p className="loading-container text-sm italic selection:text-gray-500">
            Đang trả lời...
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          className="flex-grow rounded-lg border p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Nhập câu hỏi..."
        />
        <Button
          onClick={sendMessage}
          loading={loading}
          icon={<FaPaperPlane />}
        />
      </div>
    </div>
  );
}
