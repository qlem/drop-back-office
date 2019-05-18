import React from 'react'
import { hot } from 'react-hot-loader/root'
import 'tachyons/css/tachyons.min.css'
import SignIn from './Auth/signIn'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from './home'
import DropMap from './Map/dropMap'
import DropHotMap from './Map/dropHotMap'
import '../style.css'
import { AUTH_TOKEN } from '../constants'
import 'mapbox-gl/dist/mapbox-gl.css';
import SignOut from "./Auth/signOut";

const App = () => {
    const isAuth = localStorage.getItem(AUTH_TOKEN);
    return (
        <div>
            <nav className="flex justify-between bb b--white-10 bg-black">
                <a className="link white-70 hover-white no-underline flex items-center pa3" href="/">
                    Drop.
                </a>
                <div className="flex-grow pa3 flex items-center">
                    <a className="f6 link dib white dim mr3 mr4-ns" href="/">Home</a>
                    <a className="f6 link dib white dim mr3 mr4-ns" href="/map">Dropped Map</a>
                    <a className="f6 link dib white dim mr3 mr4-ns" href="/hotmap">Hot Map</a>
                    <a className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
                       href={isAuth ? '/logout' : 'login'}>{isAuth ? 'Logout' : 'Sign in'}</a>
                </div>
            </nav>
            <Switch >
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/map" component={DropMap} />
                <PrivateRoute exact path="/hotmap" component={DropHotMap} />
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/logout" component={SignOut} />
            </Switch>
        </div>
    )};
export default hot(App)

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem(AUTH_TOKEN)? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login'
                        }}
                    />
                )
            }
        />
    )
}