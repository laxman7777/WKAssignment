class CommonPage {
  toDoListAndFooterNotExist() {
    cy.get(".view").should("not.exist");
    cy.get('ul[data-testid="footer-navigation"]').should("not.exist");
  }
  toDoListNotExistFooterExist() {
    cy.get(".view").should("not.exist"); // toggle element view is not exist in Active List
    cy.get('ul[data-testid="footer-navigation"]').should("exist"); // But footer is exist
  }
  toDoListAndFooterPresent() {
    cy.get(".view").should("exist");
    cy.get('ul[data-testid="footer-navigation"]').should("exist");
  }
}

export default CommonPage;
