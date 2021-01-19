module.exports = {
  siteMetadata: {
    title: "piducan.dev",
  },
  plugins: [
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sharp",
    "gatsby-remark-images",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    "gatsby-plugin-theme-ui",
  ],
}
