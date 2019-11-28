/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

const nextConfig = {
  useFileSystemPublicRoutes: true,
  distDir: '../../.next',
};

function withTsConfigPath() {
  const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

  return {
    webpack: (config, options) => {
      if (config.resolve.plugins) {
        config.resolve.plugins.push(new TsconfigPathsPlugin());
      } else {
        config.resolve.plugins = [new TsconfigPathsPlugin()];
      }

      return config;
    },
  };
}

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPlugins = require('next-compose-plugins');

    return withPlugins([nextConfig, withTsConfigPath], {
      env: {
        HOST_NAME:
          phase === PHASE_PRODUCTION_BUILD
            ? 'ec2-52-15-254-156.us-east-2.compute.amazonaws.com'
            : 'localhost:3000',
      },
    })(phase, {
      defaultConfig,
    });
  }

  return {};
};
