import Style from './Home.module.css';
import SimpleImageSlider from "react-simple-image-slider";

function Home() {
    const img2 = [
        { url: 'https://municipal.com/cdn/shop/files/1080x1920_bundles.jpg?v=1668194571'},
        { url: 'https://44ideas.co.uk/cdn/shop/products/New-Man_1200x1200.jpg?v=1588584753'},
        { url: 'https://i.etsystatic.com/10486798/r/il/8760c0/3869009120/il_570xN.3869009120_l7zy.jpg'},
    ];

    return (
        <div className={Style.Home}>
            <SimpleImageSlider
                width={'100%'}
                height={504}
                images={img2}
                showBullets={true}
                showNavs={true}
            />
        </div>
    )
}

export default Home;