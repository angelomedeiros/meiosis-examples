/*global __dirname*/

module.exports = {
  entry: {
    "part-01-ex-01": "./part-01/index-01.jsx",
    "part-01-ex-02": "./part-01/index-02.jsx",
    "part-01-ex-03": "./part-01/index-03.jsx",
    "part-01-ex-04": "./part-01/index-04.jsx",
    "part-01-ex-05": "./part-01/index-05.jsx",
    "part-02-ex-01": "./part-02/index-01.jsx",
    "part-02-ex-02": "./part-02/index-02.jsx",
    "part-02-ex-03": "./part-02/index-03.jsx"
  },
  output: {
    path: __dirname + "/build",
    filename: "generated-[name].js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ]
  }
};
