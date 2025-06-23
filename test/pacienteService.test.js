import { expect } from 'chai';
import sinon from 'sinon';
import { agregarPacienteAPI, buscarPacienteAPI,buscarPacientePorNombreAPI,
  vincularPacienteANutricionistaAPI } from '../src/services/pacienteService.js';

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

  describe('agregarPacienteAPI', () => {
    it('debe retornar datos cuando la creación es exitosa', async () => {
      const pacienteData = { nombre: 'Juan', edad: 30 };
      const fakeResponse = { id: 123, ...pacienteData };

      fetchStub.resolves({
        ok: true,
        json: async () => fakeResponse,
      });

      const result = await agregarPacienteAPI(pacienteData, token, apiUrl);
      expect(result).to.deep.equal(fakeResponse);
      expect(fetchStub.calledOnce).to.be.true;
      const fetchArgs = fetchStub.getCall(0).args;
      expect(fetchArgs[0]).to.equal(`${apiUrl}/api/Pacientes/agregar`);
      expect(fetchArgs[1].method).to.equal('POST');
    });

    it('debe lanzar error si la creación falla', async () => {
      fetchStub.resolves({ ok: false, status: 500 });

      try {
        await agregarPacienteAPI({ nombre: 'Juan' }, token, apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (err) {
        expect(err.message).to.include('HTTP error');
      }
    });
  });
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


  describe('buscarPacienteAPI', () => {
    it('debe retornar datos del paciente cuando la respuesta es exitosa', async () => {
      const pacienteId = 123;
      const fakePaciente = { id: pacienteId, nombre: 'Juan', edad: 30 };

      fetchStub.resolves({
        ok: true,
        json: async () => fakePaciente,
      });

      const result = await buscarPacienteAPI(pacienteId, token, apiUrl);
      expect(result).to.deep.equal(fakePaciente);
      expect(fetchStub.calledOnce).to.be.true;
      const fetchArgs = fetchStub.getCall(0).args;
      expect(fetchArgs[0]).to.equal(`${apiUrl}/api/Pacientes/${pacienteId}`);
      expect(fetchArgs[1].method).to.equal('GET');
    });

    it('debe lanzar error cuando la respuesta no es ok', async () => {
      fetchStub.resolves({ ok: false, status: 404 });

      try {
        await buscarPacienteAPI(999, token, apiUrl);
        throw new Error('No debería llegar aquí');
      } catch (err) {
        expect(err.message).to.include('HTTP error');
      }

    });
    
  });
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
  });
  
});
