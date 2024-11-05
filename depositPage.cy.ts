/// <reference types="cypress"/>
import 'cypress-xpath'
describe('Customers Role',()=>{
    beforeEach(() => {
        cy.visit('https://www.way2automation.com/angularjs-protractor/banking/#/login'); 
      });
    it('should display the bank name', () => {
        cy.contains('Customer Login').click();
                // Select a customer from the dropdown
                cy.get('select').select('Hermoine Granger'); // Replace with an actual customer name
            
                // Verify that the login button is displayed
                cy.contains('Login').click();
                cy.contains('Deposit').click();
      
        cy.get('.mainHeading') 
          .should('be.visible') // Check if the bank name element is visible
          .and('contain.text', 'XYZ'); // Check if it contains the expected bank name
      });
  
    it('should display the home button', () => {
        cy.contains('Customer Login').click();
                // Select a customer from the dropdown
                cy.get('select').select('Hermoine Granger'); // Replace with an actual customer name
            
                // Verify that the login button is displayed
                cy.contains('Login').click();
                cy.contains('Deposit').click();
        
          cy.xpath('/html/body/div[1]/div/div[1]/button[1]') 
            .should('be.visible') // Check if the bank name element is visible
            .and('contain.text', 'Home'); // Check if it contains the expected bank name
        });
      
    it('should display the logout button', () => {
            cy.contains('Customer Login').click();
                    // Select a customer from the dropdown
                    cy.get('select').select('Hermoine Granger'); // Replace with an actual customer name
                
                    // Verify that the login button is displayed
                    cy.contains('Login').click();
                    cy.contains('Deposit').click();
            
              cy.xpath('/html/body/div[1]/div/div[1]/button[2]') 
                .should('be.visible') 
                .and('contain.text', 'Logout'); 
            });

    it('should allow the user to enter an amount in the text field', () => {
        cy.contains('Customer Login').click();
                    // Select a customer from the dropdown
                    cy.get('select').select('Hermoine Granger'); // Replace with an actual customer name
                
                    // Verify that the login button is displayed
                    cy.contains('Login').click();
                    cy.contains('Deposit').click();
                const amountToDeposit = '500'; // Define a test amount
            
                // Locate the input field for the amount and enter a value
                cy.get('input[placeholder="amount"]').type(amountToDeposit);
            
                // Verify that the entered amount appears in the input field
                cy.get('input[placeholder="amount"]').should('have.value', amountToDeposit);
              });
    it('should allow the user to increase and decrease the amount using the arrow buttons', () => {
        cy.contains('Customer Login').click();
                    // Select a customer from the dropdown
                    cy.get('select').select('Hermoine Granger'); // Replace with an actual customer name
                
                    // Verify that the login button is displayed
                    cy.contains('Login').click();
                    cy.contains('Deposit').click();
                // Locate the amount input field
                const amountInput = cy.get('input[placeholder="amount"]'); // Adjust selector as needed
            
                // Clear the input field and set an initial value
                amountInput.clear().type('100');
            
                // Increment the amount by clicking the up arrow
                amountInput.focus().type('{uparrow}');
                amountInput.should('have.value', '101'); // Verify that the amount increased by 1
            
                // Increment again to verify further increase
                amountInput.type('{uparrow}');
                amountInput.should('have.value', '102'); // Verify that the amount increased by another 1
            
                // Decrement the amount by clicking the down arrow
                amountInput.type('{downarrow}');
                amountInput.should('have.value', '101'); // Verify that the amount decreased by 1
            
                // Decrement again to verify further decrease
                amountInput.type('{downarrow}');
                amountInput.should('have.value', '100'); // Verify that the amount decreased by another 1
              });
    
    
});

