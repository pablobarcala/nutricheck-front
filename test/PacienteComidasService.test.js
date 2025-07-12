// test/PacienteComidasService.test.js

import { expect } from 'chai';
import sinon from 'sinon';
import { getComidasDelDiaAPI } from '../src/services/PacienteComidasService.js';

describe('PacienteComidasService', () => {
  let fetchStub;
  const token = 'fake-token';
  const apiUrl = 'http://fakeapi.com';

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getComidasDelDiaAPI', () => {
    it('debería devolver las comidas del día correctamente', async () => {
      const fakeComidas = [
        {
          tipo: 'desayuno',
          calorias: 300,
          grasas: 10,
          proteinas: 15,
          carbohidratos: 40
        },
        {
          tipo: 'almuerzo',
          calorias: 600,
          grasas: 20,
          proteinas: 30,
          carbohidratos: 50
        }
      ];

      fetchStub.resolves({
        ok: true,
        json: async () => fakeComidas
      });

      const result = await getComidasDelDiaAPI('2025-07-12', token, apiUrl);
      expect(result).to.deep.equal(fakeComidas);
    });

    it('debería lanzar error si la petición falla', async () => {
      fetchStub.resolves({ ok: false, status: 404 });

      try {
        await getComidasDelDiaAPI('2025-07-12', token, apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (err) {
        expect(err.message).to.include('HTTP error');
      }
    });
  });
});
