import React from 'react';
import "./index.css";

export const FoodCategoryCards = ({ foodCategory, image }) => {
    return (
        <div className='category-cards-wrapper'>
            <img src={image} alt={foodCategory} width={22} height={22} />
            <p>{foodCategory}</p>
        </div>
    );
}

