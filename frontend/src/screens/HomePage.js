import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
//import data from '../data';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/products'); // fetch data from backend
                setLoading(false);
                setProducts(data);
            } catch(e) {
                setError(e.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [])
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox> // show loading box when loading data from backend
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox> // show message box with error when somethings goes wrong when fetching data from backend
            ) : (
                <div className="row center">
                    {products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                    ))}
                </div>
            )}
        </div>
    );
}