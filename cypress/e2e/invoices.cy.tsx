describe('/invoices', () => {
   const userEmail = 'fake_user5@officehourtesting.com';
   const password = '123456';

   it('redirect login page if not logged in', () => {
      cy.clearCookies();
      cy.visit('http://localhost:3000/invoices');
      cy.location('pathname').should('eq', '/login');
   });

   it('check all require things available in invoice table', () => {
      cy.clearCookies();
      cy.visit('http://localhost:3000/login')
      
      cy.get('[data-test="email"]').should('be.visible');
      cy.get('[data-test="email"]').type(`${userEmail}`);
      cy.get('[data-test="password"]').type(`${password}`);
      cy.get('[data-test="submit-login"]').click();
      cy.location('pathname').should('eq', '/');

      cy.get('[data-test="view-all-invoices"]').click();
      cy.location('pathname').should('eq', '/invoices');
      cy.wait(3000);

      cy.get('[data-test="invoices-table"]').should('be.visible');
      cy.get('[data-test="company-name-header"]').should('be.visible');
      cy.get('[data-test="creation-date-header"]').should('be.visible');
      cy.get('[data-test="due-date-header"]').should('be.visible');
      cy.get('[data-test="total-header"]').should('be.visible');
      cy.get('[data-test*="page-"]').should('be.visible');
      cy.get('[data-test*="invoice-row"]').should('have.length', 10);
      
   });

   it('Sorting test', () => {
      cy.clearCookies();
      cy.visit('http://localhost:3000/login')
      
      cy.get('[data-test="email"]').should('be.visible');
      cy.get('[data-test="email"]').type(`${userEmail}`);
      cy.get('[data-test="password"]').type(`${password}`);
      cy.get('[data-test="submit-login"]').click();
      cy.location('pathname').should('eq', '/');

      cy.get('[data-test="view-all-invoices"]').click();
      cy.location('pathname').should('eq', '/invoices');
      
      cy.wait(3000);
      cy.get(`[data-test*="invoice-row"]:first [data-test="invoice-company"]`).contains("Microsoft");

      //sort by company name
      cy.get('[data-test="company-name-header"]').click();
      cy.wait(3000);
      cy.get('[data-test*="invoice-row"]:first [data-test="invoice-company"]').contains("Apple");
      cy.get('[data-test="company-name-header"]').click();
      cy.wait(3000);
      cy.get(`[data-test*="invoice-row"]:first [data-test="invoice-company"]`).contains("Microsoft");

      //sort by creation date
      cy.get('[data-test="creation-date-header"]').click();
      cy.wait(3000);
      cy.get('[data-test*="invoice-row"]:first [data-test="invoice-date"]').contains("April 24, 2022");
      cy.get('[data-test="creation-date-header"]').click();
      cy.wait(3000);
      cy.get('[data-test*="invoice-row"]:first [data-test="invoice-date"]').contains("May 16, 2022");

      //sort by due date
      cy.get('[data-test="due-date-header"]').click();
      cy.wait(3000);
      cy.get(`[data-test*="invoice-row"]:first [data-test="invoice-due-date"]`).contains("May 24, 2022");
      cy.get('[data-test="due-date-header"]').click();
      cy.wait(3000);
      cy.get(`[data-test*="invoice-row"]:first [data-test="invoice-due-date"]`).contains("June 15, 2022");

      //sort by price
      cy.get('[data-test="total-header"]').click();
      cy.wait(3000);
      cy.get(`[data-test*="invoice-row"]:first [data-test="invoice-price"]`).contains("4008");
      cy.get('[data-test="total-header"]').click();
      cy.wait(3000);
      cy.get(`[data-test*="invoice-row"]:first [data-test="invoice-price"]`).contains("8108");
   });

   it('Filtering test', () => {
      cy.clearCookies();
      cy.visit('http://localhost:3000/login')
      
      cy.get('[data-test="email"]').should('be.visible');
      cy.get('[data-test="email"]').type(`${userEmail}`);
      cy.get('[data-test="password"]').type(`${password}`);
      cy.get('[data-test="submit-login"]').click();
      cy.location('pathname').should('eq', '/');

      cy.get('[data-test="view-all-invoices"]').click();
      cy.location('pathname').should('eq', '/invoices');

      cy.visit('http://localhost:3000/invoices?page=1&clientFilter=Tim+Cook');
      cy.wait(3000);
      cy.get('[data-test*="invoice-row"]').each($el => {
         cy.wrap($el).find('[data-test="invoice-client"]').contains("Tim Cook");
      });

      cy.visit('http://localhost:3000/invoices?page=1&clientFilter=Satya+Nadella');
      cy.wait(3000);
      cy.get('[data-test*="invoice-row"]').each($el => {
         cy.wrap($el).find('[data-test="invoice-client"]').contains("Satya Nadella");
      });

      cy.visit('http://localhost:3000/invoices?page=1&clientFilter=ASDF');
      cy.wait(3000);
      cy.get('[data-test="empty-placeholder"]').should('be.visible');
   });

   it('Pagination test', () => {
      cy.clearCookies();
      cy.visit('http://localhost:3000/login')
      
      cy.get('[data-test="email"]').should('be.visible');
      cy.get('[data-test="email"]').type(`${userEmail}`);
      cy.get('[data-test="password"]').type(`${password}`);
      cy.get('[data-test="submit-login"]').click();
      cy.location('pathname').should('eq', '/');

      cy.get('[data-test="view-all-invoices"]').click();
      cy.location('pathname').should('eq', '/invoices');

      cy.visit('http://localhost:3000/invoices');
      cy.wait(3000);
      cy.get('[data-test*="page-"]').should('have.length', 5);

      cy.get('[data-test*="page-5"]').click();
      cy.wait(3000);
      cy.get('[data-test*="invoice-row"]').should('have.length', 3);

      cy.get('[data-test*="page-2"]').click();
      cy.wait(3000);
      cy.get('[data-test*="invoice-row"]').should('have.length', 10);
   });
});