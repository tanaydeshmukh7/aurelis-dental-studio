"use client";

import { useState } from "react";
import { Copy, Check, MessageCircle, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    if (typeof window !== "undefined") {
      const url = `https://wa.me/?text=${encodeURIComponent(
        `${title} - AURELIS Dental Studio: ${window.location.href}`
      )}`;
      window.open(url, "_blank");
    }
  };

  const handleTwitter = () => {
    if (typeof window !== "undefined") {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(window.location.href)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.2em] text-taupe font-semibold mr-1 flex items-center gap-1">
        <Share2 className="w-3 h-3" />
        <span>Share</span>
      </span>

      <button
        onClick={handleCopy}
        className="px-3 py-1.5 border border-espresso/15 text-xs text-espresso hover:bg-sand/40 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sage"
        aria-label="Copy article link to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-sage" />
            <span className="text-sage font-medium">Link Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-taupe" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <button
        onClick={handleWhatsApp}
        className="px-3 py-1.5 border border-espresso/15 text-xs text-espresso hover:bg-sand/40 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sage"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 text-sage" />
        <span>WhatsApp</span>
      </button>

      <button
        onClick={handleTwitter}
        className="px-3 py-1.5 border border-espresso/15 text-xs text-espresso hover:bg-sand/40 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sage"
        aria-label="Share on X / Twitter"
      >
        <span>X / Twitter</span>
      </button>
    </div>
  );
}
