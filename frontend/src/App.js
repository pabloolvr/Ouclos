import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';


function App() {
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                    <a className="brand" href="/">
                        ouclos óculos
                    </a>
                    </div>
                    <div>
                    <a href="/cart">Cart</a>
                    <a href="/signin">Sign In</a>
                    </div>
                </header>
                <main>
                    <Route exact path="/" component={HomePage}></Route>
                    <Route path="/product/:id" component={ProductPage}></Route>
                </main>
                <footer className="row center">All rights reserved</footer>
            </div>
        </BrowserRouter>
  );
}

export default App;