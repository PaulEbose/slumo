import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useUser } from 'reactfire/auth'

function SiteHeader() {
  const user: any = useUser()

  const renderLogout = () => (
    <span className="mr-8">
      <Link to="/" children="Logout" />
    </span>
  )

  const renderLoginRegister = () => (
    <div>
      <span className="mr-8">
        <Link to="/register" children="Register" />
      </span>
      <span className="mr-8">
        <Link to="/login" children="Login" />
      </span>
    </div>
  )

  return (
    <header className="flex items-center justify-between mt-4">
      <h1 className="m-0 ml-8">
        <Link to="/" children="Slumo" />
      </h1>

      {user ? renderLogout() : renderLoginRegister}
    </header>
  )
}

export default withRouter(SiteHeader)
