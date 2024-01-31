import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

export const FoodListCards = ({ foodName, image, foodPrice, restaurant, category }) => {
    return (
        <Link className='food-list-grid-wrapper' to={`/food/${encodeURIComponent(category)}/${encodeURIComponent(foodName)}`}>
            <div className='food-list-image'>
                <img src={image} alt={foodName} />
            </div>
            <div className='food-list-name'>
                <p>{foodName}</p>
            </div>
            <div className='food-list-price'>
                <p>${foodPrice}</p> <p className='food-list-price-additional-text'> <span></span> {restaurant} <span></span> {category}</p>
            </div>
        </Link>
    );
}

