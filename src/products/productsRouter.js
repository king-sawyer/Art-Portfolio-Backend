const express = require("express");
const ProductsService = require("./productsService");
const productsRouter = express.Router();
const { requireAuth } = require("../middleware/jwt-auth");

productsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    ProductsService.getAllProducts(knexInstance)
      .then((products) => {
        res.json(products);
      })
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
    const {
      product_title,
      price,
      size,
      category,
      product_image,
      featured,
      quantity,
    } = req.body;

    const newProduct = {
      product_title,
      price,
      size,
      category,
      product_image,
      featured,
      quantity,
    };

    for (const [key, value] of Object.entries(newProduct))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    ProductsService.insertProduct(req.app.get("db"), newProduct)
      .then(res.status(201).json(newProduct))
      .catch(next);
  })
  .delete(requireAuth, (req, res, next) => {
    ProductsService.deleteProduct(req.app.get("db"), req.body.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(requireAuth, (req, res, next) => {
    if (!req.body.id) {
      return res.status(400).json({
        error: {
          message: `Request must contain an id`,
        },
      });
    }
    const {
      product_title,
      price,
      size,
      category,
      product_image,
      featured,
      quantity,
    } = req.body;
    const productToUpdate = {
      product_title,
      price,
      size,
      category,
      product_image,
      featured,
      quantity,
    };
    ProductsService.updateProduct(
      req.app.get("db"),
      req.body.id,
      productToUpdate
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = productsRouter;
