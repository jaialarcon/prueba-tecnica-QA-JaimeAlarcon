import { faker } from "@faker-js/faker";


const apiUsers = `${Cypress.env("apiUrl")}/users`;

describe("Pets API", function () {

  context("POST /users", function () {
    it("creates a new Pet", function () {
      var pet = {
        id: 1,
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
            "id": 1,
            "name": "cachorros"
          }
        ],
        status: "available"
      }

      cy.request("POST", `https://petstore.swagger.io/pet`, pet).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.user).to.contain({ firstName });
      });
    });

    it("error when invalid field sent", function () {
      cy.request({
        method: "POST",
        url: `${apiUsers}`,
        failOnStatusCode: false,
        body: {
          notAUserField: "not a user field",
        },
      }).then((response) => {
        expect(response.status).to.eq(422);
        expect(response.body.errors.length).to.eq(1);
      });
    });
  });

  context("GET /users", function () {
    it("gets a list of users", function () {
      cy.request("GET", apiUsers).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.results).length.to.be.greaterThan(1);
      });
    });
  });

  

  context("GET /users/profile/:username", function () {
    it("get a user profile by username", function () {
      const { username, firstName, lastName, avatar } = "ctx.authenticatedUser!";
      cy.request("GET", `${apiUsers}/profile/${username}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.user).to.deep.equal({
          firstName: firstName,
          lastName: lastName,
          avatar: avatar,
        });
        expect(response.body.user).not.to.have.property("balance");
      });
    });
  });

  

  // context("PATCH /users/:userId", function () {
  //   it("updates a user", function () {
  //     const firstName = faker.name.firstName();

  //     cy.request("PATCH", `${apiUsers}/${ctx.authenticatedUser!.id}`, {
  //       firstName,
  //     }).then((response) => {
  //       expect(response.status).to.eq(204);
  //     });
  //   });

  //   it("error when invalid field sent", function () {
  //     cy.request({
  //       method: "PATCH",
  //       url: `${apiUsers}/${ctx.authenticatedUser!.id}`,
  //       failOnStatusCode: false,
  //       body: {
  //         notAUserField: "not a user field",
  //       },
  //     }).then((response) => {
  //       expect(response.status).to.eq(422);
  //       expect(response.body.errors.length).to.eq(1);
  //     });
  //   });
  // });

  // context("POST /login", function () {
  //   it("login as user", function () {
  //     cy.loginByApi(ctx.authenticatedUser!.username).then((response) => {
  //       expect(response.status).to.eq(200);
  //     });
  //   });
  // });
});