import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Calendar, ArrowLeft, ArrowUpRight, Share2, Check, Sparkles } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { BLOG_ARTICLES, BlogArticle } from "@/data/blog";
import { prisma } from "@/lib/prisma";
import ShareButtons from "./ShareButtons";

interface Props {
  params: {
    slug: string;
  };
}

async function getArticle(slug: string): Promise<BlogArticle | null> {
  const staticArticle = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (staticArticle) return staticArticle;

  try {
    const dbArticle = await prisma.blogArticle.findUnique({
      where: { slug },
    });
    if (dbArticle) {
      return {
        slug: dbArticle.slug,
        title: dbArticle.title,
        excerpt: dbArticle.excerpt,
        category: (dbArticle.categorySlug as any) || "Modern Dentistry",
        readTime: dbArticle.readTime,
        publishedDate: dbArticle.publishedAt
          ? dbArticle.publishedAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          : new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        author: {
          name: dbArticle.authorName,
          role: "Clinical Specialist",
          isDemo: false,
        },
        coverImage: dbArticle.coverImage,
        coverImageAlt: dbArticle.title,
        featured: false,
        content: {
          intro: dbArticle.excerpt,
          sections: [
            {
              heading: "Clinical Overview",
              body: dbArticle.content ? dbArticle.content.split("\n\n").filter(Boolean) : [dbArticle.excerpt],
            },
          ],
          summary: "Consult with an Aurelis clinician to discuss individualized clinical protocols.",
        },
        relatedSlugs: [],
      };
    }
  } catch {}
  return null;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug);
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

export default async function SingleBlogArticlePage({ params }: Props) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const relatedArticles = BLOG_ARTICLES.filter((a) =>
    (article.relatedSlugs || []).includes(a.slug)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#DCD4C8] text-[#28231F] flex flex-col">
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
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#66866D] font-semibold">
              {article.category}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#28231F] font-normal leading-[1.12] tracking-tight">
            {article.title}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#514A42] font-normal leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author Byline & Publication Strip */}
          <div className="mt-8 pt-6 border-t border-[#B8ADA0] flex flex-wrap items-center justify-between gap-4 text-xs text-[#514A42]">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#CFC5B7] flex items-center justify-center font-serif text-[#28231F] text-sm border border-[#B8ADA0]">
                A
              </span>
              <div>
                <p className="font-medium text-[#28231F]">{article.author.name}</p>
                <p className="text-[11px] text-[#514A42]">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#66866D]" />
                <span>{article.readTime}</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-[#514A42]/30" />
              <span>{article.publishedDate.split(" (")[0]}</span>
            </div>
          </div>
        </article>

        {/* Wide Cover Image Frame */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 mt-10 mb-14 sm:mb-20">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#CFC5B7] overflow-hidden shadow-card border border-[#B8ADA0]">
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover filter contrast-[1.02]"
            />
          </div>
          <p className="text-right text-[11px] text-[#514A42] mt-2 italic font-serif">
            {article.coverImageAlt} · AURELIS Journal Editorial
          </p>
        </div>

        {/* Article Body Content */}
        <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-10">
          {/* Introduction */}
          <p className="text-lg sm:text-xl text-[#28231F]/90 leading-relaxed font-serif italic border-l-2 border-[#66866D] pl-6 py-1">
            {article.content.intro}
          </p>

          {/* Structured Sections */}
          {article.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4 pt-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#28231F] font-normal">
                {section.heading}
              </h2>
              {section.body.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-base sm:text-lg text-[#514A42] leading-relaxed"
                >
                  {para}
                </p>
              ))}

              {section.keyPoints && (
                <div className="my-6 p-5 sm:p-6 bg-[#CFC5B7]/60 border-l-2 border-[#66866D] space-y-2.5">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#28231F] block">
                    Key Practical Takeaways
                  </span>
                  <ul className="space-y-2">
                    {section.keyPoints.map((point, kIdx) => (
                      <li key={kIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#28231F]/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#66866D] mt-1.5 shrink-0" />
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
            <div className="my-12 py-8 border-y border-[#B8ADA0] text-center">
              <p className="font-serif text-2xl sm:text-3xl text-[#28231F] font-light italic leading-snug">
                &ldquo;{article.content.pullQuote}&rdquo;
              </p>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#66866D] block mt-3 font-semibold">
                Aurelis Clinical Perspective
              </span>
            </div>
          )}

          {/* Clinical Summary */}
          <div className="bg-[#CFC5B7]/50 border border-[#B8ADA0] p-6 sm:p-8 space-y-3">
            <h3 className="font-serif text-xl text-[#28231F] font-normal">
              In Perspective
            </h3>
            <p className="text-sm sm:text-base text-[#514A42] leading-relaxed">
              {article.content.summary}
            </p>
          </div>

          {/* Interactive Share Buttons & Back to Blog */}
          <div className="pt-8 border-t border-[#B8ADA0] flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#28231F] hover:text-[#66866D] transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to The Journal</span>
            </Link>

            <ShareButtons title={article.title} />
          </div>

          {/* Medically Responsible Disclaimer */}
          <div className="p-4 bg-[#CFC5B7]/40 border border-[#B8ADA0] text-[11px] text-[#514A42] leading-relaxed">
            <strong>Clinical Notice:</strong> Articles published in The Aurelis Journal are prepared for general educational guidance and oral health literacy. They do not constitute personalized diagnostic advice. For specific dental conditions, please schedule an in-person clinical assessment at our Koregaon Park studio.
          </div>

          {/* Tasteful Consultation Booking Callout */}
          <div className="mt-14 p-8 sm:p-10 bg-[#302D28] text-[#F0E9DF] border border-[#514A41] text-center space-y-4 shadow-card">
            <div className="inline-flex items-center gap-2 text-[#86A58C]">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C6BCAE]">
                Private Consultations
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F0E9DF] font-normal">
              Have questions about your own smile?
            </h3>
            <p className="text-sm text-[#C6BCAE] max-w-md mx-auto leading-relaxed">
              Our clinicians take time to listen, review high-definition 3D scans, and outline conservative options in an unhurried consultation.
            </p>
            <div className="pt-2">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#66866D] hover:bg-[#86A58C] active:bg-[#66866D] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sage"
              >
                <span>Reserve a Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles Showcase */}
        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-24 pt-16 border-t border-[#B8ADA0]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#514A42] font-semibold block mb-1">
                  Further Reading
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#28231F] font-normal">
                  Related Perspectives
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs uppercase tracking-[0.18em] text-[#28231F] hover:text-[#66866D] transition-colors hidden sm:block font-medium"
              >
                View All Journal Articles ↗
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.slug}
                  className="bg-[#CFC5B7]/50 border border-[#B8ADA0] overflow-hidden group flex flex-col justify-between hover:border-[#66866D]/50 transition-colors"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#CFC5B7]">
                      <Image
                        src={rel.coverImage}
                        alt={rel.coverImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#66866D] font-semibold">
                        {rel.category}
                      </span>
                      <h4 className="font-serif text-lg text-[#28231F] font-normal mt-1 line-clamp-2 group-hover:text-[#66866D] transition-colors">
                        <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                      </h4>
                      <p className="mt-2 text-xs text-[#514A42] line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="text-xs uppercase tracking-[0.18em] font-medium text-[#28231F] group-hover:text-[#66866D] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read Perspective</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#66866D]" />
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
