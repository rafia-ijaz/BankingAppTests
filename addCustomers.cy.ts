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
      
    

    it ('create and verify customer account',()=>{
        //adding new customer
        cy.contains('Bank Manager Login').click();
        cy.contains('Add Customer').click();
        cy.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/form/div[1]/input').type('John');
        cy.wait(1000);
        cy.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/form/div[2]/input').type('Smith');
        cy.wait(1000);
        cy.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/form/div[3]/input').type(54000);
        cy.wait(1000);
        cy.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/form/button').click();
        cy.wait(1000);
    })

    it('Selected tab should be highlighted', () => {
        cy.contains('Bank Manager Login').click();
        cy.contains('Add Customer').click();
        
    // Verify that the selected tab is 'highlighted' using css
  
        cy.xpath('/html/body/div[1]/div/div[2]/div/div[1]/button[1]')
            .should('have.css', 'background-color', 'rgb(40, 96, 144)'); 
          });
    it('should display an error if First Name is missing', () => {
        cy.contains('Bank Manager Login').click();
        cy.contains('Add Customer').click();
            // Leave the First Name field empty and fill other fields
            cy.get('input[placeholder="Last Name"]').type('Doe'); // Enter Last Name
            cy.get('input[placeholder="Post Code"]').type('12345'); // Enter Post Code
        
            // Click the Add Customer button
            cy.contains('button', 'Add Customer').click();
        
            // Verify error message or required validation for First Name
            cy.on('window:alert', (alertText) => {
              expect(alertText).to.equal('Please fill out this field.');
            });
          });
        
    it('should display an error if Last Name is missing', () => {
        cy.contains('Bank Manager Login').click();
        cy.contains('Add Customer').click();
            // Enter First Name and leave Last Name empty
            cy.get('input[placeholder="First Name"]').type('John'); // Enter First Name
            cy.get('input[placeholder="Post Code"]').type('12345'); // Enter Post Code
        
            // Click the Add Customer button
            cy.contains('button', 'Add Customer').click();
        
            // Verify error message or required validation for Last Name
            cy.on('window:alert', (alertText) => {
              expect(alertText).to.equal('Please fill out this field.');
            });
          });
        
    it('should display an error if Post Code is missing', () => {
        cy.contains('Bank Manager Login').click();
        cy.contains('Add Customer').click();
            // Enter First Name and Last Name, leave Post Code empty
            cy.get('input[placeholder="First Name"]').type('John'); // Enter First Name
            cy.get('input[placeholder="Last Name"]').type('Doe'); // Enter Last Name
        
            // Click the Add Customer button
            cy.contains('button', 'Add Customer').click();
        
            // Verify error message or required validation for Post Code
            cy.on('window:alert', (alertText) => {
              expect(alertText).to.equal('Please fill out this field.');
            });
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
        
            // Verify that the form is still accessible (indicating popup closure)
            cy.get('input[placeholder="First Name"]').should('be.visible');
          });
      });



