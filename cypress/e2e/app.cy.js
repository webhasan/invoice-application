describe('Invoice App Flow', () => {

   it('Dashboard, register, login, logout', () => {
      // Start from the index page
       cy.visit('http://localhost:3000/')
 
      // redirect to login page 
      cy.url().should('include', '/login');
      
   })
 });