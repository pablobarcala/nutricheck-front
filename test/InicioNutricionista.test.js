// test/inicioNutricionistaService.test.js

import { expect } from 'chai';
import sinon from 'sinon';
import { obtenerNombreNutricionistaAPI, obtenerComidasDelDiaAPI } from '../src/services/InicioNutricionistaService.js';

describe('InicioNutricionistaService', () => {
  let fetchStub;
  const token = 'fake-token';
  const apiUrl = 'http://fakeapi.com';

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
        json: async () => fakeResponse
      });

      const result = await obtenerNombreNutricionistaAPI(token, apiUrl);
      expect(result).to.equal('Juan');
    });

    it('❌ debería lanzar error si la respuesta no es ok', async () => {
      fetchStub.resolves({ ok: false, status: 403 });

      try {
        await obtenerNombreNutricionistaAPI(token, apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (error) {
        expect(error.message).to.include('HTTP error');
      }
    });
  });

  describe('obtenerComidasDelDiaAPI', () => {
    const fecha = '2025-07-12';

    it('✅ debería devolver las comidas si la respuesta es exitosa', async () => {
      const fakeComidas = [
        {
          paciente: 'Pablo',
          desayuno: 'Yogurt con miel',
          almuerzo: '',
          merienda: '',
          cena: ''
        }
      ];

      fetchStub.resolves({
        ok: true,
        json: async () => fakeComidas
      });

      const result = await obtenerComidasDelDiaAPI(fecha, token, apiUrl);
      expect(result).to.deep.equal(fakeComidas);
    });

    it('❌ Mostrar un mensaje que las comidas no pudieron ser cargadas', async () => {
      fetchStub.resolves({ ok: false, status: 500 });

      try {
        await obtenerComidasDelDiaAPI(fecha, token, apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (error) {
        expect(error.message).to.include('HTTP error');
      }
    });
  });
});
