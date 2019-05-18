import { compose, graphql } from 'react-apollo'
import * as React from 'react'
import { DROPPED } from '../queries'

class DropMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    return (
      <div>
        <p>Okay bro</p>
      </div>
    )
  }
}

export default compose(graphql(DROPPED))(DropMap)