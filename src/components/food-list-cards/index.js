import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../redux/reducers/cartreducer';
import "./index.css";

export const FoodListCards = ({ product, onAddToCart }) => {
    const { id, foodName, image, foodPrice, restaurant, category } = product;
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            foodName,
            price: foodPrice,
            quantity: 1,
            restaurant,
        };
        onAddToCart(cartItem);
        setAddedToCart(true);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            dispatch(updateQuantity({ id, increment: false }));
        } else if (quantity === 1) {
            setQuantity(0);
            dispatch(removeFromCart(id));
            setAddedToCart(false);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
        dispatch(updateQuantity({ id, increment: true }));
    };


    return (
        <div>
            <div className='food-list-grid-wrapper'>
                <div className='food-list-image'>
                    <img src={image} alt={foodName} />
                </div>
                <div className='food-list-name-action-wrapper'>
                    <div className='food-list-name'>
                        <p>{foodName}</p>
                    </div>
                    <div className="food-list-add-to-cart-button">
                        {addedToCart ?
                            (<div className="quantity-buttons">
                                <button onClick={handleDecreaseQuantity}>-</button>
                                <span>{quantity}</span>
                                <button onClick={handleIncreaseQuantity}>+</button>
                            </div>)
                            :
                            (<p onClick={handleAddToCart}>Add to Cart</p>)
                        }
                    </div>
                </div>
                <div className='food-list-price'>
                    <p>${foodPrice}</p> <p className='food-list-price-additional-text'> <span></span> {restaurant} <span></span> {category}</p>
                </div>
            </div>
        </div>
    );
}

