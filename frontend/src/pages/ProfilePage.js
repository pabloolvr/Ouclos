import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfilePage() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [cpf, setCPF] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // get userLogin info from redux store
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // get userDetails from redux store
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    // get userUpdateProfile from redux store
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile

    const dispatch = useDispatch();
    useEffect(() => {
    if (!user) { // if userDetails didnt have user information
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(detailsUser(userInfo._id));
    } else {
        setName(user.name);
        setSurname(user.surname);
        setCPF(user.cpf);
        setBirthdate(user.birthdate);
        setPhone(user.phone);
        setEmail(user.email);
    }
}, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword) { // if user insert different passwords
            alert('Senha e Confirmar senha não são iguais');
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, surname, cpf, birthdate, phone, email, password }));
        }
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Dados Pessoais</h1>
                </div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && (
                            <MessageBox variant="danger">{errorUpdate}</MessageBox>
                        )}
                        {successUpdate && (
                            <MessageBox variant="success">
                                Dados alterados com sucesso
                            </MessageBox>
                        )}
                        <div>
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Obrigatório"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="surname">Sobrenome</label>
                            <input
                                type="text"
                                id="surname"
                                placeholder="Obrigatório"
                                value={surname}
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
                                value={cpf}
                                onChange={(e) => setCPF(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="birthdate">Data de Nascimento</label>
                            <input
                                type="date"
                                id="birthdate"
                                placeholder="dd/mm/aaaa"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="phone">Telefone</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Opcional"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="joao@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Digitar senha"
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirmar senha</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirmar senha"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label />
                            <button className="primary" type="submit">
                                Alterar dados
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}