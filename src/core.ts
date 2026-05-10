import {
  UNIDADES_M, UNIDADES_F, DECENAS, CENTENAS_M, CENTENAS_F, ESCALAS,
} from './constants.js';

/**
 * Convierte un número 1-999 a palabras.
 * Complejidad: O(1) — número fijo de operaciones independiente del valor.
 */
function convertirGrupo(n: number, femenino: boolean): string {
  const centenas = (n / 100) | 0;
  const resto    = n % 100;

  // Construimos el resultado concatenando partes para evitar arrays intermedios.
  let resultado = '';

  if (centenas > 0) {
    if (n === 100) return 'cien';
    resultado = femenino ? CENTENAS_F[centenas] : CENTENAS_M[centenas];
  }

  if (resto === 0) return resultado;

  const sep = resultado ? ' ' : '';

  if (resto < 30) {
    const tabla = femenino ? UNIDADES_F : UNIDADES_M;
    return resultado + sep + tabla[resto];
  }

  // 30-99: decena + " y " + unidad
  const decena  = (resto / 10) | 0;
  const unidad  = resto % 10;
  const decStr  = DECENAS[decena];

  if (unidad === 0) return resultado + sep + decStr;

  const unStr = femenino && unidad === 1 ? 'una' : UNIDADES_M[unidad];
  return resultado + sep + decStr + ' y ' + unStr;
}

/**
 * Convierte el texto de un grupo a forma apocópada para usar ante
 * sustantivos masculinos (mil, millón…).
 * "veintiuno" → "veintiún", "uno" → "un" al final de cadena.
 * Complejidad: O(k) donde k = longitud del string (acotada por O(1) prácticamente).
 */
export function apocopar(texto: string): string {
  if (texto === 'veintiuno' || texto === 'veintiuna') return 'veintiún';
  if (texto.endsWith(' uno') || texto.endsWith(' una')) {
    return texto.slice(0, -3) + 'un';
  }
  if (texto === 'uno' || texto === 'una') return 'un';
  return texto;
}

/**
 * Extrae grupos de 3 dígitos de derecha a izquierda a partir de un string
 * de dígitos. Retorna array donde índice 0 = grupo menos significativo.
 * Complejidad: O(n) donde n = número de dígitos.
 */
function extraerGrupos(digitos: string): number[] {
  const grupos: number[] = [];
  for (let i = digitos.length; i > 0; i -= 3) {
    grupos.push(+digitos.slice(i > 3 ? i - 3 : 0, i));
  }
  return grupos;
}

/**
 * Convierte la parte entera de un número a letras en español.
 * Complejidad temporal y espacial: O(n) donde n = número de dígitos.
 */
export function convertirEntero(digitos: string, femenino: boolean): string {
  if (digitos === '0') return 'cero';

  const grupos = extraerGrupos(digitos);

  // Construimos las partes de mayor a menor escala.
  const partes: string[] = [];

  for (let i = grupos.length - 1; i >= 0; i--) {
    const grupo = grupos[i];
    if (grupo === 0) continue;

    const escala = ESCALAS[i];

    if (i === 0) {
      // Grupo de unidades: respeta género
      partes.push(convertirGrupo(grupo, femenino));
      continue;
    }

    // Grupos de escala: siempre masculino (mil, millón son masculinos/neutros)
    const grupoStr = convertirGrupo(grupo, false);

    if (escala.omitirUno) {
      // "mil", "mil millones", "mil billones"…
      if (grupo === 1) {
        partes.push(escala.singular);
      } else {
        partes.push(apocopar(grupoStr) + ' ' + escala.plural);
      }
    } else {
      // "millón/millones", "billón/billones"…
      if (grupo === 1) {
        partes.push('un ' + escala.singular);
      } else {
        partes.push(apocopar(grupoStr) + ' ' + escala.plural);
      }
    }
  }

  return partes.join(' ');
}

/**
 * Separa un número (número o string) en parte entera y decimal.
 * Usa string para evitar pérdida de precisión en flotantes.
 * Retorna { entera: string, decimal: string | null }.
 */
export function parsearNumero(valor: number | string): {
  negativo: boolean;
  entera: string;
  decimal: string | null;
} {
  const str = typeof valor === 'number' ? valor.toString() : valor.trim();

  const negativo = str.startsWith('-');
  const abs = negativo ? str.slice(1) : str;

  const punto = abs.indexOf('.');
  if (punto === -1) {
    return { negativo, entera: abs || '0', decimal: null };
  }

  const entera  = abs.slice(0, punto) || '0';
  const decimal = abs.slice(punto + 1).replace(/0+$/, '') || null;

  return { negativo, entera, decimal };
}
