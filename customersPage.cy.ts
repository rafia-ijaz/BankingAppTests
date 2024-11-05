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
      
    it ('Deleting customer account',()=>{
    //login as manager
        cy.contains('Bank Manager Login').click();
        cy.contains('Customers').click(); //selects customer tab
        cy.wait(2000);
        //deleting some customers
        cy.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/table/tbody/tr[2]/td[5]/button').each(($el: { click: () => void; })=>{
            $el.click();

        })
        cy.wait(3000);
        cy.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/table/tbody/tr[1]/td[5]/button').each(($el: { click: () => void; })=>{
            $el.click();

        })
        cy.wait(3000);
    })
    it('should filter results based on search input', () => {
        cy.contains('Bank Manager Login').click();
        cy.contains('Customers').click(); //selects customer tab
        cy.wait(2000);
        // Define the search term (e.g., "h")
        const searchTerm = 'h';
    
        // Type the search term into the search input
        cy.xpath('//input[@type="text"]')
      .should('be.visible')
      .type(searchTerm);
          cy.wait(3000);
    
        // Verify that the filtered results contain the search term in First Name or Last Name
        cy.get('table tbody tr').each(($row) => {
          // Check if the row contains the search term
          cy.wrap($row).within(() => {
            cy.get('td').eq(0).invoke('text').then((firstName) => {
              cy.get('td').eq(1).invoke('text').then((lastName) => {
                expect(firstName.toLowerCase().includes(searchTerm) || lastName.toLowerCase().includes(searchTerm)).to.be.true;
              });
            });
          });
        });
      });
    it('should display no results when no match is found', () => {
        cy.contains('Bank Manager Login').click();
        cy.contains('Customers').click(); //selects customer tab
        cy.wait(2000);
        // Type a search term that does not match any record
        const noMatchTerm = 'xyz';
    
    
        // Type into the search input
        cy.get('input[type="text"]').type(noMatchTerm);
    
        // Verify that no rows are displayed in the table
        cy.get('table tbody tr').should('not.exist');
        
        
      });

    it('Selected tab should be highlighted', () => {
      cy.contains('Bank Manager Login').click();
      cy.contains('Customers').click();
      
  // Verify that the selected tab is 'highlighted' using css

      cy.xpath('/html/body/div[1]/div/div[2]/div/div[1]/button[3]')
          .should('have.css', 'background-color', 'rgb(40, 96, 144)'); 
        });
    
    it('Verify First name, Last name, Zipcode, Acc number and delete customer labels are available', () => {
          cy.contains('Bank Manager Login').click();
          cy.contains('Customers').click();
      
          cy.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/table/thead/tr/td[1]/a') 
            .should('be.visible') 
            .and('contain.text', 'First Name');
          cy.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/table/thead/tr/td[2]/a') 
            .should('be.visible') 
            .and('contain.text', 'Last Name');
          cy.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/table/thead/tr/td[3]/a') 
            .should('be.visible') 
            .and('contain.text', 'Post Code');
          cy.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/table/thead/tr/td[4]') 
            .should('be.visible') 
            .and('contain.text', 'Account Number');
          cy.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/table/thead/tr/td[5]') 
            .should('be.visible') 
            .and('contain.text', 'Delete Customer');
        });
    it('should verify account numbers are appended for a single customer', () => {
          cy.contains('Bank Manager Login').click();
          cy.contains('Customers').click();
          // customer name to verify (e.g., "Harry Potter")
          const customerName = 'Harry Potter';
      
          // expected account numbers for the customer
          const expectedAccountNumbers = ['1004', '1005', '1006'];
      
          // Locate the row for the specified customer using the name
          cy.contains('table tbody tr', customerName).within(() => {
            // Get the account numbers cell in the same row
            cy.get('td').eq(3) // Adjust index if necessary; 3 is for "Account Number" column
              .invoke('text') // Get the text content of the cell
              .then((accountNumbersText) => {
                // Split the account numbers by spaces into an array
                const accountNumbers = accountNumbersText.trim().split(' ');
      
                // Assert that the account numbers match the expected ones
                expect(accountNumbers).to.deep.equal(expectedAccountNumbers);
              });
          });
        });

  
        const getCustomerData1 = (): Cypress.Chainable<{ firstName: string; lastName: string; zipCode: string }[]> => {
          return cy.get('table tbody tr').then(($rows) => {
            // Extract customer data from each row and return as an array
            const customerData: { firstName: string; lastName: string; zipCode: string }[] = [];
      
            $rows.each((index, row) => {
              const firstName = Cypress.$(row).find('td').eq(0).text().trim(); // First Name
              const lastName = Cypress.$(row).find('td').eq(1).text().trim();  // Last Name
              const zipCode = Cypress.$(row).find('td').eq(2).text().trim();   // Zip Code
      
              customerData.push({ firstName, lastName, zipCode });
            });
      
            return customerData; // Return the extracted data
          });
        };
      
    it('should sort customers by first name when clicking on the first name header', () => {
          cy.contains('Bank Manager Login').click();
          cy.contains('Customers').click();
          // Click the "First Name" header to sort by first name
          cy.get('td').contains('First Name').click();
      
          // Extract and verify customer data is sorted by first name
          getCustomerData1().then((customerData) => {
            const sortedByFirstName = [...customerData].sort((a, b) =>
              a.firstName.localeCompare(b.firstName)
            );
            expect(customerData).to.deep.equal(sortedByFirstName);
          });
        });
      
    it('should sort customers by last name when clicking on the last name header', () => {
          cy.contains('Bank Manager Login').click();
          cy.contains('Customers').click();
          // Click the "Last Name" header to sort by last name
          cy.get('td').contains('Last Name').click();
      
          // Extract and verify customer data is sorted by last name
          getCustomerData1().then((customerData) => {
            const sortedByLastName = [...customerData].sort((a, b) =>
              a.lastName.localeCompare(b.lastName)
            );
            expect(customerData).to.deep.equal(sortedByLastName);
          });
        });
      
    it('should sort customers by zip code when clicking on the zip code header', () => {
          cy.contains('Bank Manager Login').click();
          cy.contains('Customers').click();
          // Click the "Post Code" header to sort by zip code
          cy.get('td').contains('Post Code').click();
      
          // Extract and verify customer data is sorted by zip code
          getCustomerData1().then((customerData) => {
            const sortedByZipCode = [...customerData].sort((a, b) =>
              a.zipCode.localeCompare(b.zipCode)
            );
            cy.log('Original:', JSON.stringify(customerData));
            cy.log('Sorted:', JSON.stringify(sortedByZipCode));
            expect(customerData).to.deep.equal(sortedByZipCode);
          });
        });
});

  
