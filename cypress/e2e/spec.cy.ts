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

    cy.get('#nombre').type("vegeta");
    cy.get('#email').type("vegeta@correo.com");
    cy.get('#password').type("12345678");
   cy.get('#confirmPassword').type("12345678");
   cy.get('.space-y-6 > .bg-gradient-to-r').click();
   cy.get(':nth-child(1) > .p-2').type("90");
   cy.get(':nth-child(2) > .p-2').type("180");
   cy.get(':nth-child(3) > .p-2').type('2000-07-13');
   cy.get(':nth-child(4) > .p-2').select('masculino');
   cy.get(':nth-child(5) > .p-2').select('Sedentario - sin ejercicio');
   cy.get('.mt-4').click();
  });
});
