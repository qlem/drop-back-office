import * as React from "react";
import {AUTH_TOKEN} from "../../constants";

export default function SignOut (props) {

      //TODO: FX this sh1t
      const _clearToken = () => {
        localStorage.removeItem(AUTH_TOKEN);
      };

      return (
          <div className="pa4 black-80 measure center">
              <h1>Signed out.</h1>
              <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                      value="Sign in" onClick={() => props.history.push('/')}>
                  <p className="black-80">Sign in</p>
              </button>
          </div>
      )
}