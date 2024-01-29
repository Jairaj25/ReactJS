import "./index.css";
import LocationPinSvg from "../../components/common/SVGs/locationicon";
import { foodCategories } from "../../sample-data/foodcategories";
import { foods } from "../../sample-data/foods";
import { FoodCategoryCards } from "../../components/food-category-cards/index";
import { FoodListCards } from "../../components/food-list-cards/index";

export const ExplorePage = () => {
    return (
        <div className="explore-main-container">
            <div className="explore-main-banner">
                <div className="explore-banner-content">
                    <div className="explore-banner-order-text-container">
                        <p>Order with</p>
                        <div className="explore-banner-order-text-logo"></div>
                    </div>
                    <p> We provide super-fast delivery or pick-up </p>
                    <div className="explore-banner-input-container">
                        <div className="explore-banner-input-wrapper">
                            <LocationPinSvg />
                            <input className="explore-banner-find-address-input" placeholder="Enter Delivery Address"></input>
                        </div>
                        <div className="explore-banner-find-address-button">Find</div>
                    </div>
                </div>
            </div>
            <div className="explore-food-category-wrapper">
                {foodCategories.map((category, index) => (
                    <FoodCategoryCards key={index} {...category} />
                ))}
            </div>
            <div className="explore-food-list-wrapper">

                {foods.map((food, index) => (
                    <FoodListCards key={index} {...food} />
                ))}
            </div>
        </div>
    )
}