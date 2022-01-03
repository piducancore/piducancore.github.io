/** @jsx jsx */
import React from "react"
import { jsx, Themed } from "theme-ui"

import Layout from "../components/layout"
import Seo from "../components/seo"

function byDate(a, b) {
  const keyA = new Date(a.created_at)
  const keyB = new Date(b.created_at)
  if (keyA < keyB) return 1
  if (keyA > keyB) return -1
  return 0
}

const Index = ({ serverData }) => {
  return (
    <Layout>
      <Seo title="My resume" />
      <Themed.h1>My work</Themed.h1>
      {serverData.items.sort(byDate).map(node => {
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
              <React.Fragment>
                <small key={tag} sx={{ bg: "muted", px: 2 }}>
                  {tag}
                </small>{" "}
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

export default Index

export async function getServerData() {
  try {
    const res = await fetch(
      "https://api.github.com/search/repositories?q=user:piducancore&per_page=100",
      {
        headers: {
          Authorization: "token " + process.env.GATSBY_GH_ACCESS_TOKEN,
        },
      }
    )
    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      headers: {
        status: 500,
      },
      props: {},
    }
  }
}
