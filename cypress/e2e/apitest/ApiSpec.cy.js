describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

let mascotaResponse;
describe("Pets API", function () {

  context("POST /pet", function () {
    
    it("creates a new Pet", function () {
      var pet = {
        id: 102,
        category: {
          id: 1,
          name: "dogs"
        },
        name: "loki",
        photoUrls: [
          ""
        ],
        tags: [
          {
            "id": 101,
            "name": "123"
          }
        ],
        status: "available"
      }

      cy.request("POST", "https://petstore.swagger.io/v2/pet/", pet).then((response) => {
        this.mascotaResponse = response.body
        expect(response.status).to.eq(200);
        expect(response.body.name).to.contain(pet.name);
      });
    });

    it("error when invalid field sent", function () {
      var pet = {
        id: 102,
        category: {
          id: 1,
          name: "dogs"
        },
        name: "loki",
        photoUrls: [
          ""
        ],
        tags: [
          {
            "id": 101,
            "name": "123"
          }
        ],
        status: "available"
      }
      cy.request({
        method: "POST",
        url: "https://petstore.swagger.io/v2/pet/",
        failOnStatusCode: false,
        body: {id: "a1"},
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.have.property("code");
      });
    });
  });

  // context("GET /users", function () {
  //   it("gets a list of users", function () {
  //     cy.request("GET", apiUsers).then((response) => {
  //       expect(response.status).to.eq(200);
  //       expect(response.body.results).length.to.be.greaterThan(1);
  //     });
  //   });
  // });

  

  context("GET /pet/:petId", function () {
    it("get a pet by id", function () {
      var pet = {
        id: 102,
        category: {
          id: 1,
          name: "dogs"
        },
        name: "loki",
        photoUrls: [
          ""
        ],
        tags: [
          {
            "id": 101,
            "name": "123"
          }
        ],
        status: "available"
      }
      const { id, name, status } = pet;
      cy.request("GET", `https://petstore.swagger.io/v2/pet/${id}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(pet);
        expect(response.body).not.to.have.property("code");
      });
    });
  });

  

  context("PUT /users/:userId", function () {
    it("updates a Pet", function () {
      var pet = {
        id: 102,
        name: "Super loki",
        photoUrls: [
          "Link1"
        ],
        status: "sold"
      }

      cy.request("PUT", "https://petstore.swagger.io/v2/pet/", pet).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("error when invalid field sent", function () {
      cy.request({
        method: "PUT",
        url: "https://petstore.swagger.io/v2/pet/",
        failOnStatusCode: false,
        body: {id: "a1"},
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body).to.have.property("code");
      });
    });
  });

  context("GET /pet/findByStatus", function () {
    var pet = {
      id: 102,
      name: "Super loki",
      photoUrls: [
        "Link1"
      ],
      status: "sold"
    }
    it("get a pet by id", function () {
      const { id, name, status } = pet;
      cy.request("GET", `https://petstore.swagger.io/v2/pet/findByStatus?status=sold`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.greaterThan(0);
        expect(response.body.filter(isUpdatedPet)[0].id).to.eq(pet.id);
        expect(response.body).not.to.have.property("code");
      });
    });
  });

});
function isUpdatedPet(value) {
  return value.id == 102;
}