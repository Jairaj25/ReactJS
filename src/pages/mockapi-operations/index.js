
import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateCurrentPage, fetchUser, createUser, updateUser, deleteUser } from '../../redux/actions/mock-api-action';
import searchIcon from "../../assets/search-icon.svg";
import "./index.css";
import { UserCard } from '../../components/user-list-cards';
export const MockApiOperationsPage = () => {
    const dispatch = useDispatch();
    const { loading, users, error, currentPage, usersPerPage } = useSelector((state) => state.mockApi);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [searchedUserId, setSearchedUserId] = useState(null);
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
    const totalUsers = users.length;
    const lastPage = (totalUsers / usersPerPage).toFixed(0);
    var currentUsers = users;

    const renderUserRange = () => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const upperBound = Math.min(indexOfLastUser, totalUsers);
        const lowerBound = Math.min(indexOfFirstUser + 1, totalUsers);

        return `Showing ${lowerBound}-${upperBound} out of ${totalUsers}`;
    };

    if (Array.isArray(users)) {
        currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    }

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(totalUsers / usersPerPage)) {
            dispatch(updateCurrentPage(pageNumber));
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
        setIsEditModalOpen(false)
    };

    const handleInputChange = (event) => {
        setSearchedUserId(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchUser(searchedUserId));
    };

    const handleCreateUserModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateUserSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(formData))
        setFormData({
            name: '',
            description: '',
            vehicle: ''
        });
    };

    return (
        <div>
            <form className="mock-search-container" onSubmit={handleSearchSubmit}>
                <input className="mock-search-input" placeholder='Enter ID' value={searchedUserId || ""} onChange={handleInputChange} />
                <button className="mock-search-submit-button" type="submit">
                    <img src={searchIcon} alt="Search" width={18} height={18} />
                </button>
            </form>
            <div className="explore-user-list-container">
                <div>
                    <h2>Mock API CRUD Operations</h2>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : Array.isArray(users) ? (
                    <>
                        <div className='alignself-baseline'><p>{renderUserRange()}</p></div>
                        <div className="explore-user-list-wrapper">
                            {currentUsers.map((user) => (
                                <UserCard
                                    key={user.id}
                                    user={user}
                                    onUpdateUser={handleUpdateUser}
                                    onDeleteUser={handleDeleteUser}
                                />
                            ))}
                        </div>
                        <div className="explore-users-pagination-wrapper">
                            <button className={currentPage === 1 ? ("disable-btn") : ("")} onClick={() => paginate(currentPage - 1)}>&lt;&nbsp;&nbsp;Previous</button>
                            <div className='pagination-current-page'><p>{currentPage}</p></div>
                            <button className={currentPage.toString() === lastPage ? ("disable-btn") : ("")} onClick={() => paginate(currentPage + 1)}>Next&nbsp;&nbsp;&gt;</button>
                        </div>
                    </>
                ) : (
                    <>
                        <UserCard
                            key={users.id}
                            user={users}
                            onUpdateUser={handleUpdateUser}
                            onDeleteUser={handleDeleteUser}
                        />

                        <p className='pointer-cursor' onClick={() => { dispatch(fetchUsers()); }}>Click to show all</p>
                    </>
                )}
            </div>

            <div className="add-user-prompt" onClick={handleCreateUserModal}><p>Click to add user</p></div>

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
                    <button className="edit-users-modal-close" onClick={() => {
                        setIsEditModalOpen(false);
                        setFormData({
                            name: '',
                            description: '',
                            vehicle: ''
                        })
                    }}>Close</button>
                </div>
            </ReactModal>

            <ReactModal className="delete-user-modal" isOpen={isDeleteModalOpen}>
                <div className="delete-user-container">
                    <p>Are you sure you want to delete this user?</p>
                    <div className="delete-user-buttons">
                        <div className="delete-user-submit-btn">
                            <button onClick={() => handleConfirmDelete()}>Yes</button>
                        </div>
                        <div className="delete-user-submit-btn">
                            <button onClick={() => setIsDeleteModalOpen(false)}>No</button>
                        </div>
                    </div>
                </div>
            </ReactModal>

            <ReactModal className="edit-users-modal" isOpen={isCreateModalOpen}>
                <div className="edit-users-container">
                    <form className="edit-users-form" onSubmit={handleCreateUserSubmit}>
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
                    <button className="edit-users-modal-close" onClick={() => {
                        setIsCreateModalOpen(false);
                        setFormData({
                            name: '',
                            description: '',
                            vehicle: ''
                        })
                    }}>Close</button>
                </div>
            </ReactModal >
        </div >
    );
};