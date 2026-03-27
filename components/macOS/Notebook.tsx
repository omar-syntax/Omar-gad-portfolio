"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NotebookCell {
  cell_type: "markdown" | "code";
  source: string[];
  outputs?: any[];
  execution_count?: number;
}

interface NotebookViewerProps {
  fileUrl: string;
}

export default function NotebookViewer({ fileUrl }: NotebookViewerProps) {
  const [cells, setCells] = useState<NotebookCell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotebook() {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error("Failed to load notebook");
        const data = await response.json();
        setCells(data.cells || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    if (fileUrl) fetchNotebook();
  }, [fileUrl]);

  if (loading) return <div className="p-8 text-white/40 animate-pulse font-mono">Loading notebook...</div>;
  if (error) return <div className="p-8 text-red-400 font-mono">Error: {error}</div>;

  return (
    <div className="bg-[#0d1117] min-h-full p-4 md:p-8 font-sans text-[14px]">
      <div className="max-w-4xl mx-auto space-y-6">
        {cells.map((cell, idx) => (
          <div key={idx} className="group relative flex gap-4">
            {/* Cell Side Info (Execution Count) */}
            <div className="w-12 pt-1 text-right text-[11px] font-mono text-white/20 select-none">
              {cell.cell_type === "code" && (
                <span>In [{cell.execution_count || " "}]</span>
              )}
            </div>

            {/* Cell Content */}
            <div className="flex-1 overflow-hidden">
              {cell.cell_type === "markdown" ? (
                <div className="prose prose-invert max-w-none text-white/80 leading-relaxed py-2">
                  {cell.source.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap">
                      {line.startsWith("#") ? (
                        <h1 className="text-2xl font-bold text-white mb-4 mt-6 border-b border-white/10 pb-2">
                          {line.replace(/^#+ /, "")}
                        </h1>
                      ) : line.startsWith("- ") ? (
                        <li className="ml-4 list-disc">{line.replace("- ", "")}</li>
                      ) : (
                        <p>{line}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Code Block */}
                  <div className="bg-[#161b22] border border-white/10 rounded-lg p-4 font-mono text-[#79c0ff] whitespace-pre overflow-x-auto custom-scrollbar">
                    {cell.source.join("")}
                  </div>

                  {/* Outputs */}
                  {cell.outputs && cell.outputs.length > 0 && (
                    <div className="pl-4 space-y-2">
                      {cell.outputs.map((out, oidx) => (
                        <div key={oidx} className="text-white/60 font-mono text-[12px] whitespace-pre-wrap">
                          {out.data?.["text/plain"] || out.text || []}
                          {out.data?.["text/html"] && (
                            <div className="overflow-x-auto text-white" dangerouslySetInnerHTML={{ __html: out.data["text/html"].join("") }} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
