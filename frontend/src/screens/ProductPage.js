import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import data from '../data';

export default function ProductPage(props) {
    const product = data.products.find((x) => x._id === props.match.params.id);
    if (!product) {
        return <div>Produto não encontrado</div>
    }
    return (
        <div className="product-main">
            <Link to="/">Voltar</Link>
            <div className="row top">
                <div className="col-2">
                    <img src={product.image} alt={product.name}></img>
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
                            Price : R$ {product.price}
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
    );

}