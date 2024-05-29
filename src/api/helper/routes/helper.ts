/**
 * helper router
 */

import { factories } from '@strapi/strapi';

module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/helper/group-by-uf',
        handler: 'helper.findGroupedByUF',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/helper/group-by-city/:uf',
        handler: 'helper.findGroupedByCity',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/helper/group-by-country',
        handler: 'helper.findGroupedByCountry',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };

export default factories.createCoreRouter('api::helper.helper');
