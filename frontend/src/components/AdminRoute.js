import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

// admin route used to admin users acces specifc pages
export default function AdminRoute({ component: Component, ...rest }) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return (
        <Route
            {...rest}
            render={(props) =>
                userInfo && userInfo.isAdmin ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/login" />
                )
            }
        ></Route>
    );
}