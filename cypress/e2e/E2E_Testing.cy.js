

describe('demoblaze buy spec', () => {
    it('Visiting page', () => {
      cy.visit('https://demoblaze.com/')
      
      cy.get("a").contains("Laptops").click()
      
      cy.get("div#tbodyid.row").children().first().get("a").contains("Mac").click()
      //find button
      cy.get("a").should("contain.text","Add to cart")
      cy.get("a").contains("Add to ").click()      


      //return to home
      cy.get("a").contains("Home").click()

      cy.get("a").contains("Phones").click()

      cy.get("div#tbodyid.row").children().first().get("a").contains("Iphone").click()

      cy.get("a").should("contain.text","Add to cart")
      cy.get("a").contains("Add to ").click() 

      //Go cart
      cy.get("a").contains("Cart").click()
      cy.get("h3#totalp.panel-title").not().should("not.be.visible")

      cy.get("button").contains("Place Order").click()
      
      //Verify input

      cy.get('input#name').should("be.visible")

      cy.get('input#country').should("be.visible")

      cy.get('input#city').should("be.visible")

      cy.get('input#card').should("be.visible")

      cy.get('input#month').should("be.visible")

      cy.get('input#year').should("be.visible")


      cy.get('input#name').type("Jaime Alarcon")
      cy.get('input#country').type("ECUADOR")
      cy.get("input#city").type("Guayaquil")
      cy.get('input#card').type("111111111111111")
      cy.get('input#month').type("12")
      cy.get('input#year').type("2025")

      cy.get("button").contains("Purchase").click()


    })
  })
