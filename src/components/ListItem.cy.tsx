/// <reference types="cypress" />

import ListItem from "./ListItem";
import { getFriendlyKey } from "../utils";

describe("ListItem w/ right arrow", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react - known issue with cy.mount type error
    cy.mount(
      <ListItem
        arrowLocation="right"
        number={2}
        text="Test Text"
        to="https://www.google.com"
      />
    );

    // Test the link is passing through
    cy.get(`[data-cy=${getFriendlyKey("Test Text")}`)
      .should("have.attr", "href")
      .should("not.be.empty")
      .and("contain", "google");

    // Test the text is displaying
    cy.get(`[data-cy=${getFriendlyKey("Test Text")}`).should(
      "contain.text",
      "Test Text"
    );

    // Test that the arrow is displaying after the text
    cy.get(`[data-cy=${getFriendlyKey("Test Text")}`)
      .children("span")
      .contains("Test Text")
      .next("svg")
      .should("exist");
  });
});

describe("ListItem w/ left arrow", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react - known issue with cy.mount type error
    cy.mount(
      <ListItem
        number={2}
        arrowLocation="left"
        text="Text"
        to="https://www.google.com"
      />
    );

    // Test the link is passing through
    cy.get(`[data-cy=${getFriendlyKey("Text")}`)
      .should("have.attr", "href")
      .should("not.be.empty")
      .and("contain", "google");

    // Test the text is displaying
    cy.get(`[data-cy=${getFriendlyKey("Text")}`).should("contain.text", "Text");

    // Test that the arrow is displaying after the text
    cy.get(`[data-cy=${getFriendlyKey("Text")}`)
      .children("span")
      .contains("Text")
      .prev("svg")
      .should("exist");
  });
});
