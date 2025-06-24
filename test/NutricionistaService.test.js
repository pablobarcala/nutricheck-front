import { expect } from 'chai';
import sinon from 'sinon';
import { buscarPacientePorNombreAPI, vincularPacienteANutricionistaAPI } from '../src/services/NutricionistaService.js';

describe('NutricionistaService', () => {
  let fetchStub;
  const token = 'fake-token';
  const apiUrl = 'http://fakeapi.com';

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    sinon.restore();
  });

  // Test 1 - Buscar paciente por nombre (sin autorización)
  describe('buscarPacientePorNombreAPI', () => {
    it('debe retornar pacientes cuando la búsqueda es exitosa', async () => {
      const nombre = 'Juan';
      const fakeResponse = [{ id: 1, nombre: 'Juan', fechaNacimiento: '1990-01-01' }];

      fetchStub.resolves({
        ok: true,
        json: async () => fakeResponse,
      });

      const result = await buscarPacientePorNombreAPI(nombre, apiUrl);
      expect(result).to.deep.equal(fakeResponse);
      expect(fetchStub.calledOnce).to.be.true;
      const calledUrl = fetchStub.getCall(0).args[0];
      expect(calledUrl).to.equal(`${apiUrl}/api/Pacientes/buscar?nombre=${nombre}`);
    });

    it('debe lanzar error si la búsqueda falla', async () => {
      fetchStub.resolves({ ok: false, status: 404 });

      try {
        await buscarPacientePorNombreAPI('Juan', apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (err) {
        expect(err.message).to.include('HTTP error');
      }
    });
  });

  // Test 2 - Vincular paciente con nutricionista (con autorización)
  describe('vincularPacienteANutricionistaAPI', () => {
    it('debe vincular paciente correctamente cuando la respuesta es exitosa', async () => {
      const pacienteId = 1;
      const fakeResponse = { mensaje: 'Paciente vinculado' };

      fetchStub.resolves({
        ok: true,
        json: async () => fakeResponse,
      });

      const result = await vincularPacienteANutricionistaAPI(pacienteId, token, apiUrl);
      expect(result).to.deep.equal(fakeResponse);
      expect(fetchStub.calledOnce).to.be.true;

      const calledUrl = fetchStub.getCall(0).args[0];
      expect(calledUrl).to.equal(`${apiUrl}/api/Nutricionistas/agregar-paciente?pacienteId=${pacienteId}`);
    });

    it('debe lanzar error si la vinculación falla', async () => {
      fetchStub.resolves({ ok: false, status: 500 });

      try {
        await vincularPacienteANutricionistaAPI(1, token, apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (err) {
        expect(err.message).to.include('HTTP error');
      }
    });

    it('debe enviar headers correctos con el token de autorización', async () => {
      const pacienteId = 2;
      const fakeResponse = { mensaje: 'Paciente vinculado' };

      fetchStub.resolves({
        ok: true,
        json: async () => fakeResponse,
      });

      await vincularPacienteANutricionistaAPI(pacienteId, token, apiUrl);

      const headers = fetchStub.getCall(0).args[1].headers;
      expect(headers['Authorization']).to.equal(`Bearer ${token}`);
    });
  });

});
