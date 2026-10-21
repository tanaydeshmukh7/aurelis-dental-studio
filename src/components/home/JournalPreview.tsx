import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { BLOG_ARTICLES } from "@/data/blog";

export default function JournalPreview() {
  const previewArticles = BLOG_ARTICLES.slice(0, 3);

  return (
    <section className="py-24 sm:py-32 bg-[#DCD4C8] border-t border-[#B8ADA0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-[#B8ADA0]">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1.5px] bg-sage" />
              <span className="text-[11px] tracking-[0.25em] text-taupe uppercase font-semibold">
                THE AURELIS JOURNAL
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal tracking-tight">
              A little more about <br />
              <span className="italic font-light">your smile.</span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-espresso hover:text-sage-dark transition-colors border-b border-espresso/20 pb-1"
            >
              <span>Explore All Perspectives</span>
              <ArrowUpRight className="w-4 h-4 text-sage" />
            </Link>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {previewArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-[#CFC5B7] border border-[#B8ADA0] flex flex-col justify-between group hover:border-sage transition-all duration-300 shadow-subtle"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-dark border-b border-[#B8ADA0]">
                  <Image
                    src={article.coverImage}
                    alt={article.coverImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.96]"
                  />
                  <div className="absolute top-3 left-3 bg-[#DCD4C8]/95 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-sage-dark font-medium border border-[#B8ADA0] shadow-sm">
                    {article.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] text-taupe mb-2">
                    <Clock className="w-3 h-3 text-sage" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-espresso font-normal group-hover:text-sage-dark transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-taupe leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#B8ADA0] flex items-center justify-between">
                <span className="text-[11px] font-serif italic text-taupe">
                  {article.author.role.split(" (")[0]}
                </span>
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-xs uppercase tracking-[0.18em] font-medium text-espresso group-hover:text-sage-dark inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sage" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
