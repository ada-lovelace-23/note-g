const webpack = require("webpack");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
      plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
      ],
  })
}