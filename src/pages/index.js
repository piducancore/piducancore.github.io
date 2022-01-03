/** @jsx jsx */
import React from "react"
import { jsx, Themed } from "theme-ui"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function IndexPage({ data }) {
  return (
    <Layout>
      <Seo title="My resume" />
      <Themed.h1>My work</Themed.h1>
      {data.allGitHubRepo.nodes.map(node => {
        const {
          id,
          name,
          html_url,
          homepage,
          description,
          topics,
          created_at,
        } = node
        const year = new Date(created_at).getFullYear()
        const month = new Date(created_at).toLocaleDateString("default", {
          month: "long",
        })
        return (
          <div key={id} sx={{ my: 5 }}>
            <div
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Themed.h2 sx={{ my: 0 }}>{name}</Themed.h2>
              <Themed.p sx={{ my: 0, fontWeight: "body", textAlign: "right" }}>
                {month}
                <br />
                {year}
              </Themed.p>
            </div>
            {topics.map(tag => (
              <React.Fragment key={tag}>
                <small sx={{ bg: "muted", px: 2 }}>{tag}</small>{" "}
              </React.Fragment>
            ))}
            <Themed.p>{description}</Themed.p>
            <ul sx={{ p: 0, my: 0, listStyleType: "none" }}>
              {homepage && (
                <li sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  <small sx={{ whiteSpace: "nowrap" }}>
                    homepage: <Themed.a href={homepage}>{homepage}</Themed.a>
                  </small>
                </li>
              )}
              <li sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <small sx={{ whiteSpace: "nowrap" }}>
                  code: <Themed.a href={html_url}>{html_url}</Themed.a>
                </small>
              </li>
            </ul>
          </div>
        )
      })}
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
