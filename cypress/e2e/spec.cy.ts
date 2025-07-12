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
   
    // Ahora paso para el registro del paciente 
    cy.get('.space-x-4 > .bg-green-600').should("exist").click();
    
    //aqui se rellena el formulario para luego crear la cuenta del paciente.

    cy.get('#nombre').type("Juan");
    cy.get('#email').type("juanp@correo.com");
    cy.get('#password').type("12345678");
   cy.get('#confirmPassword').type("12345678");
   cy.get('.space-y-6 > .bg-gradient-to-r').click();
  });
});
