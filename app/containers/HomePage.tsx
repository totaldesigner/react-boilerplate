import React from 'react'
import { FormattedMessage } from 'react-intl'
import User from '../shared/models/User'
import LanguageSelector from './LanguageSelector.connected'

import * as styles from './styles.scss'

namespace HomePage {
  export interface Props
    extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > {
    fetchUsers: any
    users?: User[]
  }

  export interface State {
    /* */
  }
}

class HomePage extends React.Component<HomePage.Props, HomePage.State> {
  // componentDidMount() {
  //   this.props.fetchUsers({ seed: 0, page: 10 })
  // }

  public render() {
    const { users = [] } = this.props

    return (
      <div className={styles.home}>
        <h1>Home</h1>
        <FormattedMessage id={`HELLO`} values={{ name: `민식` }} />
        <LanguageSelector />
        {users.map(user => (
          <div key={user.id}>
            <ul className={styles[`user-list`]}>
              <li>
                <strong>id</strong>
                <span>{user.id}</span>
              </li>
              <li>
                <strong>email</strong>
                <span>{user.email}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    )
  }
}

export default HomePage
