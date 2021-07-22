import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentPage(props) {
    // get shipping address from redux store
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.fullName) {
        props.history.push('/shipping');
    }

    const [method, setMethod] = useState('Cartão de Crédito');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpirationDate, setCardExpirationDate] = useState('');
    const [cardSecurityCode, setCardSecurityCode] = useState('');
    const [ownerCPF, setOwnerCPF] = useState('');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch the savePaymentMethod cart action
        dispatch(savePaymentMethod({ method, cardNumber, cardExpirationDate, cardSecurityCode, ownerCPF }));
        props.history.push('/placeorder');
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="credit"
                            value="Cartão de Crédito"
                            name="method"
                            required
                            checked
                            onChange={(e) => setMethod(e.target.value)}
                        ></input>
                        <label htmlFor="credit">Cartão de Crédito</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="debit"
                            value="Cartão de Débito"
                            name="method"
                            required
                            onChange={(e) => setMethod(e.target.value)}
                        ></input>
                        <label htmlFor="debit">Cartão de Débito</label>
                    </div>
                </div>
                <div>
                    <label htmlFor="cardNumber">Número do Cartão</label>
                    <input
                        type="text"
                        id="cardNumber"
                        pattern="[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}"
                        placeholder="9999-9999-9999-9999"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="cardExpiration">Validade</label>
                    <input
                        type="text"
                        id="cardExpiration"
                        pattern="[0-9]{2}/[0-9]{2}"
                        placeholder="mês/ano no formato XX/XX"
                        value={cardExpirationDate}
                        onChange={(e) => setCardExpirationDate(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="cardSecurityCode">Código de Segurança</label>
                    <input
                        type="text"
                        id="cardSecurityCode"
                        pattern="\d{3}"
                        placeholder="Três digitos atrás do cartão"
                        value={cardSecurityCode}
                        onChange={(e) => setCardSecurityCode(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="ownerCPF">CPF do Titular do Cartão</label>
                    <input
                        type="text"
                        id="ownerCPF"
                        pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                        placeholder="999.999.999-99"
                        value={ownerCPF}
                        onChange={(e) => setOwnerCPF(e.target.value)}
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