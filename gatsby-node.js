const webpack = require('webpack');

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
        resolve: {
            alias: {
                '@mui/styled-engine': '@mui/styled-engine-sc',
            },
        },
    });
};
