import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingPage(props) {
    // get user information
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // get cart information where it is stored shipping addres
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    // verify if user is logged in
    if (!userInfo) {
        // if user is not logged in, goes to login page
        props.history.push('/login');
    }
    // data for shipping address
    // if there is data in shippingAddres from localStorage, show this data for each field, otherwise, show data from the database
    const [fullName, setFullName] = useState(userInfo.name + ' ' + userInfo.surname);
    const [publicPlace, setPublicPlace] = useState(shippingAddress.publicPlace ? shippingAddress.publicPlace : userInfo.publicPlace );
    const [publicPlaceNumber, setPublicPlaceNumber] = useState(shippingAddress.publicPlaceNumber ? shippingAddress.publicPlaceNumber : userInfo.publicPlaceNumber );
    const [neighborhood, setNeighborhood] = useState(shippingAddress.neighborhood ? shippingAddress.neighborhood : userInfo.neighborhood );
    const [city, setCity] = useState(shippingAddress.city ? shippingAddress.city : userInfo.city );
    const [state, setState] = useState(shippingAddress.state ? shippingAddress.state : userInfo.state );
    const [postalCode, setPostalCode] = useState( shippingAddress.postalCode ? shippingAddress.postalCode : userInfo.postalCode );
    const dispatch = useDispatch();
    // save shipping address data and proceed to payment page
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({ fullName, publicPlace, publicPlaceNumber, neighborhood, city, state, postalCode })
        );
        props.history.push('/payment');
    };
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Endereço de Entrega</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Nome Completo</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Obrigatório"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="publicPlace">Logradouro</label>
                    <input
                        type="text"
                        id="publicPlace"
                        placeholder="Ex: Rua das Flores"
                        value={publicPlace}
                        onChange={(e) => setPublicPlace(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="publicPlaceNumber">Número</label>
                    <input
                        type="text"
                        id="publicPlaceNumber"
                        placeholder="Opcional"
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
                        required
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
                        required
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
                        required
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
                        required
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continuar
                    </button>
                </div>
            </form>
        </div>
    );
}