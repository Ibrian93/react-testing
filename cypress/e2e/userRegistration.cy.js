describe("User Registration Form", () => {
  it("should register a user", () => {
    cy.visit("http://localhost:3000"); // Asumiendo que tu aplicación está sirviendo en la raíz

    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");

    cy.get('button[type="submit"]').click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("User Registered: John Doe, john.doe@example.com");
    });
  });
});
