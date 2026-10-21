"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowUpRight, Clock, Check, Send } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/data/blog";

export default function BlogLandingPage() {
  const [articles, setArticles] = useState(BLOG_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    fetch("/api/public/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.blog && data.blog.length > 0) {
          setArticles(data.blog);
        }
      })
      .catch(() => {});
  }, []);

  const featuredArticle = useMemo(() => {
    return articles.find((a: any) => a.featured) || articles[0];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article: any) => {
      const matchesCategory =
        selectedCategory === "All Articles" ||
        article.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#DCD4C8] text-[#28231F] flex flex-col">
      <SiteNavbar />

      <main className="flex-1">
        {/* Magazine Editorial Hero */}
        <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 bg-[#DCD4C8] border-b border-[#B8ADA0] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <Breadcrumbs items={[{ label: "The Journal" }]} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column Editorial Typography */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-5 h-[1.5px] bg-[#66866D]" />
                  <span className="text-[11px] tracking-[0.25em] text-[#514A42] uppercase font-semibold">
                    THE AURELIS JOURNAL
                  </span>
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.75rem] text-[#28231F] font-normal tracking-tight leading-[1.06]">
                  A little more about <br />
                  <span className="italic font-light text-[#28231F]/90">
                    your smile.
                  </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-[#514A42] font-normal leading-relaxed max-w-xl">
                  Thoughtful perspectives on oral health, modern dentistry,
                  everyday care, and feeling confident in your smile.
                </p>

                {/* Search Bar */}
                <div className="mt-8 max-w-md relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles by topic, treatment, or habit..."
                    className="w-full bg-[#CFC5B7] border border-[#B8ADA0] pl-10 pr-4 py-3 text-sm text-[#28231F] placeholder:text-[#514A42]/70 focus:bg-[#E9E2D7] focus:outline-none focus:border-[#66866D] transition-colors"
                  />
                  <Search className="w-4 h-4 text-[#514A42] absolute left-3.5 top-3.5" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-3 text-xs text-[#514A42] hover:text-[#28231F]"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column Hero Photographic Framing */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto bg-[#CFC5B7] overflow-hidden shadow-card border border-[#B8ADA0]">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                    alt="Editorial portrait representing thoughtful oral care"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover filter contrast-[1.02] hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24221F]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 text-[#F0E9DF]">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#86A58C] block mb-1">
                      Aurelis Editorial
                    </span>
                    <p className="font-serif italic text-base">
                      &ldquo;Understanding the science of your smile changes how you care for it.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Featured Article Section */}
        {featuredArticle && searchQuery === "" && selectedCategory === "All Articles" && (
          <section className="py-16 sm:py-20 bg-[#CFC5B7]/60 border-b border-[#B8ADA0]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#66866D]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#514A42] font-semibold">
                  Featured Reading
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#DCD4C8] border border-[#B8ADA0] p-6 sm:p-10 lg:p-12 shadow-card">
                <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#CFC5B7] overflow-hidden border border-[#B8ADA0]/60">
                  <Image
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.coverImageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#66866D] font-semibold">
                      {featuredArticle.category}
                    </span>

                    <h2 className="font-serif text-2xl sm:text-4xl text-[#28231F] font-normal leading-snug mt-2">
                      <Link
                        href={`/blog/${featuredArticle.slug}`}
                        className="hover:text-[#66866D] transition-colors"
                      >
                        {featuredArticle.title}
                      </Link>
                    </h2>

                    <p className="mt-4 text-sm sm:text-base text-[#514A42] leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="mt-6 pt-4 border-t border-[#B8ADA0] flex items-center justify-between text-xs text-[#514A42]">
                      <span>{featuredArticle.author.name}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#66866D]" />
                        <span>{featuredArticle.readTime}</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-8">
                    <Link
                      href={`/blog/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#66866D] hover:bg-[#86A58C] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sage"
                    >
                      <span>Read Article</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category Filters Bar with Sage Active State */}
        <section className="py-8 bg-[#DCD4C8]/95 border-b border-[#B8ADA0] sticky top-[73px] z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
              {BLOG_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.16em] whitespace-nowrap transition-all border ${
                    selectedCategory === category
                      ? "bg-[#66866D] text-white border-[#66866D] shadow-sage font-medium"
                      : "bg-[#CFC5B7]/70 text-[#514A42] border-[#B8ADA0] hover:border-[#66866D] hover:text-[#28231F]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="text-xs text-[#514A42] hidden sm:block">
              Showing <strong>{filteredArticles.length}</strong> articles
            </div>
          </div>
        </section>

        {/* Responsive Article Grid */}
        <section className="py-16 sm:py-24 bg-[#DCD4C8]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center max-w-md mx-auto">
                <p className="font-serif text-2xl text-[#28231F]">
                  No articles matched your search.
                </p>
                <p className="text-xs text-[#514A42] mt-2">
                  Try clearing your search terms or selecting another category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Articles");
                  }}
                  className="mt-6 px-5 py-2.5 bg-[#66866D] text-white text-xs uppercase tracking-[0.18em]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {filteredArticles.map((article) => (
                  <article
                    key={article.slug}
                    className="bg-[#CFC5B7]/50 border border-[#B8ADA0] flex flex-col justify-between group hover:border-[#66866D]/50 transition-all duration-300"
                  >
                    <div>
                      {/* Thumbnail Frame */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#CFC5B7]">
                        <Image
                          src={article.coverImage}
                          alt={article.coverImageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 filter saturate-[0.96]"
                        />
                        <div className="absolute top-3 left-3 bg-[#DCD4C8]/95 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[#66866D] font-medium border border-[#B8ADA0]">
                          {article.category}
                        </div>
                      </div>

                      {/* Content Block */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-[11px] text-[#514A42] mb-2.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#66866D]" />
                            <span>{article.readTime}</span>
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[#66866D]" />
                          <span>{article.author.role}</span>
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl text-[#28231F] font-normal group-hover:text-[#66866D] transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blog/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="mt-3 text-xs sm:text-sm text-[#514A42] leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="px-6 pb-6 pt-2 border-t border-[#B8ADA0] flex items-center justify-between">
                      <span className="text-[11px] text-[#514A42]/80 italic font-serif">
                        {article.publishedDate.split(" (")[0]}
                      </span>

                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-[#28231F] group-hover:text-[#66866D] transition-colors"
                      >
                        <span>Read</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#66866D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription UI (Clearly Marked Demo) */}
        <section className="py-20 bg-[#302D28] text-[#F0E9DF] border-t border-[#514A41]">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#86A58C] font-semibold block mb-2">
              THE AURELIS DISPATCH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F0E9DF] font-normal">
              Gentle oral perspectives in your inbox.
            </h2>
            <p className="mt-3 text-sm text-[#C6BCAE] max-w-md mx-auto leading-relaxed">
              Curated perspectives on smile care, modern biomimetic dentistry, and
              patient wellness. Issued once monthly.
            </p>

            <div className="mt-8 max-w-md mx-auto">
              {newsletterSubscribed ? (
                <div className="p-4 bg-[#24221F] border border-[#86A58C]/40 text-xs text-[#F0E9DF] flex items-center justify-center gap-2 animate-fade-in">
                  <Check className="w-4 h-4 text-[#86A58C]" />
                  <span>
                    Thank you. Demo subscription noted (no real emails stored).
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-[#1C1A17] border border-[#514A41] px-4 py-3 text-xs text-[#F0E9DF] placeholder:text-[#82786E] focus:outline-none focus:border-[#86A58C]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#66866D] hover:bg-[#86A58C] text-white font-semibold text-xs uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 shadow-sage"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>

            <p className="text-[10px] text-[#C6BCAE]/60 mt-3">
              * Design demonstration. In production, this integrates with your newsletter service (Substack, Mailchimp, or Klaviyo).
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
