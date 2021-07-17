import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderPage(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    // dispatch order action
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId]);
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
                                <h2>Shipping</h2>
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
                                    <strong>Méotod:</strong> {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <MessageBox variant="success">
                                        Pago {order.paidAt}
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
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}