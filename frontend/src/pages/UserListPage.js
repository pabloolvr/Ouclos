import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function UserListPage() {
    // get userList from redux store
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);
    return (
        <div>
            <h1>Lista de Usuários</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id do Usuários</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>É administrador</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Sim' : 'Não'}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}