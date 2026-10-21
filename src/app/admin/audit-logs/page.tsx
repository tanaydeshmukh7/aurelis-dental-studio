"use client";

import { useState, useEffect } from "react";
import {
  History,
  Search,
  Filter,
  ShieldCheck,
  User,
  Clock,
} from "lucide-react";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("ALL");
  const [entityFilter, setEntityFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (actionFilter !== "ALL") params.append("action", actionFilter);
      if (entityFilter !== "ALL") params.append("entityType", entityFilter);
      if (search) params.append("search", search);

      const res = await fetch(`/api/admin/audit-logs?${params.toString()}`);
      if (res.ok) {
        const d = await res.json();
        setLogs(d.logs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter, entityFilter, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Immutable Studio Audit Trail
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Cryptographic ledger tracking authentication, clinical chart updates, and financial actions
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#86A58C]/15 text-[#3f5744] rounded-lg text-xs font-semibold">
          <ShieldCheck size={14} />
          <span>Tamper-Resistant Log</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E2D7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#82786E]" />
          <input
            type="text"
            placeholder="Search actor, action, entity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="px-3 py-2 bg-[#F7F5F0]/60 border border-[#E9E2D7] rounded-lg text-xs text-[#28231F] focus:outline-none focus:border-[#86A58C]"
          >
            <option value="ALL">All Entity Types</option>
            <option value="Appointment">Appointments</option>
            <option value="Patient">Patients</option>
            <option value="ClinicalNote">Clinical Notes</option>
            <option value="Invoice">Invoices</option>
            <option value="Payment">Payments</option>
            <option value="InventoryItem">Inventory</option>
            <option value="BlogArticle">Blog CMS</option>
            <option value="User">User / Auth</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Verifying audit log hashes...</p>
        </div>
      ) : logs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center space-y-3">
          <History size={36} className="mx-auto text-[#82786E]/40" />
          <h3 className="text-sm font-semibold text-[#28231F]">No Audit Entries Match</h3>
          <p className="text-xs text-[#82786E]">Try clearing your search query.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#F7F5F0]/80 text-[#82786E] uppercase tracking-wider text-[10px] border-b border-[#E9E2D7]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Timestamp</th>
                <th className="py-3.5 px-4 font-semibold">Actor & Role</th>
                <th className="py-3.5 px-4 font-semibold">Action</th>
                <th className="py-3.5 px-4 font-semibold">Entity Type</th>
                <th className="py-3.5 px-4 font-semibold">Metadata / Details</th>
                <th className="py-3.5 px-4 font-semibold">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E2D7]/60 font-mono text-[11px]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F7F5F0]/30 transition-colors">
                  <td className="py-3.5 px-4 text-[#82786E] whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="py-3.5 px-4 font-sans font-medium text-[#28231F]">
                    <div>{log.actorName}</div>
                    <span className="text-[10px] font-bold text-[#86A58C] uppercase font-mono">
                      {log.actorRole}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#F7F5F0] border border-[#E9E2D7] font-semibold text-[#28231F]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#82786E] font-sans font-medium">
                    {log.entityType}
                  </td>
                  <td className="py-3.5 px-4 max-w-md truncate text-[#82786E]">
                    {log.detailsJson || "—"}
                  </td>
                  <td className="py-3.5 px-4 text-[#82786E]">
                    {log.ipAddress || "local"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
