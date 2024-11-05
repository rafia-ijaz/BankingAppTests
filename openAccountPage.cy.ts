/// <reference types="cypress"/>
import 'cypress-xpath'
describe('Manager Role',()=>{
    beforeEach(() => {
        cy.visit('https://www.way2automation.com/angularjs-protractor/banking/#/login'); 
      });
    it('should display the bank name', () => {
      
        cy.get('.mainHeading') 
          .should('be.visible') // Check if the bank name element is visible
          .and('contain.text', 'XYZ'); // Check if it contains the expected bank name
      });
  
    it('should display the login button', () => {
        
          cy.xpath('/html/body/div[1]/div/div[1]/button[1]') 
            .should('be.visible') // Check if the bank name element is visible
            .and('contain.text', 'Home'); // Check if it contains the expected bank name
        });
      

    it ('opening account for a customer in Dollars',()=>{
        //Opening an account for a customer in Dollars
        cy.contains('Bank Manager Login').click();
        cy.contains('Open Account').click();
        cy.get('#userSelect').select('Harry Potter');
        cy.get('#userSelect').should('contain', 'Harry Potter');
        cy.wait(1000);
        cy.get('#currency').select('Dollar');
        cy.wait(1000);
        cy.contains('Process').click();
});

    it ('opening account for a customer in pounds',()=>{
          //Opening an account for a customer in Pounds
          cy.contains('Bank Manager Login').click();
          cy.contains('Open Account').click();
        cy.get('#userSelect').select('Harry Potter');
        cy.get('#userSelect').should('contain', 'Harry Potter');
        cy.wait(1000);
        cy.get('#currency').select('Pound');
        cy.wait(1000);
        cy.contains('Process').click();
      });

    it ('opening account for a customer in rupees',()=>{
          //Opening an account for a customer in rupees
          cy.contains('Bank Manager Login').click();
          cy.contains('Open Account').click();

        cy.get('#userSelect').select('Harry Potter');
        cy.get('#userSelect').should('contain', 'Harry Potter');
        cy.wait(1000);
        cy.get('#currency').select('Rupee');
        cy.wait(1000);
        cy.contains('Process').click();

    });
    it('should verify the success message', () => {
      cy.contains('Bank Manager Login').click();
      cy.contains('Add Customer').click();
          // Fill in the form fields
          cy.get('input[placeholder="First Name"]').type('test'); // Enter First Name
          cy.get('input[placeholder="Last Name"]').type('testy'); // Enter Last Name
          cy.get('input[placeholder="Post Code"]').type('54000'); // Enter Post Code
      
          // Click the Add Customer button
          cy.contains('button', 'Add Customer').click();
      
          // Handle the success popup
          cy.on('window:alert', (alertText) => {
            // Verify the alert text
            expect(alertText).to.include('Customer added successfully with customer id :');
          });
      
          // Wait for a moment to allow popup handling (if needed)
          cy.wait(3000); // Optional, depending on timing
});
});
