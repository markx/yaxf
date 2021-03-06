var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    app: ['./src/index.html', './src/app.js']
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build/',
    publicPath: 'http://localhost:8080/build/'
  },
  target: 'electron-renderer',
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          env: {
              development: {
                  presets: ["react-hmre"]
              }
          },
          plugins: ["transform-object-rest-spread"]
        }
      },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  devtool: 'source-map'
};
