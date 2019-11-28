import React, { useState } from 'react'
import { AUTH_TOKEN } from '../../constants'
import { LOGINBACK } from '../../mutations'
import {useApolloClient, useMutation} from "@apollo/react-hooks";
import {useHistory} from 'react-router-dom';

export default function SignIn (props) {

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const client = useApolloClient();
  const [signIn, { loading: signInLoading }] = useMutation(LOGINBACK, {
    onCompleted: async ({ loginBack: { token } }) => {
      localStorage.setItem(AUTH_TOKEN, token);
      await client.clearStore();
      history.push('/')
    },
    onError: e => setError(e.message),
    variables: {
      email,
      password
    }
  });

  return (
    <div className="pa4 black-80">
      <form className="measure center">
        <div>
          <p>{error}</p>
        </div>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email"
                   name="email-address" id="email-address"
                   onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password"
                   name="password" id="password"
                   onChange={e => setPassword(e.target.value)}
            />
          </div>
        </fieldset>
        <div>
          <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                 value="Sign in" onClick={signIn} onChange={() => {}}/>
        </div>
      </form>
    </div>
  )
};