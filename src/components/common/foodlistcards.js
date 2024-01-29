import React from 'react';
import "../../styles/foodlistcards.css";

export const FoodListCards = ({ foodName, image, foodPrice, restaurant, category }) => {
    return (
        <div className='food-list-grid-wrapper'>
            <div className='food-list-image'>
                <img src={image} alt={foodName} />
            </div>
            <div className='food-list-name'>
                <p>{foodName}</p>
            </div>
            <div className='food-list-price'>
                <p>${foodPrice}</p> <p className='food-list-price-additional-text'> <span></span> {restaurant} <span></span> {category}</p>
            </div>
        </div>
    );
}

