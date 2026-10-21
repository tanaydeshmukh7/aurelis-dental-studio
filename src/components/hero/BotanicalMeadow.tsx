"use client";

import { motion } from "framer-motion";

export default function BotanicalMeadow() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 lg:h-72 pointer-events-none overflow-hidden z-20">
      {/* Soft Luminous Sun Haze & Meadow Ambient Glow */}
      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-stone via-stone/70 to-transparent" />
      <div className="absolute right-1/4 bottom-8 w-96 h-48 bg-gradient-to-tr from-sage/15 via-champagne/10 to-transparent rounded-full blur-3xl" />

      {/* -------------------------------------------------------- */}
      {/* BUTTERFLY 1: Meadow Wildflower Flutterer                 */}
      {/* -------------------------------------------------------- */}
      <motion.div
        initial={{ x: "65%", y: "45%", opacity: 0 }}
        animate={{
          x: ["62%", "68%", "64%", "70%", "62%"],
          y: ["45%", "28%", "48%", "22%", "45%"],
          opacity: [0.85, 1, 0.9, 1, 0.85],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute z-30"
        style={{ left: "15%", bottom: "35%" }}
      >
        <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
          {/* Left Wing with natural flutter */}
          <motion.div
            animate={{ rotateY: [0, 75, 0] }}
            transition={{ duration: 0.22, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-4 sm:w-3.5 sm:h-5 bg-gradient-to-br from-champagne/90 via-ivory to-sage/70 rounded-tl-full rounded-bl-sm border border-champagne/40 origin-right shadow-sm"
          />
          {/* Butterfly Thorax */}
          <div className="w-[1.5px] h-3 sm:h-3.5 bg-espresso/70 rounded-full mx-[0.5px]" />
          {/* Right Wing with natural flutter */}
          <motion.div
            animate={{ rotateY: [0, -75, 0] }}
            transition={{ duration: 0.22, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-4 sm:w-3.5 sm:h-5 bg-gradient-to-bl from-champagne/90 via-ivory to-sage/70 rounded-tr-full rounded-br-sm border border-champagne/40 origin-left shadow-sm"
          />
        </div>
      </motion.div>

      {/* -------------------------------------------------------- */}
      {/* BUTTERFLY 2: Pearlescent Atmospheric Drifter              */}
      {/* -------------------------------------------------------- */}
      <motion.div
        initial={{ x: "85%", y: "70%", opacity: 0 }}
        animate={{
          x: ["80%", "74%", "82%", "76%", "80%"],
          y: ["70%", "52%", "68%", "46%", "70%"],
          opacity: [0.75, 0.95, 0.8, 0.95, 0.75],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute z-30 hidden sm:block"
        style={{ right: "12%", bottom: "45%" }}
      >
        <div className="relative w-5 h-5 flex items-center justify-center scale-90">
          <motion.div
            animate={{ rotateY: [0, 72, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2.5 h-3.5 bg-gradient-to-br from-white via-sage/80 to-champagne/80 rounded-tl-full rounded-bl-sm border border-sage/40 origin-right shadow-sm"
          />
          <div className="w-[1px] h-2.5 bg-espresso/60 rounded-full mx-[0.5px]" />
          <motion.div
            animate={{ rotateY: [0, -72, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2.5 h-3.5 bg-gradient-to-bl from-white via-sage/80 to-champagne/80 rounded-tr-full rounded-br-sm border border-sage/40 origin-left shadow-sm"
          />
        </div>
      </motion.div>

      {/* -------------------------------------------------------- */}
      {/* BOTANICAL MEADOW SILHOUETTE & WILDFLOWERS                */}
      {/* -------------------------------------------------------- */}
      <svg
        viewBox="0 0 1440 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="grassGradBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86A58C" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#CFC5B7" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#DCD4C8" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="grassGradFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#66866D" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#86A58C" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#CFC5B7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#DCD4C8" stopOpacity="1" />
          </linearGradient>

          <radialGradient id="sunGlint" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#B69A72" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B69A72" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Back Grass Blades Silhouette (Soft Atmospheric Depth) */}
        <path
          d="M0,240 L0,180 Q60,130 110,175 Q160,110 210,165 Q280,120 330,170 Q400,95 450,160 Q520,115 570,175 Q640,90 700,165 Q770,110 820,170 Q890,95 950,165 Q1020,125 1070,175 Q1140,85 1200,160 Q1270,105 1320,170 Q1380,120 1440,165 L1440,240 Z"
          fill="url(#grassGradBack)"
        />

        {/* Foreground Delicate Grass Blades */}
        <g stroke="#6F8E75" strokeWidth="1.2" strokeLinecap="round" opacity="0.65">
          {/* Left Cluster */}
          <path d="M40,240 Q45,160 30,120" />
          <path d="M55,240 Q70,150 85,110" />
          <path d="M70,240 Q65,165 50,135" />
          <path d="M95,240 Q115,160 130,105" />
          <path d="M120,240 Q110,155 90,125" />
          <path d="M145,240 Q160,160 175,115" />
          <path d="M180,240 Q175,170 160,140" />

          {/* Mid Meadow Blades */}
          <path d="M320,240 Q335,160 350,110" />
          <path d="M345,240 Q340,155 325,125" />
          <path d="M375,240 Q395,150 415,95" />
          <path d="M405,240 Q400,165 385,130" />
          <path d="M440,240 Q460,165 480,115" />

          {/* Center-Right Under Tooth Blades */}
          <path d="M680,240 Q695,155 710,100" />
          <path d="M710,240 Q705,160 690,120" />
          <path d="M740,240 Q760,150 780,90" />
          <path d="M770,240 Q765,165 750,130" />
          <path d="M810,240 Q830,160 850,105" />
          <path d="M845,240 Q840,170 825,135" />

          {/* Right Edge Cluster */}
          <path d="M1020,240 Q1040,150 1060,95" />
          <path d="M1055,240 Q1050,165 1035,125" />
          <path d="M1110,240 Q1130,155 1150,105" />
          <path d="M1170,240 Q1165,165 1150,130" />
          <path d="M1230,240 Q1250,150 1270,95" />
          <path d="M1295,240 Q1290,160 1275,120" />
          <path d="M1360,240 Q1380,155 1400,105" />
        </g>

        {/* Delicate Wildflower Chamomile Blossoms */}
        <g>
          {/* Flower 1 - Left foreground */}
          <g transform="translate(85, 110)">
            <circle cx="0" cy="0" r="14" fill="url(#sunGlint)" />
            <circle cx="-5" cy="-2" r="3.2" fill="#FFFFFF" opacity="0.95" />
            <circle cx="5" cy="-2" r="3.2" fill="#FFFFFF" opacity="0.95" />
            <circle cx="-2" cy="-5" r="3.2" fill="#FFFFFF" opacity="0.95" />
            <circle cx="2" cy="-5" r="3.2" fill="#FFFFFF" opacity="0.95" />
            <circle cx="-4" cy="4" r="3.2" fill="#FFFFFF" opacity="0.95" />
            <circle cx="4" cy="4" r="3.2" fill="#FFFFFF" opacity="0.95" />
            <circle cx="0" cy="0" r="2.8" fill="#B69A72" />
          </g>

          {/* Flower 2 - Mid left */}
          <g transform="translate(240, 140) scale(0.85)">
            <circle cx="-4" cy="-2" r="3" fill="#FFFFFF" opacity="0.92" />
            <circle cx="4" cy="-2" r="3" fill="#FFFFFF" opacity="0.92" />
            <circle cx="0" cy="-4.5" r="3" fill="#FFFFFF" opacity="0.92" />
            <circle cx="-3" cy="3.5" r="3" fill="#FFFFFF" opacity="0.92" />
            <circle cx="3" cy="3.5" r="3" fill="#FFFFFF" opacity="0.92" />
            <circle cx="0" cy="0" r="2.4" fill="#B69A72" />
          </g>

          {/* Flower 3 - Center foreground under tooth */}
          <g transform="translate(620, 155) scale(0.9)">
            <circle cx="0" cy="0" r="12" fill="url(#sunGlint)" />
            <circle cx="-4" cy="-2" r="3" fill="#FFFFFF" opacity="0.95" />
            <circle cx="4" cy="-2" r="3" fill="#FFFFFF" opacity="0.95" />
            <circle cx="0" cy="-4.5" r="3" fill="#FFFFFF" opacity="0.95" />
            <circle cx="-3" cy="3.5" r="3" fill="#FFFFFF" opacity="0.95" />
            <circle cx="3" cy="3.5" r="3" fill="#FFFFFF" opacity="0.95" />
            <circle cx="0" cy="0" r="2.5" fill="#B69A72" />
          </g>

          {/* Flower 4 - Near right edge */}
          <g transform="translate(780, 92)">
            <circle cx="0" cy="0" r="16" fill="url(#sunGlint)" />
            <circle cx="-5" cy="-2" r="3.4" fill="#FFFFFF" opacity="0.95" />
            <circle cx="5" cy="-2" r="3.4" fill="#FFFFFF" opacity="0.95" />
            <circle cx="-2" cy="-5" r="3.4" fill="#FFFFFF" opacity="0.95" />
            <circle cx="2" cy="-5" r="3.4" fill="#FFFFFF" opacity="0.95" />
            <circle cx="-4" cy="4" r="3.4" fill="#FFFFFF" opacity="0.95" />
            <circle cx="4" cy="4" r="3.4" fill="#FFFFFF" opacity="0.95" />
            <circle cx="0" cy="0" r="3" fill="#B69A72" />
          </g>

          {/* Flower 5 - Far right */}
          <g transform="translate(1150, 108) scale(0.8)">
            <circle cx="-4" cy="-2" r="3" fill="#FFFFFF" opacity="0.9" />
            <circle cx="4" cy="-2" r="3" fill="#FFFFFF" opacity="0.9" />
            <circle cx="0" cy="-4" r="3" fill="#FFFFFF" opacity="0.9" />
            <circle cx="-3" cy="3" r="3" fill="#FFFFFF" opacity="0.9" />
            <circle cx="3" cy="3" r="3" fill="#FFFFFF" opacity="0.9" />
            <circle cx="0" cy="0" r="2.2" fill="#B69A72" />
          </g>
        </g>
      </svg>
    </div>
  );
}
