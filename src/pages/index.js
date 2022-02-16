/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Repo from "../components/repo"
import React from "react"

function getDateString(date) {
  return new Date(date).toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  })
}

const repos = [
  "editorialderiva.org",
  "sheetpoetry.xyz",
  "completos",
  "1000",
  "el-festin-delivery",
  "my-favorite-seed",
  "el-nuevo-metodo-de-los-delincuentes",
  "maulina.cl",
  "sheetforms.co",
  "gatsby-source-opiniones",
  "cerros",
  "f1reseed",
  "tesseract-express",
  "datasets-graphql",
  "serverless-tts-api",
  "gatsby-starter-apollo-netlify",
]

export default function IndexPage({ data }) {
  const { site, allGitHubRepo } = data
  return (
    <Layout>
      <Seo title="Rodrigo Moreira (@piducancore) - Software Developer" />
      <Themed.h1>
        Hey, my name is{" "}
        <Themed.a as={Link} to="/">
          Rodrigo{" "}
        </Themed.a>
      </Themed.h1>
      <Themed.p>
        I've been working on <strong>React</strong>/<strong>NodeJS</strong>
        <i>-based</i> projects for the past few years, helping small businesses
        and other creative people materialize their ideas online.
      </Themed.p>
      <Themed.p>Let's build together 🦾</Themed.p>
      <Themed.h1>Education</Themed.h1>
      <Themed.p>
        I got into computers at a young age the{" "}
        <Themed.a href="https://www.freecodecamp.org/certification/piducancore/responsive-web-design">
          Responsive Web Design
        </Themed.a>{" "}
        and{" "}
        <Themed.a href="https://www.freecodecamp.org/certification/piducancore/javascript-algorithms-and-data-structures">
          JavaScript Algorithms and Data Structures
        </Themed.a>{" "}
        certifications from{" "}
        <Themed.a href="https://www.freecodecamp.org">FreeCodeCamp</Themed.a>.
      </Themed.p>
      <Themed.h1>My work</Themed.h1>
      <Themed.p>
        You can find all my open-source work in{" "}
        <Themed.a href="https://github.com/piducancore">
          my GitHub profile
        </Themed.a>
        , here I show you the most recent and some personal favorites.
      </Themed.p>
      {allGitHubRepo.nodes
        .filter(node => repos.includes(node.name))
        .map((node, idx) => {
          let date = getDateString(node.created_at)
          return (
            <React.Fragment key={node.id}>
              {/* {date !==
                getDateString(allGitHubRepo.nodes[idx - 1]?.created_at) && (
                <Themed.h3 sx={{ textAlign: "center", mt: 5 }}>
                  {date}
                </Themed.h3>
              )} */}
              <Repo node={node} key={node.id} />
            </React.Fragment>
          )
        })}
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
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
