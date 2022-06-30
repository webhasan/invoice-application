describe('/clients', () => {
   const EXISTING_USER_EMAIL = "fake_user1@officehourtesting.com"
   const EXISTING_USER_PASSWORD = "123456"

   before(() => {
      cy.clearCookies();
      cy.visit('http://localhost:3000/login')

      cy.get('[data-test="email"]').should('be.visible')
      cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`)
      cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`)
      cy.get('[data-test="submit-login"]').click();

      cy.location('pathname').should('eq', '/')
  });


  it("all clients page has relevant tables and items", () => {
      cy.visit('http://localhost:3000/clients');
      cy.get(`[data-test='clients-table']`).should('be.visible');
      cy.get(`[data-test='client-name-header']`).should('be.visible');
      cy.get(`[data-test='company-name-header']`).should('be.visible');
      cy.get(`[data-test='invoices-count-header']`).should('be.visible');
      cy.get(`[data-test='total-billed-header']`).should('be.visible');

   })
});