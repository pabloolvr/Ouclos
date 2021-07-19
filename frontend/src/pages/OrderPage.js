import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderPage(props) {
    const orderId = props.match.params.id;

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const {
        loading: loadingPay,
        error: errorPay,
        success: successPay,
    } = orderPay;

    const dispatch = useDispatch();
    useEffect(() => {
        // reload the page if the order has just been paid or the order in the variable 'order' is not the same as the one being shown in the page
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            console.log('chamou getOrderDetails');
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, order, orderId, successPay]);

    const successPaymentHandler = () => {
        console.log('chamou payOrder');
        dispatch(payOrder(order));
    };

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <h1>Pedido {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Endereço de Entrega</h2>
                                <p>
                                    <strong>Nome:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Endereço: </strong> {order.shippingAddress.publicPlace}
                                    , {order.shippingAddress.publicPlaceNumber} - {order.shippingAddress.neighborhood}
                                    , {order.shippingAddress.city} - {order.shippingAddress.state}, {order.shippingAddress.postalCode}
                                </p>
                                {order.isDelivered ? (
                                    <MessageBox variant="success">
                                        Entregue em {order.deliveredAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Não entregue</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Pagamento</h2>
                                <p>
                                    <strong>Método de Pagamento:</strong> {order.paymentMethod.method} <br />
                                    <strong>Número do Cartão:</strong> {order.paymentMethod.cardNumber} <br />
                                    <strong>Validade do Cartão:</strong> {order.paymentMethod.cardExpirationDate} <br />
                                    <strong>Código de Segurança do Cartão:</strong> {order.paymentMethod.cardSecurityCode} <br />
                                    <strong>CPF do titular:</strong> {order.paymentMethod.ownerCPF} <br />
                                </p>
                                {order.isPaid ? (
                                    <MessageBox variant="success">
                                        Pago em {order.paidAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Ainda não pago</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Itens do Pedido</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
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
                                                    {item.qty} x R$ {item.price} = R$ {item.qty * item.price}
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
                                    <div>R$ {order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Entrega</div>
                                    <div>R$ {order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong>Total</strong>
                                    </div>
                                    <div>
                                        <strong>R$ {order.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            {!order.isPaid && (
                                <li>
                                    <>
                                        {errorPay && (
                                            <MessageBox variant="danger">{errorPay}</MessageBox>
                                        )}
                                        {loadingPay && <LoadingBox></LoadingBox>}
{/*
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        ></PayPalButton>
*/}
                                        <button
                                            type="button"
                                            onClick={successPaymentHandler}
                                            className="primary block"
                                        >
                                            pagar pedido
                                        </button>
                                    </>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}