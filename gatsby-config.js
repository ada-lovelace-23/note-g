/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        siteUrl: `https://www.note-g.online`,
    },
    plugins: [
        `gatsby-plugin-pnpm-gatsby-5`,
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-omni-font-loader`,
            options: {
                enableListener: true,
                preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
                web: [
                    {
                        name: `Roboto`,
                        file: `https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap`,
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-google-tagmanager',
            options: {
                id: 'G-0MZYMMQK2X',

                // Include GTM in development.
                //
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: false,
            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /svg/,
                },
            },
        },
    ],
};
