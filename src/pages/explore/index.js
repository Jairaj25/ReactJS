import "./index.css";
import LocationPinSvg from "../../components/common/SVGs/locationicon";
import { foodCategories } from "../../sample-data/foodcategories";
import { FoodCategoryCards } from "../../components/food-category-cards/index";
import { FoodListCards } from "../../components/food-list-cards/index";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/product-actions';
import { addToCart } from '../../redux/reducers/cartreducer';
import { fetchUsers, updateCurrentPage } from '../../redux/actions/mock-api-action';
import { Link } from 'react-router-dom';

export const ExplorePage = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const { loading, users, error, currentPage, usersPerPage } = useSelector((state) => state.mockApi);

    const temp = useSelector((state) => state.mockApi);
    console.log(temp);
    
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalUsers = users.length;
    const lastPage = (totalUsers / usersPerPage).toFixed(0);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(totalUsers / usersPerPage)) {
            dispatch(updateCurrentPage(pageNumber));
        }
    };
    const renderUserRange = () => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const upperBound = Math.min(indexOfLastUser, totalUsers);
        const lowerBound = Math.min(indexOfFirstUser + 1, totalUsers);

        return `Showing ${lowerBound}-${upperBound} out of ${totalUsers}`;
    };

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
            <div className="explore-user-list-container">
                <div>
                    <h2>Mock Api Data</h2>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        <div className='alignself-baseline'><p>{renderUserRange()}</p></div>
                        <div className="explore-user-list-wrapper">
                            {currentUsers.map((user) => (
                                <div className="explore-user-list-cards" key={user.id}>
                                    <div className="user-list-image">
                                        <img src={user.avatar} alt={user.name} />
                                    </div>
                                    <div className="user-list-text">
                                        <div className="user-list-name-desc">
                                            <div className="user-list-name">
                                                <p>{user.name}</p>
                                            </div>
                                            <div className="user-list-description">
                                                <p>{user.description.length > 70 ? `${user.description.substring(0, 50)}...` : user.description}</p>
                                            </div>
                                        </div>
                                        <div className="user-list-vehicle">
                                            <p>{user.vehicle}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="explore-users-pagination-wrapper">
                            <button className={currentPage === 1 ? ("disable-btn") : ("")} onClick={() => paginate(currentPage - 1)}>&lt;&nbsp;&nbsp;Previous</button>
                            <div className='pagination-current-page'><p>{currentPage}</p></div>
                            <button className={currentPage.toString() === lastPage ? ("disable-btn") : ("")} onClick={() => paginate(currentPage + 1)}>Next&nbsp;&nbsp;&gt;</button>
                        </div>
                    </>
                )}
                <div>
                    <h3><Link to="/users">Click to perform CRUD Operations</Link></h3>
                </div>
            </div>
        </div>
    )
}