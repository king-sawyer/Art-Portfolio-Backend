const chai = require("chai");
const knex = require("knex");
const app = require("../src/app");

const artRouter = require("../src/art/artRouter");
const request = require("supertest");

const expect = require("chai").expect;

describe(`Art GET Endpoints`, () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  context(`Given no Art in db`, () => {
    it(`responds with 200 and an empty list`, () => {
      request(artRouter).get("/").expect(200, []);
    });
  });

  context("Given there is art in the database", () => {
    const art = {
      id: 5,
      product_title: "Zen Karate",
      price: 20,
      size: "Small",
      category: "Shirt",
      product_image: "https://i.imgur.com/3h8z15T.jpg",
      featured: false,
      quantity: 4,
    };

    beforeEach("Insert art", () => {
      db.into("art").insert(art);
    });

    it("responds with 200 and the art", () => {
      request(artRouter).get("/").expect(200, art);
    });
  });
  describe("Art POST Request", () => {
    const art = {
      id: 5,
      product_title: "Zen Karate",
      price: 20,
      size: "Small",
      category: "Shirt",
      product_image: "https://i.imgur.com/3h8z15T.jpg",
      featured: false,
      quantity: 4,
    };
    beforeEach("insert art indo db", () => {
      db.into("art").insert(art);
    });
    it("Should create new art then respond with 201 and new art", () => {
      const newArt = {
        id: 9,
        product_title: "New Art",
        price: 20,
        size: "Small",
        category: "Shirt",
        product_image: "https://i.imgur.com/3h8z15T.jpg",
        featured: false,
        quantity: 4,
      };

      request(artRouter)
        .post("/")
        .send(newArt)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.have.property("id");
          expect(res.body.product_title).to.equal(newArt.product_title);
          expect(res.body.product_image).to.equal(newArt.product_image);
          expect(res.body.price).to.equal(newArt.price);
          expect(res.bodycategory).to.equal(newArtcategory);
          expect(res.body.size).to.equal(newArt.size);
          expect(res.body.featured).to.equal(newArt.featured);
          expect(res.body.quantity).to.equal(newArt.price);
        });
    });
  });

  describe("Art PATCH Request", () => {
    context("If there is no art", () => {
      it(`Should respond with 404`, () => {
        request(artRouter).patch("/").expect(404);
      });
    });
    context("Given there is art in the database", () => {
      const testArt = {
        id: 9,
        product_title: "New Art",
        price: 20,
        size: "Small",
        category: "Shirt",
        product_image: "https://i.imgur.com/3h8z15T.jpg",
        featured: false,
        quantity: 4,
      };
      beforeEach("insert art indo db", () => {
        db.into("art").insert(testArt);
      });

      it("Should respond with 204 and update the new art", () => {
        const idForTestArt = 9;
        const modification = {
          product_title: "newTitle",
        };
        const expectedUpdate = {
          ...testArt,
          ...modification,
        };
        request(artRouter).patch("/").send(testArt);
      });
    });
  });
  describe("Art DELETE Request", () => {
    context("Given there is no art in the DB", () => {
      it(`responds with 404`, () => {
        request(artRouter).delete(`/`).expect(404);
      });
    });
    context("Given that there is art in the DB", () => {
      const testArt = [
        {
          id: 9,
          product_title: "New Art",
          price: 20,
          size: "Small",
          category: "Shirt",
          product_image: "https://i.imgur.com/3h8z15T.jpg",
          featured: false,
          quantity: 4,
        },
        {
          id: 10,
          product_title: "New Art",
          price: 20,
          size: "Small",
          category: "Shirt",
          product_image: "https://i.imgur.com/3h8z15T.jpg",
          featured: false,
          quantity: 4,
        },
      ];
      beforeEach("Insert art", () => {
        db.into("art").insert(testArt);
      });
      it("Should respond with 204 and removes the art", () => {
        const artIdToRemove = 9;
        const expectedArt = testArt.filter((art) => art.id !== artIdToRemove);
        request(artRouter).delete("/").expect(204);
      });
    });
  });
});
