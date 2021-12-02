const path = require("path");

const rules = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules\/.+\.node$/,
    use: "node-loader",
  },
  {
    // loads .html files
    test: /\.(html)$/,
    include: [path.resolve(__dirname, "public")],
    use: {
      loader: "html-loader",
      options: {
        sources: {
          list: [
            {
              tag: "img",
              attribute: "data-src",
              type: "src",
            },
          ],
        },
      },
    },
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@vercel/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.jsx?$/,
    use: {
      loader: "babel-loader",
      options: {
        exclude: /node_modules/,
      },
    },
  },
  {
    test: /\.css$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
  },
];

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public"), // Where all the output files get dropped after webpack is done with them
    filename: "bundle.js", // The name of the webpack bundle that's generated
  },
  module: {
    rules,
  },
  target: "electron-renderer",
};
