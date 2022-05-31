/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import { Link } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Resume = () => (
  <Layout>
    <Seo title="Resume" />
    <div
      sx={{
        width: "21cm",
        height: "29.7cm",
        bg: "white",
        mx: "auto",
        my: 5,
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
        p: "2cm",
      }}
    >
      <section sx={{ display: "flex", justifyContent: "space-between" }}>
        <Themed.h1 sx={{ mt: 0, mb: 3, fontSize: 40 }}>
          <Themed.a as={Link} to="/">
            Rodrigo
            <br />
            Moreira
          </Themed.a>
        </Themed.h1>
        <div sx={{ textAlign: "right" }}>
          <Themed.h3 sx={{ my: 0, fontSize: 20 }}>
            github.com/piducancore
          </Themed.h3>
          <Themed.h3 sx={{ my: 0, fontSize: 20 }}>hola@piducan.dev</Themed.h3>
          <Themed.h3 sx={{ my: 0, fontSize: 20 }}>+56996236208</Themed.h3>
        </div>{" "}
      </section>
      <section>
        <Themed.p>
          I'm a self-taught{" "}
          <Themed.a
            sx={{ fontSize: 18 }}
            href="https://github.com/piducancore"
            target="_blank"
          >
            software developer
          </Themed.a>{" "}
          currently based in San Clemente, <span sx={{ fontSize: 18 }}>🐄</span>{" "}
          Chile.
          <br />
          I've been building <strong sx={{ fontSize: 18 }}>
            React/NodeJS
          </strong>{" "}
          products for the last few years, perfecting my craft and helping other
          creative people materialize their ideas.
        </Themed.p>
      </section>
      <section>
        <Themed.h3 sx={{ mb: 0 }}>
          These are my last works. <br />
        </Themed.h3>
        <Themed.p sx={{ mt: 0 }}>
          <i>(Along with some personal favourites)</i>
        </Themed.p>
        {works.map(({ name, description, tags, url, repo }) => (
          <div>
            <div sx={{ display: "flex" }}>
              <Themed.h3 sx={{ mb: 0 }}>{name}</Themed.h3>
              <Themed.p sx={{ my: 0, ml: "auto" }}>
                <Themed.a
                  href={url}
                  target="_blank"
                  sx={{ fontWeight: "body" }}
                >
                  {url}
                </Themed.a>
              </Themed.p>
            </div>
            <Themed.p sx={{ my: 0 }}>
              {tags.map(tag => (
                <Themed.a href={tag.url} target="_blank" sx={{ mr: 2 }}>
                  <small sx={{ bg: "muted", px: 1 }}>{tag.name}</small>
                </Themed.a>
              ))}
            </Themed.p>
            <Themed.p sx={{ my: 0 }}>{description}</Themed.p>
            <Themed.p sx={{}}>
              code:{" "}
              <Themed.a href={repo} target="_blank" sx={{ fontWeight: "body" }}>
                {repo}
              </Themed.a>
            </Themed.p>
          </div>
        ))}
      </section>
    </div>
  </Layout>
)

export default Resume

const works = [
  {
    name: "Maulina",
    url: "https://maulina.cl",
    repo: "https://github.com/piducancore/maulina.cl",
    tags: [
      { name: "react", url: "https://reactjs.org" },
      { name: "theme-ui", url: "https://theme-ui.com" },
      { name: "contentful", url: "https://contentful.com" },
      { name: "vercel", url: "https://vercel.com" },
    ],
    description: (
      <React.Fragment>
        In 2021, this group of women photographers was selected by the{" "}
        <Themed.a href="https://www.cultura.gob.cl" target="_blank">
          Ministry of Arts, Cultures and Heritage
        </Themed.a>{" "}
        as the winner of a regional fund for artistic dissemination. In this
        context, I had the oportunity to work with the designer{" "}
        <strong>Daniela Bass</strong> to build{" "}
        <Themed.a href="https://maulina.cl" target="_blank">
          maulina.cl
        </Themed.a>
        , a space where they maintain a gallery showcasing their latest works,
        individual profile pages for each artist and a blog with interviews and
        upcomming activities.
      </React.Fragment>
    ),
  },
  {
    name: "L'atelier de Français",
    url: "https://latelierdefrancais.cl",
    repo: "https://github.com/piducancore/latelierdefrancais.cl",
    tags: [
      { name: "react", url: "https://reactjs.org" },
      { name: "theme-ui", url: "https://theme-ui.com" },
      { name: "faunadb", url: "https://faunadb.com" },
      { name: "transbank", url: "https://transbank.cl" },
    ],
    description: (
      <React.Fragment>
        Is a french learning project ran by <strong>Marcela Valdés</strong> as a
        Marcela already had a reputation built on{" "}
        <Themed.a href="https://www.tusclasesparticulares.cl" target="_blank">
          another site
        </Themed.a>
        , so I built a{" "}
        <Themed.a
          href="https://github.com/piducancore/gatsby-source-opiniones"
          target="_blank"
        >
          custom plugin
        </Themed.a>{" "}
        to extract that data and display it on her new site.
      </React.Fragment>
    ),
  },
  {
    name: "editorialderiva.org",
    tags: [
      { name: "react", url: "https://reactjs.org" },
      { name: "theme-ui", url: "https://theme-ui.com" },
      { name: "contentful", url: "https://contentful.com" },
      { name: "transbank", url: "https://transbank.cl" },
    ],
    description: (
      <React.Fragment>Julio Diaz and Alfonso Medrano.</React.Fragment>
    ),
  },
  {
    name: "1000CL",
    description: (
      <React.Fragment>
        This is an online version of{" "}
        <Themed.a
          href="https://www.curriculumnacional.cl/portal/Tipo/Lecturas/Libros-Biblioteca-CRA/77526:Mil-versos-chilenos"
          target="_blank"
        >
          Mil versos chilenos
        </Themed.a>
        , a chilean poetry compilation by <strong>Felipe Cussen</strong> and{" "}
        <strong>Marcela Labraña</strong>.
      </React.Fragment>
    ),
    tags: [
      { name: "react", url: "https://reactjs.org" },
      { name: "theme-ui", url: "https://theme-ui.com" },
      { name: "vercel", url: "https://vercel.com" },
    ],
  },
]
