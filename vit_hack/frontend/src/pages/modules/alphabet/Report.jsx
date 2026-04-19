import { useEffect, useState } from "react";
import { reportApi } from "../../../api/reportApi";

export default function Report() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await reportApi.getReport(); // ✅ FIXED (no userId)
      console.log("REPORT DATA:", data); // debug
      setReport(data);
    } catch (err) {
      console.error("Report error:", err);
      setError(err.message);
    }
  };

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500 text-lg font-[Lexend,OpenDyslexic,sans-serif]">
        ❌ {error}
      </p>
    );
  }

  if (!report) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600 font-[Lexend,OpenDyslexic,sans-serif]">
        Loading...
      </p>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-80 h-80 bg-white/20 rounded-full blur-3xl top-[-80px] left-[-80px]"></div>
      <div className="absolute w-80 h-80 bg-[#a18cd1]/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]"></div>

      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-[#dbeafe]/80">

        <h1 className="text-3xl font-semibold mb-6 text-center text-[#0f172a] tracking-wide font-[Lexend,OpenDyslexic,sans-serif]">
          📊 Your Progress Report
        </h1>

        <div className="space-y-4">

          <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e0e7ff]">
            <p className="text-[#475569]">❌ Initial Mistakes</p>
            <p className="text-xl font-semibold">{report.total_mistakes}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0]">
            <p className="text-[#166534]">✅ Correct in Final</p>
            <p className="text-xl font-semibold text-[#16a34a]">
              {report.correct_in_final}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#eef2ff] to-[#e0e7ff] text-center">
            <p className="text-[#4f46e5]">🌟 Improvement</p>
            <p className="text-2xl font-bold text-[#4338ca]">
              {report.improved}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#fff7ed] border border-[#fed7aa]">
            <p className="text-[#9a3412]">⚠️ Remaining Errors</p>
            <p className="text-xl font-semibold text-[#ea580c]">
              {report.remaining_errors}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}