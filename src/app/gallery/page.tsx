"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, GalleryItem } from "@/data/gallery";

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>("All Spaces");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch("/api/public/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.gallery && data.gallery.length > 0) {
          setItems(data.gallery);
        }
      })
      .catch(() => {});
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All Spaces") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <div className="min-h-screen bg-[#DCD4C8] text-espresso flex flex-col">
      <SiteNavbar />

      <main className="flex-1">
        {/* Gallery Header */}
        <section className="pt-28 sm:pt-36 pb-14 bg-[#DCD4C8] border-b border-[#B8ADA0]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <Breadcrumbs items={[{ label: "Gallery" }]} />

            <div className="max-w-3xl mt-4">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-5 h-[1.5px] bg-sage" />
                <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
                  VISUAL ARCHIVE
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl text-espresso font-normal tracking-tight">
                The Studio &amp; Atelier Gallery.
              </h1>

              <p className="mt-4 text-base sm:text-lg text-taupe leading-relaxed">
                An editorial look into our Koregaon Park clinic spaces, digital diagnostics
                lab, peaceful consultation lounges, and natural smile craftsmanship.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar with Sage Green Active State */}
        <section className="py-6 bg-[#CFC5B7]/95 border-b border-[#B8ADA0] sticky top-[73px] z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.16em] whitespace-nowrap transition-all border ${
                    activeCategory === cat
                      ? "bg-sage text-white border-sage shadow-sage font-medium"
                      : "bg-transparent text-taupe border-[#B8ADA0] hover:border-sage hover:text-espresso"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs text-taupe hidden sm:block">
              <strong>{filteredItems.length}</strong> photographs
            </div>
          </div>
        </section>

        {/* Rich Editorial Image Grid */}
        <section className="py-16 sm:py-24 bg-[#DCD4C8]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className="bg-[#CFC5B7] border border-[#B8ADA0] overflow-hidden group cursor-pointer hover:border-sage shadow-card transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] w-full bg-stone-dark overflow-hidden border-b border-[#B8ADA0]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02] brightness-[0.96]"
                    />
                    <div className="absolute top-3 left-3 bg-[#DCD4C8]/95 backdrop-blur-sm px-2.5 py-0.5 text-[9px] uppercase tracking-[0.18em] text-sage-dark font-medium border border-[#B8ADA0]">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-lg text-espresso font-normal group-hover:text-sage-dark transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-taupe line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox / Full Photo Modal */}
        {selectedPhoto && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/80 backdrop-blur-md animate-fade-in"
          >
            <div className="absolute inset-0" onClick={() => setSelectedPhoto(null)} />

            <div className="relative max-w-4xl w-full bg-ivory shadow-2xl z-10 border border-espresso/10 overflow-hidden">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-ivory/90 hover:bg-espresso hover:text-white transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-sand overflow-hidden">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-sage-dark font-semibold">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-serif text-2xl text-espresso font-normal mt-0.5">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-taupe mt-1 max-w-xl">
                    {selectedPhoto.caption}
                  </p>
                </div>

                <Link
                  href="/book-appointment"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-6 py-3 bg-sage hover:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center shrink-0 shadow-sage"
                >
                  Visit The Studio
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
