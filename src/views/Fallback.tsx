import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function Fallback() {
  return (
    <main>
      <h1>Fallback</h1>
      <p>Page not Found</p>
      <p>Goto <Link to="/" children="homepage" /></p>
    </main>
  )
}

export default withRouter(Fallback)
