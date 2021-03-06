import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

export default function UserListPage(props) {
    // get userList from redux store
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    // get userDelete from redux store
    const userDelete = useSelector((state) => state.userDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
        dispatch({
            type: USER_DETAILS_RESET,
        });
    }, [dispatch, successDelete]);

    const deleteHandler = (user) => {
        if (window.confirm('Tem certeza que quer remover este usuário?')) {
            dispatch(deleteUser(user._id));
        }
    };
    return (
        <div>
            <h1>Lista de Usuários</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && (
                <MessageBox variant="success">Usuário deletado com sucesso.</MessageBox>
            )}
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
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => props.history.push(`/user/${user._id}/edit`)}
                                    >
                                        editar
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => deleteHandler(user)}
                                    >
                                        deletar
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