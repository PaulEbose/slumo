import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthCheck, SuspenseWithPerf } from 'reactfire'
import { FirebaseAppProvider } from 'reactfire/firebaseApp'
import { SiteFooter, SiteHeader, PageWrapper } from './components'
import { Dashboard, Fallback, Home, Login, Register } from './views'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <SuspenseWithPerf
              fallback={'Spinner...loading dashboard wit spinners and lines'}
              traceId="loading-dashboard"
            >
              <AuthCheck fallback={'mini dashboard wit log in prompt'}>
                <Dashboard />
              </AuthCheck>
            </SuspenseWithPerf>
          </Route>

          <PageWrapper>
            <Route exact path="/" component={Home} />

            <Route path="/login">
              <Suspense fallback={'Spinner...loading spinner'}>
                <SiteHeader />
                <Login />
                <SiteFooter />
              </Suspense>
            </Route>

            <Route path="/register">
              <Suspense fallback={'Spinner...loading spinner'}>
                <SiteHeader />
                <Register />
                <SiteFooter />
              </Suspense>
            </Route>

            <Route component={Fallback} />
          </PageWrapper>
        </Switch>
      </Router>
    </FirebaseAppProvider>
  )
}

export default App
