import React from 'react';
import { ELEMENTS_DATA } from '../data/elements';

export default function ReactionChamber({ selectedSymbols, isProcessing, handleExperiment }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl text-center space-y-4">
      <h2 className="text-lg font-bold text-slate-200">Mezcla Reactiva Seleccionada</h2>
      <div className="flex justify-center gap-4 py-4">
        {selectedSymbols.length === 0 ? (
          <p className="text-xs text-slate-500">No hay elementos seleccionados. Ve a la tabla periódica y elige hasta 4 elementos.</p>
        ) : (
          selectedSymbols.map((sym) => {
            const elem = ELEMENTS_DATA.find(e => e.symbol === sym);
            return (
              <div key={sym} className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-center w-20">
                <div className="text-2xl font-bold text-cyan-400">{sym}</div>
                <div className="text-[10px] text-slate-400 truncate">{elem?.name}</div>
              </div>
            );
          })
        )}
      </div>
      <button
        onClick={handleExperiment}
        disabled={isProcessing || selectedSymbols.length === 0}
        className="px-6 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-2 mx-auto disabled:opacity-40"
      >
        {isProcessing ? 'Procesando Simulación...' : 'Simular Reacción'}
      </button>
    </div>
  );
}