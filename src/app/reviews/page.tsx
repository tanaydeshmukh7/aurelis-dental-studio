"use client";

import { useState } from "react";
import { Star, Quote, CheckCircle2, ShieldCheck } from "lucide-react";
import SiteNavbar from "@/components/navigation/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import PageHero from "@/components/common/PageHero";
import { DEMO_TESTIMONIALS } from "@/data/testimonials";

export default function ReviewsPage() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    treatment: "Smile Design",
    rating: 5,
    comments: "",
  });

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackForm.name.trim() && feedbackForm.comments.trim()) {
      setFeedbackSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col">
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
        <section className="bg-sand/40 border-b border-espresso/10 py-3.5">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-xs text-taupe flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sage shrink-0" />
              <span>
                <strong>Demonstration Showcase Notice:</strong> Testimonials below are
                structured demo examples representing various clinical disciplines for template development. Real patient reviews with verified written consent will be integrated prior to public launch.
              </span>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-20 sm:py-28 bg-ivory">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {DEMO_TESTIMONIALS.map((item) => (
                <div
                  key={item.id}
                  className="bg-sand/20 border border-espresso/10 p-8 sm:p-10 flex flex-col justify-between shadow-subtle group hover:border-sage/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      {/* 5 Stars in Champagne */}
                      <div className="flex items-center gap-1 text-champagne">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-champagne stroke-champagne" />
                        ))}
                      </div>

                      <span className="text-[10px] uppercase tracking-[0.2em] text-sage-dark font-semibold">
                        {item.treatment}
                      </span>
                    </div>

                    <Quote className="w-8 h-8 text-sage/40 mb-4" />

                    <blockquote className="font-serif text-xl sm:text-2xl text-espresso font-light leading-snug tracking-tight">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="mt-8 pt-6 border-t border-espresso/10 flex items-center justify-between text-xs text-taupe">
                    <div>
                      <p className="font-serif text-base text-espresso font-normal">
                        {item.author}
                      </p>
                      <p className="text-[11px]">{item.location}</p>
                    </div>

                    <span className="text-[11px] font-serif italic text-taupe/80">
                      Visit Year: {item.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback Demo Section */}
        <section className="py-20 bg-sand/30 border-t border-espresso/10">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 bg-ivory p-8 sm:p-12 border border-espresso/10 shadow-card">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-sage-dark font-semibold block mb-1">
                PATIENT FEEDBACK
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                Share your visit experience.
              </h2>
              <p className="text-xs text-taupe mt-1">
                We value constructive feedback to refine our hospitality and clinical cadence.
              </p>
            </div>

            {feedbackSubmitted ? (
              <div className="py-8 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-sage/15 mx-auto flex items-center justify-center text-sage">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-espresso">
                  Thank you for your feedback.
                </h3>
                <p className="text-xs text-taupe max-w-sm mx-auto">
                  Your comments have been recorded for clinical director review (Demo submission).
                </p>
                <button
                  onClick={() => setFeedbackSubmitted(false)}
                  className="px-5 py-2.5 border border-espresso text-xs uppercase tracking-[0.16em] hover:bg-sand/30 transition-colors"
                >
                  Submit Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
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
                      className="w-full bg-sand/20 border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
                      Treatment Received
                    </label>
                    <select
                      value={feedbackForm.treatment}
                      onChange={(e) =>
                        setFeedbackForm({ ...feedbackForm, treatment: e.target.value })
                      }
                      className="w-full bg-sand/20 border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
                    >
                      <option value="Smile Design">Smile Design</option>
                      <option value="Teeth Whitening">Teeth Whitening</option>
                      <option value="Clear Aligners">Clear Aligners</option>
                      <option value="Dental Implants">Dental Implants</option>
                      <option value="Preventive Dentistry">Preventive Dentistry</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] font-medium text-espresso mb-1">
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
                    className="w-full bg-sand/20 border border-espresso/15 px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:border-sage"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-sage hover:bg-sage-dark active:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sage"
                  >
                    Submit Visit Reflection (Demo)
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
