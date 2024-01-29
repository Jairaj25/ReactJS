import homeImage from "../assets/reactFoodImage.png";
import { Link } from 'react-router-dom';
import "../styles/homepage.css";
export const HomePage = () => {
    return (
        <div className="home-main-container">
            <div className="home-text-group">
                <div className="home-title">
                    Order Food the easy way
                </div>
                <div className="home-subtext">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                </div>
                <Link to='/explore' className="home-button-wrapper">
                    <p className="order-button">ORDER NOW</p>
                </Link>
            </div>
            <div className="home-image-group">
                <img src={homeImage} alt="Home Main" />
            </div>
        </div>
    )
}