import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function UpdateAddressPage() {
    const [publicPlace, setPublicPlace] = useState('');
    const [publicPlaceNumber, setPublicPlaceNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    
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
        setPublicPlace(user.publicPlace);
        setPublicPlaceNumber(user.publicPlaceNumber);
        setNeighborhood(user.neighborhood);
        setCity(user.city);
        setState(user.state);
        setPostalCode(user.postalCode);
    }
}, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        dispatch(updateUserProfile({ userId: user._id, publicPlace, publicPlaceNumber, neighborhood, city, state, postalCode }));
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
                            <label htmlFor="publicPlace">Logradouro</label>
                            <input
                                type="text"
                                id="publicPlace"
                                placeholder="Ex: Rua das Flores"
                                value={publicPlace}
                                onChange={(e) => setPublicPlace(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="publicPlaceNumber">Número</label>
                            <input
                                type="text"
                                id="publicPlaceNumber"
                                placeholder="Número do Endereço"
                                value={publicPlaceNumber}
                                onChange={(e) => setPublicPlaceNumber(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="neighborhood">Bairro</label>
                            <input
                                type="text"
                                id="neighborhood"
                                placeholder="Ex: Centro"
                                value={neighborhood}
                                onChange={(e) => setNeighborhood(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="city">Cidade</label>
                            <input
                                type="text"
                                id="city"
                                placeholder="Ex: São Paulo"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="state">Estado</label>
                            <input
                                type="text"
                                id="state"
                                placeholder="Ex: Minas Gerais"
                                value={state}
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
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
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