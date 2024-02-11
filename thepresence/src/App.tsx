import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb: () => void) {
    fakeAuth.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb: () => void) {
    fakeAuth.isAuthenticated = false
    setTimeout(cb, 100)
  },
}

function AuthButton() {
  let history = useHistory()

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push('/'))
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
}

function PrivateRoute({ children, ...rest }: { children: any; path: string }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

function PublicPage() {
  return <h3>Public</h3>
}

function ProtectedPage() {
  return <h3>Protected</h3>
}

function LoginPage() {
  let history = useHistory()
  let location = useLocation()

  let { from } = (location.state as { from: { pathname: string } }) || {
    from: { pathname: '/' },
  }
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from)
    })
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}

export default React.memo(() => {
  return (
    <Router>
      <div>
        <AuthButton />

        <ul>
          <li>
            <Link to='/public'>Public Page</Link>
          </li>
          <li>
            <Link to='/protected'>Protected Page</Link>
          </li>
        </ul>

        <Switch>
          <Route path='/public'>
            <PublicPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <PrivateRoute path='/protected'>
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  )
})
