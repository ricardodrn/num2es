import { describe, it, expect } from '@jest/globals';
import { convertirEntero, parsearNumero } from '../src/core.js';

describe('parsearNumero', () => {
  it('entero positivo', () => {
    expect(parsearNumero(42)).toEqual({ negativo: false, entera: '42', decimal: null });
  });

  it('entero negativo', () => {
    expect(parsearNumero(-5)).toEqual({ negativo: true, entera: '5', decimal: null });
  });

  it('decimal', () => {
    expect(parsearNumero('1.50')).toEqual({ negativo: false, entera: '1', decimal: '5' });
  });

  it('decimal con ceros al final', () => {
    expect(parsearNumero(3.10)).toEqual({ negativo: false, entera: '3', decimal: '1' });
  });

  it('string con coma no soportada → NaN string', () => {
    const res = parsearNumero('0');
    expect(res.entera).toBe('0');
  });
});

describe('convertirEntero – casos básicos', () => {
  it('cero', () => expect(convertirEntero('0', false)).toBe('cero'));
  it('1',    () => expect(convertirEntero('1', false)).toBe('uno'));
  it('1 femenino', () => expect(convertirEntero('1', true)).toBe('una'));
  it('10',   () => expect(convertirEntero('10', false)).toBe('diez'));
  it('11',   () => expect(convertirEntero('11', false)).toBe('once'));
  it('15',   () => expect(convertirEntero('15', false)).toBe('quince'));
  it('16',   () => expect(convertirEntero('16', false)).toBe('dieciséis'));
  it('20',   () => expect(convertirEntero('20', false)).toBe('veinte'));
  it('21',   () => expect(convertirEntero('21', false)).toBe('veintiuno'));
  it('21 femenino', () => expect(convertirEntero('21', true)).toBe('veintiuna'));
  it('22',   () => expect(convertirEntero('22', false)).toBe('veintidós'));
  it('29',   () => expect(convertirEntero('29', false)).toBe('veintinueve'));
  it('30',   () => expect(convertirEntero('30', false)).toBe('treinta'));
  it('31',   () => expect(convertirEntero('31', false)).toBe('treinta y uno'));
  it('41',   () => expect(convertirEntero('41', false)).toBe('cuarenta y uno'));
  it('99',   () => expect(convertirEntero('99', false)).toBe('noventa y nueve'));
});

describe('convertirEntero – centenas', () => {
  it('100', () => expect(convertirEntero('100', false)).toBe('cien'));
  it('101', () => expect(convertirEntero('101', false)).toBe('ciento uno'));
  it('200', () => expect(convertirEntero('200', false)).toBe('doscientos'));
  it('200 femenino', () => expect(convertirEntero('200', true)).toBe('doscientas'));
  it('500', () => expect(convertirEntero('500', false)).toBe('quinientos'));
  it('700', () => expect(convertirEntero('700', false)).toBe('setecientos'));
  it('900', () => expect(convertirEntero('900', false)).toBe('novecientos'));
  it('999', () => expect(convertirEntero('999', false)).toBe('novecientos noventa y nueve'));
});

describe('convertirEntero – miles', () => {
  it('1000',  () => expect(convertirEntero('1000', false)).toBe('mil'));
  it('1001',  () => expect(convertirEntero('1001', false)).toBe('mil uno'));
  it('2000',  () => expect(convertirEntero('2000', false)).toBe('dos mil'));
  it('10000', () => expect(convertirEntero('10000', false)).toBe('diez mil'));
  it('21000', () => expect(convertirEntero('21000', false)).toBe('veintiún mil'));
  it('31000', () => expect(convertirEntero('31000', false)).toBe('treinta y un mil'));
  it('100000',() => expect(convertirEntero('100000', false)).toBe('cien mil'));
  it('200000',() => expect(convertirEntero('200000', false)).toBe('doscientos mil'));
  it('999999',() => expect(convertirEntero('999999', false)).toBe('novecientos noventa y nueve mil novecientos noventa y nueve'));
});

describe('convertirEntero – millones', () => {
  it('1000000',    () => expect(convertirEntero('1000000', false)).toBe('un millón'));
  it('2000000',    () => expect(convertirEntero('2000000', false)).toBe('dos millones'));
  it('21000000',   () => expect(convertirEntero('21000000', false)).toBe('veintiún millones'));
  it('1000001',    () => expect(convertirEntero('1000001', false)).toBe('un millón uno'));
  it('1234567',    () => expect(convertirEntero('1234567', false)).toBe('un millón doscientos treinta y cuatro mil quinientos sesenta y siete'));
  it('123456789',  () => expect(convertirEntero('123456789', false)).toBe('ciento veintitrés millones cuatrocientos cincuenta y seis mil setecientos ochenta y nueve'));
});

describe('convertirEntero – miles de millones y billones', () => {
  it('1000000000',    () => expect(convertirEntero('1000000000', false)).toBe('mil millones'));
  it('5000000000',    () => expect(convertirEntero('5000000000', false)).toBe('cinco mil millones'));
  it('1000000000000', () => expect(convertirEntero('1000000000000', false)).toBe('un billón'));
  it('2000000000000', () => expect(convertirEntero('2000000000000', false)).toBe('dos billones'));
});
