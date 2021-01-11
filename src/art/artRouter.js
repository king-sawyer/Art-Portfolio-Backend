const path = require("path");
const express = require("express");
// const xss = require("xss");
const artService = require("./artService");

const artRouter = express.Router();
const jsonParser = express.json();

artRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    artService
      .getAllArt(knexInstance)
      .then((art) => {
        res.json(art);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    const { alttext, imageurl } = req.body;

    if (!alttext || !imageurl) {
      return res.status(400).json({
        error: { message: "Must include altText and imageURL" },
      });
    }
    const newArt = { alttext, imageurl };

    artService
      .addArt(req.app.get("db"), newArt)
      .then(res.status(201).json(newArt))
      .catch(next);
  })
  .delete((req, res, next) => {
    artService
      .deleteArt(req.app.get("db"), req.body.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch((req, res, next) => {
    if (!req.body.id) {
      return res.status(400).json({
        error: {
          message: `Request must contain an id`,
        },
      });
    }
    const { id, alttext, imageurl } = req.body;
    const artToUpdate = {
      id,
      alttext,
      imageurl,
    };
    artService
      .updateArt(req.app.get("db"), req.body.id, artToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = artRouter;
