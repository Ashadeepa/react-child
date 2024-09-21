const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: 'auto',  // Ensures dynamic chunks are served from the correct location
      };

      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "reactApp",
          filename: "remoteEntry.js",
          exposes: {
            './App': './src/App',  // Exposing the App component
          },
          shared: {
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false
            },
            "react-dom": {
              singleton: true,
              eager: true,
              requiredVersion: false
            },
          },
        })
      );
      return webpackConfig;
    },
  },
};
