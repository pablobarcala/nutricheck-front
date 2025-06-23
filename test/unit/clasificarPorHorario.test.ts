import { expect } from 'chai';
import { clasificarPorHorario } from '../../src/utils/clasificarPorHorario.js';

describe('clasificarPorHorario', () => {
  it('devuelve desayuno si se pasa "mañana"', () => {
    const resultado = clasificarPorHorario("mañana");
    expect(resultado).to.equal("desayuno");
  });

  it('devuelve almuerzo si se pasa "13:00"', () => {
    const resultado = clasificarPorHorario("13:00");
    expect(resultado).to.equal("almuerzo");
  });

  it('devuelve merienda si se pasa "17"', () => {
    const resultado = clasificarPorHorario("17");
    expect(resultado).to.equal("merienda");
  });

  it('devuelve cena si se pasa "noche"', () => {
    const resultado = clasificarPorHorario("noche");
    expect(resultado).to.equal("cena");
  });

  it('devuelve desayuno si no se pasa nada', () => {
    const resultado = clasificarPorHorario("");
    expect(resultado).to.equal("desayuno");
  });
});