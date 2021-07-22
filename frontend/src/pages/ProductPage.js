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
                        <div className="productImage">
                            <div className="include">
                                <img className="large right" src={product.image} alt={product.name}></img>
                            </div>
                        </div>
                        <div className="productInfo">
                            <ul>
                                <li>
                                    <strong> {product.name} </strong>
                                </li>
                                <li>
                                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                                </li>
                                <li>
                                    <strong>R$ {product.price}</strong>
                                </li>
                                <li>
                                    <div className="row">
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
                        <div className="specifications_wrapper">
                            <div className="specifications_left">
                                <h1>Descrição do Produto</h1>
                                {product.description}
                            </div>
                            <div className="specifications_right">
                                <h1>Especificações do Produto</h1>
                                <tbody>                            
                                    {product.category !== '' && (
                                        <tr>
                                            <th className="fieldName">Categoria</th>
                                            <td className="fieldValue">{product.category}</td>
                                        </tr>
                                    )}
                                    {product.style !== '' && (
                                        <tr>
                                            <th className="fieldName">Estilo</th>
                                            <td className="fieldValue">{product.style}</td>
                                        </tr>
                                    )}
                                    {product.gender !== '' && (
                                        <tr>
                                            <th className="fieldName">Gênero</th>
                                            <td className="fieldValue">{product.gender}</td>
                                        </tr>
                                    )}
                                    { product.lensMaterial !== '' && (
                                        <tr>
                                            <th className="fieldName">Material da Lente</th>
                                            <td className="fieldValue">{product.lensMaterial}</td>
                                        </tr>
                                    )}
                                    {product.lensColor !== '' && (
                                        <tr>
                                            <th className="fieldName">Cor da Lente</th>
                                            <td className="fieldValue">{product.lensColor}</td>
                                        </tr>
                                    )}
                                    {product.lensProtection !== '' && (
                                        <tr>
                                            <th className="fieldName">Proteção da Lente</th>
                                            <td className="fieldValue">{product.lensProtection}</td>
                                        </tr>
                                    )}
                                    {product.frameMaterial !== '' && (
                                        <tr>
                                            <th className="fieldName">Material da Armação</th>
                                            <td className="fieldValue">{product.frameMaterial}</td>
                                        </tr>
                                    )}
                                    {product.frameColor !== '' && (
                                        <tr>
                                            <th className="fieldName">Cor da Armação</th>
                                            <td className="fieldValue">{product.frameColor}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </div>
                        </div>
                    </div>
                    <div className="ratings">
                        <h1 id="reviews">Avaliações do Produto</h1>
                        {product.reviews.length === 0 ? (
                            <MessageBox>Ainda não há nenhuma avaliação</MessageBox>
                        ) : (
                            <ul className="reviews">
                                {product.reviews.map((review) => (
                                    <li key={review._id}>
                                        <strong>{review.name} - {review.createdAt.substring(0, 10)}</strong>
                                        <Rating rating={review.rating} caption=" "></Rating>
                                        <p>{review.comment}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
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
                                        <option value="0">0 - Horrível</option>
                                        <option value="1">1 - Ruim</option>
                                        <option value="2">2 - Regular</option>
                                        <option value="3">3 - Bom</option>
                                        <option value="4">4 - Muito Bom</option>
                                        <option value="5">5 - Excelente</option>
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
                    </div>                 
                </div>
            )}
        </div>

    );

}