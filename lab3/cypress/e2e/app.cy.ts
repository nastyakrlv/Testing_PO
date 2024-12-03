const login = () => {
  cy.session("user", () => {
    cy.visit("http://localhost:4200/auth/login");
    cy.get('input[type="email"]').type("email@bk.ru");
    cy.get('input[type="password"]').type("password");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/workplace/projects");
  });
};

describe("Авторизация", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/auth/login");
  });

  it("успешный вход в систему с действительными учетными данными", () => {
    cy.get('input[type="email"]').type("email@bk.ru");
    cy.get('input[type="password"]').type("password");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/workplace/projects");
    cy.contains("Личное").should("be.visible");
  });

  it("должна отображаться ошибка проверки для неверного адреса электронной почты", () => {
    cy.get('input[type="email"]').type("invalid-email");

    cy.contains("Введите корректный email").should("be.visible");
  });
});

describe("Проекты", () => {
  beforeEach(() => {
    login();
    cy.visit("http://localhost:4200/workplace/projects");
  });

  it('добавить новый проект с названием "e2e"', () => {
    cy.get(".head button").click();

    cy.get('input[type="text"]').type("e2e");
    cy.get('button[type="submit"]').click();

    cy.get("ul").should("contain.text", "e2e");
  });

  it('удалить проект "e2e"', () => {
    cy.contains("e2e").click();

    cy.get("button.delete-button").click();

    cy.url().should("include", "/workplace/projects");

    cy.get("ul").should("not.contain.text", "e2e");
  });
});
