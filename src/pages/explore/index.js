import "./index.css";
import LocationPinSvg from "../../components/common/SVGs/locationicon";
import { foodCategories } from "../../sample-data/foodcategories";
import { FoodCategoryCards } from "../../components/food-category-cards/index";
import { FoodListCards } from "../../components/food-list-cards/index";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/product-actions';
import { addToCart } from '../../redux/reducers/cartreducer';
import { fetchUsers } from '../../redux/actions/mock-api-action';

export const ExplorePage = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const { loading, users, error } = useSelector((state) => state.mockApi);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);


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
                {products.map(product => (
                    <FoodListCards
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
            <div className="explore-food-list-wrapper">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div>
                        {users.map((user) => (
                            <div key={user.id}>
                                <h3>{user.name}</h3>
                                <p>{user.description}</p>
                                <img src={user.avatar} alt={user.name} />
                                <p>Vehicle: {user.vehicle}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}