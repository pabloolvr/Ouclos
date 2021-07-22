import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function ProductCard(props) {
    const { product } = props;
    return (
        <div key={product._id} className="card">
            <div className="card-image">
                <Link to={`/product/${product._id}`}>
                    <img
                        className="medium"
                        src={product.image}
                        alt={product.name}
                    />
                </Link>
            </div>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                <div className="price">R$ {product.price.toFixed(2)}</div>
            </div>
        </div>
    )
}