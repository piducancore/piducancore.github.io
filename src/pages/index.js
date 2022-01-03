/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Repo from "../components/repo"

export default function IndexPage({ data }) {
  const { nodes } = data.allGitHubRepo
  return (
    <Layout>
      <Seo title="My resume" />
      <Themed.h1>My work</Themed.h1>
      {nodes.map(node => (
        <Repo node={node} key={node.id} />
      ))}
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery {
    allGitHubRepo(sort: { fields: created_at, order: DESC }) {
      nodes {
        id
        name
        html_url
        homepage
        description
        topics
        created_at
      }
    }
  }
`
