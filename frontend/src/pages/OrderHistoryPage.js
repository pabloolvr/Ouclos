import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getParticularOrderList } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryPage(props) {
    const orderParticularList = useSelector((state) => state.orderParticularList);
    const { loading, error, orders } = orderParticularList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getParticularOrderList());
    }, [dispatch]);

    return (
        <div>
            <h1>Histórico de Pedidos</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Código do Pedido</th>
                            <th>Data de Criação</th>
                            <th>Total</th>
                            <th>Data de Pagamento</th>
                            <th>Entregue</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Não'}</td>
                                <td>
                                    {order.isDelivered
                                        ? order.deliveredAt.substring(0, 10)
                                        : 'Não'}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => {
                                            props.history.push(`/order/${order._id}`);
                                        }}
                                    >
                                        detalhes
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}