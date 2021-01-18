module.exports = {
  siteMetadata: {
    title: "piducan.dev",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.js"),
        },
      },
    },
    "gatsby-plugin-theme-ui",
  ],
}
