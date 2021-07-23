import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder} from '../actions/orderActions';
import { updateProductStock } from '../actions/productActions';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

export default function PlaceOrderPage(props) {
    // get cart information from redux store
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    // use 2 decimal places in price number 
    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    // set frete
    cart.shippingPrice = cart.itemsPrice > 300 ? toPrice(0) : toPrice(cart.itemsPrice*0.05);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

    // dispatch place order action
    const dispatch = useDispatch();
    const placeOrderHandler = (/*paymentResult*/) => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
        cart.cartItems.forEach((item) => {
            dispatch(updateProductStock({ _id: item.product, quantity: item.quantity - item.qty}));
        });
    };

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`); // go to order page
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);
    
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Endereço de Entrega</h2>
                                <p>
                                    <strong>Nome:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Endereço: </strong> {cart.shippingAddress.publicPlace}
                                    , {cart.shippingAddress.publicPlaceNumber} - {cart.shippingAddress.neighborhood}
                                    , {cart.shippingAddress.city} - {cart.shippingAddress.state}, {cart.shippingAddress.postalCode}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Pagamento</h2>
                                <p>
                                    <strong>Método de Pagamento:</strong> {cart.paymentMethod.method} <br />
                                    <strong>Número do Cartão:</strong> {cart.paymentMethod.cardNumber} <br />
                                    <strong>Validade do Cartão:</strong> {cart.paymentMethod.cardExpirationDate} <br />
                                    <strong>Código de Segurança do Cartão:</strong> {cart.paymentMethod.cardSecurityCode} <br />
                                    <strong>CPF do titular:</strong> {cart.paymentMethod.ownerCPF} <br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Sacola</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div>
                                                    {item.qty} x R${item.price} = R${item.qty * item.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Resumo do Pedido</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Subtotal</div>
                                    <div>R$ {cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Entrega</div>
                                    <div>R$ {cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong>Total</strong>
                                    </div>
                                    <div>
                                        <strong>R$ {cart.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0}
                                >
                                    finalizar pedido
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}