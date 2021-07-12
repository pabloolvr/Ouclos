import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: sign in action
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Acessar Conta</h1>
                </div>
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