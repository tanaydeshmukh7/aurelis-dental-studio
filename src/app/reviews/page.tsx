"use client";

import { useState, useEffect } from "react";
import { Star, Quote, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import PageHero from "@/components/common/PageHero";
import { DEMO_TESTIMONIALS } from "@/data/testimonials";

export default function ReviewsPage() {
  const [testimonials, setTestimonials] = useState(DEMO_TESTIMONIALS);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    treatment: "Smile Design",
    rating: 5,
    comments: "",
  });

  useEffect(() => {
    fetch("/api/public/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && data.reviews.length > 0) {
          setTestimonials(data.reviews);
        }
      })
      .catch(() => {});
  }, []);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.name.trim() || !feedbackForm.comments.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/public/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: feedbackForm.name,
          treatment: feedbackForm.treatment,
          rating: feedbackForm.rating,
          text: feedbackForm.comments,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Failed to submit reflection. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setFeedbackSubmitted(true);
    } catch {
      setErrorMessage("Network error while submitting reflection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#DCD4C8] text-[#28231F] flex flex-col">
      <SiteNavbar />

      <main className="flex-1">
        <PageHero
          eyebrow="PATIENT STORIES"
          title="Reflections on a"
          italicTitle="different dental visit."
          description="Read patient experiences regarding our acoustic clinic environment, conservative aesthetic dentistry, and collaborative clinical dialogue in Koregaon Park."
          breadcrumbs={[{ label: "Reviews" }]}
          image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85"
          imageAlt="Natural confident patient smile"
          badge="VERIFIED ATTRIBUTION"
        />

        {/* Demo Content Disclosure Banner */}
        <section className="bg-[#CFC5B7] border-b border-[#B8ADA0] py-3.5">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-xs text-[#514A42] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#66866D] shrink-0" />
              <span>
                <strong>Demonstration Showcase Notice:</strong> Testimonials below are
                structured demo examples representing various clinical disciplines for template development. Real patient reviews with verified written consent will be integrated prior to public launch.
              </span>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-20 sm:py-28 bg-[#DCD4C8]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {testimonials.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-[#CFC5B7]/60 border border-[#B8ADA0] p-8 sm:p-10 flex flex-col justify-between shadow-subtle group hover:border-[#66866D]/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      {/* 5 Stars in Champagne */}
                      <div className="flex items-center gap-1 text-[#B69A72]">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#B69A72] stroke-[#B69A72]" />
                        ))}
                      </div>

                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#66866D] font-semibold">
                        {item.treatment}
                      </span>
                    </div>

                    <Quote className="w-8 h-8 text-[#66866D]/40 mb-4" />

                    <blockquote className="font-serif text-xl sm:text-2xl text-[#28231F] font-light leading-snug tracking-tight">
                      &ldquo;{item.quote || item.text}&rdquo;
                    </blockquote>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#B8ADA0] flex items-center justify-between text-xs text-[#514A42]">
                    <div>
                      <p className="font-serif text-base text-[#28231F] font-normal">
                        {item.author}
                      </p>
                      <p className="text-[11px]">{item.location || "Pune"}</p>
                    </div>

                    <span className="text-[11px] font-serif italic text-[#514A42]/80">
                      Visit Year: {item.year || "2026"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="py-20 sm:py-28 bg-[#302D28] text-[#F0E9DF] border-t border-[#514A41]">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <div className="bg-[#24221F] p-8 sm:p-12 border border-[#514A41] shadow-card">
              <div className="text-center mb-8">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#86A58C] font-semibold block mb-1">
                  PATIENT FEEDBACK
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F0E9DF] font-normal">
                  Share your visit experience.
                </h2>
                <p className="text-xs text-[#C6BCAE] mt-1">
                  We value constructive feedback to refine our hospitality and clinical cadence.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-950/60 border border-red-700/60 text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {feedbackSubmitted ? (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#86A58C]/20 border border-[#86A58C]/40 mx-auto flex items-center justify-center text-[#86A58C]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#F0E9DF]">
                    Thank you for your feedback, {feedbackForm.name}.
                  </h3>
                  <p className="text-xs text-[#C6BCAE] max-w-sm mx-auto">
                    Your comments have been recorded for clinical director review and moderation.
                  </p>
                  <button
                    onClick={() => setFeedbackSubmitted(false)}
                    className="px-5 py-2.5 border border-[#514A41] text-xs uppercase tracking-[0.16em] text-[#F0E9DF] hover:bg-[#302D28] transition-colors"
                  >
                    Submit Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#C6BCAE] mb-1">
                        Your First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={feedbackForm.name}
                        onChange={(e) =>
                          setFeedbackForm({ ...feedbackForm, name: e.target.value })
                        }
                        placeholder="e.g. Rohini"
                        className="w-full bg-[#1C1A17] border border-[#514A41] px-3.5 py-2.5 text-sm text-[#F0E9DF] placeholder-[#82786E] focus:outline-none focus:border-[#86A58C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#C6BCAE] mb-1">
                        Treatment Received
                      </label>
                      <select
                        value={feedbackForm.treatment}
                        onChange={(e) =>
                          setFeedbackForm({ ...feedbackForm, treatment: e.target.value })
                        }
                        className="w-full bg-[#1C1A17] border border-[#514A41] px-3.5 py-2.5 text-sm text-[#F0E9DF] focus:outline-none focus:border-[#86A58C]"
                      >
                        <option value="Smile Design" className="bg-[#1C1A17] text-[#F0E9DF]">Smile Design</option>
                        <option value="Teeth Whitening" className="bg-[#1C1A17] text-[#F0E9DF]">Teeth Whitening</option>
                        <option value="Clear Aligners" className="bg-[#1C1A17] text-[#F0E9DF]">Clear Aligners</option>
                        <option value="Dental Implants" className="bg-[#1C1A17] text-[#F0E9DF]">Dental Implants</option>
                        <option value="Preventive Dentistry" className="bg-[#1C1A17] text-[#F0E9DF]">Preventive Dentistry</option>
                        <option value="General Consultation" className="bg-[#1C1A17] text-[#F0E9DF]">General Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#C6BCAE] mb-1">
                      Your Reflections
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={feedbackForm.comments}
                      onChange={(e) =>
                        setFeedbackForm({ ...feedbackForm, comments: e.target.value })
                      }
                      placeholder="Tell us about the environment, the team, and how comfortable you felt..."
                      className="w-full bg-[#1C1A17] border border-[#514A41] px-3.5 py-2.5 text-sm text-[#F0E9DF] placeholder-[#82786E] focus:outline-none focus:border-[#86A58C]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#66866D] hover:bg-[#86A58C] active:bg-[#66866D] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sage flex items-center justify-center"
                    >
                      {isSubmitting ? "Submitting Reflection..." : "Submit Visit Reflection"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
