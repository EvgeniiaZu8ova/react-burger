describe("service is available", function () {
  it("should be available on localhost:3000", function () {
    cy.visit("http://localhost:3000");
  });

  it("should open main page by default", function () {
    cy.contains("Соберите бургер");
  });

  it("should drag ingredient to the order", () => {
    const dataTransfer = new DataTransfer();

    cy.get("#ingredient").trigger("dragstart", {
      dataTransfer,
    });

    cy.get("#constructor").trigger("drop", {
      dataTransfer,
    });
  });
});
