import Loadable from 'react-loadable'
import { Loading } from './Loading'

export { LanguageSelector  } from './LanguageSelector'
export { Footer } from './Footer'
export { Header } from './Header'
export { Loading } from './Loading'

const AsyncFooter = Loadable({
  loader: () => import('./Footer').then(m => m.Footer),
  loading: Loading,
})

const AsyncHeader = Loadable({
  loader: () => import('./Header').then(m => m.Header),
  loading: Loading,
})

export { AsyncFooter, AsyncHeader }
