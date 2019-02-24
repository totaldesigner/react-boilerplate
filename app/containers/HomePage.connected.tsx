import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RootState } from '../reducers'
import HomePage from './HomePage'

import * as actions from '../actions'
import * as selectors from '../selectors'

const mapStateToProps = (state: RootState) => ({
  users: selectors.getUsers(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUsers: (params: { seed: number; page: number }) =>
        actions.fetchUsers(params),
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
