import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, Bot } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { profile } from "../../data/content";

// Set VITE_CHAT_API_URL in client/.env to use real AI (see step 5).
// Without it, the built-in answers below are used.
const API_URL = import.meta.env.VITE_CHAT_API_URL;

const WHATSAPP = profile.whatsapp || profile.phone;
const waLink = `https://wa.me/${WHATSAPP.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
  "Habari Ndilla, nimetoka kwenye website yako."
)}`;

const GREETING =
  "Habari! 👋 Karibu. Mimi ni msaidizi wa Ndilla. Naweza kukusaidia nini leo?\n(Hi! I can also help in English.)";

const CHIPS = ["Huduma zako", "Marketplace", "Bei", "Contact"];

// ---------- Built-in answers (used when no AI server is connected) ----------
const isSwahili = (t) =>
  /\b(habari|mambo|vipi|bei|huduma|naomba|nataka|tafadhali|asante|kozi|vitabu|kitabu|wapi|jinsi|karibu|sawa|poa|salama|msaada|gharama|nunua|soko|simu|namba|wasiliana|mawasiliano|hujambo|tovuti|sabuni)\b/i.test(
    t
  );

const rules = [
  {
    keys: ["service", "services", "huduma", "website", "web", "app", "design", "logo", "brand", "branding", "graphic", "tovuti", "work"],
    en: "Ndilla builds web apps and online stores (MERN stack), designs logos and brand graphics with Adobe Photoshop and Canva, plans branding and marketing, and creates content. Tell me what you need, or chat with him directly on WhatsApp.",
    sw: "Ndilla anatengeneza tovuti na maduka ya mtandaoni (MERN), anabuni nembo na michoro ya brand kwa Adobe Photoshop na Canva, anapanga branding na masoko, na kutengeneza maudhui. Niambie unachohitaji, au ongea naye moja kwa moja WhatsApp.",
  },
  {
    keys: ["price", "prices", "cost", "how much", "quote", "bei", "gharama"],
    en: "Prices depend on the project. For a quote, tap the WhatsApp button below, describe what you need, and Ndilla will reply with a price. Marketplace products show their prices on the card.",
    sw: "Bei inategemea mradi. Kupata bei, bonyeza kitufe cha WhatsApp hapo chini, eleza unachohitaji, naye Ndilla atakujibu na bei. Bidhaa za Marketplace zina bei kwenye kadi zake.",
  },
  {
    keys: ["course", "courses", "ebook", "e-book", "book", "books", "buy", "order", "marketplace", "kozi", "kitabu", "vitabu", "nunua", "soko", "soap", "sabuni"],
    en: "The Marketplace has courses, e-books and products like MonaSoap liquid multipurpose soap. Open the Marketplace page, pick what you want, and tap Order. Your order goes straight to Ndilla on WhatsApp.",
    sw: "Marketplace ina kozi, vitabu (e-books) na bidhaa kama sabuni ya maji ya MonaSoap. Fungua ukurasa wa Marketplace, chagua unachotaka, bonyeza Order. Oda yako inaenda moja kwa moja WhatsApp kwa Ndilla.",
  },
  {
    keys: ["contact", "whatsapp", "call", "phone", "email", "number", "simu", "wasiliana", "namba", "mawasiliano"],
    en: `You can reach Ndilla on WhatsApp or by phone at ${profile.phone}, or by email at ${profile.email}.`,
    sw: `Unaweza kumpata Ndilla WhatsApp au simu kupitia ${profile.phone}, au barua pepe ${profile.email}.`,
  },
  {
    keys: ["where", "location", "based", "wapi"],
    en: `Ndilla is based in ${profile.location}.`,
    sw: `Ndilla yuko ${profile.location}.`,
  },
  {
    keys: ["who", "about", "ndilla", "nani"],
    en: "Ndilla is a developer, graphic designer, brand strategist and content creator from Tanzania, building businesses and documenting the journey on this site. Check the About page for his story.",
    sw: "Ndilla ni msanidi programu, mbunifu wa michoro, mtaalamu wa branding na mtengeneza maudhui kutoka Tanzania. Soma ukurasa wa About kujua zaidi.",
  },
  {
    keys: ["thanks", "thank", "asante"],
    en: "You're welcome! Anything else I can help with?",
    sw: "Karibu sana! Kuna kingine ninachoweza kukusaidia?",
  },
  {
    keys: ["hello", "hi", "hey", "habari", "mambo", "vipi", "salama", "hujambo"],
    en: "Hi! 👋 I can tell you about Ndilla's services, the Marketplace, or connect you on WhatsApp. What do you need?",
    sw: "Habari! 👋 Naweza kukueleza kuhusu huduma za Ndilla, Marketplace, au kukuunganisha WhatsApp. Unahitaji nini?",
  },
];

function localReply(text) {
  const sw = isSwahili(text);
  for (const r of rules) {
    const re = new RegExp(`\\b(${r.keys.join("|")})\\b`, "i");
    if (re.test(text)) return sw ? r.sw : r.en;
  }
  return sw
    ? "Asante kwa ujumbe wako. Kwa jibu la haraka, ongea na Ndilla moja kwa moja WhatsApp kwa kubonyeza kitufe hapo chini."
    : "Thanks for your message. For a quick answer, chat with Ndilla directly on WhatsApp using the button below.";
}

async function getReply(history) {
  if (API_URL) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-12) }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) return data.reply;
      }
    } catch {
      /* fall back to built-in answers */
    }
  }
  await new Promise((r) => setTimeout(r, 700));
  return localReply(history[history.length - 1].content);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: GREETING }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [teaser, setTeaser] = useState(false);
  const endRef = useRef(null);
  const openRef = useRef(open);
  openRef.current = open;

  // Small teaser bubble a few seconds after the page loads
  useEffect(() => {
    const t = setTimeout(() => {
      if (!openRef.current) setTeaser(true);
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing, open]);

  const openChat = () => {
    setOpen(true);
    setUnread(0);
    setTeaser(false);
  };

  const send = async (raw) => {
    const text = raw.trim();
    if (!text || typing) return;

    const next = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setTyping(true);

    // The greeting is not sent, so the history always starts with the visitor
    const history = next.slice(1).map((m) => ({ role: m.role, content: m.text }));
    const reply = await getReply(history);

    setMessages((m) => [...m, { role: "assistant", text: reply }]);
    setTyping(false);
    if (!openRef.current) setUnread((u) => u + 1);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-5 sm:right-5">
      {/* Teaser bubble */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            className="absolute bottom-full right-0 mb-3 flex w-max max-w-[220px] items-start gap-2 rounded-2xl rounded-br-sm border border-[var(--border)] bg-white px-3 py-2 shadow-lg"
          >
            <button onClick={openChat} className="text-left text-xs font-medium text-[var(--navy)]">
              Habari! 👋 Una swali? Njoo tuchat.
            </button>
            <button
              onClick={() => setTeaser(false)}
              aria-label="Dismiss"
              className="text-[var(--text-muted)] hover:text-[var(--navy)]"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 bottom-3 flex h-[72vh] max-h-[540px] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-2xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[360px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-[var(--navy)] to-[var(--accent)] px-4 py-3 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Bot size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">Ndilla Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online · AI assistant
                </p>
              </div>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <FaWhatsapp size={16} />
              </a>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-2.5 overflow-y-auto bg-[var(--bg-soft)] px-3 py-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                      m.role === "user"
                        ? "rounded-br-sm bg-[var(--navy)] !text-white"
                        : "rounded-bl-sm border border-[var(--border)] bg-white !text-[var(--navy)]"
                    }`}
                  >
                    {m.text}
                  </p>
                </motion.div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {CHIPS.map((c) => (
                    <button
                      key={c}
                      onClick={() => send(c)}
                      className="rounded-full border border-[var(--accent)] bg-white px-3 py-1 text-xs font-medium text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-[var(--border)] bg-white px-3 py-2.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-[var(--border)] bg-white px-3 py-2.5"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Andika ujumbe..."
                maxLength={500}
                className="input !rounded-full !py-2 !text-[13px]"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white transition hover:bg-[var(--accent-dark)] disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </form>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#25D366] py-2 text-xs font-semibold text-white transition hover:brightness-95"
            >
              <FaWhatsapp size={14} /> Ongea na Ndilla WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      {!open && (
        <motion.button
          onClick={openChat}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open chat"
          className="relative flex items-center gap-2 rounded-full bg-[var(--navy)] px-4 py-3 text-sm font-semibold text-white shadow-xl transition-colors hover:bg-[var(--accent)]"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--accent)] opacity-25" />
          <MessageCircle size={18} />
          Njoo tuchat
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white ring-2 ring-white">
              {unread}
            </span>
          )}
        </motion.button>
      )}
    </div>
  );
}