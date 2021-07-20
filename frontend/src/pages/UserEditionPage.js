import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditionPage(props) {
    const userId = props.match.params.id;
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            // if user was succesfully updated
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/userlist');
        }
        if (!user) {
            // if there isnt an user from userDetails
            dispatch(detailsUser(userId));
        } else {
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, props.history, successUpdate, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update user
        dispatch(updateUser({ _id: userId, isAdmin }));
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Editar Usuário {userId}</h1>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                </div>
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="isAdmin">É administrador?</label>
                            <input
                                id="isAdmin"
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></input>
                        </div>
                        <div>
                            <button type="submit" className="primary">
                                Atualizar
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}