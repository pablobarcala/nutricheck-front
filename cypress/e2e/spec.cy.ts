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
   

   
  });
});
