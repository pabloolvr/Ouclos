import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, getOrderDetails } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_RESET } from '../constants/orderConstants';

export default function OrderPage(props) {
    const orderId = props.match.params.id;
    // get order details from redux store
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    // get userInfo from logged in user on redux store
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // get orderPay from redux store

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successDeliver,
    } = orderDeliver;

    const dispatch = useDispatch();
    useEffect(() => {
        // reload the page if the order has just been delivered or the order in the variable 'order' is not the same as the one being shown in the page
        if (!order || successDeliver || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, order, orderId, successDeliver]);

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
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
                            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <li>
                                    {loadingDeliver && <LoadingBox></LoadingBox>}
                                    {errorDeliver && (
                                        <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                    )}
                                    <button
                                        type="button"
                                        className="primary block"
                                        onClick={deliverHandler}
                                    >
                                        Confirmar Entrega
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}