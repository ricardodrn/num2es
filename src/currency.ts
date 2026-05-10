import type { MonedaCodigo, MonedaConfig } from './types.js';

export const MONEDAS: Readonly<Record<MonedaCodigo, MonedaConfig>> = {
  MXN: { singular: 'peso',    plural: 'pesos',    centSingular: 'centavo',  centPlural: 'centavos'  },
  USD: { singular: 'dólar',   plural: 'dólares',  centSingular: 'centavo',  centPlural: 'centavos'  },
  EUR: { singular: 'euro',    plural: 'euros',    centSingular: 'céntimo',  centPlural: 'céntimos'  },
  COP: { singular: 'peso',    plural: 'pesos',    centSingular: 'centavo',  centPlural: 'centavos'  },
  ARS: { singular: 'peso',    plural: 'pesos',    centSingular: 'centavo',  centPlural: 'centavos'  },
  PEN: { singular: 'sol',     plural: 'soles',    centSingular: 'céntimo',  centPlural: 'céntimos'  },
  CLP: { singular: 'peso',    plural: 'pesos',    decimales: 0                                      },
  VES: { singular: 'bolívar', plural: 'bolívares', centSingular: 'céntimo', centPlural: 'céntimos'  },
  GTQ: { singular: 'quetzal', plural: 'quetzales', centSingular: 'centavo', centPlural: 'centavos'  },
  HNL: { singular: 'lempira', plural: 'lempiras', centSingular: 'centavo',  centPlural: 'centavos'  },
  NIO: { singular: 'córdoba', plural: 'córdobas', centSingular: 'centavo',  centPlural: 'centavos'  },
  CRC: { singular: 'colón',   plural: 'colones',  centSingular: 'céntimo',  centPlural: 'céntimos'  },
  PAB: { singular: 'balboa',  plural: 'balboas',  centSingular: 'centésimo', centPlural: 'centésimos' },
  BOB: { singular: 'boliviano', plural: 'bolivianos', centSingular: 'centavo', centPlural: 'centavos' },
  PYG: { singular: 'guaraní', plural: 'guaraníes', decimales: 0                                     },
  UYU: { singular: 'peso',    plural: 'pesos',    centSingular: 'centésimo', centPlural: 'centésimos' },
  DOP: { singular: 'peso',    plural: 'pesos',    centSingular: 'centavo',  centPlural: 'centavos'  },
  CUP: { singular: 'peso',    plural: 'pesos',    centSingular: 'centavo',  centPlural: 'centavos'  },
};

export function resolverMoneda(moneda: MonedaCodigo | MonedaConfig): MonedaConfig {
  if (typeof moneda === 'string') {
    const config = MONEDAS[moneda as MonedaCodigo];
    if (!config) throw new Error(`Moneda no reconocida: "${moneda}"`);
    return config;
  }
  return moneda;
}
