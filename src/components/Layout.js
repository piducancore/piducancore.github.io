/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Global } from "@emotion/core"
import React from "react"

export default function Layout(props) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata

  console.log(props)
  return (
    <React.Fragment>
      <Global
        styles={theme => ({
          "*:focus": {
            outline: "none",
          },
          "::selection": {
            backgroundColor: theme.colors.secondary,
            color: theme.colors.text,
          },
          html: {
            overflowY: "scroll",
          },
        })}
      />
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          px: 2,
        }}
      >
        <header
          sx={{
            width: "100%",
            maxWidth: "container",
            mx: "auto",
            p: 3,
          }}
        >
          <Styled.a as={Link} to="/">
            <Styled.h4>{title}</Styled.h4>
          </Styled.a>
        </header>
        <main
          sx={{
            width: "100%",
            maxWidth: "container",
            mx: "auto",
            p: 3,
            flex: "1 1 auto",
          }}
        >
          {props.children}
        </main>
        <footer
          sx={{
            width: "100%",
            maxWidth: "container",
            mx: "auto",
            p: 3,
          }}
        >
          <span role="img" aria-label="copyright">
            ©️
          </span>{" "}
          {new Date().getFullYear()}{" "}
          <span role="img" aria-label="coded">
            💻
          </span>{" "}
          con{" "}
          <span role="img" aria-label="fire">
            🔥
          </span>{" "}
          por
          {` `}
          <Styled.a as={Link} to="/">
            mi
          </Styled.a>
          .
        </footer>
      </div>
    </React.Fragment>
  )
}
