import Style from './Navbar.module.css';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import phone from '../../assets/phone.png';
import React, { useEffect, useState } from 'react';

function Navbar() {
    const [info, setInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://script.google.com/macros/s/AKfycbwl5aVJVlpajrS4e1DhHYzK5GtG8-l7PCmLCHrbEnUnRhY93wf_q-ZBvH2lCZOhDiek6A/exec");
                const json = await res.json();

                if (json?.data && Array.isArray(json.data.slides) && Array.isArray(json.data.infos)) {
                    const foundProduct = json.data.infos[0];
                    if (foundProduct) {
                        setInfo(foundProduct);
                    } else {
                        console.error('Product not found in infos array');
                    }
                } else {
                    console.error('Unexpected data format', json);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return "";
        return `+${phoneNumber}`;
    };
    
    return (
        <div className={Style.navbar}>
            <div className={Style.homeLink}>
                <a href="/"><img className={Style.logo} src={info.brandImage} /></a>
                <h2>{info.brandName}</h2>
            </div>
            <div className={Style.socialLink}>
                <a href={info.facebook || "#"}><img className={Style.socialLogo} src={facebook} alt="Facebook" /></a>
                <a href={info.instagram || "#"}><img className={Style.socialLogo} src={instagram} alt="Instagram" /></a>
                <a href={`tel:${formatPhoneNumber(info.phone)}`}><img className={Style.socialLogo} src={phone} alt="phone" /></a>
            </div>
        </div>
    )
}

export default Navbar;
