export default function TrustStrip() {
  const pillars = [
    {
      label: "Personalised consultations",
      detail: "Unhurried, private diagnostic sessions",
    },
    {
      label: "Modern treatment planning",
      detail: "3D intraoral digital precision",
    },
    {
      label: "Patient-first care",
      detail: "Respecting your comfort & cadence",
    },
    {
      label: "Preventive & cosmetic dentistry",
      detail: "Preserving biological tooth structure",
    },
  ];

  return (
    <section id="trust" className="border-y border-[#514A41] bg-[#302D28] py-7 sm:py-8 text-[#F0E9DF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#514A41]">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.label}
              className={`flex flex-col justify-center ${
                idx > 0 ? "pt-4 sm:pt-0 sm:pl-6 lg:pl-8" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                <span className="font-serif text-sm sm:text-base font-normal text-[#F0E9DF] leading-snug">
                  {pillar.label}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#C6BCAE] tracking-normal pl-3.5">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
