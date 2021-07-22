import React, { useEffect } from 'react';
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
import OrderListPage from './pages/OrderListPage';
import UserListPage from './pages/UserListPage';
import UserEditionPage from './pages/UserEditionPage';
import SearchPage from './pages/SearchPage';
import SearchBox from './components/SearchBox';

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

    useEffect(() => {

    }, [dispatch]);
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link className="brand" to="/">
                            ouclos
                        </Link>
                    </div>
                    <div>
                        <Route
                            render={({ history }) => (
                                <SearchBox history={history}></SearchBox>
                            )}
                        ></Route>
                    </div>
                    <div>
                        {userInfo ? (
                            <div className="dropdown">
                                <Link to="#">
                                    olá, {userInfo.name}! <i className="fa fa-caret-down"></i>{' '}
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
                            <Link to="/login">acessar conta</Link>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    admin <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/productlist">Produtos</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">Pedidos</Link>
                                    </li>
                                    <li>
                                        <Link to="/userlist">Usuários</Link>
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
                <header className="nav-categories">
                    <div className="nav-item">
                        <Link to="/search/category/Óculos%20de%20Sol/name/all/gender/all/lensMaterial/all/style/all/frameColor/all/lensColor/all/min/0/max/0/rating/0/order/newest">
                            óculos de sol
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/search/category/Óculos%20de%20Grau/name/all/gender/all/lensMaterial/all/style/all/frameColor/all/lensColor/all/min/0/max/0/rating/0/order/newest">
                            óculos de grau
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/search/category/Óculos%20de%20Computador/name/all/gender/all/lensMaterial/all/style/all/frameColor/all/lensColor/all/min/0/max/0/rating/0/order/newest">
                            óculos de computador
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
                    <Route path="/search/name/:name?" component={SearchPage}></Route>
                    <Route
                        path="/search/category/:category/name/:name/gender/:gender/lensMaterial/:lensMaterial/style/:style/frameColor/:frameColor/lensColor/:lensColor/min/:min/max/:max/rating/:rating/order/:order"
                        component={SearchPage}
                        exact
                    ></Route>
                    <PrivateRoute path="/profile" component={UpdateProfilePage}></PrivateRoute>
                    <PrivateRoute path="/address" component={UpdateAddressPage}></PrivateRoute>
                    <AdminRoute path="/productlist" component={ProductListPage}></AdminRoute>
                    <AdminRoute path="/orderlist" component={OrderListPage}></AdminRoute>
                    <AdminRoute path="/userlist" component={UserListPage}></AdminRoute>
                    <AdminRoute path="/user/:id/edit" component={UserEditionPage}></AdminRoute>
                </main>
                <footer className="row center">
                    All rights reserved
                </footer>
            </div>
        </BrowserRouter>
  );
}

export default App;