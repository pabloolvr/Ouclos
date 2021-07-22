import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProductCategories, listProductFrameColors, listProductGenders, listProductLensColors, listProductLensMaterials, listProducts, listProductStyles } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

export default function SearchPage(props) {
    const { 
        name = 'all', 
        category = 'all',
        gender = 'all',
        lensMaterial = 'all',
        style = 'all',
        frameColor = 'all',
        lensColor = 'all',
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
    // get productStyleList from redux store
    const productStyleList = useSelector((state) => state.productStyleList);
    const {
        loading: loadingStyles,
        error: errorStyles,
        styles,
    } = productStyleList;
    // get productStyleList from redux store
    const productGenderList = useSelector((state) => state.productGenderList);
    const {
        loading: loadingGenders,
        error: errorGenders,
        genders,
    } = productGenderList;
    // get productLensMaterialList from redux store
    const productLensMaterialList = useSelector((state) => state.productLensMaterialList);
    const {
        loading: loadingLensMaterials,
        error: errorLensMaterials,
        lensMaterials,
    } = productLensMaterialList;
    // get productFrameColorList from redux store
    const productFrameColorList = useSelector((state) => state.productFrameColorList);
    const {
        loading: loadingFrameColors,
        error: errorFrameColors,
        frameColors,
    } = productFrameColorList;
    // get productLensColorList from redux store
    const productLensColorList = useSelector((state) => state.productLensColorList);
    const {
        loading: loadingLensColors,
        error: errorLensColors,
        lensColors,
    } = productLensColorList;
    // dispatch actions to get data from backend
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts({ // list products based on filter
            name: name !== 'all' ? name : '',
            category: category !== 'all' ? category : '',
            //
            gender: gender !== 'all' ? gender : '',
            lensMaterial: lensMaterial !== 'all' ? lensMaterial : '',
            style: style !== 'all' ? style : '',
            frameColor: frameColor !== 'all' ? frameColor : '',
            lensColor: lensColor !== 'all' ? lensColor : '',
            //
            min,
            max,
            rating,
            order,
        }));
        dispatch(listProductCategories());
        dispatch(listProductGenders());
        dispatch(listProductStyles());
        dispatch(listProductLensMaterials());
        dispatch(listProductFrameColors());
        dispatch(listProductLensColors());
    }, [dispatch, name, category, gender, lensMaterial, style, frameColor, lensColor, min, max, order, rating]);
    // filter url of search
    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        //
        const filterGender = filter.gender || gender;
        const filterLensMaterial = filter.lensMaterial || lensMaterial;
        const filterStyle = filter.style || style;
        const filterFrameColor = filter.frameColor || frameColor;
        const filterLensColor = filter.lensColor || lensColor;
        //
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        //return `/search/category/${filterCategory}/name/${filterName}/gender/${filterGender}/lensMaterial/${filterLensMaterial}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
        return `/search/category/${filterCategory}/name/${filterName}/gender/${filterGender}/lensMaterial/${filterLensMaterial}/style/${filterStyle}/frameColor/${filterFrameColor}/lensColor/${filterLensColor}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
    };
    // manage when gender filter box appears
    const [isGenderBoxOpened, setIsGenderBoxOpened] = useState(false);
    const toggleGenderBox = () => {
        setIsGenderBoxOpened(!isGenderBoxOpened);
    }
    // manage when style filter box appears
    const [isStyleBoxOpened, setIsStyleBoxOpened] = useState(false);
    const toggleStyleBox = () => {
        setIsStyleBoxOpened(!isStyleBoxOpened);
    }
    // manage when lens material filter box appears
    const [isLensMaterialBoxOpened, setIsLensMaterialBoxOpened] = useState(false);
    const toggleLensMaterialBox = () => {
        setIsLensMaterialBoxOpened(!isLensMaterialBoxOpened);
    }
    // manage when frame color filter box appears
    const [isFrameColorBoxOpened, setIsFrameColorBoxOpened] = useState(false);
    const toggleFrameColorBox = () => {
        setIsFrameColorBoxOpened(!isFrameColorBoxOpened);
    }
    // manage when lens color filter box appears
    const [isLensColorBoxOpened, setIsLensColorBoxOpened] = useState(false);
    const toggleLensColorBox = () => {
        setIsLensColorBoxOpened(!isLensColorBoxOpened);
    }
    // manage when price filter box appears
    const [isPriceBoxOpened, setIsPriceBoxOpened] = useState(false);
    const togglePriceBox = () => {
        setIsPriceBoxOpened(!isPriceBoxOpened);
    }
    // manage when rating filter box appears 
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
                    <h1>Filtrar</h1>
                    {/*
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
                                */}
                    <div>
                        {loadingGenders ? (
                            <LoadingBox></LoadingBox>
                        ) : errorGenders ? (
                            <MessageBox variant="danger">{errorGenders}</MessageBox>
                        ) : (
                            <div className="filter-box">
                                <div className="filter-name" onClick={toggleGenderBox}>
                                    <h3>Por Gênero</h3>
                                </div>
                                {isGenderBoxOpened && (
                                    <div className="filter-content">
                                        <ul>
                                            <li>
                                                <Link
                                                    className={'all' === gender ? 'active' : ''}
                                                    to={getFilterUrl({ gender: 'all' })}
                                                >
                                                    Todos
                                                </Link>
                                            </li>
                                            {genders.map((f) => (
                                                <li key={f}>
                                                    <Link
                                                        className={f === gender ? 'active' : ''}
                                                        to={getFilterUrl({ gender: f })}
                                                    >
                                                        {f}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        {loadingStyles ? (
                            <LoadingBox></LoadingBox>
                        ) : errorStyles ? (
                            <MessageBox variant="danger">{errorStyles}</MessageBox>
                        ) : (
                            <div className="filter-box">
                                <div className="filter-name" onClick={toggleStyleBox}>
                                    <h3>Por Estilo</h3>
                                </div>
                                {isStyleBoxOpened && (
                                    <div className="filter-content">
                                            <ul>
                                                <li>
                                                    <Link
                                                        className={'all' === style ? 'active' : ''}
                                                        to={getFilterUrl({ style: 'all' })}
                                                    >
                                                        Todos
                                                    </Link>
                                                </li>
                                                {styles.map((f) => (
                                                    <li key={f}>
                                                        <Link
                                                            className={f === style ? 'active' : ''}
                                                            to={getFilterUrl({ style: f })}
                                                        >
                                                            {f}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        {loadingLensMaterials ? (
                            <LoadingBox></LoadingBox>
                        ) : errorLensMaterials ? (
                            <MessageBox variant="danger">{errorLensMaterials}</MessageBox>
                        ) : (
                            <div className="filter-box">
                                <div className="filter-name" onClick={toggleLensMaterialBox}>
                                    <h3>Por Material da Lente</h3>
                                </div>
                                {isLensMaterialBoxOpened && (
                                    <div className="filter-content">
                                        <ul>
                                            <li>
                                                <Link
                                                    className={'all' === lensMaterial ? 'active' : ''}
                                                    to={getFilterUrl({ lensMaterial: 'all' })}
                                                >
                                                    Todos
                                                </Link>
                                            </li>
                                            {lensMaterials.map((f) => (
                                                <li key={f}>
                                                    <Link
                                                        className={f === lensMaterial ? 'active' : ''}
                                                        to={getFilterUrl({ lensMaterial: f })}
                                                    >
                                                        {f}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        {loadingFrameColors ? (
                            <LoadingBox></LoadingBox>
                        ) : errorFrameColors ? (
                            <MessageBox variant="danger">{errorFrameColors}</MessageBox>
                        ) : (
                            <div className="filter-box">
                                <div className="filter-name" onClick={toggleFrameColorBox}>
                                    <h3>Por Cor da Armação</h3>
                                </div>
                                {isFrameColorBoxOpened && (
                                    <div className="filter-content">
                                        <ul>
                                            <li>
                                                <Link
                                                    className={'all' === frameColor ? 'active' : ''}
                                                    to={getFilterUrl({ frameColor: 'all' })}
                                                >
                                                    Todos
                                                </Link>
                                            </li>
                                            {frameColors.map((f) => (
                                                <li key={f}>
                                                    <Link
                                                        className={f === frameColor ? 'active' : ''}
                                                        to={getFilterUrl({ frameColor: f })}
                                                    >
                                                        {f}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        {loadingLensColors ? (
                            <LoadingBox></LoadingBox>
                        ) : errorLensColors ? (
                            <MessageBox variant="danger">{errorLensColors}</MessageBox>
                        ) : (
                            <div className="filter-box">
                                <div className="filter-name" onClick={toggleLensColorBox}>
                                    <h3>Por Cor da Lente</h3>
                                </div>
                                {isLensColorBoxOpened && (
                                    <div className="filter-content">
                                        <ul>
                                            <li>
                                                <Link
                                                    className={'all' === lensColor ? 'active' : ''}
                                                    to={getFilterUrl({ lensColor: 'all' })}
                                                >
                                                    Todos
                                                </Link>
                                            </li>
                                            {lensColors.map((f) => (
                                                <li key={f}>
                                                    <Link
                                                        className={f === lensColor ? 'active' : ''}
                                                        to={getFilterUrl({ lensColor: f })}
                                                    >
                                                        {f}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
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