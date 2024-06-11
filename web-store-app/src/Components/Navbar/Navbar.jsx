import Style from './Navbar.module.css';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';

function Navbar() {

    return (
        <div className={Style.navbar}>
            <div className={Style.homeLink}>
                <a href=""><img className={Style.logo} src="https://img.freepik.com/vecteurs-libre/symbole-anarchie-design-plat-dessine-main_23-2149244760.jpg?w=740&t=st=1718104181~exp=1718104781~hmac=9a85d4c5eed8e71f6486fe8c0974c54b300cbd8973e94225413aa02b7216a0d8" alt="" /></a>
                <h2>prandname</h2>
            </div>
            <div className={Style.socialLink}>
                <a href=""><img className={Style.socialLogo} src={facebook} alt="" /></a>
                <a href=""><img  className={Style.socialLogo} src={instagram} alt="" /></a>
            </div>
        </div>
    )
}

export default Navbar;