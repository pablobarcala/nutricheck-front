describe('Flujo de Paciente Logeado', () => {
  it('Realiza el flujo completo correctamente', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.cursor-pointer').should('exist').click();
    cy.get('#email').type("pablo3@correo.com");
    cy.get('#password').type("12345678");
   cy.get('.from-\\[\\#4AFF50\\]').click();
   cy.get('.bg-green-800').click();
   cy.get('.gap-2 > :nth-child(4)').click();
   cy.get('.max-h-60 > :nth-child(1) > .font-bold').click();
   cy.get('.justify-end > .cursor-pointer').click();
   cy.get('a[href="/paciente/comidas"]').click();
   cy.get('.py-10 > :nth-child(3)').click();
   cy.get('.space-x-4 > .cursor-pointer').click();
   
   
  });
});
