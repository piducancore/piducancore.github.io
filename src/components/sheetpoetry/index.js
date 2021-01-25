/** @jsx jsx */
import { jsx, Input, Label, Button, Card, Spinner } from "theme-ui"
import { useState } from "react"
import { useLazyQuery, gql } from "@apollo/client"

import Typed from "./typed"

const SHEETPOEM = gql`
  query($spreadsheetId: String!, $range: String!, $verses: Int) {
    sheetpoem(spreadsheetId: $spreadsheetId, range: $range, verses: $verses)
  }
`

export function Example() {
  const [state, setState] = useState({
    spreadsheetId: "1qjgDw3TREpqQoSSbB0tzd0Joues1jraJix2mU52zToU",
    range: "A1:B50",
    verses: 4,
  })
  const { spreadsheetId, range, verses } = state
  function handleChange(e) {
    const value = e.target.value
    setState({
      ...state,
      [e.target.name]: value,
    })
  }

  const [getWords, { loading, error, data }] = useLazyQuery(SHEETPOEM, {
    fetchPolicy: "network-only",
  })

  return (
    <Card as="form" onSubmit={e => e.preventDefault()}>
      <Typed words={data ? data.sheetpoem : "..."} />
      <Label htmlFor="spreadsheet">spreadsheetId:</Label>
      <Input
        sx={{ mb: 3 }}
        name="spreadsheet"
        value={spreadsheetId}
        onChange={handleChange}
      />
      <Label htmlFor="range">range:</Label>
      <Input
        sx={{ mb: 3 }}
        name="range"
        value={range}
        onChange={handleChange}
      />
      <Label htmlFor="verses">verses:</Label>
      <Input
        sx={{ mb: 3 }}
        name="verses"
        value={verses}
        onChange={handleChange}
      />
      <br />
      <Button
        sx={{ width: "100%", height: "64px" }}
        onClick={() =>
          getWords({
            variables: {
              spreadsheetId,
              range,
              verses,
            },
          })
        }
      >
        {data ? "dale" : loading ? <Spinner /> : "lala"}
      </Button>
    </Card>
  )
}
