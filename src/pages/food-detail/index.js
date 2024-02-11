import React from 'react';
import { useParams } from 'react-router-dom';
import { foods } from '../../sample-data/foods';

export const FoodDetailPage = () => {
  const { foodName } = useParams();

  const selectedFood = foods.find((food) => food.foodName === foodName);

  if (!selectedFood) {
    return <div>Food not found</div>;
  }

  const { image, foodPrice, restaurant, category } = selectedFood;

  return (
    <div>
      <h1>{foodName} Details</h1>
      <img src={image} alt={foodName} style={{ maxWidth: '100%' }} />
      <p>Price: ${foodPrice}</p>
      <p>Restaurant: {restaurant}</p>
      <p>Category: {category}</p>
    </div>
  );
};
