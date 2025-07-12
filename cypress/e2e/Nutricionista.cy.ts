describe('Flujo completo', () => {
  it('Realiza el flujo completo correctamente', () => {
    cy.visit('http://localhost:3000/');
    //verifica el logo
    cy.get('.ml-3').should('be.visible');
      //verifica el boton caracteristicas
    cy.get('[href="#features"]').should('exist').click();
    //verifica el boton como funciona
    cy.get('[href="#how-it-works"]').should("exist").click();
    //verifica boton testimonios
    cy.get('[href="#testimonials"]').should("exist").click();
    //verifica boton contacto
    cy.get('[href="#testimonials"]').should("exist").click();
    
    cy.get('.cursor-pointer').should('exist').click();
    cy.get('#email').type("pablo2@correo.com");
    cy.get('#password').type("12345678");
    cy.get('.from-\\[\\#4AFF50\\]').click();

});
});