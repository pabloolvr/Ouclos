import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
//import data from '../data';

export default function HomePage() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProducts({ name: ''}));
    }, [dispatch])
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox> // show loading box when loading data from backend
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox> // show message box with error when somethings goes wrong when fetching data from backend
            ) : (
                <div className="row center">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))}
                </div>
            )}
        </div>
    );
}