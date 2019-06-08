import React from 'react';
import {Redirect, Route} from 'react-router-dom'


const RequireAuthRoute = ({component: Component, authenticated, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            return authenticated ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/new-session',
                    state: {from: props.location}
                }}/>
            )
        }}
    />
);


export default RequireAuthRoute;