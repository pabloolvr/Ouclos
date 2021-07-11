import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
//import data from '../data';

export default function ProductPage(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product} = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

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
                                                <span className="success">In Stock</span>
                                            ) : (
                                                <span className="danger">Unavailable</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button className="primary block"> Comprar</button>
                                </li>
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
                </div>
            )}
        </div>

    );

}