/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: 
        [
            `gatsby-plugin-pnpm-gatsby-5`,
            {
                resolve: `gatsby-omni-font-loader`,
                options: {
                enableListener: true,
                preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
                web: [
                    {
                    name: `Open Sans`,
                    file: `https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap`,
                    },
                ],
                },
            }
        ],
};
