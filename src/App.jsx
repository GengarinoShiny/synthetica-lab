import React, { useState, useMemo } from 'react';
import { 
  Play, RotateCcw, ShieldCheck, Flame, Info, Zap, 
  Search, Filter, ShieldAlert, Sparkles, X, Thermometer, Droplets, Gauge, 
  FlaskConical, AlertOctagon, HelpCircle, Plus, Minus, Beaker, Layers, Atom
} from 'lucide-react';

const ELEMENTS_DATA = [
  // Período 1
  { atomicNumber: 1, symbol: 'H', name: 'Hidrógeno', mass: 1.008, category: 'nonmetal', row: 1, col: 1, config: '1s¹', state: 'gas', oxStates: [1, -1], en: 2.20, mp: -259.2, bp: -252.9 },
  { atomicNumber: 2, symbol: 'He', name: 'Helio', mass: 4.0026, category: 'noble', row: 1, col: 18, config: '1s²', state: 'gas', oxStates: [0], en: 0, mp: -272.2, bp: -268.9 },

  // Período 2
  { atomicNumber: 3, symbol: 'Li', name: 'Litio', mass: 6.94, category: 'alkali', row: 2, col: 1, config: '[He] 2s¹', state: 'solid', oxStates: [1], en: 0.98, mp: 180.5, bp: 1342 },
  { atomicNumber: 4, symbol: 'Be', name: 'Berilio', mass: 9.0122, category: 'alkaline', row: 2, col: 2, config: '[He] 2s²', state: 'solid', oxStates: [2], en: 1.57, mp: 1287, bp: 2469 },
  { atomicNumber: 5, symbol: 'B', name: 'Boro', mass: 10.81, category: 'metalloid', row: 2, col: 13, config: '[He] 2s² 2p¹', state: 'solid', oxStates: [3], en: 2.04, mp: 2076, bp: 3927 },
  { atomicNumber: 6, symbol: 'C', name: 'Carbono', mass: 12.011, category: 'nonmetal', row: 2, col: 14, config: '[He] 2s² 2p²', state: 'solid', oxStates: [4, -4, 2], en: 2.55, mp: 3500, bp: 4827 },
  { atomicNumber: 7, symbol: 'N', name: 'Nitrógeno', mass: 14.007, category: 'nonmetal', row: 2, col: 15, config: '[He] 2s² 2p³', state: 'gas', oxStates: [-3, 3, 5], en: 3.04, mp: -210.1, bp: -195.8 },
  { atomicNumber: 8, symbol: 'O', name: 'Oxígeno', mass: 15.999, category: 'nonmetal', row: 2, col: 16, config: '[He] 2s² 2p⁴', state: 'gas', oxStates: [-2], en: 3.44, mp: -218.8, bp: -183.0 },
  { atomicNumber: 9, symbol: 'F', name: 'Flúor', mass: 18.998, category: 'halogen', row: 2, col: 17, config: '[He] 2s² 2p⁵', state: 'gas', oxStates: [-1], en: 3.98, mp: -219.6, bp: -188.1 },
  { atomicNumber: 10, symbol: 'Ne', name: 'Neón', mass: 20.180, category: 'noble', row: 2, col: 18, config: '[He] 2s² 2p⁶', state: 'gas', oxStates: [0], en: 0, mp: -248.6, bp: -246.0 },

  // Período 3
  { atomicNumber: 11, symbol: 'Na', name: 'Sodio', mass: 22.990, category: 'alkali', row: 3, col: 1, config: '[Ne] 3s¹', state: 'solid', oxStates: [1], en: 0.93, mp: 97.7, bp: 883 },
  { atomicNumber: 12, symbol: 'Mg', name: 'Magnesio', mass: 24.305, category: 'alkaline', row: 3, col: 2, config: '[Ne] 3s²', state: 'solid', oxStates: [2], en: 1.31, mp: 650, bp: 1090 },
  { atomicNumber: 13, symbol: 'Al', name: 'Aluminio', mass: 26.982, category: 'post-transition', row: 3, col: 13, config: '[Ne] 3s² 3p¹', state: 'solid', oxStates: [3], en: 1.61, mp: 660.3, bp: 2519 },
  { atomicNumber: 14, symbol: 'Si', name: 'Silicio', mass: 28.085, category: 'metalloid', row: 3, col: 14, config: '[Ne] 3s² 3p²', state: 'solid', oxStates: [4, -4], en: 1.90, mp: 1414, bp: 3265 },
  { atomicNumber: 15, symbol: 'P', name: 'Fósforo', mass: 30.974, category: 'nonmetal', row: 3, col: 15, config: '[Ne] 3s² 3p³', state: 'solid', oxStates: [3, 5, -3], en: 2.19, mp: 44.1, bp: 280.5 },
  { atomicNumber: 16, symbol: 'S', name: 'Azufre', mass: 32.06, category: 'nonmetal', row: 3, col: 16, config: '[Ne] 3s² 3p⁴', state: 'solid', oxStates: [-2, 4, 6], en: 2.58, mp: 115.2, bp: 444.6 },
  { atomicNumber: 17, symbol: 'Cl', name: 'Cloro', mass: 35.45, category: 'halogen', row: 3, col: 17, config: '[Ne] 3s² 3p⁵', state: 'gas', oxStates: [-1, 1, 3, 5, 7], en: 3.16, mp: -101.5, bp: -34.0 },
  { atomicNumber: 18, symbol: 'Ar', name: 'Argón', mass: 39.948, category: 'noble', row: 3, col: 18, config: '[Ne] 3s² 3p⁶', state: 'gas', oxStates: [0], en: 0, mp: -189.4, bp: -185.8 },

  // Período 4
  { atomicNumber: 19, symbol: 'K', name: 'Potasio', mass: 39.098, category: 'alkali', row: 4, col: 1, config: '[Ar] 4s¹', state: 'solid', oxStates: [1], en: 0.82, mp: 63.5, bp: 759 },
  { atomicNumber: 20, symbol: 'Ca', name: 'Calcio', mass: 40.078, category: 'alkaline', row: 4, col: 2, config: '[Ar] 4s²', state: 'solid', oxStates: [2], en: 1.00, mp: 842, bp: 1484 },
  { atomicNumber: 21, symbol: 'Sc', name: 'Escandio', mass: 44.956, category: 'transition', row: 4, col: 3, config: '[Ar] 3d¹ 4s²', state: 'solid', oxStates: [3], en: 1.36, mp: 1541, bp: 2836 },
  { atomicNumber: 22, symbol: 'Ti', name: 'Titanio', mass: 47.867, category: 'transition', row: 4, col: 4, config: '[Ar] 3d² 4s²', state: 'solid', oxStates: [4, 3], en: 1.54, mp: 1668, bp: 3287 },
  { atomicNumber: 23, symbol: 'V', name: 'Vanadio', mass: 50.942, category: 'transition', row: 4, col: 5, config: '[Ar] 3d³ 4s²', state: 'solid', oxStates: [5, 4, 3, 2], en: 1.63, mp: 1910, bp: 3407 },
  { atomicNumber: 24, symbol: 'Cr', name: 'Cromo', mass: 51.996, category: 'transition', row: 4, col: 6, config: '[Ar] 3d⁵ 4s¹', state: 'solid', oxStates: [3, 6, 2], en: 1.66, mp: 1907, bp: 2671 },
  { atomicNumber: 25, symbol: 'Mn', name: 'Manganeso', mass: 54.938, category: 'transition', row: 4, col: 7, config: '[Ar] 3d⁵ 4s²', state: 'solid', oxStates: [2, 4, 7], en: 1.55, mp: 1246, bp: 2061 },
  { atomicNumber: 26, symbol: 'Fe', name: 'Hierro', mass: 55.845, category: 'transition', row: 4, col: 8, config: '[Ar] 3d⁶ 4s²', state: 'solid', oxStates: [3, 2], en: 1.83, mp: 1538, bp: 2862 },
  { atomicNumber: 27, symbol: 'Co', name: 'Cobalto', mass: 58.933, category: 'transition', row: 4, col: 9, config: '[Ar] 3d⁷ 4s²', state: 'solid', oxStates: [2, 3], en: 1.88, mp: 1495, bp: 2927 },
  { atomicNumber: 28, symbol: 'Ni', name: 'Níquel', mass: 58.693, category: 'transition', row: 4, col: 10, config: '[Ar] 3d⁸ 4s²', state: 'solid', oxStates: [2, 3], en: 1.91, mp: 1455, bp: 2730 },
  { atomicNumber: 29, symbol: 'Cu', name: 'Cobre', mass: 63.546, category: 'transition', row: 4, col: 11, config: '[Ar] 3d¹⁰ 4s¹', state: 'solid', oxStates: [2, 1], en: 1.90, mp: 1085, bp: 2562 },
  { atomicNumber: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, category: 'transition', row: 4, col: 12, config: '[Ar] 3d¹⁰ 4s²', state: 'solid', oxStates: [2], en: 1.65, mp: 419.5, bp: 907 },
  { atomicNumber: 31, symbol: 'Ga', name: 'Galio', mass: 69.723, category: 'post-transition', row: 4, col: 13, config: '[Ar] 3d¹⁰ 4s² 4p¹', state: 'solid', oxStates: [3], en: 1.81, mp: 29.8, bp: 2204 },
  { atomicNumber: 32, symbol: 'Ge', name: 'Germanio', mass: 72.630, category: 'metalloid', row: 4, col: 14, config: '[Ar] 3d¹⁰ 4s² 4p²', state: 'solid', oxStates: [4, 2], en: 2.01, mp: 938.2, bp: 2833 },
  { atomicNumber: 33, symbol: 'As', name: 'Arsénico', mass: 74.922, category: 'metalloid', row: 4, col: 15, config: '[Ar] 3d¹⁰ 4s² 4p³', state: 'solid', oxStates: [3, 5, -3], en: 2.18, mp: 817, bp: 614 },
  { atomicNumber: 34, symbol: 'Se', name: 'Selenio', mass: 78.971, category: 'nonmetal', row: 4, col: 16, config: '[Ar] 3d¹⁰ 4s² 4p⁴', state: 'solid', oxStates: [-2, 4, 6], en: 2.55, mp: 221, bp: 685 },
  { atomicNumber: 35, symbol: 'Br', name: 'Bromo', mass: 79.904, category: 'halogen', row: 4, col: 17, config: '[Ar] 3d¹⁰ 4s² 4p⁵', state: 'liquid', oxStates: [-1, 1, 5], en: 2.96, mp: -7.2, bp: 58.8 },
  { atomicNumber: 36, symbol: 'Kr', name: 'Kriptón', mass: 83.798, category: 'noble', row: 4, col: 18, config: '[Ar] 3d¹⁰ 4s² 4p⁶', state: 'gas', oxStates: [0, 2], en: 3.00, mp: -157.4, bp: -153.4 },

  // Período 5
  { atomicNumber: 37, symbol: 'Rb', name: 'Rubidio', mass: 85.468, category: 'alkali', row: 5, col: 1, config: '[Kr] 5s¹', state: 'solid', oxStates: [1], en: 0.82, mp: 39.3, bp: 688 },
  { atomicNumber: 38, symbol: 'Sr', name: 'Estroncio', mass: 87.62, category: 'alkaline', row: 5, col: 2, config: '[Kr] 5s²', state: 'solid', oxStates: [2], en: 0.95, mp: 777, bp: 1382 },
  { atomicNumber: 39, symbol: 'Y', name: 'Itrio', mass: 88.906, category: 'transition', row: 5, col: 3, config: '[Kr] 4d¹ 5s²', state: 'solid', oxStates: [3], en: 1.22, mp: 1526, bp: 3345 },
  { atomicNumber: 40, symbol: 'Zr', name: 'Circonio', mass: 91.224, category: 'transition', row: 5, col: 4, config: '[Kr] 4d² 5s²', state: 'solid', oxStates: [4], en: 1.33, mp: 1855, bp: 4409 },
  { atomicNumber: 41, symbol: 'Nb', name: 'Niobio', mass: 92.906, category: 'transition', row: 5, col: 5, config: '[Kr] 4d⁴ 5s¹', state: 'solid', oxStates: [5, 3], en: 1.6, mp: 2477, bp: 4744 },
  { atomicNumber: 42, symbol: 'Mo', name: 'Molibdeno', mass: 95.95, category: 'transition', row: 5, col: 6, config: '[Kr] 4d⁵ 5s¹', state: 'solid', oxStates: [6, 4], en: 2.16, mp: 2623, bp: 4639 },
  { atomicNumber: 43, symbol: 'Tc', name: 'Tecnecio', mass: 98, category: 'transition', row: 5, col: 7, config: '[Kr] 4d⁵ 5s²', state: 'solid', oxStates: [7, 4], en: 1.9, mp: 2157, bp: 4265 },
  { atomicNumber: 44, symbol: 'Ru', name: 'Rutenio', mass: 101.07, category: 'transition', row: 5, col: 8, config: '[Kr] 4d⁷ 5s¹', state: 'solid', oxStates: [3, 4, 8], en: 2.2, mp: 2334, bp: 4150 },
  { atomicNumber: 45, symbol: 'Rh', name: 'Rodio', mass: 102.91, category: 'transition', row: 5, col: 9, config: '[Kr] 4d⁸ 5s¹', state: 'solid', oxStates: [3], en: 2.28, mp: 1964, bp: 3695 },
  { atomicNumber: 46, symbol: 'Pd', name: 'Paladio', mass: 106.42, category: 'transition', row: 5, col: 10, config: '[Kr] 4d¹⁰', state: 'solid', oxStates: [2, 4], en: 2.20, mp: 1555, bp: 2963 },
  { atomicNumber: 47, symbol: 'Ag', name: 'Plata', mass: 107.87, category: 'transition', row: 5, col: 11, config: '[Kr] 4d¹⁰ 5s¹', state: 'solid', oxStates: [1], en: 1.93, mp: 961.8, bp: 2162 },
  { atomicNumber: 48, symbol: 'Cd', name: 'Cadmio', mass: 112.41, category: 'transition', row: 5, col: 12, config: '[Kr] 4d¹⁰ 5s²', state: 'solid', oxStates: [2], en: 1.69, mp: 321.1, bp: 767 },
  { atomicNumber: 49, symbol: 'In', name: 'Indio', mass: 114.82, category: 'post-transition', row: 5, col: 13, config: '[Kr] 4d¹⁰ 5s² 5p¹', state: 'solid', oxStates: [3], en: 1.78, mp: 156.6, bp: 2072 },
  { atomicNumber: 50, symbol: 'Sn', name: 'Estaño', mass: 118.71, category: 'post-transition', row: 5, col: 14, config: '[Kr] 4d¹⁰ 5s² 5p²', state: 'solid', oxStates: [4, 2], en: 1.96, mp: 231.9, bp: 2602 },
  { atomicNumber: 51, symbol: 'Sb', name: 'Antimonio', mass: 121.76, category: 'metalloid', row: 5, col: 15, config: '[Kr] 4d¹⁰ 5s² 5p³', state: 'solid', oxStates: [3, 5, -3], en: 2.05, mp: 630.6, bp: 1587 },
  { atomicNumber: 52, symbol: 'Te', name: 'Teluro', mass: 127.60, category: 'metalloid', row: 5, col: 16, config: '[Kr] 4d¹⁰ 5s² 5p⁴', state: 'solid', oxStates: [-2, 4, 6], en: 2.1, mp: 449.5, bp: 988 },
  { atomicNumber: 53, symbol: 'I', name: 'Yodo', mass: 126.90, category: 'halogen', row: 5, col: 17, config: '[Kr] 4d¹⁰ 5s² 5p⁵', state: 'solid', oxStates: [-1, 1, 5, 7], en: 2.66, mp: 113.7, bp: 184.3 },
  { atomicNumber: 54, symbol: 'Xe', name: 'Xenón', mass: 131.29, category: 'noble', row: 5, col: 18, config: '[Kr] 4d¹⁰ 5s² 5p⁶', state: 'gas', oxStates: [0, 2, 4, 6], en: 2.6, mp: -111.7, bp: -108.1 },

  // Período 6
  { atomicNumber: 55, symbol: 'Cs', name: 'Cesio', mass: 132.91, category: 'alkali', row: 6, col: 1, config: '[Xe] 6s¹', state: 'solid', oxStates: [1], en: 0.79, mp: 28.5, bp: 671 },
  { atomicNumber: 56, symbol: 'Ba', name: 'Bario', mass: 137.33, category: 'alkaline', row: 6, col: 2, config: '[Xe] 6s²', state: 'solid', oxStates: [2], en: 0.89, mp: 727, bp: 1897 },
  { atomicNumber: 57, symbol: 'La', name: 'Lantano', mass: 138.91, category: 'lanthanide', row: 6, col: 3, config: '[Xe] 5d¹ 6s²', state: 'solid', oxStates: [3], en: 1.1, mp: 920, bp: 3464 },
  { atomicNumber: 72, symbol: 'Hf', name: 'Hafnio', mass: 178.49, category: 'transition', row: 6, col: 4, config: '[Xe] 4f¹⁴ 5d² 6s²', state: 'solid', oxStates: [4], en: 1.3, mp: 2233, bp: 4603 },
  { atomicNumber: 73, symbol: 'Ta', name: 'Tantalio', mass: 180.95, category: 'transition', row: 6, col: 5, config: '[Xe] 4f¹⁴ 5d³ 6s²', state: 'solid', oxStates: [5], en: 1.5, mp: 3017, bp: 5458 },
  { atomicNumber: 74, symbol: 'W', name: 'Wolframio', mass: 183.84, category: 'transition', row: 6, col: 6, config: '[Xe] 4f¹⁴ 5d⁴ 6s²', state: 'solid', oxStates: [6, 4], en: 2.36, mp: 3422, bp: 5555 },
  { atomicNumber: 75, symbol: 'Re', name: 'Renio', mass: 186.21, category: 'transition', row: 6, col: 7, config: '[Xe] 4f¹⁴ 5d⁵ 6s²', state: 'solid', oxStates: [7, 4], en: 1.9, mp: 3186, bp: 5596 },
  { atomicNumber: 76, symbol: 'Os', name: 'Osmio', mass: 190.23, category: 'transition', row: 6, col: 8, config: '[Xe] 4f¹⁴ 5d⁶ 6s²', state: 'solid', oxStates: [4, 8], en: 2.2, mp: 3033, bp: 5012 },
  { atomicNumber: 77, symbol: 'Ir', name: 'Iridio', mass: 192.22, category: 'transition', row: 6, col: 9, config: '[Xe] 4f¹⁴ 5d⁷ 6s²', state: 'solid', oxStates: [4, 3], en: 2.2, mp: 2446, bp: 4428 },
  { atomicNumber: 78, symbol: 'Pt', name: 'Platino', mass: 195.08, category: 'transition', row: 6, col: 10, config: '[Xe] 4f¹⁴ 5d⁹ 6s¹', state: 'solid', oxStates: [4, 2], en: 2.28, mp: 1768, bp: 3825 },
  { atomicNumber: 79, symbol: 'Au', name: 'Oro', mass: 196.97, category: 'transition', row: 6, col: 11, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', state: 'solid', oxStates: [3, 1], en: 2.54, mp: 1064, bp: 2970 },
  { atomicNumber: 80, symbol: 'Hg', name: 'Mercurio', mass: 200.59, category: 'transition', row: 6, col: 12, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', state: 'liquid', oxStates: [2, 1], en: 2.00, mp: -38.8, bp: 356.7 },
  { atomicNumber: 81, symbol: 'Tl', name: 'Talio', mass: 204.38, category: 'post-transition', row: 6, col: 13, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', state: 'solid', oxStates: [1, 3], en: 1.62, mp: 304, bp: 1473 },
  { atomicNumber: 82, symbol: 'Pb', name: 'Plomo', mass: 207.2, category: 'post-transition', row: 6, col: 14, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', state: 'solid', oxStates: [2, 4], en: 2.33, mp: 327.5, bp: 1749 },
  { atomicNumber: 83, symbol: 'Bi', name: 'Bismuto', mass: 208.98, category: 'post-transition', row: 6, col: 15, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', state: 'solid', oxStates: [3, 5], en: 2.02, mp: 271.4, bp: 1564 },
  { atomicNumber: 84, symbol: 'Po', name: 'Polonio', mass: 209, category: 'metalloid', row: 6, col: 16, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', state: 'solid', oxStates: [4, 2], en: 2.0, mp: 254, bp: 962 },
  { atomicNumber: 85, symbol: 'At', name: 'Astato', mass: 210, category: 'halogen', row: 6, col: 17, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', state: 'solid', oxStates: [-1, 1], en: 2.2, mp: 302, bp: 337 },
  { atomicNumber: 86, symbol: 'Rn', name: 'Radón', mass: 222, category: 'noble', row: 6, col: 18, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', state: 'gas', oxStates: [0, 2], en: 0, mp: -71, bp: -61.7 },

  // Período 7
  { atomicNumber: 87, symbol: 'Fr', name: 'Francio', mass: 223, category: 'alkali', row: 7, col: 1, config: '[Rn] 7s¹', state: 'solid', oxStates: [1], en: 0.7, mp: 27, bp: 677 },
  { atomicNumber: 88, symbol: 'Ra', name: 'Radio', mass: 226, category: 'alkaline', row: 7, col: 2, config: '[Rn] 7s²', state: 'solid', oxStates: [2], en: 0.9, mp: 700, bp: 1737 },
  { atomicNumber: 89, symbol: 'Ac', name: 'Actinio', mass: 227, category: 'actinide', row: 7, col: 3, config: '[Rn] 6d¹ 7s²', state: 'solid', oxStates: [3], en: 1.1, mp: 1050, bp: 3200 },
  { atomicNumber: 104, symbol: 'Rf', name: 'Rutherfordio', mass: 267, category: 'transition', row: 7, col: 4, config: '[Rn] 5f¹⁴ 6d² 7s²', state: 'solid', oxStates: [4], en: 0, mp: 2100, bp: 5500 },
  { atomicNumber: 105, symbol: 'Db', name: 'Dubnio', mass: 268, category: 'transition', row: 7, col: 5, config: '[Rn] 5f¹⁴ 6d³ 7s²', state: 'solid', oxStates: [5], en: 0, mp: 2300, bp: 5500 },
  { atomicNumber: 106, symbol: 'Sg', name: 'Seaborgio', mass: 271, category: 'transition', row: 7, col: 6, config: '[Rn] 5f¹⁴ 6d⁴ 7s²', state: 'solid', oxStates: [6], en: 0, mp: 2500, bp: 5500 },
  { atomicNumber: 107, symbol: 'Bh', name: 'Bohrio', mass: 272, category: 'transition', row: 7, col: 7, config: '[Rn] 5f¹⁴ 6d⁵ 7s²', state: 'solid', oxStates: [7], en: 0, mp: 2600, bp: 5500 },
  { atomicNumber: 108, symbol: 'Hs', name: 'Hassio', mass: 270, category: 'transition', row: 7, col: 8, config: '[Rn] 5f¹⁴ 6d⁶ 7s²', state: 'solid', oxStates: [8], en: 0, mp: 2700, bp: 5500 },
  { atomicNumber: 109, symbol: 'Mt', name: 'Meitnerio', mass: 276, category: 'transition', row: 7, col: 9, config: '[Rn] 5f¹⁴ 6d⁷ 7s²', state: 'solid', oxStates: [3], en: 0, mp: 2800, bp: 5500 },
  { atomicNumber: 110, symbol: 'Ds', name: 'Darmstadtio', mass: 281, category: 'transition', row: 7, col: 10, config: '[Rn] 5f¹⁴ 6d⁹ 7s¹', state: 'solid', oxStates: [4], en: 0, mp: 2900, bp: 5500 },
  { atomicNumber: 111, symbol: 'Rg', name: 'Roentgenio', mass: 282, category: 'transition', row: 7, col: 11, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s¹', state: 'solid', oxStates: [3], en: 0, mp: 3000, bp: 5500 },
  { atomicNumber: 112, symbol: 'Cn', name: 'Copernicio', mass: 285, category: 'transition', row: 7, col: 12, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', state: 'liquid', oxStates: [2], en: 0, mp: 10, bp: 84 },
  { atomicNumber: 113, symbol: 'Nh', name: 'Nihonio', mass: 286, category: 'post-transition', row: 7, col: 13, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', state: 'solid', oxStates: [1], en: 0, mp: 430, bp: 1100 },
  { atomicNumber: 114, symbol: 'Fl', name: 'Flerovio', mass: 289, category: 'post-transition', row: 7, col: 14, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', state: 'solid', oxStates: [2], en: 0, mp: 70, bp: 150 },
  { atomicNumber: 115, symbol: 'Mc', name: 'Moscovio', mass: 290, category: 'post-transition', row: 7, col: 15, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', state: 'solid', oxStates: [1], en: 0, mp: 400, bp: 1100 },
  { atomicNumber: 116, symbol: 'Lv', name: 'Livermorio', mass: 293, category: 'post-transition', row: 7, col: 16, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', state: 'solid', oxStates: [2], en: 0, mp: 450, bp: 830 },
  { atomicNumber: 117, symbol: 'Ts', name: 'Tenesino', mass: 294, category: 'halogen', row: 7, col: 17, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', state: 'solid', oxStates: [-1], en: 0, mp: 450, bp: 610 },
  { atomicNumber: 118, symbol: 'Og', name: 'Oganesón', mass: 294, category: 'noble', row: 7, col: 18, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', state: 'gas', oxStates: [0], en: 0, mp: 80, bp: 170 },

  // Lantánidos (Fila 9)
  { atomicNumber: 58, symbol: 'Ce', name: 'Cerio', mass: 140.12, category: 'lanthanide', row: 9, col: 4, config: '[Xe] 4f¹ 5d¹ 6s²', state: 'solid', oxStates: [3, 4], en: 1.12, mp: 798, bp: 3443 },
  { atomicNumber: 59, symbol: 'Pr', name: 'Praseodimio', mass: 140.91, category: 'lanthanide', row: 9, col: 5, config: '[Xe] 4f³ 6s²', state: 'solid', oxStates: [3], en: 1.13, mp: 931, bp: 3520 },
  { atomicNumber: 60, symbol: 'Nd', name: 'Neodimio', mass: 144.24, category: 'lanthanide', row: 9, col: 6, config: '[Xe] 4f⁴ 6s²', state: 'solid', oxStates: [3], en: 1.14, mp: 1024, bp: 3074 },
  { atomicNumber: 61, symbol: 'Pm', name: 'Prometio', mass: 145, category: 'lanthanide', row: 9, col: 7, config: '[Xe] 4f⁵ 6s²', state: 'solid', oxStates: [3], en: 1.13, mp: 1042, bp: 3000 },
  { atomicNumber: 62, symbol: 'Sm', name: 'Samario', mass: 150.36, category: 'lanthanide', row: 9, col: 8, config: '[Xe] 4f⁶ 6s²', state: 'solid', oxStates: [3, 2], en: 1.17, mp: 1072, bp: 1900 },
  { atomicNumber: 63, symbol: 'Eu', name: 'Europio', mass: 151.96, category: 'lanthanide', row: 9, col: 9, config: '[Xe] 4f⁷ 6s²', state: 'solid', oxStates: [3, 2], en: 1.2, mp: 822, bp: 1529 },
  { atomicNumber: 64, symbol: 'Gd', name: 'Gadolinio', mass: 157.25, category: 'lanthanide', row: 9, col: 10, config: '[Xe] 4f⁷ 5d¹ 6s²', state: 'solid', oxStates: [3], en: 1.2, mp: 1313, bp: 3273 },
  { atomicNumber: 65, symbol: 'Tb', name: 'Terbio', mass: 158.93, category: 'lanthanide', row: 9, col: 11, config: '[Xe] 4f⁹ 6s²', state: 'solid', oxStates: [3, 4], en: 1.2, mp: 1356, bp: 3230 },
  { atomicNumber: 66, symbol: 'Dy', name: 'Disprosio', mass: 162.50, category: 'lanthanide', row: 9, col: 12, config: '[Xe] 4f¹⁰ 6s²', state: 'solid', oxStates: [3], en: 1.22, mp: 1412, bp: 2567 },
  { atomicNumber: 67, symbol: 'Ho', name: 'Holmio', mass: 164.93, category: 'lanthanide', row: 9, col: 13, config: '[Xe] 4f¹¹ 6s²', state: 'solid', oxStates: [3], en: 1.23, mp: 1474, bp: 2700 },
  { atomicNumber: 68, symbol: 'Er', name: 'Erbio', mass: 167.26, category: 'lanthanide', row: 9, col: 14, config: '[Xe] 4f¹² 6s²', state: 'solid', oxStates: [3], en: 1.24, mp: 1529, bp: 2868 },
  { atomicNumber: 69, symbol: 'Tm', name: 'Tulio', mass: 168.93, category: 'lanthanide', row: 9, col: 15, config: '[Xe] 4f¹³ 6s²', state: 'solid', oxStates: [3, 2], en: 1.25, mp: 1545, bp: 1950 },
  { atomicNumber: 70, symbol: 'Yb', name: 'Iterbio', mass: 173.05, category: 'lanthanide', row: 9, col: 16, config: '[Xe] 4f¹⁴ 6s²', state: 'solid', oxStates: [3, 2], en: 1.1, mp: 819, bp: 1196 },
  { atomicNumber: 71, symbol: 'Lu', name: 'Lutecio', mass: 174.97, category: 'lanthanide', row: 9, col: 17, config: '[Xe] 4f¹⁴ 5d¹ 6s²', state: 'solid', oxStates: [3], en: 1.27, mp: 1663, bp: 3402 },

  // Actínidos (Fila 10)
  { atomicNumber: 90, symbol: 'Th', name: 'Torio', mass: 232.04, category: 'actinide', row: 10, col: 4, config: '[Rn] 6d² 7s²', state: 'solid', oxStates: [4], en: 1.3, mp: 1750, bp: 4788 },
  { atomicNumber: 91, symbol: 'Pa', name: 'Protactinio', mass: 231.04, category: 'actinide', row: 10, col: 5, config: '[Rn] 5f² 6d¹ 7s²', state: 'solid', oxStates: [5, 4], en: 1.5, mp: 1568, bp: 4027 },
  { atomicNumber: 92, symbol: 'U', name: 'Uranio', mass: 238.03, category: 'actinide', row: 10, col: 6, config: '[Rn] 5f³ 6d¹ 7s²', state: 'solid', oxStates: [6, 4, 3], en: 1.38, mp: 1132, bp: 4131 },
  { atomicNumber: 93, symbol: 'Np', name: 'Neptunio', mass: 237, category: 'actinide', row: 10, col: 7, config: '[Rn] 5f⁴ 6d¹ 7s²', state: 'solid', oxStates: [5, 6, 4], en: 1.36, mp: 644, bp: 3902 },
  { atomicNumber: 94, symbol: 'Pu', name: 'Plutonio', mass: 244, category: 'actinide', row: 10, col: 8, config: '[Rn] 5f⁶ 7s²', state: 'solid', oxStates: [4, 6, 3], en: 1.28, mp: 640, bp: 3228 },
  { atomicNumber: 95, symbol: 'Am', name: 'Americio', mass: 243, category: 'actinide', row: 10, col: 9, config: '[Rn] 5f⁷ 7s²', state: 'solid', oxStates: [3, 4, 6], en: 1.3, mp: 1176, bp: 2607 },
  { atomicNumber: 96, symbol: 'Cm', name: 'Curio', mass: 247, category: 'actinide', row: 10, col: 10, config: '[Rn] 5f⁷ 6d¹ 7s²', state: 'solid', oxStates: [3, 4], en: 1.3, mp: 1345, bp: 3110 },
  { atomicNumber: 97, symbol: 'Bk', name: 'Berkelio', mass: 247, category: 'actinide', row: 10, col: 11, config: '[Rn] 5f⁹ 7s²', state: 'solid', oxStates: [3, 4], en: 1.3, mp: 986, bp: 2627 },
  { atomicNumber: 98, symbol: 'Cf', name: 'Californio', mass: 251, category: 'actinide', row: 10, col: 12, config: '[Rn] 5f¹⁰ 7s²', state: 'solid', oxStates: [3], en: 1.3, mp: 900, bp: 1470 },
  { atomicNumber: 99, symbol: 'Es', name: 'Einstenio', mass: 252, category: 'actinide', row: 10, col: 13, config: '[Rn] 5f¹¹ 7s²', state: 'solid', oxStates: [3], en: 1.3, mp: 860, bp: 996 },
  { atomicNumber: 100, symbol: 'Fm', name: 'Fermio', mass: 257, category: 'actinide', row: 10, col: 14, config: '[Rn] 5f¹² 7s²', state: 'solid', oxStates: [3], en: 1.3, mp: 1527, bp: 1000 },
  { atomicNumber: 101, symbol: 'Md', name: 'Mendelevio', mass: 258, category: 'actinide', row: 10, col: 15, config: '[Rn] 5f¹³ 7s²', state: 'solid', oxStates: [3, 2], en: 1.3, mp: 827, bp: 1100 },
  { atomicNumber: 102, symbol: 'No', name: 'Nobelio', mass: 259, category: 'actinide', row: 10, col: 16, config: '[Rn] 5f¹⁴ 7s²', state: 'solid', oxStates: [2, 3], en: 1.3, mp: 827, bp: 1100 },
  { atomicNumber: 103, symbol: 'Lr', name: 'Lawrencio', mass: 266, category: 'actinide', row: 10, col: 17, config: '[Rn] 5f¹⁴ 7s² 7p¹', state: 'solid', oxStates: [3], en: 1.3, mp: 1627, bp: 1900 }
];

const CATEGORY_COLORS = {
  alkali: 'bg-red-950/80 border-red-500/50 text-red-200 hover:bg-red-900/50',
  alkaline: 'bg-orange-950/80 border-orange-500/50 text-orange-200 hover:bg-orange-900/50',
  transition: 'bg-amber-950/80 border-amber-500/50 text-amber-200 hover:bg-amber-900/50',
  'post-transition': 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200 hover:bg-emerald-900/50',
  metalloid: 'bg-teal-950/80 border-teal-500/50 text-teal-200 hover:bg-teal-900/50',
  nonmetal: 'bg-cyan-950/80 border-cyan-500/50 text-cyan-200 hover:bg-cyan-900/50',
  halogen: 'bg-blue-950/80 border-blue-500/50 text-blue-200 hover:bg-blue-900/50',
  noble: 'bg-purple-950/80 border-purple-500/50 text-purple-200 hover:bg-purple-900/50',
  lanthanide: 'bg-pink-950/80 border-pink-500/50 text-pink-200 hover:bg-pink-900/50',
  actinide: 'bg-rose-950/80 border-rose-500/50 text-rose-200 hover:bg-rose-900/50'
};

const CATEGORY_NAMES = {
  alkali: 'Metales Alcalinos',
  alkaline: 'Alcalinotérreos',
  transition: 'Metales de Transición',
  'post-transition': 'Otros Metales',
  metalloid: 'Metaloides',
  nonmetal: 'No Metales',
  halogen: 'Halógenos',
  noble: 'Gases Nobles',
  lanthanide: 'Lantánidos',
  actinide: 'Actínidos'
};

function toSubscript(num) {
  const subs = { '0':'₀', '1':'₁', '2':'₂', '3':'₃', '4':'₄', '5':'₅', '6':'₆', '7':'₇', '8':'₈', '9':'₉' };
  return String(num).split('').map(char => subs[char] || char).join('');
}

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

// MOTOR TERMODINÁMICO CON PARCHES DE RESCATE QUÍMICO Y CORRECCIÓN INDUSTRIAL
function evaluateReaction(selectedItems) {
  try {
    if (!selectedItems || selectedItems.length === 0) {
      return null;
    }

    const elements = selectedItems.map(item => item.element);
    const symbols = elements.map(e => e.symbol);
    const categories = elements.map(e => e.category);
    const states = elements.map(e => e.state);

    // -------------------------------------------------------------
    // REGLA ADICIONAL 1: FILTRO PARA ELEMENTOS IDÉNTICOS (Alotropía)
    // -------------------------------------------------------------
    const uniqueSymbols = Array.from(new Set(symbols));
    if (uniqueSymbols.length === 1) {
      const singleElem = elements[0];
      const totalCount = selectedItems.reduce((sum, item) => sum + item.count, 0);
      const totalMass = (singleElem.mass * totalCount).toFixed(2);

      let phaseNotes = `Transición de Fase Alotrópica del ${singleElem.name}. Reorganización de la red cristalina o molecular bajo parámetros de presión y temperatura.`;
      let procedure = ['Carga de muestra pura en celda de yunque de diamante o prensa hidráulica de alta presión.', 'Aplicación controlada de gradiente térmico y compresión isostática.'];

      if (singleElem.symbol === 'C') {
        phaseNotes = 'Equilibrio de fases alotrópicas del Carbono (Grafito ↔ Diamante ↔ Lonsdaleíta ↔ Fullerenos).';
        procedure = ['Prensado de alta presión y alta temperatura (HPHT) en prensa de yunque.', 'Transformación fásica de la hibridación sp² a sp³ sin cambio en la composición química.'];
      }

      return {
        success: true,
        title: `Transición de Fase Alotrópica / Coexistencia Elemental (${singleElem.name})`,
        equation: `${totalCount} ${singleElem.symbol} → ${singleElem.symbol}${toSubscript(totalCount)} (Matriz Monoelemental de ${singleElem.name})`,
        finalProduct: {
          name: `Fase Alotrópica de ${singleElem.name}`,
          formula: `${singleElem.symbol}${toSubscript(totalCount)}`,
          molarMass: `${totalMass} g/mol`,
          type: 'Sustancia Elemental Pura (Estructura Monoelemental)'
        },
        thermodynamics: phaseNotes,
        kinetics: 'Reordenamiento atómico intercristalino por cambio de presión/temperatura sin reacción química externa.',
        conditions: { temp: '25°C - 1200°C (Según diagrama de fases P-T)', pressure: '1.0 atm - 50 GPa (Celda HPHT)', humidity: '0%' },
        procedure: procedure,
        whatCouldGoWrong: 'Descompresión brusca con agrietamiento microestructural o amorfización por choque térmico.',
        prohibitionNotice: null,
        risks: 'Riesgo mecánico por alta presión confinada.',
        safetyEquipment: ['Gafas de seguridad estancas', 'Pantalla policarbonato para celdas de presión'],
        crucibles: 'Celda de yunque de diamante o matraz de cuarzo según rango de presión.'
      };
    }

    const hasHg = symbols.includes('Hg');
    const hasH = symbols.includes('H');
    const hasNoble = categories.includes('noble');
    const hasActinide = categories.includes('actinide');
    const hasFluorine = symbols.includes('F');
    const isAllMetals = elements.every(e => ['transition', 'alkali', 'alkaline', 'post-transition', 'lanthanide', 'actinide'].includes(e.category));
    const isAllNonMetals = elements.every(e => ['nonmetal', 'halogen', 'noble'].includes(e.category));
    const hasGasOrLiquid = states.some(s => s === 'gas' || s === 'liquid');

    const maxMp = Math.max(...elements.map(e => e.mp || 0));

    // -------------------------------------------------------------
    // FILTRO AMALGAMAS (Sistemas con Mercurio - Hg)
    // -------------------------------------------------------------
    if (hasHg && isAllMetals && selectedItems.length >= 2) {
      const otherMetals = selectedItems.filter(i => i.element.symbol !== 'Hg');
      const otherNames = otherMetals.map(i => i.element.name).join(' y ');
      const otherSymbols = otherMetals.map(i => i.element.symbol).join('');
      const totalMass = selectedItems.reduce((sum, item) => sum + ((item.element.mass || 0) * (item.count || 1)), 0).toFixed(2);
      const reactList = selectedItems.map(item => `${item.count} ${item.element.symbol}`).join(' + ');

      return {
        success: true,
        title: `Sistema Metálico Líquido: Formación de Amalgama de ${otherNames}`,
        equation: `${reactList} → ${otherSymbols}-Hg (Amalgama Metálica Líquida/Pastosa)`,
        finalProduct: {
          name: `Amalgama Metálica de ${otherNames}`,
          formula: `${otherSymbols}·Hg`,
          molarMass: `${totalMass} g/mol (Disolución Fásica)`,
          type: 'Sistema Metálico Líquido Intertermodinámico'
        },
        thermodynamics: 'Disolución física de la red cristalina del metal sólido dentro de la matriz de mercurio líquido impulsada por entalpía de solvatación metálica.',
        kinetics: 'Proceso de difusión interatómica rápida en fase líquida asistido por agitación mecánica.',
        conditions: { temp: '20°C - 25°C (Temperatura Ambiente Estricta)', pressure: '1.0 atm', humidity: '< 40%' },
        procedure: [
          'Adición controlada del metal en polvo/lámina sobre el depósito de mercurio líquido.',
          'Trituración mecánica o agitación vigorosa a temperatura ambiente en mortero hermético.',
          'Filtrado por gamuza/presión para retirar el exceso de mercurio libre si aplica.'
        ],
        whatCouldGoWrong: 'Riesgo extremo de salud pública por vaporización espontánea de Mercurio (altamente neurotóxico). Requiere confinamiento hermético estricto.',
        prohibitionNotice: 'PROHIBICIÓN ABSOLUTA: Calentamiento, hornos de inducción o arcos eléctricos terminantemente prohibidos por volatilización neurotóxica de Hg.',
        risks: 'Inhalación letal de vapores de mercurio e intoxicación sistémica irreversible.',
        safetyEquipment: ['Campana de extracción hermética estricta', 'Respirador con cartucho para mercurio', 'Guantes de nitrilo pesado', 'Tratamiento con azufre de neutralización'],
        crucibles: 'Contenedor hermético de vidrio borosilicato o acero inoxidable pasivado (Temperatura Ambiente).'
      };
    }

    // -------------------------------------------------------------
    // GASES NOBLES (Inertes)
    // -------------------------------------------------------------
    if (hasNoble && !hasFluorine) {
      const totalMass = selectedItems.reduce((sum, item) => sum + ((item.element.mass || 0) * (item.count || 1)), 0).toFixed(3);
      const reactList = selectedItems.map(item => `${item.count} ${item.element.symbol}`).join(' + ');

      return {
        success: false,
        title: 'Mezcla Inerte / Sin Reacción Química Espontánea',
        equation: `${reactList} → Sin Reacción (Coexistencia Física)`,
        finalProduct: {
          name: 'Mezcla Inerte Físicamente Coexistente',
          formula: symbols.map((s, i) => `${s}${toSubscript(selectedItems[i].count)}`).join(' · '),
          molarMass: `${totalMass} g/mol`,
          type: 'Mezcla Inerte Homogénea'
        },
        thermodynamics: 'La capa de valencia completa del gas noble presenta una energía de ionización elevada (ΔG > 0).',
        kinetics: 'Cinética nula a condiciones del sistema.',
        conditions: { temp: '25°C', pressure: '1.0 atm', humidity: '50%' },
        procedure: ['Mezclado físico de gases/sólidos inermes en celda de confinamiento hermética.'],
        whatCouldGoWrong: 'Desplazamiento de oxígeno ambiental por acumulación gaseosa.',
        prohibitionNotice: null,
        risks: 'Riesgo físico menor por presión parcial.',
        safetyEquipment: ['Gafas de seguridad', 'Ventilación general'],
        crucibles: 'Contenedor de acero inoxidable pasivado o vidrio borosilicato.'
      };
    }

    // -------------------------------------------------------------
    // ACTÍNIDOS / RADIACTIVOS
    // -------------------------------------------------------------
    if (hasActinide) {
      const mainActinide = selectedItems.find(item => item.element.category === 'actinide') || selectedItems[0];
      const reactList = selectedItems.map(item => `${item.count} ${item.element.symbol}`).join(' + ');

      return {
        success: true,
        title: 'Reacción Transmutacional Radiactiva e Inestabilidad Isotópica',
        equation: `${reactList} → Isótopos Hijos + Radiación α, β, γ`,
        finalProduct: {
          name: `Matriz Radiactiva Enriquecida de ${mainActinide.element.name}`,
          formula: `Isótopo Actínido (${mainActinide.element.symbol})`,
          molarMass: 'No aplica (Matriz Isótopica Variable)',
          type: 'Fase Radiactiva Actinuro'
        },
        thermodynamics: 'Desintegración nuclear espontánea con liberación de energía por defecto de masa (ΔE = Δm·c²).',
        kinetics: 'Cinética regida por la vida media del isótopo radiactivo.',
        conditions: { temp: '> 1200°C', pressure: 'Alto vacío confinado', humidity: '< 10%' },
        procedure: ['Manipulación robótica en celdas calientes blindadas con plomo de alta densidad.'],
        whatCouldGoWrong: 'Excursión de criticidad y liberación de aerosoles radiactivos alfa.',
        prohibitionNotice: 'PROHIBICIÓN ABSOLUTA: Exclusivo para instalaciones nucleares con contención Nivel 4.',
        risks: 'Contaminación radiológica severa y daño tisular ionizante.',
        safetyEquipment: ['Traje NBQ presurizado', 'Dosímetro activo', 'Blindaje de plomo de 15cm'],
        crucibles: 'Crisol de Tungsteno o Zirconia estabilizada en alto vacío.'
      };
    }

    // -------------------------------------------------------------
    // PARCHE 2: CERÁMICAS DE RED COVALENTE RETICULAR (Metaloides + Carbono)
    // -------------------------------------------------------------
    const hasCarbon = symbols.includes('C');
    const hasMetalloid = elements.some(e => e.category === 'metalloid');
    if (hasCarbon && hasMetalloid && selectedItems.length === 2) {
      const metalloidItem = selectedItems.find(i => i.element.category === 'metalloid');
      const carbonItem = selectedItems.find(i => i.element.symbol === 'C');
      const mSym = metalloidItem.element.symbol;
      const mCount = metalloidItem.count;
      const cCount = carbonItem.count;

      let formulaCeramic = `${mSym}${mCount > 1 ? toSubscript(mCount) : ''}C${cCount > 1 ? toSubscript(cCount) : ''}`;
      let ceramicName = `Carburo de ${metalloidItem.element.name}`;
      if (mSym === 'B') {
        formulaCeramic = 'B₄C';
        ceramicName = 'Carburo de Boro';
      } else if (mSym === 'Si') {
        formulaCeramic = 'SiC';
        ceramicName = 'Carburo de Silicio (Carborundo)';
      }

      const totalMassCeramic = ((metalloidItem.element.mass * mCount) + (12.011 * cCount)).toFixed(2);
      const reactList = selectedItems.map(item => `${item.count} ${item.element.symbol}`).join(' + ');

      return {
        success: true,
        title: `Síntesis de Cerámica Ultra-dura: Formación de ${ceramicName}`,
        equation: `${reactList} → ${formulaCeramic} (Red Covalente Reticular)`,
        finalProduct: {
          name: ceramicName,
          formula: formulaCeramic,
          molarMass: `${totalMassCeramic} g/mol`,
          type: 'Sólido de Red Covalente Reticular / Cerámica Ultra-dura'
        },
        thermodynamics: 'Enlace covalente reticular tridimensional de alta energía de disociación y dureza excepcional (Mohs > 9).',
        kinetics: 'Reacción en estado sólido a temperaturas extremas asistida por difusión atómica por vacantes.',
        conditions: { temp: '1900°C - 2400°C', pressure: '30 MPa - 50 MPa', humidity: '0%' },
        procedure: [
          'Mezclado y molienda de alta energía de los polvos precursores en molino de bolas.',
          'Carga de la mezcla en matriz de grafito de alta densidad.',
          'Sinterización por plasma (SPS) o prensado en caliente a temperaturas superiores a 1900°C.'
        ],
        whatCouldGoWrong: 'Oxidación prematura a dióxidos si hay trazas de oxígeno ambiental a alta temperatura.',
        prohibitionNotice: null,
        risks: 'Exposición a radiación térmica severa y polvos cerámicos ultrafinos inhalables.',
        safetyEquipment: ['Horno de inducción con atmósfera inerte', 'Pantalla de protección térmica', 'Mascarilla P100'],
        crucibles: 'Matriz de grafito de alta densidad y prensa de inducción por plasma.'
      };
    }

    // -------------------------------------------------------------
    // ALEACIONES METÁLICAS
    // -------------------------------------------------------------
    if (isAllMetals && selectedItems.length >= 2) {
      const totalAtoms = selectedItems.reduce((sum, item) => sum + (item.count || 1), 0);
      const compositionalFormula = selectedItems.map(i => {
        const fraction = (i.count / totalAtoms).toFixed(2);
        return `${i.element.symbol}_(${fraction})`;
      }).join(' ');

      const totalMeltingMass = selectedItems.reduce((sum, item) => sum + ((item.element.mass || 0) * (item.count || 1)), 0).toFixed(2);
      const reactList = selectedItems.map(item => `${item.count} ${item.element.symbol}`).join(' + ');
      const requiredMeltingTemp = (maxMp + 50).toFixed(0);

      const carbideFormers = ['Ti', 'Zr', 'Hf', 'V', 'Nb', 'Ta', 'W', 'Sc', 'Y'];
      const hasCarbideFormer = selectedItems.some(i => carbideFormers.includes(i.element.symbol));
      
      let crucibleText = 'Crisol de Alúmina (Al₂O₃) de alta pureza o Zirconia estabilizada.';
      if (hasCarbideFormer || maxMp > 1900) {
        crucibleText = 'PROHIBIDO GRAFITO (Formación de carburos frágiles). Prescrito: Crisol de Cobre refrigerado por agua (Fusión por arco en vacío - VAR) o Inducción bajo levitación magnética.';
      }

      // -------------------------------------------------------------
      // PARCHE 4: VOLATILIZACIÓN DE METALES DE BAJO PUNTO DE EBULLICIÓN (Ej. Cu-Zn)
      // -------------------------------------------------------------
      const hasVolatileMetal = selectedItems.some(i => (i.element.bp || 9999) < maxMp);
      let safetyWarningFaults = 'Segregación dendrítica durante la solidificación si el gradiente térmico no es controlado, o contaminación por oxígeno/nitrógeno intersticial.';
      
      if (hasVolatileMetal) {
        safetyWarningFaults = 'ALERTA CRÍTICA: Riesgo de volatilización pirofórica y ebullición violenta del metal de bajo punto de ebullición (ej. Zinc) con generación de humos densos y proyecciones de metal incandescente.';
        crucibleText = 'Crisol con tapa de reducción o atmósfera de confinamiento hermético bajo presión estática de gas inerte.';
      }

      const phaseType = selectedItems.length === 2 && Math.abs((selectedItems[0].element.en || 0) - (selectedItems[1].element.en || 0)) < 0.2 
        ? 'Solidificación Continua de Solución Sólida Sustitucional' 
        : 'Sistema Eutéctico / Solución Sólida Parcial con Fases Intermetálicas';

      return {
        success: true,
        title: 'Formación de Solución Sólida / Aleación Metálica (Hume-Rothery)',
        equation: `${reactList} → ${compositionalFormula} (Solución Sólida Metalúrgica)`,
        finalProduct: {
          name: `Aleación Fásica Metalúrgica (${selectedItems.map(i => i.element.name).join(' - ')})`,
          formula: compositionalFormula,
          molarMass: `${totalMeltingMass} g/mol (Base Mezcla Molar)`,
          type: phaseType
        },
        thermodynamics: 'Energía libre de mezclado gobernada por las reglas de Hume-Rothery (diferencia atómica < 15%, electronegatividades afines).',
        kinetics: 'Difusión atómica en estado líquido con posterior nucleación y crecimiento de grano en solidificación.',
        conditions: { 
          temp: `Fusión completa: > ${requiredMeltingTemp}°C (Superior al componente refractario: ${maxMp}°C)`, 
          pressure: '1.0 atm (Atmósfera inerte de Argón) o Alto Vacío', 
          humidity: '< 20%' 
        },
        procedure: [
          'Carga de metales puros en el contenedor adecuado bajo atmósfera inerte.',
          'Evacuación de cámara y purga con gas Argón de alta pureza (99.999%).',
          `Calentamiento inductivo o por arco hasta superar el punto de fusión máximo (${maxMp}°C).`,
          'Colada en lingotera de cobre para afino de grano.'
        ],
        whatCouldGoWrong: safetyWarningFaults,
        prohibitionNotice: null,
        risks: `Exposición a radiación térmica infrarroja intensa y salpicaduras de metal líquido a > ${maxMp}°C.`,
        safetyEquipment: ['Horno de inducción / arco', 'Pantalla facial con filtro IR', 'Guantes aluminizados para alta temperatura', 'Bata ignífuga'],
        crucibles: crucibleText
      };
    }

    // -------------------------------------------------------------
    // COMPUESTOS ESTEQUIOMÉTRICOS & ENLACES ESPECÍFICOS
    // -------------------------------------------------------------
    const sorted = [...selectedItems].sort((a, b) => (a.element.en || 0) - (b.element.en || 0));
    const cation = sorted[0].element;
    const anion = sorted[sorted.length - 1].element;

    const oxCation = Math.abs(cation.oxStates?.[0] || 1);
    const oxAnion = Math.abs(anion.oxStates?.[0] || 1);

    const targetSubCation = oxAnion / gcd(oxCation, oxAnion);
    const targetSubAnion = oxCation / gcd(oxCation, oxAnion);

    const userCationCount = selectedItems.find(i => i.element.symbol === cation.symbol)?.count || 1;
    const userAnionCount = selectedItems.find(i => i.element.symbol === anion.symbol)?.count || 1;

    let subCation, subAnion, reactCationCoef, reactAnionCoef;

    if (userCationCount === 1 && userAnionCount === 1) {
      subCation = 1;
      subAnion = 1;
      reactCationCoef = 1;
      reactAnionCoef = 1;
    } else {
      subCation = targetSubCation;
      subAnion = targetSubAnion;
      reactCationCoef = targetSubCation;
      reactAnionCoef = targetSubAnion;
    }

    const formulaStr = `${cation.symbol}${subCation > 1 ? toSubscript(subCation) : ''}${anion.symbol}${subAnion > 1 ? toSubscript(subAnion) : ''}`;
    const cleanFormula = formulaStr.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, '');
    const exactMolarMass = ((cation.mass * subCation) + (anion.mass * subAnion)).toFixed(2);

    // -------------------------------------------------------------
    // PARCHE 1: COVALENCIA MOLECULAR EN GASES LIGEROS (N + H, C + H, O + H, etc.)
    // -------------------------------------------------------------
    const isLightGases = selectedItems.every(i => ['H', 'N', 'O', 'C', 'F'].includes(i.element.symbol));
    if (isLightGases) {
      const reactList = selectedItems.map(item => `${item.count} ${item.element.symbol}`).join(' + ');
      let molName = 'Compuesto Covalente Molecular Discreto';
      let molFormula = formulaStr;
      let procSteps = [
        'Inyección estequiométrica de reactivos moleculares en cámara de síntesis hermética.',
        'Proceso catalítico a alta presión y temperatura controlada.',
        'Condensación y recolección de gases por sistemas de enfriamiento.'
      ];

      if (symbols.includes('N') && symbols.includes('H')) {
        molName = 'Amoníaco';
        molFormula = 'NH₃';
        procSteps = [
          'Alimentación estequiométrica de Nitrógeno (N₂) e Hidrógeno (H₂) en relación 1:3.',
          'Compresión del gas a 150 - 250 atmósferas.',
          'Paso del flujo sobre lecho catalítico de hierro a 400°C - 500°C (Proceso Haber-Bosch).'
        ];
      } else if (symbols.includes('C') && symbols.includes('H')) {
        molName = 'Metano / Hidrocarburo Ligero';
        molFormula = 'CH₄';
        procSteps = [
          'Mezcla de carbono pulverizado con gas hidrógeno seco.',
          'Reacción en reactor catalítico a alta temperatura y presión moderada.'
        ];
      } else if (symbols.includes('H') && symbols.includes('O')) {
        molName = 'Agua';
        molFormula = 'H₂O';
        procSteps = [
          'Mezcla gaseosa estequiométrica de H₂ y O₂ en caldero de combustión.',
          'Ignición por chispa eléctrica controlada en contenedor blindado.'
        ];
      }

      const totalMassMol = selectedItems.reduce((sum, item) => sum + ((item.element.mass || 0) * (item.count || 1)), 0).toFixed(2);

      return {
        success: true,
        title: `Síntesis Covalente Molecular: Formación de ${molName}`,
        equation: `${reactList} → ${molFormula} + ΔH`,
        finalProduct: {
          name: molName,
          formula: molFormula,
          molarMass: `${totalMassMol} g/mol`,
          type: 'Compuesto Covalente Molecular Discreto'
        },
        thermodynamics: 'Enlace covalente molecular por compartición de pares electrónicos. Proceso exotérmico con variación de entalpía negativa.',
        kinetics: 'Cinética de reacción en fase gaseosa optimizada por catión metálico de transición o alta presión.',
        conditions: { temp: '400°C - 500°C (Proceso Industrial)', pressure: '150.0 atm (Alta Presión)', humidity: '0% (Sistema Anhidro)' },
        procedure: procSteps,
        whatCouldGoWrong: 'Riesgo de explosión por mezcla detonante estequiométrica si no se controla el flujo de alimentación gaseosa.',
        prohibitionNotice: null,
        risks: 'Alta presión en líneas de gas y toxicidad por asfixia en caso de fuga.',
        safetyEquipment: ['Válvulas de alivio de presión', 'Detectores de gases inflamables', 'Pantalla de seguridad antideflagrante'],
        crucibles: 'Reactor tubular de acero forjado de alta resistencia a presión (Autoclave industrial).'
      };
    }

    // -------------------------------------------------------------
    // PARCHE 3: PERÓXIDOS Y COMPUESTOS ESPECIALES DE OXÍGENO (Na, K, Rb, Cs + O)
    // -------------------------------------------------------------
    const hasAlkali = selectedItems.some(i => ['Li', 'Na', 'K', 'Rb', 'Cs'].includes(i.element.symbol));
    const hasOxygen = symbols.includes('O');
    const oxygenItem = selectedItems.find(i => i.element.symbol === 'O');
    const alkaliItem = selectedItems.find(i => ['Li', 'Na', 'K', 'Rb', 'Cs'].includes(i.element.symbol));

    if (hasAlkali && hasOxygen && alkaliItem && oxygenItem && alkaliItem.count === oxygenItem.count) {
      const alkSym = alkaliItem.element.symbol;
      const peroxidFormula = `${alkSym}₂O₂`;
      const peroxidName = `Peróxido de ${alkaliItem.element.name}`;
      const peroxidMass = ((alkaliItem.element.mass * 2) + (15.999 * 2)).toFixed(2);
      const reactList = selectedItems.map(item => `${item.count} ${item.element.symbol}`).join(' + ');

      return {
        success: true,
        title: `Síntesis Estequiométrica de Peróxido Metálico: ${peroxidName}`,
        equation: `${reactList} → ${peroxidFormula} (Enlace con Ion Peróxido O₂²⁻)`,
        finalProduct: {
          name: peroxidName,
          formula: peroxidFormula,
          molarMass: `${peroxidMass} g/mol`,
          type: 'Compuesto Iónico con Enlace Covalente Interno (Ion Peróxido O₂²⁻)'
        },
        thermodynamics: 'Formación de red cristalina iónica con presencia del enlace covalente homonuclear [O-O]²⁻.',
        kinetics: 'Oxidación controlada del metal alcalino fundido bajo flujo de oxígeno seco.',
        conditions: { temp: '300°C - 350°C', pressure: '1.0 atm (Atmósfera de Oxígeno Seco)', humidity: '0% (Estricto)' },
        procedure: [
          'Limpieza y corte del metal alcalino en atmósfera inerte.',
          'Exposición controlada del metal al oxígeno gaseoso seco en reactor de níquel.',
          'Calentamiento moderado para inducir la peroxidación completa sin combustión violenta.'
        ],
        whatCouldGoWrong: 'Piroforicidad e inflamación espontánea en contacto con humedad o sustancias orgánicas.',
        prohibitionNotice: 'ALERTA DE SEGURIDAD: Prohibido el contacto con agua o disolventes orgánicos debido a liberación violenta de oxígeno.',
        risks: 'Fuego químico severo y riesgo de oxidación violenta.',
        safetyEquipment: ['Caja de guantes anhidra', 'Guantes de neopreno pesado', 'Extintor de polvo seco clase D'],
        crucibles: 'Crisol de Níquel puro o Bandeja de acero inoxidable pasivado.'
      };
    }

    let compoundName = `Compuesto de ${cation.name} y ${anion.name}`;
    if (anion.symbol === 'O') compoundName = `Óxido de ${cation.name}`;
    else if (anion.symbol === 'Cl') compoundName = `Cloruro de ${cation.name}`;
    else if (anion.symbol === 'F') compoundName = `Fluoruro de ${cation.name}`;
    else if (anion.symbol === 'S') compoundName = `Sulfuro de ${cation.name}`;
    else if (anion.symbol === 'N') compoundName = `Nitruro de ${cation.name}`;
    else if (anion.symbol === 'H' || cation.symbol === 'H') compoundName = `Hidruro de ${cation.symbol === 'H' ? anion.name : cation.name}`;

    const equationStr = `${reactCationCoef > 1 ? reactCationCoef + ' ' : ''}${cation.symbol} + ${reactAnionCoef > 1 ? reactAnionCoef + ' ' : ''}${anion.symbol} → ${formulaStr}`;

    // -------------------------------------------------------------
    // REGLA DE HIDRUROS METÁLICOS (Grupo 1/2 + H)
    // -------------------------------------------------------------
    const hasElectropositiveMetal = selectedItems.some(i => ['Li', 'Na', 'K', 'Mg', 'Ca', 'Rb', 'Cs'].includes(i.element.symbol));
    const isMetalHydride = hasH && hasElectropositiveMetal;

    if (isMetalHydride) {
      return {
        success: true,
        title: `Síntesis de Hidruro Metálico: Formación de ${compoundName}`,
        equation: `${equationStr} + ΔH`,
        finalProduct: {
          name: compoundName,
          formula: formulaStr,
          molarMass: `${exactMolarMass} g/mol`,
          type: 'Hidruro Metálico Iónico Pirofórico'
        },
        thermodynamics: 'Transferencia electrónica completa al ion hidruro (H⁻) en red iónica altamente reactiva.',
        kinetics: 'Absorción directa de hidrógeno gaseoso en matriz metálica pulverizada bajo presión.',
        conditions: { temp: '200°C - 450°C', pressure: '2.0 atm - 10.0 atm (H2 seco)', humidity: '0% (EXIGENCIA ABSOLUTA LIBRE DE HUMEDAD)' },
        procedure: [
          'Carga de metal reactivo en caja de guantes purgada con Argón deshidratado.',
          'Inyección de gas Hidrógeno (H₂) ultrapuro a alta presión.',
          'Calentamiento en autoclave hermético a temperatura de absorción estricta.'
        ],
        whatCouldGoWrong: 'Compuesto altamente pirofórico. Riesgo de ignición espontánea y liberación de hidrógeno gas inflamable en contacto con trazas de humedad ambiental (H2O).',
        prohibitionNotice: 'ALERTA DE SEGURIDAD CRÍTICA: La presencia de humedad ocasiona detonación violenta con liberación de gas H₂.',
        risks: 'Fuego pirofórico incontrolable por agua o aire húmedo.',
        safetyEquipment: ['Caja de guantes con purificador de H2O < 0.1 ppm', 'Traje ignífugo', 'Extintores de clase D para metales'],
        crucibles: 'Autoclave hermético de acero inoxidable forrado en Niquel.'
      };
    }

    // -------------------------------------------------------------
    // ÓXIDOS DE TRANSICIÓN ALTOS (W, Mo, Cr, V + O)
    // -------------------------------------------------------------
    const isHighTransitionOxide = (anion.symbol === 'O' || cation.symbol === 'O') && ['W', 'Mo', 'Cr', 'V'].includes(cation.symbol === 'O' ? anion.symbol : cation.symbol);

    if (isHighTransitionOxide) {
      return {
        success: true,
        title: `Síntesis de Óxido Complejo: Formación de ${compoundName}`,
        equation: `${equationStr} + ΔH`,
        finalProduct: {
          name: compoundName,
          formula: formulaStr,
          molarMass: `${exactMolarMass} g/mol`,
          type: 'Óxido Refractario de Coordinación Covalente'
        },
        thermodynamics: 'Enlace Covalente Complejo / Red Covalente de Coordinación debido a la alta densidad de carga del catión metaloide.',
        kinetics: 'Oxidación directa en fase sólida asistida por difusión de oxígeno intersticial.',
        conditions: { temp: '500°C - 900°C', pressure: '1.0 atm (Oxígeno puro o Aire)', humidity: '< 20%' },
        procedure: [
          'Homogeneización de polvo metálico en mortero cerámico.',
          'Oxidación térmica graduada en horno mufla abierto.',
          'Recristalización y sublimación de la fase de alto óxido.'
        ],
        whatCouldGoWrong: 'Volatilización prematura del trióxido por sobrecalentamiento o sublimación incontrolada.',
        prohibitionNotice: null,
        risks: 'Inhalación de polvos finos tóxicos o vapores pesados de transición.',
        safetyEquipment: ['Mascarilla con filtro P100', 'Gafas de seguridad estancas', 'Guantes térmicos'],
        crucibles: 'Crisol de Platino o Cuarzo ultrapuro.'
      };
    }

    // -------------------------------------------------------------
    // FILTRO MOLECULARES COVALENTES ESTÁNDAR
    // -------------------------------------------------------------
    const isMolecularCovalent = isAllNonMetals || ['CO2', 'CO', 'SO2', 'SO3', 'H2O', 'CH4', 'NH3', 'NO2', 'HCl', 'HF', 'H2S'].includes(cleanFormula);

    if (isMolecularCovalent) {
      return {
        success: true,
        title: `Síntesis Covalente Molecular: Formación de ${compoundName}`,
        equation: `${equationStr} + ΔH`,
        finalProduct: {
          name: compoundName,
          formula: formulaStr,
          molarMass: `${exactMolarMass} g/mol`,
          type: 'Compuesto Covalente Molecular Discreto'
        },
        thermodynamics: `Enlace Covalente Molecular. Solapamiento orbital por compartición electrónica (ΔX = ${((anion.en || 0) - (cation.en || 0)).toFixed(2)}).`,
        kinetics: 'Reacción en fase gaseosa o fluida guiada por choques moleculares cinéticos y energía de activación cinético-química.',
        conditions: { temp: '25°C - 550°C (Combustión / Reacción en Fase Gaseosa)', pressure: '1.0 atm - 5.0 atm', humidity: '< 10%' },
        procedure: [
          'Inyección estequiométrica de reactivos moleculares en cámara de síntesis hermética.',
          'Oxidación directa, combustión o ignición por chispa en fase cerrada/abierta.',
          'Condensación o recolección por lavado de gases (Scrubber) y purificación por trampas criogénicas.'
        ],
        whatCouldGoWrong: 'Bajo rendimiento de conversión por combustión incompleta, fugas de presión en las juntas de confinamiento o acumulación de gases asfixiantes en el entorno.',
        prohibitionNotice: null,
        risks: 'Riesgo de sobrepresión en recipientes cerrados, toxicidad por gases de sustitución y peligro de sobrecalentamiento.',
        safetyEquipment: ['Campana de extracción de alta velocidad', 'Detectores de fugas de gas', 'Mascarilla panorámica con filtro para gases orgánicos/ácidos', 'Válvulas de alivio de presión'],
        crucibles: 'Reactor hermético de cuarzo, reactor autoclave de acero inoxidable con revestimiento de PTFE o celda de gas.'
      };
    }

    // -------------------------------------------------------------
    // COMPUESTOS IÓNICOS ESTÁNDAR
    // -------------------------------------------------------------
    let procedureSteps = hasGasOrLiquid ? [
      'Conexión de reactivos gaseosos/líquidos a línea de gas Schlenk inerte o manifold de vacío.',
      'Purga y evacuación completa de oxígeno residual en el reactor de cuarzo sellado.',
      'Inyección controlada de reactivo gaseoso/líquido sobre el componente complementario.',
      'Monitoreo continuo de presión manométrica y enfriamiento por recirculación criogénica.'
    ] : [
      'Homogeneización de polvos reactivos en mortero de ágata en caja de guantes con Argón.',
      'Prensado uniaxial de los polvos para formar pastilla verde compacta.',
      'Carga de la pastilla en reactor tubular de alta temperatura bajo flujo reactivo controlado.'
    ];

    return {
      success: true,
      title: `Síntesis Química Balanceada: Formación de ${compoundName}`,
      equation: `${equationStr} + ΔH`,
      finalProduct: {
        name: compoundName,
        formula: formulaStr,
        molarMass: `${exactMolarMass} g/mol`,
        type: 'Compuesto Estequiométrico Iónico Definido'
      },
      thermodynamics: `Enlace Iónico. Transferencia electrónica masiva impulsada por gran diferencia de electronegatividad (ΔX = ${((anion.en || 0) - (cation.en || 0)).toFixed(2)}).`,
      kinetics: 'Reacción altamente acelerada por transferencia de carga iónica y colisión molecular efectiva.',
      conditions: { temp: '300°C - 800°C', pressure: '1.0 atm', humidity: '< 15%' },
      procedure: procedureSteps,
      whatCouldGoWrong: 'Disociación térmica prematura o ataque corrosivo al contenedor a elevadas temperaturas.',
      prohibitionNotice: null,
      risks: 'Emisión de proyecciones incandescentes o humos térmicos.',
      safetyEquipment: ['Gafas de seguridad estancas', 'Guantes de nitrilo vulcanizado', 'Campana de extracción'],
      crucibles: 'Crisol de Alúmina (Al₂O₃) o Platino de alta pureza.'
    };

  } catch (error) {
    console.error('Error evaluando reacción:', error);
    return {
      success: false,
      title: 'Error en el cálculo estequiométrico',
      equation: '---',
      finalProduct: { name: 'Error de procesamiento', formula: 'N/A', molarMass: 'N/A', type: 'Error' },
      thermodynamics: 'Ocurrió una excepción al procesar los elementos seleccionados.',
      kinetics: 'N/A',
      conditions: { temp: 'N/A', pressure: 'N/A', humidity: 'N/A' },
      procedure: ['Reiniciar la selección de elementos.'],
      whatCouldGoWrong: 'Incompatibilidad en los parámetros de entrada.',
      prohibitionNotice: null,
      risks: 'Ninguno.',
      safetyEquipment: ['Gafas de seguridad'],
      crucibles: 'N/A'
    };
  }
}

export default function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [activeTab, setActiveTab] = useState('table');
  const [reactionResult, setReactionResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const selectedSymbols = useMemo(() => selectedItems.map(i => i.element.symbol), [selectedItems]);

  const filteredElements = useMemo(() => {
    return ELEMENTS_DATA.filter((elem) => {
      const matchesSearch =
        elem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.atomicNumber.toString().includes(searchQuery);
      const matchesCategory = categoryFilter === 'all' || elem.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const toggleElement = (elem) => {
    const exists = selectedItems.find(i => i.element.symbol === elem.symbol);
    if (exists) {
      setSelectedItems(selectedItems.filter(i => i.element.symbol !== elem.symbol));
    } else {
      if (selectedItems.length < 4) {
        setSelectedItems([...selectedItems, { element: elem, count: 1 }]);
      }
    }
  };

  const updateItemCount = (symbol, delta) => {
    setSelectedItems(selectedItems.map(item => {
      if (item.element.symbol === symbol) {
        const newCount = Math.max(1, Math.min(10, item.count + delta));
        return { ...item, count: newCount };
      }
      return item;
    }));
  };

  const handleGoToChamber = () => {
    if (selectedItems.length === 0) return;
    setReactionResult(null);
    setActiveTab('chamber');
  };

  const handleRunSimulation = () => {
    if (selectedItems.length === 0) return;
    setIsProcessing(true);
    setReactionResult(null);

    setTimeout(() => {
      const result = evaluateReaction(selectedItems);
      setReactionResult(result);
      setIsProcessing(false);
    }, 600);
  };

  const resetExperiment = () => {
    setSelectedItems([]);
    setReactionResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <header className="border-b border-cyan-500/20 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between sticky top-0 z-50 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
              SYNTHETICA LAB
            </h1>
            <p className="text-xs text-slate-400">Simulador Termodinámico, Metalúrgico y de Materiales Avanzado</p>
          </div>
        </div>

        <div className="flex gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'table' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tabla Periódica
          </button>
          <button
            onClick={() => setActiveTab('chamber')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'chamber' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cámara de Reacción
            {selectedItems.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 text-xs font-bold flex items-center justify-center">
                {selectedItems.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'safety' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Normativa & Crisoles
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1500px] w-full mx-auto p-4 md:p-6 space-y-6">
        {activeTab === 'table' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, símbolo o N° atómico..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="all">Todas las categorías</option>
                    {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  Seleccionados: <strong className="text-cyan-400">{selectedItems.length}</strong>/4
                </span>
                <button
                  onClick={resetExperiment}
                  disabled={selectedItems.length === 0}
                  className="px-3 py-1.5 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Limpiar
                </button>
                <button
                  onClick={handleGoToChamber}
                  disabled={selectedItems.length === 0}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Ir a Cámara de Reacción
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 overflow-x-auto pb-4">
                <div
                  className="grid gap-1.5 p-4 bg-slate-900/30 rounded-2xl border border-slate-800/80 backdrop-blur-xl min-w-[1050px]"
                  style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}
                >
                  {filteredElements.map((elem) => {
                    const isSelected = selectedSymbols.includes(elem.symbol);
                    return (
                      <button
                        key={elem.symbol}
                        onClick={() => toggleElement(elem)}
                        onMouseEnter={() => setHoveredElement(elem)}
                        style={{ gridRow: elem.row, gridColumn: elem.col }}
                        className={`p-1.5 rounded-lg border flex flex-col justify-between h-20 transition-all text-left group relative overflow-hidden cursor-pointer ${
                          CATEGORY_COLORS[elem.category] || 'bg-slate-900 border-slate-700 text-slate-300'
                        } ${isSelected ? 'ring-2 ring-cyan-400 scale-95 shadow-lg shadow-cyan-500/40 z-10' : ''}`}
                      >
                        <div className="flex justify-between text-[9px] opacity-70 font-mono">
                          <span>{elem.atomicNumber}</span>
                          <span className="truncate max-w-[28px]">{elem.mass}</span>
                        </div>
                        <div className="text-lg font-black text-center tracking-tight my-auto">{elem.symbol}</div>
                        <div className="text-[9px] text-center truncate opacity-90">{elem.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl h-full flex flex-col">
                  <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4 text-cyan-400" /> Especificaciones del Elemento
                  </h2>
                  {hoveredElement ? (
                    <div className="space-y-4 flex-1">
                      <div className="text-center p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 shadow-inner">
                        <span className="text-xs text-slate-500 font-mono">Número Atómico: {hoveredElement.atomicNumber}</span>
                        <div className="text-5xl font-black text-cyan-400 my-2 tracking-tight">{hoveredElement.symbol}</div>
                        <div className="text-lg font-bold">{hoveredElement.name}</div>
                        <div className="text-xs text-cyan-300/80 mt-1">{CATEGORY_NAMES[hoveredElement.category] || hoveredElement.category}</div>
                      </div>

                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                          <span className="text-slate-400">Estado Físico:</span>
                          <span className="text-cyan-300 font-bold uppercase">{hoveredElement.state}</span>
                        </div>
                        <div className="flex justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                          <span className="text-slate-400">Punto de Fusión:</span>
                          <span className="text-red-400 font-bold">{hoveredElement.mp}°C</span>
                        </div>
                        <div className="flex justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                          <span className="text-slate-400">Electronegatividad:</span>
                          <span className="text-amber-400 font-bold">{hoveredElement.en || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 text-xs py-12 space-y-2">
                      <Sparkles className="w-8 h-8 text-slate-700 animate-pulse" />
                      <p>Pasa el cursor sobre un elemento para inspeccionar sus estados de agregación y puntos de fusión.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chamber' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl text-center space-y-4">
              <h2 className="text-lg font-bold text-slate-200 flex items-center justify-center gap-2">
                <Atom className="w-5 h-5 text-cyan-400" /> Cámara Metalúrgica & Ajuste Estequiométrico
              </h2>
              <p className="text-xs text-slate-400">Ajusta la cantidad de átomos/moles para evaluar solubilidades y diagramas de fases.</p>

              <div className="flex justify-center flex-wrap gap-4 py-4">
                {selectedItems.length === 0 ? (
                  <p className="text-xs text-slate-500">No hay elementos seleccionados. Regresa a la Tabla Periódica.</p>
                ) : (
                  selectedItems.map((item) => (
                    <div key={item.element.symbol} className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 text-center w-36 shadow-lg shadow-cyan-500/10 space-y-2">
                      <div className="text-3xl font-black text-cyan-400">{item.element.symbol}</div>
                      <div className="text-[10px] text-slate-400 truncate">{item.element.name}</div>
                      <div className="text-[9px] text-red-400 font-mono">Tf: {item.element.mp}°C | {item.element.state}</div>
                      
                      <div className="flex items-center justify-between bg-slate-900 rounded-xl p-1 border border-slate-800 mt-2">
                        <button onClick={() => updateItemCount(item.element.symbol, -1)} className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-cyan-300">{item.count}</span>
                        <button onClick={() => updateItemCount(item.element.symbol, 1)} className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isProcessing || selectedItems.length === 0}
                className="px-8 py-3 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-2 mx-auto disabled:opacity-40 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                {isProcessing ? 'Validando Parámetros Metalúrgicos...' : 'Simular Reacción / Aleación'}
              </button>
            </div>

            {reactionResult && (
              <div className="bg-slate-900/60 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl space-y-6 shadow-2xl">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <Layers className="w-6 h-6 text-cyan-400 shrink-0" />
                  <h3 className="font-bold text-base md:text-lg text-slate-100">{reactionResult.title}</h3>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-cyan-300 text-sm md:text-base tracking-wide shadow-inner">
                  {reactionResult.equation}
                </div>

                {reactionResult.finalProduct && (
                  <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-3 shadow-lg">
                    <div className="font-bold text-xs text-cyan-400 flex items-center gap-2 uppercase tracking-wider">
                      <Beaker className="w-4 h-4 text-cyan-400" /> RESULTADO FINAL & COMPOSICIÓN QUÍMICA OBTENIDA
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Fase / Producto:</span>
                        <span className="font-bold text-cyan-200 text-sm">{reactionResult.finalProduct.name}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Fórmula / Composición:</span>
                        <span className="font-bold text-amber-300 text-sm">{reactionResult.finalProduct.formula}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Masa Molar / Tipo:</span>
                        <span className="font-bold text-emerald-400 text-xs">{reactionResult.finalProduct.molarMass}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs space-y-1">
                  <span className="text-amber-400 font-bold block">Compatibilidad del Crisol & Contenedor:</span>
                  <p className="text-slate-300 font-mono">{reactionResult.crucibles}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-red-400" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Rango Térmico:</span>
                      <span className="font-mono font-bold text-slate-200 text-[11px]">{reactionResult.conditions.temp}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                    <Gauge className="w-5 h-5 text-blue-400" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Presión:</span>
                      <span className="font-mono font-bold text-slate-200">{reactionResult.conditions.pressure}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-cyan-400" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Humedad Relativa:</span>
                      <span className="font-mono font-bold text-slate-200">{reactionResult.conditions.humidity}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="font-semibold text-cyan-400 flex items-center gap-2">
                      <Flame className="w-4 h-4" /> Causa Termodinámica & Enlace
                    </div>
                    <p className="text-slate-300 leading-relaxed">{reactionResult.thermodynamics}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="font-semibold text-amber-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Cinética y Difusión
                    </div>
                    <p className="text-slate-300 leading-relaxed">{reactionResult.kinetics}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                  <div className="font-semibold text-emerald-400 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4" /> Procedimiento Experimental Real
                  </div>
                  <ol className="text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                    {reactionResult.procedure.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/10 border border-amber-500/20 space-y-2 text-xs">
                  <div className="font-semibold text-amber-300 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400" /> Análisis de Fallos & Defectos de Seguridad
                  </div>
                  <p className="text-slate-300 leading-relaxed">{reactionResult.whatCouldGoWrong}</p>
                </div>

                {reactionResult.prohibitionNotice && (
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 space-y-2 text-xs">
                    <div className="font-bold text-red-400 flex items-center gap-2 uppercase">
                      <AlertOctagon className="w-5 h-5 text-red-500 animate-bounce" /> {reactionResult.prohibitionNotice}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl space-y-4">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" /> Reglas de Control de Enlace y Elementos Idénticos
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                SyntheticaLab valida las interacciones químicas según las directrices físicas estrictas:
              </p>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li><strong>Elementos Idénticos (Alotropía):</strong> La selección del mismo elemento se procesa como coexistencia elemental o reordenamiento cristalino/alotrópico (ej. Grafito a Diamante) sin reacción química con oxígeno o inyección de gases.</li>
                <li><strong>Hidruros Metálicos Pirofóricos:</strong> La reacción de metales del grupo 1 y 2 con hidrógeno genera advertencias severas de piroforicidad con riesgo de ignición violenta ante humedad.</li>
                <li><strong>Óxidos de Transición de Alto Estado de Oxidación:</strong> Los sistemas como WO₃, MoO₃, CrO₃ o V₂O₅ son catalogados bajo redes de coordinación de enlace covalente complejo.</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}