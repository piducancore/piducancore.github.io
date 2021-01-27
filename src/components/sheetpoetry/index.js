import React, { useState } from "react"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import fetch from "isomorphic-fetch"

import Typed from "./typed"
import Form from "./form"

const client = new ApolloClient({
  uri: "https://sheetpoetry.now.sh/graphql",
  cache: new InMemoryCache(),
  fetch,
})

export default function Example() {
  const [{ sheetpoem }, setWords] = useState("...")
  return (
    <ApolloProvider client={client}>
      <Typed words={sheetpoem} />
      <Form onCompleted={setWords} />
    </ApolloProvider>
  )
}
