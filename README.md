# num2es

Convierte números a palabras en español. Sin dependencias externas, funciona en cualquier entorno JavaScript moderno y está optimizada para ser eficiente.

Nació como solución para ese problema clásico de entrevistas técnicas. La diferencia: trata el español correctamente con género gramatical, monedas de la región, escala larga y los casos especiales que otras librerías suelen ignorar.

## Instalación

```bash
pnpm install num2es
```

## Uso básico

```ts
import { numeroALetras } from 'num2es';

numeroALetras(0)         // "cero"
numeroALetras(42)        // "cuarenta y dos"
numeroALetras(100)       // "cien"
numeroALetras(101)       // "ciento uno"
numeroALetras(1000)      // "mil"
numeroALetras(1234)      // "mil doscientos treinta y cuatro"
numeroALetras(1000000)   // "un millón"
numeroALetras(-5)        // "menos cinco"
numeroALetras(3.14)      // "tres con catorce"
```

## Con moneda

Acepta cualquier código ISO 4217 de la región. La gramática se ajusta automáticamente, incluyendo preposiciones que suelen olvidarse en números grandes.

```ts
numeroALetras(1234.56, { moneda: 'MXN' })
// → "mil doscientos treinta y cuatro pesos con cincuenta y seis centavos"

numeroALetras(1, { moneda: 'USD' })
// → "un dólar"

numeroALetras(2.5, { moneda: 'EUR' })
// → "dos euros con cincuenta céntimos"

// Este caso suele fallar en otras librerías:
numeroALetras(21000000, { moneda: 'USD' })
// → "veintiún millones de dólares"
```

### Moneda personalizada

Puedes definir la tuya:

```ts
import type { MonedaConfig } from 'num2es';

const miMoneda: MonedaConfig = {
  singular:     'franco',
  plural:       'francos',
  centSingular: 'céntimo',
  centPlural:   'céntimos',
};

numeroALetras(1.5, { moneda: miMoneda })
// → "un franco con cincuenta céntimos"
```

## Género gramatical

El español tiene género y esta librería lo sabe. Útil cuando el número acompaña a un sustantivo femenino.

```ts
numeroALetras(1,   { femenino: true })  // "una"
numeroALetras(21,  { femenino: true })  // "veintiuna"
numeroALetras(200, { femenino: true })  // "doscientas"
numeroALetras(31,  { femenino: true })  // "treinta y una"
```

## Todas las opciones

```ts
interface OpcionesConversion {
  /** Usar formas femeninas (una, doscientas…). Por defecto: false */
  femenino?: boolean;

  /** Código ISO 4217 o configuración personalizada */
  moneda?: MonedaCodigo | MonedaConfig;

  /** Palabra entre la parte entera y los centavos. Por defecto: "con" */
  separadorDecimal?: string;
}
```

## Monedas soportadas

Cubre toda la región hispanohablante más las divisas internacionales más comunes.

| Código | Moneda            |
|--------|-------------------|
| MXN    | Peso mexicano     |
| USD    | Dólar             |
| EUR    | Euro              |
| COP    | Peso colombiano   |
| ARS    | Peso argentino    |
| PEN    | Sol peruano       |
| CLP    | Peso chileno      |
| VES    | Bolívar           |
| GTQ    | Quetzal           |
| HNL    | Lempira           |
| NIO    | Córdoba           |
| CRC    | Colón             |
| PAB    | Balboa            |
| BOB    | Boliviano         |
| PYG    | Guaraní           |
| UYU    | Peso uruguayo     |
| DOP    | Peso dominicano   |
| CUP    | Peso cubano       |

## Escala numérica

Usa la escala larga, que es el estándar en español. Si te preguntaste por qué en español un billón no es lo mismo que un billion en inglés, [aquí está la explicación](https://es.wikipedia.org/wiki/Escalas_num%C3%A9ricas_larga_y_corta).

| Valor | Nombre       |
|-------|--------------|
| 10³   | mil          |
| 10⁶   | millón       |
| 10⁹   | mil millones |
| 10¹²  | billón       |
| 10¹⁵  | mil billones |
| 10¹⁸  | trillón      |

## Compatibilidad

Funciona donde corra JavaScript, sin configuración adicional:

- Node.js ≥ 14 con ESM y CJS
- React, Vue, Svelte — cualquier framework moderno
- Bundlers: Vite, Webpack, esbuild
- Browser directo vía CDN ESM
- Cero dependencias de producción
