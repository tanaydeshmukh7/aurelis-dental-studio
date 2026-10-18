import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Calendar, ArrowLeft, ArrowUpRight, Share2, Check, Sparkles } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { BLOG_ARTICLES, BlogArticle } from "@/data/blog";
import ShareButtons from "./ShareButtons";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = BLOG_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found | AURELIS Dental Studio" };

  return {
    title: `${article.title} | The Aurelis Journal`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | AURELIS Dental Studio Pune`,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

export default function SingleBlogArticlePage({ params }: Props) {
  const article = BLOG_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const relatedArticles = BLOG_ARTICLES.filter((a) =>
    article.relatedSlugs.includes(a.slug)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col">
      <SiteNavbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24">
        {/* Article Header & Metadata */}
        <article className="max-w-4xl mx-auto px-5 sm:px-8">
          <Breadcrumbs
            items={[
              { label: "The Journal", href: "/blog" },
              { label: article.category },
            ]}
          />

          <div className="mt-4 mb-6">
            <span className="text-[11px] uppercase tracking-[0.22em] text-sage font-semibold">
              {article.category}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal leading-[1.12] tracking-tight">
            {article.title}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-taupe font-normal leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author Byline & Publication Strip */}
          <div className="mt-8 pt-6 border-t border-espresso/10 flex flex-wrap items-center justify-between gap-4 text-xs text-taupe">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-sand flex items-center justify-center font-serif text-espresso text-sm border border-espresso/10">
                A
              </span>
              <div>
                <p className="font-medium text-espresso">{article.author.name}</p>
                <p className="text-[11px]">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sage" />
                <span>{article.readTime}</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-espresso/30" />
              <span>{article.publishedDate.split(" (")[0]}</span>
            </div>
          </div>
        </article>

        {/* Wide Cover Image Frame */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 mt-10 mb-14 sm:mb-20">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-sand overflow-hidden shadow-card border border-espresso/8">
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover filter contrast-[1.02]"
            />
          </div>
          <p className="text-right text-[11px] text-taupe mt-2 italic font-serif">
            {article.coverImageAlt} · AURELIS Journal Editorial
          </p>
        </div>

        {/* Article Body Content */}
        <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-10">
          {/* Introduction */}
          <p className="text-lg sm:text-xl text-espresso/90 leading-relaxed font-serif italic border-l-2 border-sage/70 pl-6 py-1">
            {article.content.intro}
          </p>

          {/* Structured Sections */}
          {article.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4 pt-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                {section.heading}
              </h2>
              {section.body.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-base sm:text-lg text-taupe leading-relaxed"
                >
                  {para}
                </p>
              ))}

              {section.keyPoints && (
                <div className="my-6 p-5 sm:p-6 bg-sand/30 border-l-2 border-sage space-y-2.5">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-espresso block">
                    Key Practical Takeaways
                  </span>
                  <ul className="space-y-2">
                    {section.keyPoints.map((point, kIdx) => (
                      <li key={kIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-espresso/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Pull Quote */}
          {article.content.pullQuote && (
            <div className="my-12 py-8 border-y border-espresso/15 text-center">
              <p className="font-serif text-2xl sm:text-3xl text-espresso font-light italic leading-snug">
                &ldquo;{article.content.pullQuote}&rdquo;
              </p>
              <span className="text-[10px] uppercase tracking-[0.25em] text-sage block mt-3 font-semibold">
                Aurelis Clinical Perspective
              </span>
            </div>
          )}

          {/* Clinical Summary */}
          <div className="bg-ivory border border-espresso/10 p-6 sm:p-8 space-y-3">
            <h3 className="font-serif text-xl text-espresso font-normal">
              In Perspective
            </h3>
            <p className="text-sm sm:text-base text-taupe leading-relaxed">
              {article.content.summary}
            </p>
          </div>

          {/* Interactive Share Buttons & Back to Blog */}
          <div className="pt-8 border-t border-espresso/10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-espresso hover:text-sage transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to The Journal</span>
            </Link>

            <ShareButtons title={article.title} />
          </div>

          {/* Medically Responsible Disclaimer */}
          <div className="p-4 bg-sand/20 border border-espresso/10 text-[11px] text-taupe leading-relaxed">
            <strong>Clinical Notice:</strong> Articles published in The Aurelis Journal are prepared for general educational guidance and oral health literacy. They do not constitute personalized diagnostic advice. For specific dental conditions, please schedule an in-person clinical assessment at our Koregaon Park studio.
          </div>

          {/* Tasteful Consultation Booking Callout */}
          <div className="mt-14 p-8 sm:p-10 bg-sand/30 border border-espresso/10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-sage">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-taupe">
                Private Consultations
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
              Have questions about your own smile?
            </h3>
            <p className="text-sm text-taupe max-w-md mx-auto leading-relaxed">
              Our clinicians take time to listen, review high-definition 3D scans, and outline conservative options in an unhurried consultation.
            </p>
            <div className="pt-2">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sage"
              >
                <span>Reserve a Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles Showcase */}
        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-24 pt-16 border-t border-espresso/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-taupe font-semibold block mb-1">
                  Further Reading
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                  Related Perspectives
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs uppercase tracking-[0.18em] text-espresso hover:text-sage transition-colors hidden sm:block font-medium"
              >
                View All Journal Articles ↗
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.slug}
                  className="bg-sand/20 border border-espresso/8 overflow-hidden group flex flex-col justify-between hover:border-sage/40 transition-colors"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
                      <Image
                        src={rel.coverImage}
                        alt={rel.coverImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-sage font-semibold">
                        {rel.category}
                      </span>
                      <h4 className="font-serif text-lg text-espresso font-normal mt-1 line-clamp-2 group-hover:text-sage transition-colors">
                        <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                      </h4>
                      <p className="mt-2 text-xs text-taupe line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="text-xs uppercase tracking-[0.18em] font-medium text-espresso group-hover:text-sage inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read Perspective</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
