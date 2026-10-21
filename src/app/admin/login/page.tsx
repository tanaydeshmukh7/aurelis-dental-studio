"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      router.push(from);
      router.refresh();
    } catch {
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleQuickFill = (presetEmail: string, presetPass: string) => {
    setEmail(presetEmail);
    setPassword(presetPass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Studio Brand Header */}
        <div className="text-center space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#86A58C] font-semibold">
            AURELIS DENTAL STUDIO · CLINIC MANAGEMENT
          </span>
          <h2 className="text-3xl font-serif font-normal text-[#28231F] tracking-tight">
            Practitioner &amp; Staff Portal
          </h2>
          <p className="text-xs text-[#82786E]">
            Sign in with your verified administrative or clinical credentials
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#E9E2D7] rounded-none sm:px-10">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#28231F] mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="practitioner@aurelisdental.in"
                  className="w-full bg-[#F7F5F0]/50 border border-[#E9E2D7] pl-10 pr-3.5 py-2.5 text-sm text-[#28231F] focus:outline-none focus:border-[#86A58C] transition-colors"
                />
                <Mail className="w-4 h-4 text-[#82786E] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#28231F] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#F7F5F0]/50 border border-[#E9E2D7] pl-10 pr-3.5 py-2.5 text-sm text-[#28231F] focus:outline-none focus:border-[#86A58C] transition-colors"
                />
                <Lock className="w-4 h-4 text-[#82786E] absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#82786E]">
              <span className="flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#86A58C]" />
                <span>Encrypted Session (24h)</span>
              </span>
              <a
                href="#demo-credentials"
                className="text-[#86A58C] hover:underline"
              >
                Need demo credentials?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#86A58C] hover:bg-[#86A58C]/90 text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Studio Admin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Preset Demo Access Credentials */}
          <div id="demo-credentials" className="mt-8 pt-6 border-t border-[#E9E2D7]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#82786E] font-semibold">
                Quick Evaluation Presets
              </span>
              <span className="text-[10px] text-[#86A58C]">Click role to autofill</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickFill("admin@aurelisdental.in", "Aurelis@2026!")}
                className="p-2 rounded border border-[#E9E2D7] bg-[#F7F5F0]/80 hover:border-[#86A58C] text-left transition-colors"
              >
                <div className="font-semibold text-[#28231F]">Super Admin</div>
                <div className="text-[9px] text-[#82786E]">Dr. Siddharth Mehta</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("manager@aurelisdental.in", "Manager@2026!")}
                className="p-2 rounded border border-[#E9E2D7] bg-[#F7F5F0]/80 hover:border-[#86A58C] text-left transition-colors"
              >
                <div className="font-semibold text-[#28231F]">Clinic Manager</div>
                <div className="text-[9px] text-[#82786E]">Natasha Rao</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("dr.ananya@aurelisdental.in", "Dentist@2026!")}
                className="p-2 rounded border border-[#E9E2D7] bg-[#F7F5F0]/80 hover:border-[#86A58C] text-left transition-colors"
              >
                <div className="font-semibold text-[#28231F]">Lead Dentist</div>
                <div className="text-[9px] text-[#82786E]">Dr. Ananya Roy</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("reception@aurelisdental.in", "Reception@2026!")}
                className="p-2 rounded border border-[#E9E2D7] bg-[#F7F5F0]/80 hover:border-[#86A58C] text-left transition-colors"
              >
                <div className="font-semibold text-[#28231F]">Receptionist</div>
                <div className="text-[9px] text-[#82786E]">Aarav Kulkarni</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("accounts@aurelisdental.in", "Accounts@2026!")}
                className="p-2 rounded border border-[#E9E2D7] bg-[#F7F5F0]/80 hover:border-[#86A58C] text-left transition-colors"
              >
                <div className="font-semibold text-[#28231F]">Accountant</div>
                <div className="text-[9px] text-[#82786E]">Rajesh Varma</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("editor@aurelisdental.in", "Editor@2026!")}
                className="p-2 rounded border border-[#E9E2D7] bg-[#F7F5F0]/80 hover:border-[#86A58C] text-left transition-colors"
              >
                <div className="font-semibold text-[#28231F]">Content Editor</div>
                <div className="text-[9px] text-[#82786E]">Pooja Sengupta</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-xs text-[#82786E]">
          <Link href="/" className="hover:text-[#28231F] transition-colors">
            ← Return to Aurelis Dental Studio Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center text-xs uppercase tracking-[0.2em] text-[#82786E]">Loading portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
