const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' }
    })
  ),
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);
      config.proxy = [
        {
          path: `/api`,
          target: 'http://localhost:5000'
        }
      ];

      // Return your customised Webpack Development Server config.
      return config;
    };
  }
};
