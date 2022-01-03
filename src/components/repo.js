/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import React from "react"

export default function Repo({ node }) {
  let year = new Date(node.created_at).getFullYear()
  let month = new Date(node.created_at).toLocaleDateString("default", {
    month: "long",
  })
  return (
    <div key={node.id} sx={{ my: 5 }}>
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Themed.h2 sx={{ my: 0 }}>{node.name}</Themed.h2>
        <Themed.p sx={{ my: 0, fontWeight: "body", textAlign: "right" }}>
          {month}
          <br />
          {year}
        </Themed.p>
      </div>
      {node.topics.map(tag => (
        <React.Fragment key={tag}>
          <small sx={{ bg: "muted", px: 2 }}>{tag}</small>{" "}
        </React.Fragment>
      ))}
      <Themed.p>{node.description}</Themed.p>
      <ul sx={{ p: 0, my: 0, listStyleType: "none" }}>
        {node.homepage && (
          <li sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            <small sx={{ whiteSpace: "nowrap" }}>
              homepage:{" "}
              <Themed.a href={node.homepage}>{node.homepage}</Themed.a>
            </small>
          </li>
        )}
        <li sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          <small sx={{ whiteSpace: "nowrap" }}>
            code: <Themed.a href={node.html_url}>{node.html_url}</Themed.a>
          </small>
        </li>
      </ul>
    </div>
  )
}
