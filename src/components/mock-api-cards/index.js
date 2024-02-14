import "./index.css";
import React from 'react';

export const mockApiCards = ({currentUsers}) => {
    return (
        <div className="explore-food-list-wrapper">
                {currentUsers.map((user) => (
                    <div key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.description}</p>
                        <img src={user.avatar} alt={user.name} />
                        <p>Vehicle: {user.vehicle}</p>
                    </div>
                ))}
        </div>
    )
}