// /**
//  * feedback router
//  */

// import { factories } from '@strapi/strapi';


export default {
  routes: [
    {
      method: 'GET',
      path: '/avaliacao/calculate-average-by-type/:corrida_id',
      handler: 'avaliacao.calculateAverageByType',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
