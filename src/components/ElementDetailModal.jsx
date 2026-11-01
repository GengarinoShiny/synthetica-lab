import React from 'react';
import { Info } from 'lucide-react';

export default function ElementDetailModal({ hoveredElement }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 backdrop-blur-xl h-full">
      <h2 className="text-sm font-semibold text-slate-400 mb-4 flex items-center gap-2">
        <Info className="w-4 h-4 text-cyan-400" /> Especificaciones del Elemento
      </h2>
      {hoveredElement ? (
        <div className="space-y-4">
          <div className="text-center p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-500">Nº {hoveredElement.atomicNumber}</span>
            <div className="text-4xl font-extrabold text-cyan-400 my-1">{hoveredElement.symbol}</div>
            <div className="text-base font-semibold">{hoveredElement.name}</div>
            <div className="text-xs text-slate-400 capitalize">{hoveredElement.category}</div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded bg-slate-800/40">
              <span className="text-slate-400">Masa Atómica:</span>
              <span className="font-mono">{hoveredElement.mass} u</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-800/40">
              <span className="text-slate-400">Config. Electrónica:</span>
              <span className="font-mono text-cyan-300">{hoveredElement.config}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-800/40">
              <span className="text-slate-400">Estado Estándar:</span>
              <span className="capitalize">{hoveredElement.state}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-500 text-xs py-12">
          Pasa el cursor sobre un elemento para inspeccionar sus propiedades.
        </div>
      )}
    </div>
  );
}