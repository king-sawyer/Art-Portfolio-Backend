const artService = {
  getAllArt(knex) {
    return knex.select("*").from("art");
  },
  addArt(knex, art) {
    return knex
      .insert(art)
      .into("art")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  deleteArt(knex, id) {
    return knex("art").where({ id }).delete();
  },
  updateArt(knex, id, newArt) {
    return knex("art").where({ id }).update(newArt);
  },
};
module.exports = artService;
