import { expect } from "chai";
import sinon from "sinon";
import {
  loginAPI,
  registerAPI,
  logout,
  getToken
} from "../src/services/AuthService.js";

describe("AuthService", () => {
  const apiUrl = "https://localhost:5070";
  const fakeToken = "token-fake";


  beforeEach(() => {
    sinon.stub(global, "fetch");
    localStorage.clear();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("loginAPI", () => {
    it("debería guardar el token si login es exitoso", async () => {
      const fakeResponse = {
        ok: true,
        json: async () => ({ token: fakeToken })
      };

      fetch.resolves(fakeResponse);

      const result = await loginAPI("test@mail.com", "1234", apiUrl);

      expect(result.token).to.equal(fakeToken);
      expect(localStorage.getItem("token")).to.equal(fakeToken);
    });

    it("debería lanzar error si las credenciales son inválidas", async () => {
      fetch.resolves({
        ok: false,
        text: async () => "Credenciales inválidas"
      });

      try {
        await loginAPI("mal@mail.com", "error", apiUrl);
        throw new Error("No debería llegar acá");
      } catch (err) {
        expect(err.message).to.equal("Credenciales inválidas");
      }
    });
  });

  describe("registerAPI", () => {
    it("debería registrar correctamente", async () => {
      const usuarioData = { email: "nuevo@correo.com", password: "1234" };
      fetch.resolves({
        ok: true,
        json: async () => ({ id: 1, ...usuarioData })
      });

      const result = await registerAPI(usuarioData, apiUrl);
      expect(result.email).to.equal("nuevo@correo.com");
    });

    it("debería lanzar error si ya existe el usuario", async () => {
      fetch.resolves({
        ok: false,
        text: async () => "Usuario ya registrado"
      });

      try {
        await registerAPI({ email: "ya@existe.com" }, apiUrl);
        throw new Error("No debería pasar");
      } catch (e) {
        expect(e.message).to.equal("Usuario ya registrado");
      }
    });
  });

  describe("Token Utils", () => {
    it("debería guardar y obtener el token", () => {
      localStorage.setItem("token", "abc123");
      expect(getToken()).to.equal("abc123");
    });

    it("debería eliminar el token al cerrar sesión", () => {
      localStorage.setItem("token", "abc123");
      logout();
      expect(localStorage.getItem("token")).to.be.null;
    });
  });
});
