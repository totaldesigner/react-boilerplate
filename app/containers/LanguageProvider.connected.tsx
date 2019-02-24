import { connect } from 'react-redux'
import { RootState } from '../reducers'
import LanguageProvider from './LanguageProvider'

import * as selectors from '../selectors'

const mapStateToProps = (state: RootState) => ({
  locale: selectors.getLocale(state),
  users: selectors.getUsers(state),
})

export default connect(
  mapStateToProps,
  null
)(LanguageProvider)
