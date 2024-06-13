import style from './CardProduct.module.css';
import React, { useState } from 'react';

function CardProduct(props) {
    const [image, setImage] = useState(props.image);
    
    const changePicture = () => {
        setImage(props.imageHover);
    }
    const changePictureBack = () => {
        setImage(props.image);
    }


    return (
        <div onMouseEnter={changePicture} onMouseLeave={changePictureBack} className={style.CardProduct}>
            <div className={style.imgContainer}>
                <img src={image} alt={props.productName} />
            </div>
            <div className={style.productInfo}>
                <div className={style.productName}>{props.productName}</div>
                <div className={style.productPrice}>{props.price} DH</div>
            </div>
        </div>
    );
}

export default CardProduct;