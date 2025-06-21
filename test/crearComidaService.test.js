import { expect } from "chai";
import sinon from "sinon";
import { crearComidaAPI } from "../src/services/crearComidaService.js";

describe("crearComidaAPI", () => {
  let fetchStub;
  const apiUrl = "https://localhost:5070";
  const token = "token-fake";
  const comidaData = {
    nombre: "Ensalada",
    hidratos: 10,
    proteinas: 5,
    grasas: 2,
    kcal: 78
  };

  beforeEach(() => {
    fetchStub = sinon.stub(global, "fetch");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("debería retornar éxito cuando response.ok es true", async () => {
    fetchStub.resolves({ ok: true });

    const result = await crearComidaAPI(comidaData, token, apiUrl);
    expect(result.success).to.be.true;
    expect(result.data).to.deep.equal(comidaData);

    const calledUrl = fetchStub.getCall(0).args[0];
    expect(calledUrl).to.equal(`${apiUrl}/api/Comidas/crear`);
  });

  it("debería lanzar error cuando response.ok es false", async () => {
    fetchStub.resolves({
      ok: false,
      text: async () => "Error en backend"
    });

    try {
      await crearComidaAPI(comidaData, token, apiUrl);
      throw new Error("No debería llegar acá");
    } catch (error) {
      expect(error.message).to.equal("Error al crear la comida: Error en backend");
    }
  });

});
