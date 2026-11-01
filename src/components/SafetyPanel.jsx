import React from 'react';
import { CheckCircle, AlertTriangle, Flame, ShieldCheck } from 'lucide-react';

export default function SafetyPanel({ reactionResult }) {
  if (!reactionResult) return null;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        {reactionResult.success ? (
          <CheckCircle className="w-6 h-6 text-emerald-400" />
        ) : (
          <AlertTriangle className="w-6 h-6 text-amber-400" />
        )}
        <div>
          <h3 className="font-bold text-lg">{reactionResult.success ? reactionResult.products : reactionResult.message}</h3>
          <p className="text-xs text-slate-400 font-mono">{reactionResult.equation || 'N/A'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="font-semibold text-cyan-400 flex items-center gap-2">
            <Flame className="w-4 h-4" /> Análisis Termodinámico & Cinético
          </div>
          <p className="text-slate-300 leading-relaxed">{reactionResult.thermodynamics}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="font-semibold text-amber-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Riesgos & Seguridad
          </div>
          <p className="text-slate-300 leading-relaxed">{reactionResult.risks}</p>
          {reactionResult.safetyEquipment && (
            <div className="flex flex-wrap gap-1 mt-2">
              {reactionResult.safetyEquipment.map((eq, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                  {eq}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}