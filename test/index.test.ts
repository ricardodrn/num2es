import { describe, it, expect } from '@jest/globals';
import { numeroALetras } from '../src/index.js';

describe('numeroALetras – casos generales', () => {
  it('0', () => expect(numeroALetras(0)).toBe('cero'));
  it('negativo', () => expect(numeroALetras(-42)).toBe('menos cuarenta y dos'));
  it('string numérico', () => expect(numeroALetras('1000')).toBe('mil'));
  // Sin moneda los dígitos decimales se usan tal cual (sin padding a centavos)
  it('decimal sin moneda 3.5', () => expect(numeroALetras(3.5)).toBe('tres con cinco'));
  it('decimal sin moneda 1.5', () => expect(numeroALetras(1.5)).toBe('uno con cinco'));
  it('decimal sin moneda 3.14', () => expect(numeroALetras(3.14)).toBe('tres con catorce'));
  it('separador personalizado', () => expect(numeroALetras(2.3, { separadorDecimal: 'punto' })).toBe('dos punto tres'));
});

describe('numeroALetras – femenino', () => {
  it('una', () => expect(numeroALetras(1, { femenino: true })).toBe('una'));
  it('veintiuna', () => expect(numeroALetras(21, { femenino: true })).toBe('veintiuna'));
  it('doscientas', () => expect(numeroALetras(200, { femenino: true })).toBe('doscientas'));
  it('treinta y una', () => expect(numeroALetras(31, { femenino: true })).toBe('treinta y una'));
});

describe('numeroALetras – moneda MXN', () => {
  it('1 peso', () => expect(numeroALetras(1, { moneda: 'MXN' })).toBe('un peso'));
  it('2 pesos', () => expect(numeroALetras(2, { moneda: 'MXN' })).toBe('dos pesos'));
  it('con centavos', () => expect(numeroALetras(1.5, { moneda: 'MXN' })).toBe('un peso con cincuenta centavos'));
  it('1.01 peso', () => expect(numeroALetras(1.01, { moneda: 'MXN' })).toBe('un peso con un centavo'));
  it('sin decimales en output cuando es .00', () => expect(numeroALetras(100, { moneda: 'MXN' })).toBe('cien pesos'));
  it('1234.56', () => expect(numeroALetras(1234.56, { moneda: 'MXN' })).toBe('mil doscientos treinta y cuatro pesos con cincuenta y seis centavos'));
});

describe('numeroALetras – moneda USD', () => {
  it('1 dólar', () => expect(numeroALetras(1, { moneda: 'USD' })).toBe('un dólar'));
  it('2 dólares', () => expect(numeroALetras(2, { moneda: 'USD' })).toBe('dos dólares'));
  it('0.99', () => expect(numeroALetras(0.99, { moneda: 'USD' })).toBe('cero dólares con noventa y nueve centavos'));
  it('millones con "de"', () => expect(numeroALetras(21000000, { moneda: 'USD' })).toBe('veintiún millones de dólares'));
  it('millón con más cifras: sin "de"', () => expect(numeroALetras(1001000, { moneda: 'USD' })).toBe('un millón mil dólares'));
});

describe('numeroALetras – moneda EUR', () => {
  it('1 euro', () => expect(numeroALetras(1, { moneda: 'EUR' })).toBe('un euro'));
  it('1.01', () => expect(numeroALetras(1.01, { moneda: 'EUR' })).toBe('un euro con un céntimo'));
  it('2.50', () => expect(numeroALetras(2.5, { moneda: 'EUR' })).toBe('dos euros con cincuenta céntimos'));
});

describe('numeroALetras – moneda CLP (sin decimales)', () => {
  it('1000', () => expect(numeroALetras(1000, { moneda: 'CLP' })).toBe('mil pesos'));
  it('ignora decimales', () => expect(numeroALetras(1000.5, { moneda: 'CLP' })).toBe('mil pesos'));
});

describe('numeroALetras – MonedaConfig personalizada', () => {
  it('moneda femenina custom', () =>
    expect(
      numeroALetras(1.5, {
        moneda: {
          singular: 'libra', plural: 'libras',
          centSingular: 'penique', centPlural: 'peniques',
          femenino: true,
        },
      }),
    ).toBe('una libra con cincuenta peniques'),
  );

  it('moneda masculina custom', () =>
    expect(
      numeroALetras(1.5, {
        moneda: { singular: 'franco', plural: 'francos', centSingular: 'céntimo', centPlural: 'céntimos' },
      }),
    ).toBe('un franco con cincuenta céntimos'),
  );
});
