import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // set redirect addres
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    // get userInfo
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, loading, error } = userLogin;

    const dispatch = useDispatch();
    // perform login
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        // if login was succesful
        if (userInfo) {
            props.history.push(redirect); // redirect user
        }
    }, [props.history, redirect, userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Acessar Conta</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Ex: joao@email.com"
                        required
                        onChange={(e) => setEmail(e.target.value)} // get email value from the user input
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Senha"
                        required
                        onChange={(e) => setPassword(e.target.value)} // get password value from the user input
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Entrar
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        <Link to="/register">não tem uma conta? registre-se aqui</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}