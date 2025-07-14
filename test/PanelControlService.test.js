import { expect } from 'chai';
import sinon from 'sinon';
import * as PanelService from '../src/services/PanelControlService.js';

describe('PanelControlService', () => {
  const token = 'fake-token';
  const apiUrl = 'http://fakeapi.com';
  let fetchStub;

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    sinon.restore();
  });

  const endpoints = [
    { name: 'getPromedioRendimientoAPI', url: '/api/Panel/promedio-rendimiento' },
    { name: 'getPacientesBajoCumplimientoAPI', url: '/api/Panel/bajo-cumplimiento' },
    { name: 'getProgresoCaloricoDiarioAPI', url: '/api/Panel/progreso-diario' },
    { name: 'getComidasPopularesAPI', url: '/api/Panel/comidas-populares' },
    { name: 'getDistribucionActividadAPI', url: '/api/Panel/nivel-actividad' },
    { name: 'getPacientesConstantesAPI', url: '/api/Panel/pacientes-constantes' },
    { name: 'getPacientesAusentesAPI', url: '/api/Panel/pacientes-ausentes' },
  ];

  endpoints.forEach(({ name, url }) => {
    describe(name, () => {
      it(`debería obtener datos correctamente de ${url}`, async () => {
        const fakeResponse = [{ dato: 'ejemplo' }];
        fetchStub.resolves({
          ok: true,
          json: async () => fakeResponse
        });

        const result = await PanelService[name](token, apiUrl);
        expect(result).to.deep.equal(fakeResponse);
        expect(fetchStub.calledOnce).to.be.true;
        const calledUrl = fetchStub.getCall(0).args[0];
        expect(calledUrl).to.equal(`${apiUrl}${url}`);
      });

      it(`debería lanzar error si el servidor devuelve status 500`, async () => {
        fetchStub.resolves({ ok: false, status: 500 });

        try {
          await PanelService[name](token, apiUrl);
          throw new Error('No debería llegar aquí');
        } catch (err) {
          expect(err.message).to.include('HTTP error');
        }
      });

      it('debería enviar el token en los headers', async () => {
        fetchStub.resolves({
          ok: true,
          json: async () => []
        });

        await PanelService[name](token, apiUrl);
        const headers = fetchStub.getCall(0).args[1].headers;
        expect(headers.Authorization).to.equal(`Bearer ${token}`);
      });
    });
  });
});
