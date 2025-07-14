// test/PacienteService.test.js
import { expect } from 'chai';
import sinon from 'sinon';
import {
  getComidasSugeridasAPI,
  registrarComidaPacienteAPI,
  getProgresoCaloricoAPI
} from '../src/services/PacienteService.js';

describe('PacienteService', () => {
  let fetchStub;
  const token = 'fake-token';
  const apiUrl = 'http://fakeapi.com';

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    sinon.restore();
  });

  // 1. Obtener comidas sugeridas
  describe('getComidasSugeridasAPI', () => {
    it('debería retornar comidas sugeridas correctamente', async () => {
      const fakeComidas = [{ id: 1, nombre: 'Yogur' }];
      fetchStub.resolves({ ok: true, json: async () => fakeComidas });

      const result = await getComidasSugeridasAPI(token, apiUrl);
      expect(result).to.deep.equal(fakeComidas);
    });

    it('debería lanzar error si falla el fetch', async () => {
      fetchStub.resolves({ ok: false, status: 500 });

      try {
        await getComidasSugeridasAPI(token, apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (err) {
        expect(err.message).to.include('HTTP error');
      }
    });
  });

  // 2. Registrar comida
  describe('registrarComidaPacienteAPI', () => {
    it('debería registrar la comida correctamente', async () => {
      const responseOK = { mensaje: 'Comida registrada' };
      fetchStub.resolves({ ok: true, json: async () => responseOK });

      const result = await registrarComidaPacienteAPI('almuerzo', 2, '2025-07-12', token, apiUrl);
      expect(result).to.deep.equal(responseOK);
    });

    it('debería lanzar error si el registro falla', async () => {
      fetchStub.resolves({ ok: false, status: 400 });

      try {
        await registrarComidaPacienteAPI('almuerzo', 2, '2025-07-12', token, apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (err) {
        expect(err.message).to.include('HTTP error');
      }
    });
  });

  // 3. Obtener progreso calórico
  describe('getProgresoCaloricoAPI', () => {
    it('debería devolver el progreso calórico del día', async () => {
      const fakeProgreso = { calorias: 1200, meta: 1800 };
      fetchStub.resolves({ ok: true, json: async () => fakeProgreso });

      const result = await getProgresoCaloricoAPI('2025-07-12', token, apiUrl);
      expect(result).to.deep.equal(fakeProgreso);
    });

    it('debería lanzar error si falla la obtención de progreso', async () => {
      fetchStub.resolves({ ok: false, status: 404 });

      try {
        await getProgresoCaloricoAPI('2025-07-12', token, apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (err) {
        expect(err.message).to.include('HTTP error');
      }
    });
  });
});
