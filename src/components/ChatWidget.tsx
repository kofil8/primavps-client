"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
  streaming?: boolean;
}

// ─── Quick-reply chips ────────────────────────────────────────────────────────

const QUICK_REPLIES = [
  "Survey RDP pricing koto?",
  "IP ki 100% dedicated?",
  "bKash/Nagad e kivabe pay korbo?",
  "IP flag hole free swap pabo?",
  "🚨 জরুরি টেকনিক্যাল সাপোর্ট (WhatsApp)",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Blinking cursor shown while streaming ────────────────────────────────────

function Cursor() {
  return (
    <motion.span
      className="ml-0.5 inline-block h-4 w-0.5 rounded-full bg-current align-middle"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ─── Single message bubble ────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      {!isUser && (
        <div className="mr-2 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-sm bg-indigo-600 text-white"
            : "rounded-bl-sm bg-white text-slate-800 ring-1 ring-slate-100"
        }`}
        style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
      >
        {msg.content || (msg.streaming ? "" : "…")}
        {msg.streaming && <Cursor />}
      </div>
    </motion.div>
  );
}

// ─── Typing indicator (shown before first token arrives) ──────────────────────

function TypingDots() {
  return (
    <motion.div
      className="flex justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-2 w-2 rounded-full bg-indigo-400"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "assistant",
      content:
        "Assalamu Alaikum! 👋 Ami primevpsbd-er AI assistant — সাধারণ প্রশ্নে এখনই সাহায্য করব। জটিল বিষয়ে নিচের 🟢 বাটনে বনানী টিমের সাথে সরাসরি কথা বলুন।",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);   // waiting for first token
  const [streaming, setStreaming] = useState(false); // tokens arriving
  const [showChips, setShowChips] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Listen for open-chat event dispatched from any button across the page
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpen);
    return () => window.removeEventListener("open-chat", handleOpen);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const WA_LINK =
    "https://wa.me/8801960677463?text=হ্যালো,%20আমি%20Residential%20RDP%20/%20KVM%20VPS%20কেনার%20আগে%20কিছু%20তথ্য%20জানতে%20চাচ্ছি";

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading || streaming) return;

    // Emergency WhatsApp chip — open in new tab instead of sending to AI
    if (trimmed.includes("WhatsApp") || trimmed.includes("জরুরি")) {
      window.open(WA_LINK, "_blank", "noopener,noreferrer");
      return;
    }

    setShowChips(false);
    setInput("");

    const userMsg: Message = { id: uid(), role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setLoading(true); // show typing dots

    // Placeholder for the streaming assistant message
    const assistantId = uid();

    const abort = new AbortController();
    abortRef.current = abort;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
        signal: abort.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        const errText =
          data.error ?? "Sorry, kichu ekta problem hoyeche. Please abar try korun.";
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: errText },
        ]);
        return;
      }

      // Insert empty streaming bubble
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", streaming: true },
      ]);
      setLoading(false);
      setStreaming(true);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? ""; // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") break;
          if (payload === '"[ERROR]"') {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: "Network error. Please try again.", streaming: false }
                  : m
              )
            );
            return;
          }
          try {
            const token: string = JSON.parse(payload);
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: m.content + token }
                  : m
              )
            );
          } catch {
            // malformed chunk — skip
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setMessages((prev) => {
        // Replace streaming bubble or append error
        const hasPlaceholder = prev.some((m) => m.id === assistantId);
        if (hasPlaceholder) {
          return prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: "Network error hoyeche. Internet check kore abar try korun.", streaming: false }
              : m
          );
        }
        return [
          ...prev,
          { id: assistantId, role: "assistant", content: "Network error hoyeche. Internet check kore abar try korun." },
        ];
      });
    } finally {
      // Mark streaming bubble as done
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, streaming: false } : m
        )
      );
      setLoading(false);
      setStreaming(false);
      abortRef.current = null;
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const isBusy = loading || streaming;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="flex h-[520px] w-[360px] flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{ transformOrigin: "bottom right" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-indigo-600 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5 text-white" />
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-indigo-600 bg-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Live Support</p>
                  <p className="text-xs text-indigo-200">primevpsbd.com • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-white/70 transition hover:bg-white/20 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-50 p-4">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              {/* Typing dots only while waiting for FIRST token */}
              {loading && <TypingDots />}
              <div ref={bottomRef} />
            </div>

            {/* Quick-reply chips */}
            <AnimatePresence>
              {showChips && (
                <motion.div
                  key="chips"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden border-t border-slate-100 bg-white px-3 py-2"
                >
                  <p className="mb-1.5 text-xs text-slate-400">Quick questions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_REPLIES.map((chip) => (
                      <button
                        key={chip}
                        onClick={() => sendMessage(chip)}
                        disabled={isBusy}
                        className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-50"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input bar */}
            <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-3 py-2.5">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isBusy}
                placeholder={streaming ? "Responding..." : "Message likhun..."}
                className="flex-1 rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isBusy || !input.trim()}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ── */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isOpen
            ? "0 0 0 0px rgba(99,102,241,0.4)"
            : [
                "0 0 0 0px rgba(99,102,241,0.4)",
                "0 0 0 10px rgba(99,102,241,0)",
              ],
        }}
        transition={
          isOpen
            ? { duration: 0.2 }
            : {
                boxShadow: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeOut",
                },
              }
        }
        className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
