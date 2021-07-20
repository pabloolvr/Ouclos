import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductEditPage(props) {
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

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!product || product._id !== productId) {
            dispatch(detailsProduct(productId));
        } else {
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
    }, [product, dispatch, productId]);
    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: dispatch update product
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Alterar Produto {productId}</h1>
                </div>
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
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="price">Preço</label>
                            <input
                                id="price"
                                type="text"
                                placeholder="Enter price"
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
                            <label htmlFor="quantity">Quantidade no Estoque</label>
                            <input
                                id="quantity"
                                type="text"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="category">Categoria</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Óculos de Sol, Óculos de Grau ou Óculos de Computador"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
                            <input
                                id="gender"
                                type="text"
                                placeholder="Masculino, Feminino ou Unissex"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            ></input>
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
                                Update
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}