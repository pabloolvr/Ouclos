import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
//import data from '../data';

export default function ProductPage(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    // get productDetails from redux store
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product} = productDetails;
    // get user info from redux store
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // get productReviewCreate from redux store
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate,
    } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (successReviewCreate) {
            window.alert('Avaliação enviada com sucesso');
            // reset review variables
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}`);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(
                createReview(productId, { rating, comment, name: userInfo.name, reviewerId: userInfo._id })
            );
        } else {
            alert('Por favor selecione comentário e avaliação');
        }
    };
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox> // show loading box when loading data from backend
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox> // show message box with error when somethings goes wrong when fetching data from backend
            ) : (
                <div className="product-main">
                    <Link to="/">Voltar</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img className="large" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                                </li>
                                <li>
                                    Preço : R$ {product.price}
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        <div>
                                            {product.quantity > 0 ? (
                                                <span className="success">Em estoque</span>
                                            ) : (
                                                <span className="danger">Fora de estoque</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                { product.quantity > 0 && (
                                    <>
                                        <li>
                                            <button onClick={addToCartHandler} className="primary block">Adicionar ao carrinho</button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="specifications">
                        Especificações do Produto
                        <br></br>
                        asdasdasdasdasd
                        asdasdasdasdasddasasd
                        asd
                        asdasdasdasdasddasasdasda
                        sd
                        <br>
                        </br>
                        asdasdasdasdasddasasdasdasd
                        asdasdasdasdasddasasdasdasda
                        adsasdasdasd
                    </div>
                    <div>
                        <h2 id="reviews">Avaliações</h2>
                        {product.reviews.length === 0 && (
                            <MessageBox>Ainda não há nenhuma avaliação</MessageBox>
                        )}
                        <ul>
                            {product.reviews.map((review) => (
                                <li key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating rating={review.rating} caption=" "></Rating>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </li>
                            ))}
                            <li>
                                {userInfo ? (
                                    <form className="form" onSubmit={submitHandler}>
                                        <div>
                                            <h2>Faça uma avaliação</h2>
                                        </div>
                                        <div>
                                            <label htmlFor="rating">Nota</label>
                                            <select
                                                id="rating"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option value="">Selecionar...</option>
                                                <option value="1">1- Poor</option>
                                                <option value="2">2- Fair</option>
                                                <option value="3">3- Good</option>
                                                <option value="4">4- Very good</option>
                                                <option value="5">5- Excelent</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="comment">Comentário</label>
                                            <textarea
                                                id="comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label />
                                            <button className="primary" type="submit">
                                                Enviar
                                            </button>
                                        </div>
                                        <div>
                                            {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                            {errorReviewCreate && (
                                                <MessageBox variant="danger">
                                                    {errorReviewCreate}
                                                </MessageBox>
                                            )}
                                        </div>
                                    </form>
                                ) : (
                                    <MessageBox>
                                        Por favor <Link to="/signin">faça Login</Link> para escrever uma avaliação
                                    </MessageBox>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>

    );

}