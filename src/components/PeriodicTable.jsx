import React from 'react';
import { ELEMENTS_DATA, CATEGORY_COLORS } from '../data/elements';

export default function PeriodicTable({ selectedSymbols, toggleElement, setHoveredElement }) {
  return (
    <div className="overflow-x-auto pb-4">
      <div 
        className="grid gap-1.5 p-4 bg-slate-900/40 rounded-2xl border border-slate-800/80 backdrop-blur-xl min-w-[1050px]"
        style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}
      >
        {ELEMENTS_DATA.map((elem) => {
          const isSelected = selectedSymbols.includes(elem.symbol);
          return (
            <button
              key={elem.symbol}
              onClick={() => toggleElement(elem.symbol)}
              onMouseEnter={() => setHoveredElement(elem)}
              style={{
                gridRow: elem.row,
                gridColumn: elem.col
              }}
              className={`p-1.5 rounded-lg border flex flex-col justify-between h-20 transition-all relative overflow-hidden group text-left ${
                CATEGORY_COLORS[elem.category] || 'bg-slate-900 border-slate-700 text-slate-300'
              } ${isSelected ? 'ring-2 ring-cyan-400 scale-95 shadow-lg shadow-cyan-500/20' : ''}`}
            >
              <div className="flex justify-between text-[9px] opacity-70">
                <span>{elem.atomicNumber}</span>
                <span className="truncate max-w-[25px]">{elem.mass}</span>
              </div>
              <div className="text-xl font-black text-center tracking-tight">{elem.symbol}</div>
              <div className="text-[9px] text-center truncate opacity-90">{elem.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}