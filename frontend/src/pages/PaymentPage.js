import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentPage(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.fullName) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Cartão de Crédito');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch the savePaymentMethod cart action
        dispatch(savePaymentMethod(paymentMethod));
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
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
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
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="debit">Cartão de Débito</label>
                    </div>
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