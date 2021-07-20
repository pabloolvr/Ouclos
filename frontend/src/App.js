import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { logout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderPage from './pages/OrderPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ProductCreationPage from './pages/ProductCreationPage';
import ProductEditionPage from './pages/ProductEditionPage';
import ProductListPage from './pages/ProductListPage';
import ProductPage from './pages/ProductPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import RegisterScreen from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import UpdateAddressPage from './pages/UpdateAddresPage';



function App() {
    // get cartItems from redux
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    // get userInfo
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();
    // perform logout
    const logoutHandler = () => {
        dispatch(logout());
    };
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link className="brand" to="/">
                            ouclos óculos
                        </Link>
                    </div>
                    <div>
                        {userInfo ? (
                            <div className="dropdown">
                                <Link to="#">
                                    olá {userInfo.name}! <i className="fa fa-caret-down"></i>{' '}
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/profile">Perfil</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderhistory">Pedidos</Link>
                                    </li>
                                    <li>
                                        <Link to="/address">Endereço</Link>
                                    </li>
                                    <li>
                                        <Link to="/login" onClick={logoutHandler}>
                                            Sair
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/login">minha conta</Link>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    Admin <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/productlist">Produtos</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/userlist">Users</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                        <Link to="/cart">
                            sacola
                            {cartItems.length > 0 && (
                                <span className="badge">{cartItems.length}</span>
                            )}
                        </Link>
                    </div>
                </header>
                <main>
                    <Route exact path="/" component={HomePage}></Route>
                    <Route path="/login" component={LoginPage}></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <Route path="/cart/:id?" component={CartPage}></Route>
                    <Route exact path="/product/:id" component={ProductPage}></Route>
                    <AdminRoute exact path="/product/:id/create" component={ProductCreationPage}></AdminRoute>
                    <AdminRoute exact path="/product/:id/edit" component={ProductEditionPage}></AdminRoute>
                    <Route path="/shipping" component={ShippingPage}></Route>
                    <Route path="/payment" component={PaymentPage}></Route>
                    <Route path="/placeorder" component={PlaceOrderPage}></Route>
                    <Route path="/order/:id" component={OrderPage} exact></Route>
                    <Route path="/orderhistory" component={OrderHistoryPage}></Route>
                    <PrivateRoute path="/profile" component={UpdateProfilePage}></PrivateRoute>
                    <PrivateRoute path="/address" component={UpdateAddressPage}></PrivateRoute>
                    <AdminRoute path="/productlist" component={ProductListPage}></AdminRoute>
                </main>
                <footer className="row center">
                    All rights reserved
                </footer>
            </div>
        </BrowserRouter>
  );
}

export default App;