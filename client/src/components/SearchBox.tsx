import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const suggestions = [
  "Pasta", "Salad", "Soup", "Chicken", "Beef", "Vegetarian",
  "Dessert", "Italian", "Chinese", "Japanese", "Mexican", "Indian",
];

interface SearchBoxProps {
  onSearch?: (query: string) => void;
  variant?: "hero" | "inline";
}

export default function SearchBox({ onSearch, variant = "inline" }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (val: string) => {
    const q = val.trim();
    if (!q) return;
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(q);
    } else {
      navigate(`/?search=${encodeURIComponent(q)}`);
    }
  };

  const isHero = variant === "hero";

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`
          relative flex items-center gap-3 rounded-2xl border transition-all duration-300
          ${focused
            ? "border-brand-400 ring-4 ring-brand-400/15 shadow-lg shadow-brand-400/10"
            : "border-surface-200 hover:border-surface-300 shadow-sm"
          }
          ${isHero ? "bg-white/95 backdrop-blur-sm" : "bg-white"}
          ${isHero ? "px-6 h-16 text-lg" : "px-4 h-12 text-base"}
        `}
      >
        <svg className={`shrink-0 ${focused ? "text-brand-500" : "text-surface-400"} transition-colors`} width={isHero ? 22 : 18} height={isHero ? 22 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => { setFocused(true); setShowSuggestions(true); }}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(query);
            if (e.key === "Escape") setShowSuggestions(false);
          }}
          placeholder={isHero ? "Search for a dish, ingredient, or cuisine..." : "Search recipes..."}
          className={`flex-1 bg-transparent outline-none placeholder-surface-400 text-surface-900 ${isHero ? "font-light" : ""}`}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="text-surface-400 hover:text-surface-600 transition-colors p-1"
          >
            <svg width={isHero ? 20 : 16} height={isHero ? 20 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filtered.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl border border-surface-200 shadow-xl overflow-hidden animate-scale-in">
          {filtered.map((s) => (
            <button
              key={s}
              onClick={() => { setQuery(s); handleSubmit(s); }}
              className="w-full text-left px-4 py-3 text-sm text-surface-700 hover:bg-brand-50 hover:text-brand-700 transition-colors flex items-center gap-3 group"
            >
              <svg className="shrink-0 text-surface-300 group-hover:text-brand-400 transition-colors" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}