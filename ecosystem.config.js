module.exports = {
  apps : [{
    name: 'strapi',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }]
};
