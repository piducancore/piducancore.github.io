import base from "@theme-ui/preset-base"
import { merge } from "theme-ui"

import "@fontsource/saira/700.css"
import "@fontsource/saira/400.css"

const theme = merge(base, {
  colors: {
    primary: "#6d2f9c",
    secondary: "#ffae1e",
  },
  fontSizes: [12, 14, 16, 18, 22, 32, 48, 64, 96],
  fonts: {
    heading: `'Saira', sans-serif`,
    body: `'Saira', sans-serif`,
  },
  fontWeights: {
    heading: 700,
    body: 400,
  },
  sizes: {
    // container: 480,
  },
  layout: {
    header: {},
    main: {
      width: "100%",
      flex: "1 1 auto",
      display: "flex",
      flexDirection: "column",
    },
    footer: { textAlign: "center" },
    container: {
      maxWidth: "container",
      mx: "auto",
      px: 3,
    },
  },
  styles: {
    root: { bg: "muted" },
    a: {
      textDecoration: "none",
      fontWeight: "bold",
      ":hover": {
        color: "secondary",
      },
    },
    p: {
      // fontSize: 3,
      my: 2,
    },
  },
})

export default theme
