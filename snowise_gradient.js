/**
 * KAIKEN — Moteur de calcul gradient de température
 * Basé sur la planilla Philippe Bouteille / WWFC
 * 
 * Règles métier (source: Calculo_de_Gradiente_de_Temperatura.xls) :
 *   Bajo  : Gte < 0.05 °C/cm  → métamorphose faible, grain stable
 *   Medio : 0.05 ≤ Gte ≤ 0.2  → transition, surveiller
 *   Alto  : Gte > 0.2 °C/cm   → métamorphose constructive active → Caras Planas / Cubiletes
 * 
 * Note critique : MV > 300-350 kg/m³ bloque toute métamorphose
 * (pas d'espace entre grains pour échange gazeux)
 */

const GRADIENT_THRESHOLDS = {
  BAJO: 0.05,   // °C/cm
  ALTO: 0.20,   // °C/cm
};

const GRAIN_METAMORPHOSIS = {
  PP:   { bajo: 'Fragmentación normal', medio: 'Fragmentación acelerada', alto: 'Fragmentación + inicio FC' },
  DF:   { bajo: 'Redondeo normal',      medio: 'Redondeo moderado',       alto: 'Posible inicio FC'         },
  RG:   { bajo: 'Estable',              medio: 'Leve facetación',         alto: 'Evolución a FC probable'   },
  FC:   { bajo: 'Estable',              medio: 'Crecimiento lento',       alto: 'Crecimiento activo → DH'   },
  DH:   { bajo: 'Estable',              medio: 'Crecimiento moderado',    alto: 'Crecimiento activo — PELIGRO' },
  SH:   { bajo: 'Estable',              medio: 'Sin cambio',              alto: 'Sin cambio (SH no migra)'  },
  MF:   { bajo: 'Refreezing posible',   medio: 'Refreezing',              alto: 'Refreezing'                },
  IF:   { bajo: 'Estable',              medio: 'Estable',                 alto: 'Estable'                   },
  default: { bajo: 'Sin cambio significativo', medio: 'Monitorear', alto: 'Metamorfosis activa posible' },
};

/**
 * Calcule le gradient entre deux couches adjacentes
 * @param {number} tempTop     - Température au sommet de la couche (°C, valeur négative)
 * @param {number} tempBottom  - Température à la base de la couche (°C, valeur négative)
 * @param {number} distanceCm  - Épaisseur de la couche (cm)
 * @param {string} grainType   - Code IACS du grain
 * @param {number} densityKgM3 - Masse volumique (kg/m³), optionnel
 * @returns {object}
 */
export function calculateGradient(tempTop, tempBottom, distanceCm, grainType = null, densityKgM3 = null) {
  if (distanceCm <= 0) throw new Error('Distance doit être > 0');

  // Gradient = |ΔT| / distance (toujours positif)
  const deltaT = Math.abs(tempBottom - tempTop);
  const gradient = deltaT / distanceCm;

  // Classification
  let gradientClass;
  if (gradient < GRADIENT_THRESHOLDS.BAJO) {
    gradientClass = 'bajo';
  } else if (gradient <= GRADIENT_THRESHOLDS.ALTO) {
    gradientClass = 'medio';
  } else {
    gradientClass = 'alto';
  }

  // Vérification masse volumique (règle 4 de la planilla)
  const densityBlocked = densityKgM3 !== null && densityKgM3 > 350;

  // Conséquence sur la métamorphose
  const grainKey = grainType && GRAIN_METAMORPHOSIS[grainType] ? grainType : 'default';
  let metamorphosis = GRAIN_METAMORPHOSIS[grainKey][gradientClass];
  
  if (densityBlocked) {
    metamorphosis = `MV=${densityKgM3} kg/m³ — metamorfosis bloqueada (sin espacio entre granos)`;
  }

  return {
    gradient_c_per_cm: parseFloat(gradient.toFixed(4)),
    gradient_class: gradientClass,
    delta_t: parseFloat(deltaT.toFixed(1)),
    density_blocked: densityBlocked,
    metamorphosis_risk: metamorphosis,
  };
}

/**
 * Calcule les gradients pour toutes les couches d'un profil
 * @param {Array} layers - Tableau de couches triées de bas en haut
 *                         [{temp_c, height_top_cm, height_bottom_cm, grain_type, density_kg_m3}]
 * @returns {Array} résultats gradient par couche
 */
export function calculateProfileGradients(layers) {
  const sorted = [...layers].sort((a, b) => a.height_bottom_cm - b.height_bottom_cm);
  const results = [];

  for (let i = 0; i < sorted.length; i++) {
    const layer = sorted[i];
    const thickness = layer.height_top_cm - layer.height_bottom_cm;
    
    if (thickness <= 0 || layer.temp_c == null) continue;

    // Gradient intra-couche si on a la T° du dessus
    if (i + 1 < sorted.length && sorted[i + 1].temp_c != null) {
      const result = calculateGradient(
        sorted[i + 1].temp_c,  // T° couche du dessus = T1
        layer.temp_c,           // T° couche actuelle = T0
        thickness,
        layer.grain_type,
        layer.density_kg_m3
      );
      results.push({
        layer_index: i,
        layer_bottom_cm: layer.height_bottom_cm,
        layer_top_cm: layer.height_top_cm,
        grain_type: layer.grain_type,
        ...result,
      });
    }
  }

  return results;
}
