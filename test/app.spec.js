const app = require("../src/app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const authRouter = require("../src/products/productsRouter");
const supertest = require("supertest");
const request = require("supertest");

const expect = require("chai").expect;

// Configure chai
// chai.use(chaiHttp);
// chai.should();

describe("App", () => {
  it('GET / reponds with 200 containing "Hello, world!"', () => {
    return supertest(app).get("/").expect(200, "Hello, world!");
  });
});

// describe("Product Endpoint Request", () => {
//   it("Should get object containing products", () => {
//     request(authRouter).get("/").expect(200);
//   });
//   it("Should successfully post a new product", () => {
//     request(authRouter).post("/").expect(200);
//   });
//   it("Should successfully patch a requested product", () => {
//     request(authRouter).patch("/").expect(200);
//   });
//   it("Should successfully delete a requested product", () => {
//     request(authRouter).delete("/").expect(200);
//   });
// });
