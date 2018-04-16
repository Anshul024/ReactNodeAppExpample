module.exports = {
  entry: './main.js',
  output: {
    filename: 'app.js',
    path: './dist/'
  },
  module: {
    loaders: [
      {
        test: /require\.js$/,
        loader: "exports?requirejs!script"
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.png$|\.gif$|\.svg|\.ttf|\.woff|\.eot/,
        loader: "file-loader"
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
        requirejs$:  "./dist/",
        "react": __dirname + '/node_modules/react',
        "react-dom": __dirname + '/node_modules/react-dom'
      },
    }
  }
}