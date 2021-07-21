import React, { useEffect, useState } from 'react';
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
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';



function App() {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
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
    // get productCategoryList from redux store
    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;

    useEffect(() => {
        dispatch(listProductCategories());
    }, [dispatch]);
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <button
                            type="button"
                            className="open-sidebar"
                            onClick={() => setSidebarIsOpen(true)}
                        >
                            <i className="fa fa-bars"></i>
                        </button>
                        <Link className="brand" to="/">
                            ouclos óculos
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
                <aside className={sidebarIsOpen ? 'open' : ''}>
                    <ul className="categories">
                        <li>
                            <strong>Categorias</strong>
                            <button
                                onClick={() => setSidebarIsOpen(false)}
                                className="close-sidebar"
                                type="button"
                            >
                                <i className="fa fa-close"></i>
                            </button>
                        </li>
                        {loadingCategories ? (
                            <LoadingBox></LoadingBox>
                        ) : errorCategories ? (
                            <MessageBox variant="danger">{errorCategories}</MessageBox>
                        ) : (
                            categories.map((c) => (
                                <li key={c}>
                                    <Link
                                        to={`/search/category/${c}`}
                                        onClick={() => setSidebarIsOpen(false)}
                                    >
                                        {c}
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>
                </aside>
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
                        path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
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