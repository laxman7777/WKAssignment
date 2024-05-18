/// <reference types="Cypress" />
import CommonPage from "../../cypress/e2e/CommonFile/commonfile";

describe("My Positive Scenarios", function () {
  const testCommon = new CommonPage();

  beforeEach(function () {
    cy.visit(Cypress.env("url"));
    cy.fixture("testdata").then(function (data) {
      this.data = data;
      this.count = data.values.length;
    });
  });

  it("Insert and delete multiple data from Json file and validate all element are inserted and deleted", function () {
    let count;
    this.data.values.forEach(function (element) {
      count = element.value;
      cy.get("#todo-input").type(element).type("{enter}");
    });
    cy.log("element inserted-: " + this.count);

    cy.get(".todo-count").should(
      "contain",
      this.count
    ); /* validate count of element inserted from json array */

    cy.get(".toggle-all").click(); // it will strike all element
    cy.get(".todo-count").should("contain", 0); // it will show zero element because of selecting all
    cy.get(".clear-completed").click();

    testCommon.toDoListAndFooterNotExist(); // Validation
  });

  it("When User Select radio botton for any String -:toggle is not but footer is present in Active List but it is there in All and completed Option", function () {
    cy.get("#todo-input").type(this.data.myString).type("{enter}");
    cy.get(".toggle").click();
    cy.contains("Active").click();

    testCommon.toDoListNotExistFooterExist(); // Validation

    cy.contains("Completed").click(); // when click on completed both toggle and fotter are present

    testCommon.toDoListAndFooterPresent(); // Validation

    cy.get("li a").eq(0).click({ force: true }); // when click on All both toggle and fotter are present

    testCommon.toDoListAndFooterPresent(); // Validation
  });

  it("When User doesn't Select radio botton for any String-: toggle view is not present in Completed but it is there for Active and All", function () {
    cy.get("#todo-input").type(this.data.myString).type("{enter}");
    cy.contains("Completed").click();

    testCommon.toDoListNotExistFooterExist(); //Validation

    cy.contains("Active").click(); // when click on Active  both toggle and fotter are present

    testCommon.toDoListAndFooterPresent(); // Validation

    cy.get("li a").eq(0).click({ force: true }); // when click on All both toggle and fotter are present

    testCommon.toDoListAndFooterPresent(); //Validation
  });

  it("Validate Cross icon and clear completed scenario", function () {
    cy.get("#todo-input").type(this.data.myString).type("{enter}");
    cy.get(".toggle").click();

    cy.get(".destroy")
      .trigger("mouseover", { force: true })
      .click({ force: true });

    testCommon.toDoListAndFooterNotExist();

    cy.get("#todo-input").type(this.data.myString).type("{enter}");
    cy.get(".toggle").click();
    cy.contains("Clear completed").click();

    testCommon.toDoListAndFooterNotExist();
  });
});
