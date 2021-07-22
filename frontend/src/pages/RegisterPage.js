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
    const [publicPlace, setPublicPlace] = useState('');
    const [publicPlaceNumber, setPublicPlaceNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
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
            dispatch(register(name, surname, cpf, birthdate, publicPlace, publicPlaceNumber, neighborhood, city, state, postalCode, phone, email, password));
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
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <h1>Dados Pessoais</h1>
                </div>
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
                        placeholder="Digitar senha"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirmar senha"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <h1>Endereço</h1>
                </div>
                <div>
                    <label htmlFor="publicPlace">Logradouro</label>
                    <input
                        type="text"
                        id="publicPlace"
                        placeholder="Ex: Rua das Flores"
                        onChange={(e) => setPublicPlace(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="publicPlaceNumber">Número</label>
                    <input
                        type="text"
                        id="publicPlaceNumber"
                        placeholder="Opcional"
                        onChange={(e) => setPublicPlaceNumber(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="neighborhood">Bairro</label>
                    <input
                        type="text"
                        id="neighborhood"
                        placeholder="Ex: Centro"
                        onChange={(e) => setNeighborhood(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="city">Cidade</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Ex: São Paulo"
                        onChange={(e) => setCity(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="state">Estado</label>
                    <input
                        type="text"
                        id="state"
                        placeholder="Ex: Minas Gerais"
                        onChange={(e) => setState(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="postalCode">CEP</label>
                    <input
                        type="text"
                        id="postalCode"
                        pattern="[0-9]{5}-[0-9]{3}"
                        placeholder="99999-999"
                        onChange={(e) => setPostalCode(e.target.value)}
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
                        <Link to={`/login?redirect=${redirect}`}>acesse sua conta aqui </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}