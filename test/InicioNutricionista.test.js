import { expect } from 'chai';
import sinon from 'sinon';
import {
  obtenerNombreNutricionistaAPI,
  obtenerComidasDelDiaAPI,
  procesarComidasDelDia
} from '../src/services/inicioNutricionistaService.js';

describe('InicioNutricionistaService', () => {
  let fetchStub;
  const apiUrl = 'http://fakeapi.com';
  const token = 'fake-token';

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('obtenerNombreNutricionistaAPI', () => {
    it('✅ debería devolver el nombre del nutricionista si la respuesta es exitosa', async () => {
      const fakeResponse = { nombre: 'Juan' };

      fetchStub.resolves({
        ok: true,
        json: async () => fakeResponse,
      });

      const result = await obtenerNombreNutricionistaAPI(token, apiUrl);
      expect(result).to.equal('Juan');
      expect(fetchStub.calledOnce).to.be.true;
    });

    it('❌ debería lanzar error si la respuesta no es ok', async () => {
      fetchStub.resolves({ ok: false, status: 401 });

      try {
        await obtenerNombreNutricionistaAPI(token, apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (err) {
        expect(err.message).to.include('HTTP error');
      }
    });
  });

  describe('obtenerComidasDelDiaAPI', () => {
    it('✅ debería devolver las comidas si la respuesta es exitosa', async () => {
      const fecha = '2025-07-12';
      const fakeComidas = [{ paciente: 'Pablo', desayuno: 'Yogurt' }];

      fetchStub.resolves({
        ok: true,
        json: async () => fakeComidas,
      });

      const result = await obtenerComidasDelDiaAPI(fecha, token, apiUrl);
      expect(result).to.deep.equal(fakeComidas);
      expect(fetchStub.calledOnce).to.be.true;
    });

    it('❌ debería lanzar error si la respuesta no es ok', async () => {
      const fecha = '2025-07-12';

      fetchStub.resolves({ ok: false, status: 500 });

      try {
        await obtenerComidasDelDiaAPI(fecha, token, apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (err) {
        expect(err.message).to.include('HTTP error');
      }
    });
  });

  describe('procesarComidasDelDia', () => {
    it('✅ debería retornar comidas si hay registros', () => {
      const comidas = [
        { paciente: 'Pablo', desayuno: 'Yogurt', almuerzo: '', merienda: '', cena: '' }
      ];
      const result = procesarComidasDelDia(comidas);
      expect(result).to.deep.equal(comidas);
    });

    it('❌ debería mostrar mensaje si no hay comidas registradas (array vacío)', () => {
      const result = procesarComidasDelDia([]);
      expect(result).to.equal('No hay comidas registradas para el día seleccionado');
    });

    it('❌ debería mostrar mensaje si el array es null', () => {
      const result = procesarComidasDelDia(null);
      expect(result).to.equal('No hay comidas registradas para el día seleccionado');
    });
  });
});
