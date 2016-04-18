
module.exports = {
  entry: {
    app: ['./src/index.html', './src/app.js']
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build/',
  },
  target: "electron",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', "es2015"]
        }
      },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' }
    ]
  }
};
