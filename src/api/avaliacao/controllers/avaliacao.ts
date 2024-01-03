/**
 * feedback controller
 */

import { factories } from '@strapi/strapi';

export default {

  async calculateAverageByType(ctx) {
    const { corrida_id } = ctx.params;

    try {
      const tiposDeAvaliacao = await strapi.entityService.findMany('api::tipos-de-avaliacao.tipos-de-avaliacao', {
        filters: { corrida_id },
        populate: ['feedbacks'],
      });

      const averagesByType = [];
      await tiposDeAvaliacao.forEach(tipo => (
        averagesByType.push({
        tipo_de_avaliacao: tipo,
        average: 0,
      })));

      const feedbacks = await strapi.entityService.findMany('api::feedback.feedback', {
        filters: { corrida_id },
        populate: { tipos_de_avaliacao: true },
      });


      feedbacks.forEach(feedback => {
        const tipoAvaliacao = feedback.tipos_de_avaliacao;

        const index = averagesByType.findIndex(average => average.tipo_de_avaliacao.id === tipoAvaliacao.id);

        if (index !== -1) {
          averagesByType[index].average += feedback.rating;
        }
      });

      averagesByType.forEach(average => {
        if (average.tipo_de_avaliacao.feedbacks.length > 0) {
          average.average = (average.average / average.tipo_de_avaliacao.feedbacks.length).toFixed(1);
        } else {
          average.average = 0; // Defina como 0 se não houver feedbacks
        }
      });

      return averagesByType;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

};
