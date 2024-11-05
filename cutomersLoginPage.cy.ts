/// <reference types="cypress"/>
import 'cypress-xpath'
describe('Customers Role',()=>{
    beforeEach(() => {
        cy.visit('https://www.way2automation.com/angularjs-protractor/banking/#/login'); 
      });
    it('should display the bank name', () => {
        cy.contains('Customer Login').click();
      
        cy.get('.mainHeading') 
          .should('be.visible') // Check if the bank name element is visible
          .and('contain.text', 'XYZ'); // Check if it contains the expected bank name
      });
  
    it('should display the home button', () => {
        cy.contains('Customer Login').click();
        
          cy.xpath('/html/body/div[1]/div/div[1]/button[1]') 
            .should('be.visible') // Check if the bank name element is visible
            .and('contain.text', 'Home'); // Check if it contains the expected bank name
        });
      

    it('should have at least one option in the dropdown', () => {
        cy.contains('Customer Login').click();
            // Locate the dropdown and check that it contains options
            cy.get('select').find('option').its('length').should('be.gt', 1);
          });
    
    it('should display the login button when a customer is selected', () => {
        cy.contains('Customer Login').click();
            // Select a customer from the dropdown
            cy.get('select').select('Hermoine Granger'); // Replace with an actual customer name
        
            // Verify that the login button is displayed
            cy.get('button').contains('Login').should('be.visible');
          });
    it('should login', () => {
            cy.contains('Customer Login').click();
                // Select a customer from the dropdown
                cy.get('select').select('Hermoine Granger'); // Replace with an actual customer name
            
                // Verify that the login button is displayed
                cy.contains('Login').click();
              });
});

