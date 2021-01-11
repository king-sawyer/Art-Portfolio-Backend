const chai = require("chai");
const chaiHttp = require("chai-http");

const artRouter = require("../src/art/artRouter");
const supertest = require("supertest");
const request = require("supertest");

const expect = require("chai").expect;

describe("Art Endpoint Request", () => {
  it("Should get object containing Art", () => {
    request(artRouter).get("/").expect(200);
  });
  it("Should successfully post a new art item", () => {
    request(artRouter).post("/").expect(200);
  });
  it("Should successfully patch a requested piece of art", () => {
    request(artRouter).patch("/").expect(200);
  });
  it("Should successfully delete a requested piece of art", () => {
    request(artRouter).delete("/").expect(200);
  });
});
