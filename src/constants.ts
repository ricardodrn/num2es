/**
 * Unidades 0-29 (masculino). Índice = valor.
 * 0 se maneja externamente como 'cero'.
 */
export const UNIDADES_M: readonly string[] = [
  '', 'uno', 'dos', 'tres', 'cuatro', 'cinco',
  'seis', 'siete', 'ocho', 'nueve', 'diez',
  'once', 'doce', 'trece', 'catorce', 'quince',
  'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve',
  'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro',
  'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve',
];

/** Unidades 0-29 (femenino). Solo difieren el 1 y el 21. */
export const UNIDADES_F: readonly string[] = [
  '', 'una', 'dos', 'tres', 'cuatro', 'cinco',
  'seis', 'siete', 'ocho', 'nueve', 'diez',
  'once', 'doce', 'trece', 'catorce', 'quince',
  'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve',
  'veinte', 'veintiuna', 'veintidós', 'veintitrés', 'veinticuatro',
  'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve',
];

/** Decenas simples (30, 40…90). Índice = decena (3-9). */
export const DECENAS: readonly string[] = [
  '', '', '', 'treinta', 'cuarenta', 'cincuenta',
  'sesenta', 'setenta', 'ochenta', 'noventa',
];

/** Centenas (100-900) masculino. Índice = centena (1-9). */
export const CENTENAS_M: readonly string[] = [
  '', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos',
  'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos',
];

/** Centenas (100-900) femenino. Índice = centena (1-9). */
export const CENTENAS_F: readonly string[] = [
  '', 'ciento', 'doscientas', 'trescientas', 'cuatrocientas',
  'quinientas', 'seiscientas', 'setecientas', 'ochocientas', 'novecientas',
];

export interface Escala {
  readonly singular: string;
  readonly plural: string;
  /** true = "mil" (grupo 1 → no lleva "un", sólo "mil") */
  readonly omitirUno: boolean;
}

/**
 * Escalas para grupos de 3 dígitos (índice = posición del grupo, 0 = unidades).
 * Escala larga española: 10^9 = mil millones, 10^12 = billón.
 */
export const ESCALAS: readonly Escala[] = [
  { singular: '',             plural: '',              omitirUno: false },
  { singular: 'mil',          plural: 'mil',           omitirUno: true  },
  { singular: 'millón',       plural: 'millones',      omitirUno: false },
  { singular: 'mil millones', plural: 'mil millones',  omitirUno: true  },
  { singular: 'billón',       plural: 'billones',      omitirUno: false },
  { singular: 'mil billones', plural: 'mil billones',  omitirUno: true  },
  { singular: 'trillón',      plural: 'trillones',     omitirUno: false },
];
