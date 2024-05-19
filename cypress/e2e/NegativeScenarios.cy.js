/// <reference types="Cypress" />
import CommonPage from "../../cypress/e2e/CommonFile/commonfile";

describe("My Negative Scenarios", function () {
 
    const testCommon = new CommonPage();
    beforeEach(function () {
      
      cy.visit(Cypress.env('url'));
      cy.fixture("testdata").then(function (data) {
        this.data = data;
       
      });
    });
  
    it("Validate Long String scenario", function () {
     
        cy.get("#todo-input").type(this.data.longStringValue).type("{enter}"); // long string scenario more than 100 chars
        cy.get('label[data-testid="todo-item-label"]').then(($element) => {
          const actualText = $element.text();
          expect(actualText).to.equal(this.data.longStringValue);
        });
      
    });
  
    it("Validate space string scenario", function () {
        
      
        cy.get("#todo-input").type(this.data.emptyString).type("{enter}");
        

        testCommon.toDoListAndFooterNotExist(); //Validation
      
    });
  
    it("Validate single character scenario", function () {
        
        
        cy.get("#todo-input").type(this.data.Mysinglecharacter).type("{enter}");

        testCommon.toDoListAndFooterNotExist(); //Validation
      
    });
    it("Enter some js script tag and validate scenario", function () {
     
        cy.get("#todo-input").type(this.data.smallScript).type("{enter}"); // long string scenario more than 100 chars
        cy.get('label[data-testid="todo-item-label"]').then(($element) => {
          const actualText = $element.text();
          expect(actualText).to.contain("alert");
        });
      
    });
  });
  