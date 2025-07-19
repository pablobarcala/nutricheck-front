import { expect } from "chai";
import { getLandingLinks } from "../src/services/LandingService.js";

describe("LandingService", () => {
  describe("getLandingLinks", () => {
    it("debería devolver los links correctos para la landing page", () => {
      const links = getLandingLinks();

      expect(links.login).to.equal("/login");
      expect(links.registro).to.equal("/registro");
      expect(links.caracteristicas).to.equal("#features");
      expect(links.comoFunciona).to.equal("#how-it-works");
      expect(links.testimonios).to.equal("#testimonials");
      expect(links.contacto).to.equal("#contact");
    });
  });
});
