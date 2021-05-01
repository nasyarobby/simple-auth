const Knex = require('knex');
const { Model } = require('objection');

const config = require('../../knexfile');

const knex = Knex(config.development);

Model.knex(knex);

module.exports = Model;
