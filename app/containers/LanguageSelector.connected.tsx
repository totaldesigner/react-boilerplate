import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { LanguageSelector } from '../components'
import { RootState } from '../reducers'

import * as actions from '../actions'
import * as selectors from '../selectors'

const mapStateToProps = (state: RootState) => ({
  locale: selectors.getLocale(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      changeLocale: (language: Language) =>
        actions.changeLocale(language),
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelector)
