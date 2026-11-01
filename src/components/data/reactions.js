export const REACTION_RULES = [
  {
    reactants: ['H', 'O'],
    equation: '2H₂ + O₂ → 2H₂O',
    products: 'Agua (H₂O)',
    type: 'Síntesis Exotérmica',
    thermodynamics: 'ΔH = -571.6 kJ/mol. Reacción altamente exotérmica. Requiere una energía de activación inicial (chispa/calor).',
    risks: 'Alto riesgo de deflagración o explosión si se mezcla en proporción estequiométrica (2:1).',
    safetyEquipment: ['Gafas de seguridad', 'Pantalla facial', 'Campana de extracción']
  },
  {
    reactants: ['Na', 'Cl'],
    equation: '2Na + Cl₂ → 2NaCl',
    products: 'Cloruro de Sodio (NaCl - Sal de mesa)',
    type: 'Redox violenta',
    thermodynamics: 'ΔH = -822.2 kJ/mol. El sodio cede un electrón al cloro en una transferencia iónica espontánea y muy violenta.',
    risks: 'Emisión de radiación intensa, calor extremo y vapores tóxicos de cloro residual.',
    safetyEquipment: ['Guantes resistentes al calor', 'Traje ignífugo', 'Gafas protectoras']
  },
  {
    reactants: ['Na', 'H', 'O'],
    equation: '2Na + 2H₂O → 2NaOH + H₂↑',
    products: 'Hidróxido de Sodio (NaOH) + Hidrógeno gaseoso (H₂)',
    type: 'Desplazamiento / Exotérmica',
    thermodynamics: 'El metal alcalino reacciona espontáneamente con agua liberando hidrógeno y generando medio altamente alcalino.',
    risks: 'Riesgo alto de ignición del gas hidrógeno producido debido al elevado calor generado.',
    safetyEquipment: ['Pantalla facial completa', 'Guantes de nitrilo pesado', 'Campana química']
  },
  {
    reactants: ['Fe', 'O'],
    equation: '4Fe + 3O₂ → 2Fe₂O₃',
    products: 'Óxido de Hierro (III) (Fe₂O₃ - Herrumbre)',
    type: 'Oxidación gradual',
    thermodynamics: 'ΔH = -824.2 kJ/mol. Cinética lenta a temperatura ambiente, acelerada en presencia de humedad.',
    risks: 'Bajo riesgo inmediato. Inhalación de polvo en concentraciones elevadas.',
    safetyEquipment: ['Mascarilla contra polvo', 'Gafas de seguridad']
  },
  {
    reactants: ['C', 'O'],
    equation: 'C + O₂ → CO₂',
    products: 'Dióxido de Carbono (CO₂)',
    type: 'Combustión',
    thermodynamics: 'ΔH = -393.5 kJ/mol. Reacción de combustión completa del carbono liberando energía calórica.',
    risks: 'Acumulación de gas asfixiante en espacios confinados.',
    safetyEquipment: ['Ventilación adecuada', 'Detector de CO₂']
  }
];