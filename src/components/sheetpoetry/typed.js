/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Typist from "react-typist"

import "react-typist/dist/Typist.css"

export default function TypedText({ words }) {
  return (
    <Typist sx={{ mb: 3 }} key={words}>
      <Styled.h2 sx={{ whiteSpace: "pre-wrap", display: "inline" }}>
        {words}
      </Styled.h2>
    </Typist>
  )
}
