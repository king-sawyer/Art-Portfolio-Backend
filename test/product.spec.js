const chai = require("chai");
const knex = require("knex");
const app = require("../src/app");

const productsRouter = require("../src/products/productsRouter");
const request = require("supertest");

const expect = require("chai").expect;

describe(`Products GET Endpoints`, () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  context(`Given no products in DB`, () => {
    it(`responds with 200 and an empty list`, () => {
      request(productsRouter).get("/").expect(200, []);
    });
  });

  context("Given there are products in the database", () => {
    const product = {
      id: 5,
      product_title: "Zen Karate",
      price: 20,
      size: "Small",
      category: "Shirt",
      product_image: "https://i.imgur.com/3h8z15T.jpg",
      featured: false,
      quantity: 4,
    };

    beforeEach("Insert products", () => {
      db.into("products").insert(product);
    });

    it("responds with 200 and the product", () => {
      request(productsRouter).get("/").expect(200, product);
    });
  });
  describe("Product POST Request", () => {
    const product = {
      id: 5,
      product_title: "Zen Karate",
      price: 20,
      size: "Small",
      category: "Shirt",
      product_image: "https://i.imgur.com/3h8z15T.jpg",
      featured: false,
      quantity: 4,
    };
    beforeEach("insert product indo db", () => {
      db.into("product").insert(product);
    });
    it("Should create new product then respond with 201 and new product", () => {
      const newProduct = {
        id: 9,
        product_title: "New Product",
        price: 20,
        size: "Small",
        category: "Shirt",
        product_image: "https://i.imgur.com/3h8z15T.jpg",
        featured: false,
        quantity: 4,
      };

      request(productsRouter)
        .post("/")
        .send(newProduct)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.have.property("id");
          expect(res.body.product_title).to.equal(newProduct.product_title);
          expect(res.body.product_image).to.equal(newProduct.product_image);
          expect(res.body.price).to.equal(newProduct.price);
          expect(res.bodycategory).to.equal(newArtcategory);
          expect(res.body.size).to.equal(newProduct.size);
          expect(res.body.featured).to.equal(newProduct.featured);
          expect(res.body.quantity).to.equal(newProduct.price);
        });
    });
  });

  describe("Product PATCH Request", () => {
    context("If there are no products", () => {
      it(`Should respond with 404`, () => {
        request(productsRouter).patch("/").expect(404);
      });
    });
    context("Given there are products in the database", () => {
      const testProduct = {
        id: 2,
        product_title: "New Product",
        price: 20,
        size: "Small",
        category: "Shirt",
        product_image: "https://i.imgur.com/3h8z15T.jpg",
        featured: false,
        quantity: 4,
      };
      beforeEach("insert product indo db", () => {
        db.into("product").insert(testProduct);
      });

      it("Should respond with 204 and update the new product", () => {
        const idForTestproduct = 2;
        const modification = {
          product_title: "newTitle",
        };
        const expectedUpdate = {
          ...testProduct,
          ...modification,
        };
        request(productsRouter).patch("/").send(testProduct);
      });
    });
  });
  describe("Product DELETE Request", () => {
    context("Given there are no products in the DB", () => {
      it(`responds with 404`, () => {
        request(productsRouter).delete(`/`).expect(404);
      });
    });
    context("Given that there are no products the DB", () => {
      const testProducts = [
        {
          id: 9,
          product_title: "New products",
          price: 20,
          size: "Small",
          category: "Shirt",
          product_image: "https://i.imgur.com/3h8z15T.jpg",
          featured: false,
          quantity: 4,
        },
        {
          id: 10,
          product_title: "New products",
          price: 20,
          size: "Small",
          category: "Shirt",
          product_image: "https://i.imgur.com/3h8z15T.jpg",
          featured: false,
          quantity: 4,
        },
      ];
      beforeEach("Insert products", () => {
        db.into("products").insert(testProducts);
      });
      it("Should respond with 204 and removes the product", () => {
        const productIdToRemove = 9;
        const expectedProduct = testProducts.filter(
          (product) => product.id !== productIdToRemove
        );
        request(productsRouter).delete("/").expect(204);
      });
    });
  });
});
