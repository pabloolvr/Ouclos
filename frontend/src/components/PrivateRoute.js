import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

// private route is used to redirect the user to the login page if he goes to 
// an authenticated page and user is not logged in
export default function PrivateRoute({ component: Component, ...rest }) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // if user is not logged in, redirect 
    return (
        <Route
            {...rest}
            render={(props) =>
                userInfo ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/login" />
                )
            }
        ></Route>
    );
}