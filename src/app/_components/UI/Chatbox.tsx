"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { FaPaperPlane } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";

// Simple markdown parser for chatbot responses
const parseMarkdown = (text: string) => {
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Find the next bold marker
    const boldStart = remaining.indexOf("**");

    if (boldStart === -1) {
      // No more bold text, add the rest as normal text
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    // Add text before the bold marker
    if (boldStart > 0) {
      parts.push(<span key={key++}>{remaining.substring(0, boldStart)}</span>);
    }

    // Find the closing bold marker
    const boldEnd = remaining.indexOf("**", boldStart + 2);

    if (boldEnd === -1) {
      // No closing marker, treat the rest as normal text
      parts.push(<span key={key++}>{remaining.substring(boldStart)}</span>);
      break;
    }

    // Add the bold text
    const boldText = remaining.substring(boldStart + 2, boldEnd);
    parts.push(
      <strong key={key++} className="font-bold">
        {boldText}
      </strong>,
    );

    // Continue with the remaining text
    remaining = remaining.substring(boldEnd + 2);
  }

  return parts;
};

export default function Chatbox() {
  const [messages, setMessages] = useState<
    {
      role: "user" | "bot";
      content: string;
      productLinks?: Array<{
        name: string;
        url: string;
        price: number;
      }>;
    }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
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
      const productLinks = resJson.data.productLinks || [];

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: botReply,
          productLinks: productLinks,
        },
      ]);
    } catch (err) {
      console.error("Error fetching chatbot response:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: t("chatbot.errorConnection") },
      ]);
    }

    setLoading(false);
  };
  return (
    <div className="w-full">
      <h2 className="mb-6 flex items-center gap-2 font-title text-2xl font-semibold">
        {t("chatbot.title")}
      </h2>
      <div className="mb-8 h-64 overflow-y-auto rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            {" "}
            <div
              className={`inline-block max-w-[80%] whitespace-pre-line break-words rounded-3xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <span>
                {msg.role === "user" ? msg.content : parseMarkdown(msg.content)}
              </span>
              {msg.role === "bot" &&
                msg.productLinks &&
                msg.productLinks.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {msg.productLinks.map((link, linkIdx) => (
                      <a
                        key={linkIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white p-2 text-sm transition-colors hover:bg-gray-50"
                      >
                        <div className="flex flex-col">
                          <span className="text-left font-medium text-gray-900">
                            {link.name}
                          </span>
                          <span className="font-semibold text-primary-600">
                            {link.price.toLocaleString("vi-VN")} VND
                          </span>
                        </div>
                        <span className="text-xs text-primary-500">
                          👉 Xem chi tiết
                        </span>
                      </a>
                    ))}
                  </div>
                )}
            </div>
          </div>
        ))}
        {loading && (
          <p className="loading-container text-sm italic selection:text-gray-500">
            {t("chatbot.loading")}
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
          placeholder={t("chatbot.placeholder")}
        />
        <Button
          onClick={sendMessage}
          loading={loading}
          icon={<FaPaperPlane />}
          aria-label={t("chatbot.placeholder")}
        />
      </div>
    </div>
  );
}
