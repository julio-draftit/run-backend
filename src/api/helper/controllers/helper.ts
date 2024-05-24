/**
 * helper controller
 */

import { factories } from '@strapi/strapi'
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::helper.helper', ({ strapi }) => ({
    async findGroupedByUF(ctx) {
        const knex = strapi.db.connection;
    
        const results = await knex('corridas')
          .select('UF')
          .count('* as count')
          .groupBy('UF')
          .orderBy('UF');
    
        ctx.body = results;
    },
    async findGroupedByCity(ctx) {
        const { uf } = ctx.params;
        console.log(uf);
        const knex = strapi.db.connection;
    
        const results = await knex('corridas')
          .select('Local')
          .count('* as count')
          .where('UF', uf)
          .groupBy('Local')
          .orderBy('Local');
    
        ctx.body = results;
    },
    async findGroupedByCountry(ctx) {
        const knex = strapi.db.connection;
    
        const results = await knex('corridas')
          .select('Pais')
          .count('* as count')
          .groupBy('Pais')
          .orderBy('Pais');
    
        ctx.body = results;
    },
}));

export default factories.createCoreController('api::helper.helper');
