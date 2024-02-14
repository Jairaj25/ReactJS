
import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, createUser, updateUser, deleteUser, fetchUsers, updateCurrentPage } from '../../redux/actions/mock-api-action';
import "./index.css";

export const MockApiOperationsPage = () => {
    const dispatch = useDispatch();
    const { loading, users, error, currentPage, usersPerPage } = useSelector((state) => state.mockApi);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        vehicle: ''
    });

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(users.length / usersPerPage)) {
            dispatch(updateCurrentPage(pageNumber));
        }
    };

    const getUser = async (userId) => {
        try {
            const response = await fetchUser(userId);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    // Create user
    const addUser = async (userData) => {
        try {
            const response = await createUser(userData);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const handleUpdateUser = (user) => {
        setFormData({
            name: user.name,
            description: user.description,
            vehicle: user.vehicle
        })
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteUser(selectedUser.id));
        setIsDeleteModalOpen(false);
        dispatch(fetchUsers());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(selectedUser.id, formData))
        setFormData({
            name: '',
            description: '',
            vehicle: ''
        });
        dispatch(fetchUsers());
        setIsEditModalOpen(false)
    };

    return (
        <div>
            <div> Search User - Search Bar</div>
            <div className="explore-user-list-container">
                <div>
                    <h2>Mock API CRUD Operations</h2>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        <div className="explore-user-list-wrapper">
                            {currentUsers.map((user) => (
                                <div className="explore-user-list-cards" key={user.id}>
                                    <div className="user-list-image">
                                        <img src={user.avatar} alt={user.name} />
                                    </div>
                                    <div className="user-list-text">
                                        <div className="user-list-info-wrapper">
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
                                        <div className="user-list-action">
                                            <button onClick={() => handleUpdateUser(user)}>Update</button>
                                            <button onClick={() => handleDeleteUser(user)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="explore-users-pagination-wrapper">
                            <button onClick={() => paginate(currentPage - 1)}>&lt;&nbsp;&nbsp;Previous</button>
                            <div>{currentPage}</div>
                            <button onClick={() => paginate(currentPage + 1)}>Next&nbsp;&nbsp;&gt;</button>
                        </div>
                    </>
                )}
            </div>

            <ReactModal className="edit-users-modal" isOpen={isEditModalOpen}>
                <div className="edit-users-container">
                    <form className="edit-users-form" onSubmit={handleSubmit}>
                        <div className="edit-user-input">
                            <label>Name:</label>
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="edit-user-input">
                            <label>Description:</label>
                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="edit-user-input">
                            <label>Vehicle:</label>
                            <input type="text" name="vehicle" placeholder="Vehicle" value={formData.vehicle} onChange={handleChange} />
                        </div>
                        <div className="edit-user-submit-btn">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    <button className="edit-users-modal-close" onClick={() => setIsEditModalOpen(false)}>Close</button>
                </div>
            </ReactModal>

            <ReactModal className="edit-users-modal" isOpen={isDeleteModalOpen}>
                <div className="edit-users-container">
                    <p>Are you sure you want to delete this user?</p>
                    <button onClick={() => handleConfirmDelete()}>Yes</button>
                    <button onClick={() => setIsDeleteModalOpen(false)}>No</button>
                </div>
            </ReactModal>
        </div>
    );
};
