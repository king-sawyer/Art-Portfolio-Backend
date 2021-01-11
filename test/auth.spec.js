const chai = require("chai");
const knex = require("knex");
const app = require("../src/app");

const authRouter = require("../src/auth-folder/auth-router");
const request = require("supertest");

const expect = require("chai").expect;

describe(`Auth GET Endpoints`, () => {
  let db;

  before("Make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });
  context(`Given user does not have authorization`, () => {
    it(`Should respond with 401 unauthorized request`, () => {
      request(authRouter).get("/").expect(401);
    });
  });
  context(`Given the user has authentication`, () => {
    let user = {
      username: "default",
      password: "Defaultpassword1",
    };
    let authToken = true;
    beforeEach("Insert User into DB", () => {
      db.into("users").insert(user);
    });

    it("Should return 200", () => {
      request(authRouter).get("/").expect(authToken);
    });
  });
});
describe("Auth POST Request", () => {
  context("Given user does not include username or password", () => {
    it("Should return 400 with missing field error", () => {
      request(authRouter).post("/").expect(400);
    });
  });
  context("Given the user enters an incorrect username or password", () => {
    it("Should return status 400", () => {
      let user = {
        username: "wrong",
        password: "wrong",
      };
      request(authRouter).post("/").send(user).expect(400);
    });
  });
  context(`Given the enters correct information`, () => {
    let db;

    before("Make knex instance", () => {
      db = knex({
        client: "pg",
        connection: process.env.TEST_DATABASE_URL,
      });
      app.set("db", db);
    });
    let user = {
      username: "default",
      password: "Defaultpassword1",
    };
    let authToken = true;
    beforeEach("Insert User into DB", () => {
      db.into("users").insert(user);
    });

    it("Should return auth token", () => {
      request(authRouter).get("/").expect(authToken);
    });
  });
});
