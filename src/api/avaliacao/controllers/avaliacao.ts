/**
 * feedback controller
 */

import { factories } from '@strapi/strapi';

export default {

  async calculateAverageByType(ctx) {
    const { corrida_id } = ctx.params;

    try {
      const tiposDeAvaliacao = await strapi.entityService.findMany('api::tipos-de-avaliacao.tipos-de-avaliacao');

      const feedbacks = await strapi.entityService.findMany('api::feedback.feedback', {
        filters: { corrida_id },
        populate: { tipos_de_avaliacao: true },
      });

      const averagesByType = tiposDeAvaliacao.map(tipo => ({
        tipo_de_avaliacao: {
          ...tipo,
          feedbacks: [],
        },
        average: 0,
      }));

      feedbacks.forEach(feedback => {
        const averageEntry = averagesByType.find(average => average.tipo_de_avaliacao.id === feedback.tipos_de_avaliacao.id);
        if (averageEntry) {
          averageEntry.tipo_de_avaliacao.feedbacks.push({
            ...feedback,
            tipos_de_avaliacao: undefined,
          });
          // Soma o rating para cálculo da média
          averageEntry.average += feedback.rating;
        }
      });

      averagesByType.forEach(averageEntry => {
        if (averageEntry.tipo_de_avaliacao.feedbacks.length > 0) {
          // Calcula a média e arredonda para uma casa decimal
          averageEntry.average = parseFloat((averageEntry.average / averageEntry.tipo_de_avaliacao.feedbacks.length).toFixed(1));
        }
      });

      return averagesByType;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

};
