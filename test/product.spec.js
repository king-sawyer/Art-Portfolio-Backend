const chai = require("chai");
const chaiHttp = require("chai-http");

const authRouter = require("../src/products/productsRouter");
const supertest = require("supertest");
const request = require("supertest");

const expect = require("chai").expect;

describe("Product Endpoint Request", () => {
  it("Should get object containing products", () => {
    request(authRouter).get("/").expect(200);
  });
  it("Should successfully post a new product", () => {
    request(authRouter).post("/").expect(200);
  });
  it("Should successfully patch a requested product", () => {
    request(authRouter).patch("/").expect(200);
  });
  it("Should successfully delete a requested product", () => {
    request(authRouter).delete("/").expect(200);
  });
});
