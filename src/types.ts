export interface MonedaConfig {
  singular: string;
  plural: string;
  centSingular?: string;
  centPlural?: string;
  /** Si la moneda es de género femenino (ej: peseta) */
  femenino?: boolean;
  /** Decimales a considerar, por defecto 2 */
  decimales?: number;
}

export type MonedaCodigo =
  | 'MXN' | 'USD' | 'EUR' | 'COP' | 'ARS' | 'PEN'
  | 'CLP' | 'VES' | 'GTQ' | 'HNL' | 'NIO' | 'CRC'
  | 'PAB' | 'BOB' | 'PYG' | 'UYU' | 'DOP' | 'CUP';

export interface OpcionesConversion {
  /** Usar formas femeninas (una, doscientas…). Por defecto: false */
  femenino?: boolean;
  /** Moneda a usar */
  moneda?: MonedaCodigo | MonedaConfig;
  /** Texto para el separador decimal. Por defecto: "con" */
  separadorDecimal?: string;
}
