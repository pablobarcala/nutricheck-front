describe('Flujo completo: Login, buscar paciente, vincular y logout', () => {
  it('Realiza el flujo completo correctamente', () => {
    cy.visit('http://localhost:3000/login');
    
    cy.get('#email').type('pablo2@correo.com');
    cy.get('#password').type('12345678');
    cy.get('.from-\\[\\#4AFF50\\]').click();
    cy.get('body').click();
    cy.get(':nth-child(3) > .flex').click();
    cy.get('.fixed').click();
    cy.get('.bg-neutral-900 > .flex > .p-2').type('Paciente');
    cy.get('.bg-\\[\\#4AFF50\\]').click();
    cy.get('button.text-white.rounded-md.font-bold').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Paciente vinculado correctamente');
    });
    
    cy.get('.flex > .bg-green-500').click();
    cy.get('.space-x-4 > .cursor-pointer').click();
  });
});
