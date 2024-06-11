import React, { useEffect, useState } from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import CardProduct from '../../Components/CardProduct/CardProduct';
import Style from './Home.module.css';

function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('all');
    const [productType, setProductType] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://script.google.com/macros/s/AKfycbzvLOAgWSMUmV72ydr_4nv1DZXdRbOrAnZL2ZaHDW0-K9TDQnIjUa4cyE_FYSoUHXzE/exec");
                const json = await res.json();

                if (json.data && Array.isArray(json.data.slides) && Array.isArray(json.data.products)) {
                    setSlides(json.data.slides.filter(slide => slide.url !== ''));
                    setAllProducts(json.data.products.filter(product => product.productName !== ''));
                    setProducts(json.data.products.filter(product => product.productName !== ''));
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
    }, []);

    useEffect(() => {
        const filteredProducts = allProducts.filter(product => {
            return (category === 'all' || product.categore === category) && 
                   (productType === 'all' || product.productType === productType);
        });
        setProducts(filteredProducts);
    }, [category, productType, allProducts]);

    if (loading) {
        return <div className={Style.HomeLoading}>Loading...</div>;
    }

    const productTypes = [...new Set(allProducts.map(product => product.productType))];
    const categories = [...new Set(allProducts.map(product => product.categore))];

    const productPage = (id) => {
        window.location.href = `/product/${id}`;
    }
    return (
        <div className={Style.Home}>
            <SimpleImageSlider
                width={'100%'}
                height={504}
                images={slides}
                showBullets={true}
                showNavs={true}
                autoPlay={true}
            />
            <div className={Style.mainContent}>
                <div className={Style.productType}>
                    <button onClick={() => setProductType('all')}>All</button>
                    {productTypes.map((type, index) => (
                        <button key={index} onClick={() => setProductType(type)}>{type}</button>
                    ))}
                </div>
                <div className={Style.productContainer}>
                    <div className={Style.category}>
                        <button onClick={() => setCategory('all')}>All</button>
                        {categories.map((cat, index) => (
                            <button key={index} onClick={() => setCategory(cat)}>{cat}</button>
                        ))}
                    </div>
                    {products.length > 0 ? (
                        <dir className={Style.productList}>
                            {products.map((item, index) => (
                                <div className={Style.card} onClick={() => productPage(item.id)} key={index}><CardProduct productName={item.productName} price={item.price} image={item.image1} imageHover={item.image2}/></div>
                            ))}
                        </dir>
                    ) : (
                        <div className={Style.noProducts}>
                            <p>No products available :(</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
