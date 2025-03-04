const path = require('path');

module.exports = {
  style: {
    postcss: {
      mode: 'file',
    },
  },
  webpack: {
    configure: webpackConfig => {
      return {
        ...webpackConfig,
        devServer: {
          ...webpackConfig.devServer,
          setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
              throw new Error('webpack-dev-server is not defined');
            }
            return middlewares;
          },
        },
      };
    },
  },
};
