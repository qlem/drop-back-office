import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { compose, graphql } from 'react-apollo'
import { LOGINBACK } from '../mutations'

class SignIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  _mutateLogin = () => {
    if (!this.state.email.empty && !this.state.password.empty) {
      this.props.mutate({
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      }).then((data) => {
        this._confirm(data)
      }).catch((e) => {
        this.setState({error: e.message})
      })
    }
  };

  _confirm = data => {
    const { token } = data.data.loginBack
    this._saveUserData(token)
    this.props.history.push('/')
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  render() {
    return (
      <div className="pa4 black-80">
        <form className="measure center">
          <div>
            <p>{this.state.error}</p>
          </div>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email"
                     name="email-address" id="email-address"
                     onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password"
                     name="password" id="password"
                     onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
          </fieldset>
          <div>
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                   value="Sign in" onClick={this._mutateLogin} onChange={() => {}}/>
          </div>
        </form>
      </div>
    )
  }
}

export default compose(graphql(LOGINBACK))(SignIn)