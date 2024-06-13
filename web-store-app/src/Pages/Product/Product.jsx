import Style from './Product.module.css';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [info, setinfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://script.google.com/macros/s/AKfycbywk2ZhkrPgrsd2aKnortLX2s0OOUK4ZjQIUgUlCYcxUmKs1yc6Ui-t4CzqAgVTYv5Y/exec");
                const json = await res.json();

                if (json.data && Array.isArray(json.data.slides) && Array.isArray(json.data.products) && Array.isArray(json.data.infos)) {
                    const info = json.data.infos[0];
                    const foundProduct = json.data.products.find(product => product.id === id);
                    if (foundProduct && info) {
                        setProduct(foundProduct);
                        setImage(foundProduct.image1);
                        setSizes(foundProduct.size.split(','));
                        setColors(foundProduct.color.split(','));
                        setinfo(info);
                    } else {
                        console.error('Product not found');
                    }
                } else {
                    throw new Error('Unexpected data format');
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div className={Style.HomeLoading}>Loading...</div>;
    }

    if (!product) {
        return <div className={Style.HomeLoading}>Product not found</div>;
    }

    const changeImage = (img) => {
        setImage(img);
    }

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    }

    const handleColorClick = (color) => {
        setSelectedColor(color);
    }

    const increaseQuantity = () => {
        setSelectedQuantity(selectedQuantity + 1);
    }

    const decreaseQuantity = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity(selectedQuantity - 1);
        }
    }

    return (
        <div className={Style.product}>
            <div className={Style.imageContainer}>
                <div className={Style.images}>
                    <img src={product.image1} alt="product" onClick={() => changeImage(product.image1)} />
                    <img src={product.image2} alt="product" onClick={() => changeImage(product.image2)} />
                    <img src={product.image3} alt="product" onClick={() => changeImage(product.image3)} />
                </div>
                <img src={image} alt="product" />
            </div>
            <div className={Style.productInfo}>
                <div className={Style.productName}>{product.productName}</div>
                <div className={Style.productPrice}>{product.price} DH</div>
                <div className={Style.productDescription}>{product.descrption}</div>
                <br />
                <div className={Style.sizeSection}>
                    <div>Size:</div>
                    <div className={Style.productSize}>
                        {sizes.map((s, index) => (
                            <div
                                key={index}
                                className={`${selectedSize === s ? Style.selectedSize : ''}`}
                                onClick={() => handleSizeClick(s)}
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={Style.colorSection}>
                    <div>Color:</div>
                    <div className={Style.productColor}>
                        {colors.map((c, index) => (
                            <div
                                key={index}
                                className={`${selectedColor === c ? Style.selectedColor : ''}`}
                                style={{ backgroundColor: c }}
                                onClick={() => handleColorClick(c)}
                            >
                            </div>
                        ))}
                    </div>
                </div>
                <div className={Style.quantity}>
                    <div onClick={decreaseQuantity}>{`<`}</div>
                    <input type="text" value={selectedQuantity} onChange={(e) => setSelectedQuantity(e.target.value)} />
                    <div onClick={increaseQuantity}>{`>`}</div>
                </div>
                <div className={Style.orderWithWhatsapp}>
                    <button className={Style.whatsappBtn} onClick={() => window.open(`https://wa.me/${info.whatsapp}?text=I%20want%20to%20order%20${selectedQuantity}%20of%20${product.productName}%20in%20size%20${selectedSize}%20and%20color%20${selectedColor}%20(Product%20ID:%20${product.id})`)}> <img src="https://static.vecteezy.com/system/resources/previews/023/986/487/non_2x/whatsapp-logo-whatsapp-logo-transparent-whatsapp-icon-transparent-free-free-png.png" draggable="false" alt="" /> Order with WhatsApp</button>
                </div>
            </div>
        </div>
    );
}

export default Product;
