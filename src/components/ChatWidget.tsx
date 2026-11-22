"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

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
  "রেসিডেন্সিয়াল RDP-এর দাম কত?",
  "IP কি ১০০% ডেডিকেটেড?",
  "বিকাশ বা নগদে পেমেন্ট করব কীভাবে?",
  "IP ফ্ল্যাগ হলে ফ্রি সোয়াপ পাব?",
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
      transition={{ duration: 0.2 }}
    >
      {!isUser && (
        <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-2xs ${
          isUser
            ? "rounded-br-sm bg-blue-600 text-white"
            : "rounded-bl-sm bg-white text-slate-800 ring-1 ring-slate-200/80"
        }`}
        style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
      >
        {msg.content || (msg.streaming ? "" : "…")}
        {msg.streaming && <Cursor />}
      </div>
    </motion.div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <motion.div
      className="flex justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Bot className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-2xs ring-1 ring-slate-200/80">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-1.5 w-1.5 rounded-full bg-blue-500"
              animate={{ y: [0, -4, 0] }}
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
        "আসসালামু আলাইকুম! আমি primavps-এর AI অ্যাসিস্ট্যান্ট। প্ল্যান, IP বা পেমেন্ট নিয়ে যেকোনো প্রশ্ন করুন—আর সরাসরি বনানী টিমের সাথে কথা বলতে ওপরের WhatsApp বাটনে ক্লিক করুন।",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [showChips, setShowChips] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const whatsappNumber = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801960677463"
  ).replace(/[^0-9]/g, "");

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "হ্যালো primavps, আমি Residential ISP RDP / VPS কেনার আগে কিছু তথ্য জানতে চাচ্ছি।",
  )}`;

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpen);
    return () => window.removeEventListener("open-chat", handleOpen);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading || streaming) return;

    setShowChips(false);
    setInput("");

    const userMsg: Message = { id: uid(), role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setLoading(true);

    const assistantId = uid();
    const abort = new AbortController();
    abortRef.current = abort;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
        signal: abort.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        const errText =
          data.error ??
          "দুঃখিত, একটু সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: errText },
        ]);
        return;
      }

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
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") break;
          if (payload === '"[ERROR]"') {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? {
                      ...m,
                      content:
                        "নেটওয়ার্ক সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
                      streaming: false,
                    }
                  : m,
              ),
            );
            return;
          }
          try {
            const token: string = JSON.parse(payload);
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: m.content + token } : m,
              ),
            );
          } catch {
            // malformed chunk — skip
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      const errMsg =
        "নেটওয়ার্ক সংযোগে সমস্যা হয়েছে। ইন্টারনেট চেক করে আবার চেষ্টা করুন।";
      setMessages((prev) => {
        const hasPlaceholder = prev.some((m) => m.id === assistantId);
        if (hasPlaceholder) {
          return prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: errMsg, streaming: false }
              : m,
          );
        }
        return [
          ...prev,
          { id: assistantId, role: "assistant", content: errMsg },
        ];
      });
    } finally {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, streaming: false } : m,
        ),
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
    <div className="fixed right-4 bottom-28 z-50 flex flex-col items-end gap-3 md:right-5 md:bottom-5">
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="flex h-[min(520px,calc(100dvh-6.5rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl sm:w-[370px]"
            style={{ transformOrigin: "bottom right" }}
          >
            {/* Header — Brand Blue + Permanent WhatsApp Escalation */}
            <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                  <Bot className="h-5 w-5 text-white" />
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-blue-600 bg-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">
                    primavps সাপোর্ট
                  </p>
                  <p className="text-[11px] text-blue-100">
                    AI অ্যাসিস্ট্যান্ট · অনলাইন
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp-এ বনানী টিমের সাথে কথা বলুন"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs transition-colors hover:bg-emerald-400"
                >
                  <FaWhatsapp size={13} />
                  <span>WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer rounded-lg p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-50/80 p-4">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
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
                  className="overflow-hidden border-t border-slate-100 bg-white px-3.5 py-2.5"
                >
                  <p className="mb-1.5 text-[11px] font-medium text-slate-400">
                    সাধারণ প্রশ্নসমূহ:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_REPLIES.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => sendMessage(chip)}
                        disabled={isBusy}
                        className="cursor-pointer rounded-full border border-blue-200/80 bg-blue-50/70 px-3 py-1 text-[11.5px] font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100/80 disabled:opacity-50"
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
                placeholder={
                  streaming ? "উত্তর লেখা হচ্ছে..." : "আপনার প্রশ্ন লিখুন..."
                }
                className="flex-1 rounded-xl bg-slate-100 px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-500/30 disabled:opacity-60 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => sendMessage(input)}
                disabled={isBusy || !input.trim()}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sleek SVG Floating Launcher Button (56px) ── */}
      <div className="group relative flex items-center">
        {/* Subtle Hover Label when closed */}
        {!isOpen && (
          <span className="pointer-events-none mr-2.5 hidden rounded-full border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:inline-block translate-x-1">
            সাপোর্ট লাগবে?
          </span>
        )}

        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close chat" : "Open live support chat"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-4 ring-white/80 transition-colors hover:bg-blue-700 focus:outline-none"
        >
          {/* Online Green Pulse Dot (visible when closed) */}
          {!isOpen && (
            <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
            </span>
          )}

          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  {/* Speech Bubble */}
                  <path
                    d="M12 3C7.03 3 3 6.72 3 11.3c0 1.85.66 3.56 1.77 4.94L3.8 20.4a.5.5 0 0 0 .62.6l4.02-1.15A9.6 9.6 0 0 0 12 19.6c4.97 0 9-3.72 9-8.3S16.97 3 12 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* 3 Subtle Animated Typing Dots */}
                  {[8.5, 12, 15.5].map((cx, i) => (
                    <motion.circle
                      key={cx}
                      cx={cx}
                      cy="11.3"
                      r="1.25"
                      fill="currentColor"
                      animate={{ opacity: [0.35, 1, 0.35], y: [0, -1.2, 0] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        delay: i * 0.22,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
