/// <reference types="cypress"/>
import 'cypress-xpath'

describe('Landing Page', () => {
    beforeEach(() => {
      // Visit the page where the bank name should be displayed
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

    it('should display the Customer login button', () => {
      
        cy.xpath('/html/body/div[1]/div/div[2]/div/div[1]/div[1]/button') 
          .should('be.visible') // Check if the bank name element is visible
          .and('contain.text', 'Customer Login'); // Check if it contains the expected bank name
      });

    it('should display the Manager login button', () => {
      
        cy.xpath('/html/body/div[1]/div/div[2]/div/div[1]/div[2]/button') 
          .should('be.visible') // Check if the bank name element is visible
          .and('contain.text', 'Bank Manager Login'); // Check if it contains the expected bank name
      });


  });