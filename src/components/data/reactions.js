// src/data/reactions.js

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

export function evaluateReaction(selectedItems) {
  try {
    if (!selectedItems || selectedItems.length === 0) {
      return null;
    }

    const elements = selectedItems.map((item) => item.element);
    const symbols = elements.map((e) => e.symbol);
    const categories = elements.map((e) => e.category);
    const states = elements.map((e) => e.state);

    const subs = { '0':'₀', '1':'₁', '2':'₂', '3':'₃', '4':'₄', '5':'₅', '6':'₆', '7':'₇', '8':'₈', '9':'₉' };
    const toSub = (n) => String(n).split('').map((c) => subs[c] || c).join('');

    // -------------------------------------------------------------
    // 1. CASO ESPECIAL: UN SOLO ELEMENTO (Alotropía o Gases Diatómicos)
    // -------------------------------------------------------------
    if (selectedItems.length === 1) {
      const singleElem = elements[0];
      const totalCount = selectedItems[0].count;
      const naturalDiatomics = ['H', 'N', 'O', 'F', 'Cl', 'Br', 'I'];
      
      let formula = `${singleElem.symbol}${totalCount > 1 ? totalCount : ''}`;
      let title = `Sustancia Pura Elemental (${singleElem.name})`;
      let thermodynamics = `Estabilidad termodinámica monoelemental a 298.15 K y 1 atm. Sin cambio entálpico de reacción ($\Delta H_f^\circ = 0$).`;

      if (naturalDiatomics.includes(singleElem.symbol) && totalCount === 2) {
        formula = `${singleElem.symbol}₂`;
        title = `Molécula Diatómica Natural (${singleElem.name} gas)`;
        thermodynamics = `Enlace covalente homonuclear estable por compartición de par electrónico en fase gaseosa.`;
      } else if (singleElem.symbol === 'C') {
        title = `Red Alotrópica de Carbono (Grafito / Diamante)`;
        thermodynamics = `Equilibrio de fases cristalinas sp² / sp³ bajo condiciones estándar.`;
      }

      return {
        success: true,
        title,
        equation: `${totalCount} ${singleElem.symbol} → ${formula}`,
        finalProduct: {
          name: singleElem.name,
          formula: formula,
          molarMass: `${(singleElem.mass * (formula.includes('₂') ? 2 : totalCount)).toFixed(2)} g/mol`,
          type: 'Sustancia Elemental Pura'
        },
        thermodynamics,
        kinetics: 'Estable cinéticamente en condiciones ambientales.',
        conditions: { temp: '25°C', pressure: '1.0 atm', humidity: 'N/A' },
        procedure: ['Acondicionamiento de muestra pura en atmósfera controlada.'],
        whatCouldGoWrong: 'Ninguno bajo condiciones estándar.',
        prohibitionNotice: null,
        risks: 'Dependiente de la toxicidad intrínseca del elemento.',
        safetyEquipment: ['Gafas de seguridad', 'Guantes de nitrilo'],
        crucibles: 'Contenedor inerte de vidrio borosilicato o acero inoxidable.'
      };
    }

    // -------------------------------------------------------------
    // 2. FILTRO DE GASES NOBLES (Inercia Química Absoluta)
    // -------------------------------------------------------------
    const hasNoble = categories.includes('noble');
    const hasFluorine = symbols.includes('F');
    const hasOxygen = symbols.includes('O');

    if (hasNoble && !hasFluorine && !hasOxygen) {
      const totalMass = selectedItems.reduce((sum, item) => sum + item.element.mass * item.count, 0).toFixed(2);
      return {
        success: false,
        title: 'No hay reacción química viable (Coexistencia Inerte)',
        equation: `${symbols.join(' + ')} → Sin Reacción (ΔG > 0)`,
        finalProduct: {
          name: 'Mezcla Física Inerte',
          formula: symbols.join(' · '),
          molarMass: `${totalMass} g/mol`,
          type: 'Mezcla Homogénea / Heterogénea Fsicamente Inestable'
        },
        thermodynamics: 'Inercia química estricta debida a capa de valencia electrónica completa (configuración de gas noble, Energía de Ionización muy elevada).',
        kinetics: 'Cinética nula a condiciones estándar o moderadas.',
        conditions: { temp: '25°C', pressure: '1.0 atm', humidity: '50%' },
        procedure: ['Mezclado físico en recipiente cerrado sin aporte energético.'],
        whatCouldGoWrong: 'Simple presión parcial de gases sin alteración química.',
        prohibitionNotice: null,
        risks: 'Ninguno por reactividad química.',
        safetyEquipment: ['Gafas de seguridad estándar'],
        crucibles: 'Cualquier contenedor estándar estanco.'
      };
    }

    // -------------------------------------------------------------
    // 3. SISTEMAS METÁLICOS / ALEACIONES Y AMALGAMAS
    // -------------------------------------------------------------
    const isAllMetals = elements.every((e) =>
      ['transition', 'alkali', 'alkaline', 'post-transition', 'lanthanide', 'actinide'].includes(e.category)
    );
    const hasHg = symbols.includes('Hg');

    if (hasHg && isAllMetals) {
      const otherMetals = selectedItems.filter((i) => i.element.symbol !== 'Hg');
      const alloyNames = otherMetals.map((i) => i.element.name).join('-');
      return {
        success: true,
        title: `Formación de Amalgama Metálica (${alloyNames}-Hg)`,
        equation: `${symbols.join(' + ')} → Solución Fásica Líquida/Pastosa`,
        finalProduct: {
          name: `Amalgama de ${alloyNames}`,
          formula: `${otherMetals.map((i) => i.element.symbol).join('')}·Hg`,
          molarMass: 'Variable (Sistema Solucional)',
          type: 'Aleación Líquida / Solución Metálica'
        },
        thermodynamics: 'Disolución endotérmica/exotérmica por solvatación de red cristalina en mercurio líquido.',
        kinetics: 'Difusión atómica rápida a temperatura ambiente.',
        conditions: { temp: '20°C - 25°C', pressure: '1.0 atm', humidity: '< 40%' },
        procedure: ['Adición controlada del metal sólido sobre mercurio bajo campana extractora.'],
        whatCouldGoWrong: 'Volatilización tóxica de vapores de mercurio por calentamiento indebido.',
        prohibitionNotice: 'PROHIBIDO TODO CALENTAMIENTO: Riesgo neurotóxico severo por vaporización de Hg.',
        risks: 'Inhalación de vapores de mercurio.',
        safetyEquipment: ['Campana de extracción de flujo laminar', 'Respirador con filtro para vapores metálicos', 'Guantes de nitrilo'],
        crucibles: 'Crisol de acero inoxidable o vidrio borosilicato.'
      };
    }

    // -------------------------------------------------------------
    // PARCHE 6: MÓDULO DE ÁCIDOS (Hidrácidos y Oxácidos) - PRIORIDAD ALTA
    // -------------------------------------------------------------
    if (selectedItems.length >= 2 && selectedItems.length <= 3) {
      const hasH = symbols.includes('H');
      const hasO = symbols.includes('O');
      const nonMetalItem = selectedItems.find(i => ['halogen', 'nonmetal', 'metalloid'].includes(i.element.category) && !['H', 'O'].includes(i.element.symbol));

      // A) HIDRÁCIDOS: Hidrógeno + Halógeno / Azufre (2 elementos)
      if (hasH && !hasO && nonMetalItem && selectedItems.length === 2) {
        const nm = nonMetalItem.element;
        const oxVal = Math.abs(nm.oxStates?.[0] || 1);
        const formula = `H${oxVal > 1 ? toSub(oxVal) : ''}${nm.symbol}`;
        const acidName = `Ácido ${nm.name.replace(/o$|e$/, '')}hídrico (Gas ${nm.name}uro de Hidrógeno)`;
        const mass = (1.008 * oxVal + nm.mass).toFixed(2);

        return {
          success: true,
          title: `Síntesis de Hidrácido: Formación de ${acidName}`,
          equation: `${oxVal} H + ${nm.symbol} → ${formula} (g)`,
          finalProduct: {
            name: acidName,
            formula: formula,
            molarMass: `${mass} g/mol`,
            type: 'Compuesto Covalente Polar (Hidrácido en Fase Gaseosa/Acuosa)'
          },
          thermodynamics: 'Enlace covalente fuertemente polar por gran diferencia de electronegatividad. Disociación ácida completa en medio acuoso.',
          kinetics: 'Reacción en fase gaseosa fuertemente exotérmica con cinética rápida de adición.',
          conditions: { temp: '25°C - 300°C', pressure: '1.0 atm', humidity: '< 5% (Gas Anhidro)' },
          procedure: [
            'Inyección de reactivos gaseosos anhidros en reactor hermético de cuarzo.',
            'Síntesis por ignición o mezcla asistida por luz UV/térmica.',
            'Absorción del gas resultante en agua desionizada si se requiere solución acuosa.'
          ],
          whatCouldGoWrong: 'Fuga de gas altamente corrosivo, peligro de irritación pulmonar severa y ataque ácido instantáneo al equipo.',
          prohibitionNotice: 'ALERTA DE SEGURIDAD: Gas fuertemente irritante y corrosivo. Prohibido abrir la línea sin extractor de lavado (Scrubber).',
          risks: 'Quemaduras químicas graves e inhalación tóxica.',
          safetyEquipment: ['Campana de extracción de alta velocidad', 'Mascarilla panorámica con cartucho para gases ácidos', 'Guantes de neopreno'],
          crucibles: 'Reactor de cuarzo o celda de teflón (PTFE).'
        };
      }

      // B) OXÁCIDOS: Hidrógeno + No Metal + Oxígeno (3 elementos)
      if (hasH && hasO && nonMetalItem && selectedItems.length === 3) {
        const nm = nonMetalItem.element;
        let oxacidName = `Ácido Oxácido de ${nm.name}`;
        let oxacidFormula = `HXO₃`;
        let hSub = 1, oSub = 3;

        if (nm.symbol === 'S') {
          oxacidName = 'Ácido Sulfúrico';
          oxacidFormula = 'H₂SO₄';
          hSub = 2; oSub = 4;
        } else if (nm.symbol === 'N') {
          oxacidName = 'Ácido Nítrico';
          oxacidFormula = 'HNO₃';
          hSub = 1; oSub = 3;
        } else if (nm.symbol === 'C') {
          oxacidName = 'Ácido Carbónico';
          oxacidFormula = 'H₂CO₃';
          hSub = 2; oSub = 3;
        } else if (nm.symbol === 'Cl') {
          oxacidName = 'Ácido Clórico';
          oxacidFormula = 'HClO₃';
          hSub = 1; oSub = 3;
        }

        const exactMass = ((1.008 * hSub) + nm.mass + (15.999 * oSub)).toFixed(2);

        return {
          success: true,
          title: `Síntesis de Oxácido: Formación de ${oxacidName}`,
          equation: `H₂O + ${nm.symbol}O${oSub - 1} → ${oxacidFormula}`,
          finalProduct: {
            name: oxacidName,
            formula: oxacidFormula,
            molarMass: `${exactMass} g/mol`,
            type: 'Compuesto Ternario Covalente Polar (Oxácido Fuerte)'
          },
          thermodynamics: 'Hidratación del anhídrido ácido correspondiente. Reacción altamente exotérmica por energía de solvatación del protón H⁺.',
          kinetics: 'Formación cinéticamente rápida en fase acuosa.',
          conditions: { temp: '20°C - 80°C', pressure: '1.0 atm', humidity: 'Ambiente acuoso' },
          procedure: [
            'Absorción del óxido no metálico (anhídrido) sobre película de agua desionizada.',
            'Disipación continua de calor por serpentín de enfriamiento.',
            'Concentración por destilación a baja presión si se requiere grado reactivo.'
          ],
          whatCouldGoWrong: 'Proyección violenta de líquido ácido por adición incorrecta de agua sobre el concentrado.',
          prohibitionNotice: 'NUNCA ADICIONAR AGUA AL ÁCIDO CONCENTRADO (Riesgo de ebullición explosiva puntual).',
          risks: 'Corrosión cutánea inmediata y deshidratación de tejidos orgánicos.',
          safetyEquipment: ['Pantalla facial completa', 'Guantes de nitrilo pesado de manga larga', 'Bata ignífuga / Delantal de PVC'],
          crucibles: 'Vidrio borosilicato 3.3 o Reactores revestidos de PTFE.'
        };
      }
    }

    // -------------------------------------------------------------
    // PARCHE 5: COMPUESTOS TERNARIOS (Hidróxidos y Oxisales)
    // -------------------------------------------------------------
    if (selectedItems.length === 3) {
      const symbolsSet = new Set(symbols);
      
      // 1. HIDRÓXIDOS: Metal + Oxígeno + Hidrógeno
      const hasO = symbolsSet.has('O');
      const hasH = symbolsSet.has('H');
      const metalItem = selectedItems.find(i => ['alkali', 'alkaline', 'transition', 'post-transition', 'lanthanide', 'actinide'].includes(i.element.category));

      if (hasO && hasH && metalItem && symbols.length === 3) {
        const metal = metalItem.element;
        const oxValence = Math.abs(metal.oxStates?.[0] || 1);
        const formula = `${metal.symbol}(OH)${oxValence > 1 ? toSub(oxValence) : ''}`;
        const name = `Hidróxido de ${metal.name}`;
        const molarMass = (metal.mass + oxValence * (15.999 + 1.008)).toFixed(2);

        return {
          success: true,
          title: `Síntesis de Compuesto Ternario: Formación de ${name}`,
          equation: `${metal.symbol} + ${oxValence} H₂O → ${formula} + ½ H₂`,
          finalProduct: {
            name: name,
            formula: formula,
            molarMass: `${molarMass} g/mol`,
            type: 'Compuesto Ternario Iónico (Hidróxido / Base)'
          },
          thermodynamics: 'Disociación iónica en medio acuoso con liberación de aniones hidróxido (OH⁻). Enlace iónico fuerte entre el catión metálico y el grupo hidróxido.',
          kinetics: 'Reacción controlada de hidratación y precipitación básica.',
          conditions: { temp: '25°C - 100°C', pressure: '1.0 atm', humidity: 'Ambiente controlado' },
          procedure: [
            'Adición lenta del metal o su óxido en agua desionizada con agitación constante.',
            'Control exotérmico de la temperatura de hidratación.',
            'Cristalización y filtración del hidróxido metálico precipitado.'
          ],
          whatCouldGoWrong: 'Reacción violentamente exotérmica si se emplea metal alcalino puro directamente con agua.',
          prohibitionNotice: metal.category === 'alkali' ? 'PRECAUCIÓN: Reacción altamente exotérmica y peligrosa con agua libre.' : null,
          risks: 'Corrosividad severa cutánea y ocular por basicidad fuerte.',
          safetyEquipment: ['Gafas de seguridad estancas', 'Guantes de neopreno', 'Bata de laboratorio de algodón'],
          crucibles: 'Matriz de teflón (PTFE) o vidrio borosilicato.'
        };
      }

      // 2. OXISALES: Metal + No Metal + Oxígeno
      const nonMetalItem = selectedItems.find(i => ['nonmetal', 'halogen', 'metalloid'].includes(i.element.category) && i.element.symbol !== 'O');
      if (hasO && metalItem && nonMetalItem && symbols.length === 3) {
        const metal = metalItem.element;
        const nonMetal = nonMetalItem.element;
        
        let saltName = `Oxisal de ${metal.name} y ${nonMetal.name}`;
        let saltFormula = `${metal.symbol}XO₄`;
        let exactSaltMass = 0;
        
        if (nonMetal.symbol === 'S') {
          saltName = `Sulfato de ${metal.name}`;
          const metalVal = Math.abs(metal.oxStates?.[0] || 2);
          const mSub = metalVal === 1 ? 2 : 1;
          saltFormula = `${metal.symbol}${mSub > 1 ? toSub(mSub) : ''}SO₄`;
          exactSaltMass = (metal.mass * mSub) + 32.06 + (4 * 15.999);
        } else if (nonMetal.symbol === 'N') {
          saltName = `Nitrato de ${metal.name}`;
          const metalVal = Math.abs(metal.oxStates?.[0] || 1);
          saltFormula = `${metal.symbol}${metalVal > 1 ? toSub(metalVal) : ''}(NO₃)${metalVal > 1 ? toSub(metalVal) : ''}`;
          exactSaltMass = (metal.mass * metalVal) + metalVal * (14.007 + (3 * 15.999));
        } else if (nonMetal.symbol === 'C') {
          saltName = `Carbonato de ${metal.name}`;
          const metalVal = Math.abs(metal.oxStates?.[0] || 2);
          const mSub = metalVal === 1 ? 2 : 1;
          saltFormula = `${metal.symbol}${mSub > 1 ? toSub(mSub) : ''}CO₃`;
          exactSaltMass = (metal.mass * mSub) + 12.011 + (3 * 15.999);
        }

        return {
          success: true,
          title: `Síntesis de Oxisal Ternaria: Formación de ${saltName}`,
          equation: `${metal.symbol} + ${nonMetal.symbol} + O₂ → ${saltFormula}`,
          finalProduct: {
            name: saltName,
            formula: saltFormula,
            molarMass: exactSaltMass > 0 ? `${exactSaltMass.toFixed(2)} g/mol` : 'Variable',
            type: 'Compuesto Ternario Iónico (Oxisal)'
          },
          thermodynamics: 'Formación de red cristalina iónica tridimensional entre el catión metálico y el oxianión poliatómico con alta energía reticular.',
          kinetics: 'Reacción en estado sólido a temperatura elevada o precipitación por neutralización.',
          conditions: { temp: '400°C - 800°C (Sinterización)', pressure: '1.0 atm', humidity: '< 30%' },
          procedure: [
            'Mezclado íntimo de precursores metálicos, no metálicos y fuente de oxígeno.',
            'Calentamiento en horno mufla para consolidación de la red cristalina de la oxisal.',
            'Molienda final y tamizado del producto cristalino obtenido.'
          ],
          whatCouldGoWrong: 'Descomposición térmica parcial de la oxisal si se excede la temperatura de calcinación.',
          prohibitionNotice: null,
          risks: 'Irritación por inhalación de polvos finos salinos.',
          safetyEquipment: ['Mascarilla antipolvo P100', 'Guantes de nitrilo', 'Gafas de seguridad'],
          crucibles: 'Crisol de Alúmina (Al₂O₃) o Porcelana de alta pureza.'
        };
      }
    }

    // -------------------------------------------------------------
    // 4. MOTOR ESTEQUIOMÉTRICO GENERAL (Óxidos, Sales, Compuestos Binarios)
    // -------------------------------------------------------------
    const sorted = [...selectedItems].sort((a, b) => (a.element.en || 0) - (b.element.en || 0));
    const cation = sorted[0].element;
    const anion = sorted[sorted.length - 1].element;

    const deltaEN = Math.abs((anion.en || 0) - (cation.en || 0));
    if (deltaEN < 0.1 && !isAllMetals) {
      return {
        success: false,
        title: 'No hay reacción química viable (Diferencia de Electronegatividad Insuficiente)',
        equation: `${symbols.join(' + ')} → Sin Reacción Viable`,
        finalProduct: {
          name: 'Sin Producto Estable',
          formula: 'N/A',
          molarMass: 'N/A',
          type: 'Incompatible'
        },
        thermodynamics: `Diferencia de electronegatividad muy baja ($\Delta \chi = ${deltaEN.toFixed(2)}$). No existe fuerza motrice electrostática ni covalente polar para la formación de enlaces estables.`,
        kinetics: 'Inercia reactiva.',
        conditions: { temp: '25°C', pressure: '1.0 atm', humidity: 'N/A' },
        procedure: ['Prueba cancelada por incompatibilidad termodinámica.'],
        whatCouldGoWrong: 'Ausencia de transformación.',
        prohibitionNotice: null,
        risks: 'Ninguno.',
        safetyEquipment: ['Equipo estándar de laboratorio'],
        crucibles: 'N/A'
      };
    }

    const oxCation = Math.abs(cation.oxStates?.[0] || 1);
    const oxAnion = Math.abs(anion.oxStates?.[0] || 1);
    const subCation = oxAnion / gcd(oxCation, oxAnion);
    const subAnion = oxCation / gcd(oxCation, oxAnion);

    const formulaStr = `${cation.symbol}${subCation > 1 ? toSub(subCation) : ''}${anion.symbol}${subAnion > 1 ? toSub(subAnion) : ''}`;
    const exactMolarMass = (cation.mass * subCation + anion.mass * subAnion).toFixed(2);

    let compoundName = `Compuesto Binario de ${cation.name} y ${anion.name}`;
    if (anion.symbol === 'O') compoundName = `Óxido de ${cation.name}`;
    else if (anion.symbol === 'Cl') compoundName = `Cloruro de ${cation.name}`;
    else if (anion.symbol === 'F') compoundName = `Fluoruro de ${cation.name}`;

    return {
      success: true,
      title: `Síntesis Química Exitosa: ${compoundName}`,
      equation: `${subCation} ${cation.symbol} + ${subAnion} ${anion.symbol} → ${formulaStr} + ΔH`,
      finalProduct: {
        name: compoundName,
        formula: formulaStr,
        molarMass: `${exactMolarMass} g/mol`,
        type: deltaEN > 1.7 ? 'Compuesto Iónico Definido' : 'Compuesto Covalente Polar'
      },
      thermodynamics: `Enlace ${deltaEN > 1.7 ? 'Iónico con alta energía reticular' : 'Covalente Polar'}. Variación de electronegatividad $\Delta \chi = ${deltaEN.toFixed(2)}$.`,
      kinetics: 'Reacción exotérmica espontánea bajo suministro de energía de activación térmica.',
      conditions: { temp: '300°C - 700°C', pressure: '1.0 atm', humidity: '< 10%' },
      procedure: [
        'Mezclado y molienda estequiométrica de precursores en mortero de ágata.',
        'Tratamiento térmico en horno tubular bajo atmósfera inerte o controlada.'
      ],
      whatCouldGoWrong: 'Oxidación secundaria si hay fugas en la atmósfera del reactor.',
      prohibitionNotice: null,
      risks: 'Exposición a altas temperaturas y proyecciones térmicas.',
      safetyEquipment: ['Gafas de seguridad estancas', 'Guantes térmicos', 'Bata ignífuga'],
      crucibles: 'Crisol de Alúmina ($\text{Al}_2\text{O}_3$) o Platino de alta pureza.'
    };
  } catch (error) {
    console.error('Error crítico en motor termodinámico:', error);
    return {
      success: false,
      title: 'Error de Procesamiento en el Motor Químico',
      equation: '---',
      finalProduct: { name: 'Error de Cálculo', formula: 'N/A', molarMass: 'N/A', type: 'Excepción' },
      thermodynamics: 'Ocurrió un error inesperado al resolver la matriz termodinámica de los elementos.',
      kinetics: 'N/A',
      conditions: { temp: 'N/A', pressure: 'N/A', humidity: 'N/A' },
      procedure: ['Reiniciar la selección de elementos en la interfaz.'],
      whatCouldGoWrong: 'Fallo de excepción controlada.',
      prohibitionNotice: null,
      risks: 'Ninguno.',
      safetyEquipment: ['Equipo estándar'],
      crucibles: 'N/A'
    };
  }
}