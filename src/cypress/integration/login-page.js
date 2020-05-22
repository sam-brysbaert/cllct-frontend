describe("test inital startup", function () {
  it("the app runs", function () {
    cy.visit("http://localhost:4200");
  });
  it("upon inital load, user gets redirected to login", function () {
    cy.location("pathname").should("eq", "/login");
  });
  it("registration link has correct address", function () {
    cy.get("[data-cy=registerLink]").should("have.attr", "href", "/register");
  });
  it("searchbar is not loaded", function () {
    cy.get("[data-cy=searchBar]").should("not.exist");
  });
  it("username input field is empty", function () {
    cy.get("[data-cy=usernameInput]").should("be.empty");
  });
  it("password input field is empty", function () {
    cy.get("[data-cy=usernameInput]").should("be.empty");
  });
});
