import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

export default function SearchPage(props) {
    const { 
        name = 'all', 
        category = 'all',
        min = 0,
        max = 0,
        rating = 0,
        order = 'newest',
     } = useParams();
    // get productList from redux store
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    // get productCategoryList from redux store
    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts({ 
            name: name !== 'all' ? name : '',
            category: category !== 'all' ? category : '',
            min,
            max,
            rating,
            order,
        }));
    }, [dispatch, name, category, min, max, order, rating]);
    // filter url of search
    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
    };
    //
    const [isPriceBoxOpened, setIsPriceBoxOpened] = useState(false);
    const togglePriceBox = () => {
        setIsPriceBoxOpened(!isPriceBoxOpened);
    }
    //
    const [isRatingBoxOpened, setIsRatingBoxOpened] = useState(false);
    const toggleRatingBox = () => {
        setIsRatingBoxOpened(!isRatingBoxOpened);
    }
    return (
        <div>
            <div className="row">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>{products.length} Produtos encontrados</div>
                )}
                <div>
                    Ordenar por{' '}
                    <select
                        value={order}
                        onChange={(e) => {
                            props.history.push(getFilterUrl({ order: e.target.value }));
                        }}
                    >
                        <option value="newest">Data de Lançamento</option>
                        <option value="lowest">Menor Preço</option>
                        <option value="highest">Maior Preço</option>
                        <option value="toprated">Melhor Avaliado</option>
                    </select>
                </div>
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Departamento</h3>
                    <div>
                        {loadingCategories ? (
                            <LoadingBox></LoadingBox>
                        ) : errorCategories ? (
                            <MessageBox variant="danger">{errorCategories}</MessageBox>
                        ) : (
                            <ul>
                                <li>
                                    <Link
                                        className={'all' === category ? 'active' : ''}
                                        to={getFilterUrl({ category: 'all' })}
                                    >
                                        Todos
                                    </Link>
                                </li>
                                {categories.map((c) => (
                                    <li key={c}>
                                        <Link
                                            className={c === category ? 'active' : ''}
                                            to={getFilterUrl({ category: c })}
                                        >
                                            {c}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <div className="filter-box">
                            <div className="filter-name" onClick={togglePriceBox}>
                                <h3>Por Preço</h3>
                            </div>
                                {isPriceBoxOpened && (
                                    <div className="filter-content">
                                        <ul>
                                            {prices.map((p) => (
                                                <li key={p.name}>
                                                    <Link
                                                        to={getFilterUrl({ min: p.min, max: p.max })}
                                                        className={
                                                            `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                                                        }
                                                    >
                                                        {p.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                        </div>
                    </div>
                    <div>
                        <div className="filter-box">
                            <div className="filter-name" onClick={toggleRatingBox}>
                                <h3>Por Avaliação</h3>
                            </div>
                            {isRatingBoxOpened && (
                                <div className="filter-content">
                                    <ul>
                                        {ratings.map((r) => (
                                            <li key={r.name}>
                                                <Link
                                                    to={getFilterUrl({ rating: r.rating })}
                                                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                                                >
                                                    <Rating caption={' ou mais'} rating={r.rating}></Rating>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            {products.length === 0 && (
                                <MessageBox>Nenhum produto encontrado.</MessageBox>
                            )}
                            <div className="row center">
                                {products.map((product) => (
                                    <Product key={product._id} product={product}></Product>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}