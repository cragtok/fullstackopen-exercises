describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        cy.createUser({
            username: "testuser1",
            name: "testuser",
            password: "123456",
        });
        cy.visit("http://localhost:3000");
    });

    it("Login form is shown", function () {
        cy.contains("Log in to application");
        cy.contains("Username");
        cy.contains("Password");
        cy.contains("Login");
    });

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.get("#login-username").type("testuser1");
            cy.get("#login-password").type("123456");
            cy.get("#login-button").click();
            cy.contains("testuser logged in");
        });

        it("fails with wrong credentials", function () {
            cy.get("#login-username").type("wrongusername");
            cy.get("#login-password").type("wrongpassword");
            cy.get("#login-button").click();
            cy.get(".notification-error")
                .should("contain", "Invalid username or password")
                .and("have.css", "color", "rgb(255, 0, 0)");
        });
    });
});
