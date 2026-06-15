// ============================================================
// KAIKEN — Constantes SnowPro-compatibles
// Source: fichiers de config SnowPro 2000 (Gasman Industries)
// ============================================================

export const GRAIN_TYPES = [
  { family: 1, code: 'PP',  label_es: 'Precipitación (Nieve fresca)', label_fr: 'Précipitation', subtypes: [
    { code:'1a', label:'Columnas' }, { code:'1b', label:'Agujas' },
    { code:'1c', label:'Placas' },   { code:'1d', label:'Estelares (Dendritas)' },
    { code:'1e', label:'Cristales irregulares' }, { code:'1f', label:'Granizo blando' },
  ]},
  { family: 2, code: 'DF',  label_es: 'Part. en descomposición', label_fr: 'Part. reconnaissables', subtypes: [
    { code:'2a', label:'Part. parcialmente descompuestas' },
    { code:'2b', label:'Part. muy fragmentadas' },
  ]},
  { family: 3, code: 'RG',  label_es: 'Grano redondeado', label_fr: 'Grain arrondi', subtypes: [
    { code:'3a', label:'Granos pequeños redondeados' },
    { code:'3b', label:'Granos grandes redondeados' },
    { code:'3c', label:'Formas mixtas' },
  ]},
  { family: 4, code: 'FC',  label_es: 'Cara plana', label_fr: 'Face plane', subtypes: [
    { code:'4a', label:'Part. facetadas sólidas' },
    { code:'4b', label:'Part. facetadas pequeñas' },
    { code:'4c', label:'Formas mixtas' },
  ]},
  { family: 5, code: 'DH',  label_es: 'Cubilete (Depth Hoar)', label_fr: 'Givre de profondeur', subtypes: [
    { code:'5a', label:'Cristal de copa' },
    { code:'5b', label:'Columnas de cubilete' },
    { code:'5c', label:'Cristales columnares' },
  ]},
  { family: 6, code: 'MF',  label_es: 'Grano húmedo', label_fr: 'Grain humide', subtypes: [
    { code:'6a', label:'Granos redondeados agrupados' },
    { code:'6b', label:'Policristales redondeados' },
    { code:'6c', label:'Nieve mojada (slush)' },
  ]},
  { family: 7, code: 'SH',  label_es: 'Escarcha superficial', label_fr: 'Givre de surface', subtypes: [
    { code:'7a', label:'Cristales de escarcha superficial' },
    { code:'7b', label:'Givre de cavidad' },
  ]},
  { family: 8, code: 'IF',  label_es: 'Masa de hielo', label_fr: 'Masse de glace', subtypes: [
    { code:'8a', label:'Capa de hielo' },
    { code:'8b', label:'Columna de hielo' },
    { code:'8c', label:'Hielo basal' },
  ]},
  { family: 9, code: 'CR',  label_es: 'Costra', label_fr: 'Croûte', subtypes: [
    { code:'9a', label:'Escarcha de cima (Rime)' },
    { code:'9b', label:'Costra de lluvia' },
    { code:'9c', label:'Costra solar / firnspiegel' },
    { code:'9d', label:'Costra de viento' },
    { code:'9e', label:'Costra de deshielo-regelación' },
  ]},
];

export const HAND_HARDNESS = [
  { code:'F',   label:'F — Puño',             value:1   },
  { code:'F+',  label:'F+ — Puño+',           value:1.5 },
  { code:'4F-', label:'4F− — 4 dedos−',       value:2   },
  { code:'4F',  label:'4F — 4 dedos',         value:2.5 },
  { code:'4F+', label:'4F+ — 4 dedos+',       value:3   },
  { code:'1F-', label:'1F− — 1 dedo−',        value:3.5 },
  { code:'1F',  label:'1F — 1 dedo',          value:4   },
  { code:'1F+', label:'1F+ — 1 dedo+',        value:4.5 },
  { code:'P-',  label:'P− — Lápiz−',          value:5   },
  { code:'P',   label:'P — Lápiz',            value:5.5 },
  { code:'P+',  label:'P+ — Lápiz+',          value:6   },
  { code:'K-',  label:'K− — Cuchillo−',       value:6.5 },
  { code:'K',   label:'K — Cuchillo',         value:7   },
  { code:'K+',  label:'K+ — Cuchillo+',       value:7.5 },
  { code:'I-',  label:'I− — Hielo−',          value:8   },
  { code:'I',   label:'I — Hielo',            value:9   },
  { code:'N/A', label:'N/A',                  value:0   },
];

// Valeur numérique pour le graphique hardness
export const hardnessToWidth = (code, maxWidth = 150) => {
  const h = HAND_HARDNESS.find(x => x.code === code);
  if (!h || h.value === 0) return 0;
  return Math.round((h.value / 9) * maxWidth);
};

export const GRAIN_SIZE_MM = [
  0.5,1.0,1.5,2.0,2.5,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,14.0,15.0
];

export const WATER_CONTENT = [
  { code:'D', label:'Seca (Dry)'          },
  { code:'M', label:'Poco húmeda (Moist)' },
  { code:'W', label:'Húmeda (Wet)'        },
  { code:'V', label:'Muy mojada (V.Wet)'  },
  { code:'S', label:'Nieve mojada (Slush)'},
  { code:'U', label:'Desconocida'         },
];

export const ASPECTS = ['N','NE','E','SE','S','SO','O','NO','N/A'];

export const PROFILE_TYPES = ['Full','Test','Fracture Line','Other'];

export const SKY_CONDITIONS = [
  'Clear','Scattered Clouds','Broken Clouds','Overcast',
  'Obscure','Clear with Haze','Scattered Clouds with Haze','Broken Clouds with Haze'
];

export const PRECIP_TYPES = ['Nil','Snow','Rain','Mixed Rain and Snow','Freezing Rain'];
export const PRECIP_RATES = [
  { code:'VL', label:'VL < 1 cm/hr' },
  { code:'L',  label:'L  1 cm/hr'   },
  { code:'M',  label:'M  2 cm/hr'   },
  { code:'H',  label:'H >2 cm/hr'   },
];

export const WIND_SPEEDS = [
  { code:'Calm',     label:'Calm — <1 km/hr'    },
  { code:'Light',    label:'Light — 1-25 km/hr'  },
  { code:'Moderate', label:'Moderate — 26-40 km/hr'},
  { code:'Strong',   label:'Strong — 41-60 km/hr' },
  { code:'Extreme',  label:'Extreme — >60 km/hr'  },
];

export const WIND_DIRS = ['N','NE','E','SE','S','SW','W','NW','N/A'];

export const SURFACE_ROUGHNESS = [
  'Smooth','Wavy','Concave Furrows','Convex Furrows','Random Furrows'
];

export const SHEAR_TYPES = ['Shovel','Rutsch Block','Other'];

export const SHOVEL_RESULTS = [
  { code:'C', label:'C — Colapso'       },
  { code:'V', label:'V — Muy fácil'     },
  { code:'E', label:'E — Fácil'         },
  { code:'M', label:'M — Moderado'      },
  { code:'H', label:'H — Difícil'       },
];

export const RUTSCH_SCORES = [
  { score:1, label:'1 — Cavando o serrando'             },
  { score:2, label:'2 — Peso suave en parte superior'   },
  { score:3, label:'3 — Peso con esquís sin saltar'     },
  { score:4, label:'4 — Primer salto con esquís'        },
  { score:5, label:'5 — Segundo salto con esquís'       },
  { score:6, label:'6 — Salto sin esquís'               },
  { score:7, label:'7 — Bloque no deslizó uniformemente'},
];

export const GRADIENT_THRESHOLDS = { BAJO: 0.05, ALTO: 0.20 };

export const STABILITY = ['Good','Fair','Poor'];
