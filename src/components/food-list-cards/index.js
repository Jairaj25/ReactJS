import React, { useState } from 'react';
import "./index.css";

export const FoodListCards = ({ product, onAddToCart }) => {
    const { foodName, image, foodPrice, restaurant, category } = product;
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            foodName,
            price: foodPrice,
            quantity: 1,
            restaurant,
        };

        onAddToCart(cartItem);
        console.log('Item added to cart:', cartItem);
        setAddedToCart(true);
    };

    return (
        <div>
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
            <div className="food-list-add-to-cart-button" onClick={handleAddToCart}>
                {addedToCart ? <p>Added to Cart!</p> : <p>Add to Cart</p>}
            </div>
        </div>
    );
}

