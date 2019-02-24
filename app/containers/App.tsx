import React from 'react'
import { Helmet } from 'react-helmet'
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'
import { Footer, Header } from '../components'
import { Loading } from '../components/Loading'
import HomePage from './HomePage.connected'

const AsyncAboutPage = Loadable({
  loader: () => import('./AboutPage'),
  loading: Loading,
})

const AsyncNotFoundPage = Loadable({
  loader: () => import('./NotFoundPage'),
  loading: Loading,
})

class App extends React.Component {
  public render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
        >
          <meta name="description" content="React Boilerplate" />
        </Helmet>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/about" component={AsyncAboutPage} />
          <Route path="*" component={AsyncNotFoundPage} />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App
