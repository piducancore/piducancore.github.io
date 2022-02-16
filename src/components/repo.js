/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import React from "react"
import { StaticImage } from "gatsby-plugin-image"

function Tags({ topics }) {
  return (
    <div>
      {topics.map(tag => (
        <React.Fragment key={tag}>
          <small sx={{ bg: "muted", px: 2 }}>{tag}</small>{" "}
        </React.Fragment>
      ))}
    </div>
  )
}

export default function Repo({ node }) {
  let date = new Date(node.created_at).toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  })
  return (
    <div key={node.id}>
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Themed.h1 sx={{ mb: 0 }}>
          <Themed.a
            href={node.homepage || node.html_url}
            rel="noopener"
            target="_blank"
          >
            {node.name}
          </Themed.a>
        </Themed.h1>
        {/* {<Themed.h5 sx={{ mb: 0, whiteSpace: "nowrap" }}>{date}</Themed.h5>} */}
      </div>
      <Tags topics={node.topics} />
      <Themed.p>{node.description}</Themed.p>

      <ul sx={{ p: 0, my: 0, listStyleType: "none" }}>
        {node.homepage && (
          <li sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            <small sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
              homepage:{" "}
              <Themed.a href={node.homepage} rel="noopener" target="_blank">
                {node.homepage}
              </Themed.a>
            </small>
          </li>
        )}
        <li sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          <small sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
            code:{" "}
            <Themed.a href={node.html_url} rel="noopener" target="_blank">
              {node.html_url}
            </Themed.a>
          </small>
        </li>
      </ul>
    </div>
  )
}
