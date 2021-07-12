import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [cpf, setCPF] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // set redirect addres, which is used to send the user to the page he intended to go before registering
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) { // if user insert different passwords
            alert('Senha e Confirmar senha não são iguais');
        } else {
            dispatch(register(name, surname, cpf, birthdate, address, phone, email, password));
        }
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Criar Conta</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="José"
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="surname">Sobrenome</label>
                    <input
                        type="text"
                        id="surname"
                        placeholder="da Silva Matos"
                        required
                        onChange={(e) => setSurname(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        id="cpf"
                        pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                        placeholder="999.999.999-99"
                        required
                        onChange={(e) => setCPF(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="birthdate">Data de Nascimento</label>
                    <input
                        type="date"
                        id="birthdate"
                        placeholder="dd/mm/aaaa"
                        required
                        onChange={(e) => setBirthdate(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="address">Endereço</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Endereço de entrega"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="phone">Telefone</label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Opcional"
                        onChange={(e) => setPhone(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="joao@email.com"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Enter confirm password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        cadastrar-se
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        já tem uma conta?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>acesse sua conta aqui </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}