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
                cy.contains('Transactions').click();
      
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
                    cy.contains('Transactions').click();
            
              cy.xpath('/html/body/div[1]/div/div[1]/button[2]') 
                .should('be.visible') 
                .and('contain.text', 'Logout'); 
            });

    it('should display back and reset button', () => {
                cy.contains('Customer Login').click();
                        // Select a customer from the dropdown
                        cy.get('select').select('Hermoine Granger'); // Replace with an actual customer name
                    
                        // Verify that the login button is displayed
                        cy.contains('Login').click();
                        cy.contains('Transactions').click();
                
                cy.xpath('/html/body/div[1]/div/div[2]/div/div[1]/button[1]') 
                    .should('be.visible') 
                    .and('contain.text', 'Back'); 
                    
                cy.xpath('/html/body/div[1]/div/div[2]/div/div[1]/button[2]') 
                    .should('be.visible') 
                    .and('contain.text', 'Reset'); 
                });
    it('should filter transactions within the selected date and time range', () => {
        cy.contains('Customer Login').click();
        // Select a customer from the dropdown
        cy.get('select').select('Hermoine Granger'); // Replace with an actual customer name
    
        // Verify that the login button is displayed
        cy.contains('Login').click();
        cy.contains('Transactions').click();
                    // Define the start and end date-time values
                    const startDate = '01/01/2015, 12:00 AM';
                    const endDate = '10/23/2024, 08:00 AM';
                
                    // Input the start date and time
                    cy.xpath('//*[@id="start"]').first().click(); // Opens the date picker for the start date
                    cy.xpath('//*[@id="start"]').clear().type('2017-06-01T08:30') // Selects the first day of the month
                    
                
                    // Input the start date and time
                    cy.xpath('//*[@id="end"]').first().click(); // Opens the date picker for the start date
                    cy.xpath('//*[@id="end"]').clear().type('2017-08-01T08:30') // Selects the first day of the month
                
                
                    // Verify that all displayed transactions are within the selected date range
                    cy.get('.transaction-row').each(($row) => {
                      const dateText = $row.find('.transaction-date').text(); // Adjust selector for date text within row
                      const transactionDate = new Date(dateText);
                      const startDateObj = new Date(startDate);
                      const endDateObj = new Date(endDate);
                
                      expect(transactionDate).to.be.within(startDateObj, endDateObj);
                    });
                  });
  
    
});

