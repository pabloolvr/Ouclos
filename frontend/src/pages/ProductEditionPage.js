import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../node_modules/axios/index';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditionPage(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [gender, setGender] = useState('');
    const [lensMaterial, setLensMaterial] = useState('');
    const [frameMaterial, setFrameMaterial] = useState('');
    const [style, setStyle] = useState('');
    const [lensColor, setLensColor] = useState('');
    const [frameColor, setFrameColor] = useState('');
    const [lensProtection, setLensProtection] = useState('');
    const [description, setDescription] = useState('');
    // use redux store to get productDetails
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    // change productUpdate in redux store
    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        // if updated succesfully, reload page
        if (successUpdate) {
            props.history.push('/productlist');
        }
        if (!product || product._id !== productId || successUpdate) {
            // if product does not exist or productId is not the desired, reload page
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        } else { // set product values on form
            setName(product.name);
            setImage(product.image);
            setQuantity(product.quantity);
            setCategory(product.category);
            setPrice(product.price);
            setGender(product.gender);
            setLensMaterial(product.lensMaterial);
            setFrameMaterial(product.frameMaterial);
            setStyle(product.style);
            setLensColor(product.lensColor);
            setFrameColor(product.frameColor);
            setLensProtection(product.lensProtection);
            setDescription(product.description);
        }
    }, [product, dispatch, productId, successUpdate, props.history]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                image,
                quantity,
                category,
                price,
                gender,
                lensMaterial,
                frameMaterial,
                style,
                lensColor,
                frameColor,
                lensProtection,
                description,
            })
        )
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    // get user information form redux store
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        // make ajax request to upload file
        try {
            const { data } = await axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Alterar Dados do Produto {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Nome Único do produto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="price">Preço</label>
                            <input
                                id="price"
                                type="text"
                                placeholder="Ex: 129.99"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="image">Imagem</label>
                            <input
                                id="image"
                                type="text"
                                placeholder="Enter image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="imageFile">Arquivo de Imagem</label>
                            <input
                                type="file"
                                id="imageFile"
                                label="Choose Image"
                                onChange={uploadFileHandler}
                            ></input>
                            {loadingUpload && <LoadingBox></LoadingBox>}
                            {errorUpload && (
                                <MessageBox variant="danger">{errorUpload}</MessageBox>
                            )}
                        </div>
                        <div>
                            <label htmlFor="quantity">Quantidade no Estoque</label>
                            <input
                                id="quantity"
                                type="text"
                                placeholder="Quantidade no Estoque"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="category">Categoria</label>
                            <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="" >Não definido</option>
                                <option value="Óculos de Sol">Óculos de Sol</option>
                                <option value="Óculos de Grau">Óculos de Grau</option>
                                <option value="Óculos de Computador">Óculos de Computador</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gender">Gênero</label>
                            <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="" >Não definido</option>
                                <option value="Unissex">Unissex</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="style">Estilo</label>
                            <input
                                id="style"
                                type="text"
                                placeholder="Estilo do Óculos"
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="lensMaterial">Material da Lente</label>
                            <input
                                id="lensMaterial"
                                type="text"
                                placeholder="Óculos de Sol, Óculos de Grau ou Óculos de Computador"
                                value={lensMaterial}
                                onChange={(e) => setLensMaterial(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="frameMaterial">Material da Lente</label>
                            <input
                                id="frameMaterial"
                                type="text"
                                placeholder="Material da Lente"
                                value={frameMaterial}
                                onChange={(e) => setFrameMaterial(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="lensColor">Cor da Lente</label>
                            <input
                                id="lensColor"
                                type="text"
                                placeholder="Cor da Lente"
                                value={lensColor}
                                onChange={(e) => setLensColor(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="frameColor">Cor da Armação</label>
                            <input
                                id="frameColor"
                                type="text"
                                placeholder="Cor da Armação"
                                value={frameColor}
                                onChange={(e) => setFrameColor(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="lensProtection">Proteção da Lente</label>
                            <input
                                id="lensProtection"
                                type="text"
                                placeholder="Proteção da Lente"
                                value={lensProtection}
                                onChange={(e) => setLensProtection(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="description">Descrição</label>
                            <textarea
                                id="description"
                                rows="3"
                                type="text"
                                placeholder="Descrição do produto"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                Atualizar
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}