import React, { useEffect, useRef, useState, PointerEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Bot, Sparkles } from "lucide-react";

// ====== TYPES ======
interface SupportChatWidgetProps {
  supportEmail?: string;
  websocketUrl?: string | null;
  initialPosition?: { right: number; bottom: number };
}

interface Message {
  id: number;
  author: "you" | "agent" | "system";
  text: string;
  ts: number;
}

// ====== COMPONENT ======
const SupportChatWidget: React.FC<SupportChatWidgetProps> = ({
  supportEmail = "support@example.com",
  websocketUrl = null,
  initialPosition = { right: 24, bottom: 24 },
}) => {
  // --- Position State ---
  const [pos, setPos] = useState<{ right: number; bottom: number }>(() => {
    try {
      const raw = localStorage.getItem("support_chat_pos");
      return raw ? JSON.parse(raw) : initialPosition;
    } catch {
      return initialPosition;
    }
  });

  const [open, setOpen] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // --- Chat State ---
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      author: "system",
      text: "👋 Hi there! I’m your support assistant. How can I help you today?",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll like WhatsApp
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- WebSocket (optional) ---
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!websocketUrl) return;
    try {
      const ws = new WebSocket(websocketUrl);
      ws.onmessage = (ev) => {
        try {
          const payload = JSON.parse(ev.data);
          if (payload && payload.text)
            addIncomingMessage(payload.text, payload.meta || {});
        } catch {
          addIncomingMessage(ev.data);
        }
      };
      wsRef.current = ws;
      return () => ws.close();
    } catch (e) {
      console.error("Failed to create websocket", e);
    }
  }, [websocketUrl]);

  // --- Message Helpers ---
  function pushMessage(author: Message["author"], text: string): Message {
    const msg: Message = {
      id: Date.now() + Math.random(),
      author,
      text,
      ts: Date.now(),
    };
    setMessages((m) => [...m, msg]);
    return msg;
  }

  function addIncomingMessage(text: string, meta: Record<string, any> = {}) {
    pushMessage(meta.from || "agent", text);
  }

  function handleSend() {
    if (!input.trim()) return;
    const text = input.trim();
    pushMessage("you", text);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "message", text }));
    } else {
      setTimeout(
        () => addIncomingMessage("Thanks — we'll get back to you shortly!"),
        1500
      );
    }
    setInput("");
  }

  // --- Drag Handlers ---
  useEffect(() => {
    function onPointerMove(e: PointerEvent | globalThis.PointerEvent) {
      if (!dragging || !iconRef.current) return;
      const newRight = Math.max(
        8,
        window.innerWidth - (e.clientX - dragOffset.current.x)
      );
      const newBottom = Math.max(
        8,
        window.innerHeight - (e.clientY - dragOffset.current.y)
      );
      setPos({
        right: Math.min(newRight, window.innerWidth - 40),
        bottom: Math.min(newBottom, window.innerHeight - 40),
      });
    }

    function onPointerUp() {
      if (!dragging) return;
      setDragging(false);
      localStorage.setItem("support_chat_pos", JSON.stringify(pos));
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragging, pos]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    setDragging(true);
    const iconRect = iconRef.current?.getBoundingClientRect();
    if (iconRect) {
      dragOffset.current = {
        x: e.clientX - (iconRect.left + iconRect.width / 2),
        y: e.clientY - (iconRect.top + iconRect.height / 2),
      };
    }
  }

  return (
    <div>
      {/* 🔲 Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black"
            style={{ zIndex: 9998 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 💬 Floating Chat Icon */}
      <div style={{ position: "fixed", right: pos.right, bottom: pos.bottom, zIndex: 9999 }}>
        <div
          ref={iconRef}
          onPointerDown={onPointerDown}
          className={`w-14 h-14 rounded-full p-3 flex items-center justify-center cursor-pointer select-none ${dragging ? "opacity-80" : "opacity-100"
            }`}
          onDoubleClick={() => setOpen((o) => !o)}
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              if (!dragging) setOpen((o) => !o);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full
             bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-400
             text-white font-semibold shadow-[0_4px_20px_rgba(6,182,212,0.4)]
             hover:shadow-[0_6px_25px_rgba(6,182,212,0.7)]
             border border-white/40 transition-all duration-300"
          >
            {/* Icon with glowing effect */}
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-white/30 blur-md opacity-70"></span>
              <MessageSquare
                size={20}
                className="relative z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
              />
            </div>

            {/* Support text */}
            <span className="relative z-10 tracking-wide drop-shadow-sm">
              Support
            </span>
          </motion.button>
        </div>
      </div>

      {/* 🪟 Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, translateY: 20 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            exit={{ opacity: 0, scale: 0.95, translateY: 10 }}
            transition={{ duration: 0.16 }}
            style={{
              position: "fixed",
              right: pos.right + 68,
              bottom: pos.bottom - 8,
              zIndex: 10000,
            }}
            className="w-96 max-w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header with Robot */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.6)]"
                >
                  <Bot className="text-white w-5 h-5" />
                  <Sparkles className="absolute -top-1 -right-1 text-yellow-300 animate-pulse w-3 h-3" />
                </motion.div>

                <div>
                  <div className="font-semibold text-sm text-gray-800 flex items-center gap-1">
                    AI Support Bot <span className="animate-pulse text-[10px] text-green-500">● Online</span>
                  </div>
                  <div className="text-xs text-gray-500">How can I help you today?</div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="px-4 py-3 h-64 flex flex-col gap-3 overflow-auto">
              <ul className="flex flex-col gap-3">
                {messages.map((m) => (
                  <li
                    key={m.id}
                    className={`max-w-[80%] ${m.author === "you" ? "self-end" : "self-start"
                      }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-xl ${m.author === "you"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      <div className="text-sm">{m.text}</div>
                      <div className="text-[10px] mt-1 text-gray-400 text-right">
                        {new Date(m.ts).toLocaleTimeString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div ref={chatEndRef}></div>
            </div>

            {/* Input */}
            <div className="h-20 border-t p-2 bg-white">
              <div className="flex gap-2 items-center h-full">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder="Type a message and press Enter..."
                  className="flex-1 outline-none px-3 py-2 text-sm border rounded-lg"
                />
                <button
                  onClick={handleSend}
                  className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupportChatWidget;
