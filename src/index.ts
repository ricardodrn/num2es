import { convertirEntero, parsearNumero, apocopar } from './core.js';
import { resolverMoneda } from './currency.js';
import type { OpcionesConversion, MonedaCodigo, MonedaConfig } from './types.js';

export type { OpcionesConversion, MonedaCodigo, MonedaConfig };

/**
 * Convierte un número a su representación en palabras en español.
 *
 * @param valor  - Número o string numérico (admite negativos y decimales)
 * @param opciones - Opciones de conversión
 * @returns Representación en palabras
 *
 * @example
 * numeroALetras(42)                          // "cuarenta y dos"
 * numeroALetras(1001)                        // "mil uno"
 * numeroALetras(1, { femenino: true })       // "una"
 * numeroALetras(1234.56, { moneda: 'MXN' }) // "mil doscientos treinta y cuatro pesos con cincuenta y seis centavos"
 */
export function numeroALetras(
  valor: number | string,
  opciones: OpcionesConversion = {},
): string {
  const { negativo, entera, decimal } = parsearNumero(valor);

  const monedaConfig: MonedaConfig | null = opciones.moneda
    ? resolverMoneda(opciones.moneda)
    : null;

  const separador = opciones.separadorDecimal ?? 'con';

  // Género: si hay moneda, su género rige la parte entera; sin moneda, usa opciones
  const femeninoCurrency = monedaConfig?.femenino ?? false;
  const femeninoEntero = monedaConfig ? femeninoCurrency : (opciones.femenino ?? false);

  // --- Parte entera ---
  const palabrasEntero = convertirEntero(entera, femeninoEntero);

  let resultado: string;

  if (monedaConfig) {
    const valorEntero = parseInt(entera, 10);
    const nombreUnidad = valorEntero === 1 ? monedaConfig.singular : monedaConfig.plural;

    // Ante sustantivo masculino: apocopar "uno"→"un", "veintiuno"→"veintiún"
    // Ante sustantivo femenino: la forma ya viene correcta ("una", "veintiuna")
    const enteroFinal = femeninoCurrency ? palabrasEntero : apocopar(palabrasEntero);

    // "un millón DE dólares", "dos millones DE pesos" — regla del español:
    // millón/billón/trillón son sustantivos y requieren "de" ante el nombre de la cosa contada.
    const nexo = /(?:millones?|billones?|trillones?)$/.test(enteroFinal) ? ' de ' : ' ';
    resultado = enteroFinal + nexo + nombreUnidad;
  } else {
    resultado = palabrasEntero;
  }

  // --- Parte decimal ---
  if (decimal !== null) {
    // Con moneda: normalizar a los decimales de la moneda (pad o truncar)
    // Sin moneda: usar los dígitos tal cual (sin padding)
    const decimalesMax = monedaConfig ? (monedaConfig.decimales ?? 2) : decimal.length;

    if (decimalesMax > 0) {
      const decNorm = decimal.padEnd(decimalesMax, '0').slice(0, decimalesMax);
      const valorCent = parseInt(decNorm, 10);

      if (valorCent > 0) {
        // Centavos son siempre masculinos en todas las monedas soportadas
        const rawCent = decNorm.replace(/^0+/, '') || '0';
        const palabrasCent = apocopar(convertirEntero(rawCent, false));

        if (monedaConfig?.centSingular && monedaConfig?.centPlural) {
          const nombreCent = valorCent === 1
            ? monedaConfig.centSingular
            : monedaConfig.centPlural;
          resultado += ' ' + separador + ' ' + palabrasCent + ' ' + nombreCent;
        } else {
          resultado += ' ' + separador + ' ' + palabrasCent;
        }
      }
    }
  }

  return negativo ? 'menos ' + resultado : resultado;
}

export { MONEDAS } from './currency.js';
