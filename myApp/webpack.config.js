const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      quietDeps: true // Désactive les avertissements pour les dépendances
    }
  }
};
module.exports = {
  mode: "development",
  devServer: { open: true },
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          sassLoader
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({ template: __dirname + '/src/index.html' })],
};