import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// @ts-ignore
import PageTransition from 'react-router-page-transition'

import Home from './pages/home'
import Tomato from './pages/tomato'

const App = () => {
  return (
    <BrowserRouter>
      <Route
        render={({ location }) => (
          <PageTransition timeout={300}>
            <Switch location={location}>
              <Route exact path='/' component={Home} />
              <Route path='/tomato' component={Tomato} />
            </Switch>
          </PageTransition>
        )}
      />
    </BrowserRouter>
  )
}

export default App
