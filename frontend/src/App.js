import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';

function App() {
    // get cartItems from redux
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
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
                        <Link to="/login">minha conta</Link>
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
                    <Route path="/cart/:id?" component={CartPage}></Route>
                    <Route path="/product/:id" component={ProductPage}></Route>
                </main>
                <footer className="row center">
                    All rights reserved
                </footer>
            </div>
        </BrowserRouter>
  );
}

export default App;