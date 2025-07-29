describe('Flujo de Paciente Logeado', () => {
  it('Realiza el flujo completo correctamente', () => {
    cy.visit('https://www.nutricheck.me/');
    cy.get('.cursor-pointer').should('exist').click();
    cy.get('#email').type("pablo4@correo.com");
    cy.get('#password').type("12345678");
   cy.get('.from-\\[\\#4AFF50\\]').click();
   cy.get('.bg-green-800').click();
   cy.get('.gap-2 > :nth-child(4)').click();
    cy.get('.max-h-60 > :nth-child(1) > .font-bold').click();
    cy.wait(1000);
   cy.contains('button', 'Desayuno').click();
   cy.contains('p', 'Huevos Revueltos')
   .should('exist')
  .parent() // sube al div que lo contiene
   .click();

   cy.get('.max-h-60 > :nth-child(2)').click();
   cy.get('.justify-end > .cursor-pointer').click();

   cy.get('.space-x-4 > :nth-child(2) > .flex').click();
   cy.wait(2000);

   cy.get('.space-x-4 > :nth-child(3) > .flex').click();
   cy.wait(3000);
   
  cy.get('.space-x-4 > :nth-child(4) > .flex').click();
  cy.wait(2000);
 
  cy.get('.space-x-4 > .cursor-pointer').click();
  
   
   
  });
});
