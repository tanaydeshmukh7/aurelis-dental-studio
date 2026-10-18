import Image from "next/image";
import Breadcrumbs, { BreadcrumbItem } from "./Breadcrumbs";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  italicTitle?: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: string;
  imageAlt?: string;
  badge?: string;
}

export default function PageHero({
  eyebrow,
  title,
  italicTitle,
  description,
  breadcrumbs,
  image,
  imageAlt,
  badge,
}: PageHeroProps) {
  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 bg-ivory border-b border-espresso/10 relative overflow-hidden">
      {/* Subtle background ambient tone */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-sand/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

        <div className={`grid grid-cols-1 ${image ? "lg:grid-cols-12 gap-10 lg:gap-14 items-center" : "max-w-4xl"}`}>
          <div className={image ? "lg:col-span-7" : ""}>
            {/* Eyebrow with sage accent line */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-5 h-[1.5px] bg-sage" />
              <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
                {eyebrow}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4rem] text-espresso font-normal tracking-tight leading-[1.08]">
              {title}{" "}
              {italicTitle && (
                <span className="italic font-light text-espresso/90 block sm:inline">
                  {italicTitle}
                </span>
              )}
            </h1>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-taupe font-normal leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {/* Optional Hero Image Frame */}
          {image && (
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-sand overflow-hidden shadow-card border border-espresso/8">
                <Image
                  src={image}
                  alt={imageAlt || title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover filter contrast-[1.02]"
                />
                {badge && (
                  <div className="absolute top-4 right-4 bg-ivory/95 backdrop-blur-sm px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-espresso font-medium border border-espresso/10 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                    <span>{badge}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
