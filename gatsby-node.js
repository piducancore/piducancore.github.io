const fetch = require("node-fetch")

async function fetchRepos() {
  try {
    const apiUrl = "https://api.github.com/search/repositories?q="
    const query = "user:piducancore&per_page=100"
    const result = await fetch(apiUrl + query, {
      headers: {
        Authorization: "token " + process.env.GH_ACCESS_TOKEN,
      },
    })
    console.log(process.env)
    return await result.json()
  } catch (error) {
    console.error(error)
  }
}

exports.sourceNodes = async (gatsby, options) => {
  const { actions, createNodeId, createContentDigest } = gatsby
  const { createNode } = actions
  try {
    const { items } = await fetchRepos()

    items.map(metadata => {
      const nodeData = {
        ...metadata,
        id: createNodeId(`gitHubRepo-${metadata.id}`),
        parent: null,
        internal: {
          type: `GitHubRepo`,
          content: JSON.stringify(metadata),
          contentDigest: createContentDigest(metadata),
        },
      }
      createNode(nodeData)
    })

    return
  } catch (error) {
    console.error(error)
  }
}
