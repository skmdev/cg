module.exports = {
  apps: [
    {
      name: 'cg',
      script: './dist/main.js',
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
  ],
};
