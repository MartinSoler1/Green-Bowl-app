/* eslint-disable no-undef */
describe("Header content", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should contains correct title and description", () => {
    cy.get('[data-test="greenbowl-title"]').contains(
      "h2",
      /Delicious Food, Delivered To You/i
    );
    cy.get('[data-test="greenbowl-title"]').contains(
      "p",
      "Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.",
      " All our meals are prepared with high-quality ingredients, just-in-time and of course by experienced chefs!"
    );
  });
  describe("Menu items", () => {
    it("should contain expected salads with prices", () => {
      cy.getDataTest("meal-item-a1").contains(/mediterranean bowl/i);
      cy.getDataTest("meal-item-a1").contains("$22.99");
      cy.getDataTest("meal-item-a2").contains(/asian bowl/i);
      cy.getDataTest("meal-item-a2").contains("$16.50");
      cy.getDataTest("meal-item-a3").contains(/Falafel bowl/i);
      cy.getDataTest("meal-item-a3").contains("$12.99");
      cy.getDataTest("meal-item-a4").contains(/Super green Bowl/i);
      cy.getDataTest("meal-item-a4").contains("$18.99");
    });
  });
});
describe("Adding meals to cart", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should successfully add meals to cart and update badge number", () => {
    const mealItems = ["a1", "a2", "a3", "a4"];
    mealItems.forEach((meal) => {
      cy.clickMealItemAddButton(meal);
    });

    cy.getDataTest("cart-badge").contains("4");
    cy.getDataTest("cart-button").click();
    cy.getDataTest("cart-meals").within(() => {
      cy.get("li").should("have.length", 4);
    });
  });
  it("should handle adding and removing items in the cart", () => {
    cy.clickMealItemAddButton("a1");
    cy.getDataTest("cart-badge").contains("1");
    cy.getDataTest("cart-button").click();
    cy.getDataTest("add-button-cart").click();
    cy.getDataTest("cart-badge").contains("2");
    cy.getDataTest("remove-button-cart").click();
    cy.getDataTest("cart-badge").contains("1");
  });

  it("should open cart modal when it's empty", () => {
    cy.getDataTest("cart-button").click();
  });

  it("should display error when adding 0 or more than 5 meals at the same time", () => {
    cy.getDataTest("meal-item-a1").find("input").clear();
    cy.getDataTest("meal-item-a1").find("button").click();
    cy.contains("Please enter a valid amount (1-5).");
    cy.getDataTest("meal-item-a1").find("input").type("6");
    cy.getDataTest("meal-item-a1").find("button").click();
    cy.contains("Please enter a valid amount (1-5).");
  });
});
describe("Checkout Process", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should successfully process the order and generate a confirmation", () => {
    cy.clickMealItemAddButton("a1");
    cy.getDataTest("cart-button").click();
    cy.getDataTest("cart-total").should("have.text", "$22.99");
    cy.getDataTest("order-cart-button").click();
    cy.CheckoutFormCompleted();
    cy.intercept(
      "POST",
      "https://food-order-app-e3494-default-rtdb.firebaseio.com/orders.json"
    ).as("order");
    cy.getDataTest("checkout-confirm-button").click();
    cy.wait("@order").then((interception) => {
      console.log(interception.response.body);
    });
    cy.contains("Order succesfully submited");
    cy.getDataTest("checkout-close-button").click();
    cy.contains("Order succesfully submited").should("not.exist");
  });
  it.only("All checkout form inputs should be required", () => {
    cy.getDataTest("meal-item-a1").within(() => {
      cy.get("button").click();
    });
    cy.getDataTest("cart-button").click();
    cy.getDataTest("order-cart-button").click();

    cy.CheckoutFormCompleted();
    cy.getDataTest("checkout-input-name").clear();

    cy.getDataTest("checkout-confirm-button").click();

    cy.contains("Please enter a valid name!");
    cy.getDataTest("checkout-input-name").type("Frank Fladling");
    cy.getDataTest("checkout-input-address").clear();
    cy.getDataTest("checkout-confirm-button").click();
    cy.contains("Please enter a valid address!");
    cy.getDataTest("checkout-input-address").type("Av.Olazabal 1124");
    cy.getDataTest("checkout-input-postcode").clear();
    cy.getDataTest("checkout-confirm-button").click();
    cy.contains("Please enter a valid postal code!");
    cy.getDataTest("checkout-confirm-button").click();
    cy.getDataTest("checkout-input-postcode").type("1124");
    cy.getDataTest("checkout-input-city").clear();
    cy.getDataTest("checkout-confirm-button").click();
    cy.contains("Please enter a valid city!");
  });
});
