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
    cy.get('a[href="/nutricionista/comidas"]').click();
    cy.get('button.bg-green-800').click();
    // cy.get(':nth-child(1) > .bg-neutral-200').type("Pollo al horno con arroz");
    // cy.get(':nth-child(2) > .bg-neutral-200').type("35");
    // cy.get(':nth-child(3) > .bg-neutral-200').type("25");
    // cy.get(':nth-child(4) > .bg-neutral-200').type("10");    
    cy.get('.mt-6').click();
    cy.get(':nth-child(10) > .text-lg').click();
    cy.get('.bg-gray-400').click();
    cy.get('a[href="/nutricionista/pacientes"]').click();
    cy.get('.fixed').click();
    cy.get('.bg-neutral-900 > .flex > .p-2').type("Test Paciente");
    cy.get('.bg-\\[\\#4AFF50\\]').click();
    cy.get('.space-y-2 > .text-white').click();
    cy.get('.flex > .bg-green-500').click();
    cy.get('a[href="/nutricionista/panel-control"]').click();
    cy.get('.space-x-4 > .cursor-pointer').click();
    
    

  });




});
