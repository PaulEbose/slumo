import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SiteFooter, SiteHeader } from './components'
import { Fallback, Home, Login, Register } from './views'

function App() {
  return (
    <div className="bg-gray-900 grid min-h-screen overflow-hidden items-start text-indigo-300">
      <Router>
        <SiteHeader />
        <main className="p-5">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={Fallback} />
          </Switch>
        </main>
        <SiteFooter />
      </Router>
    </div>
  )
}

export default App
