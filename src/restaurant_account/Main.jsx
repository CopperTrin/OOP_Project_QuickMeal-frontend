import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosHeaders } from 'axios';
import './Main.css';
import api from '../api';

const BASE_URL = 'http://127.0.0.1:8000';

function RestaurantAccount() {
    const { account_id } = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [profile, setProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        try {
            setIsLoading(true)
            const restaurant_response = await api.get(`${BASE_URL}/restaurant_account/${account_id}`);
            if (restaurant_response.data[account_id]) {
                setRestaurants(restaurant_response.data[account_id]);
            }
            const profile_response = await api.get(`${BASE_URL}/show/profile/${account_id}`);
            if (profile_response.data) {
                setProfile(profile_response.data);
            }
        }
        catch (error) {
            console.log('error', error);
        }
        finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [account_id]);

    return (
        <>
            <div>
                <div className='profile-container'>
                    {profile && (
                        <div>
                            <h2>Profile Information</h2>
                            <p>Username: {profile.Username}</p>
                            <p>Fullname: {profile.Fullname}</p>
                            <p>Email: {profile.Email}</p>
                            <p>Phone: {profile.Phone}</p>
                            <Link to={`/${account_id}/pocket`}>
                                <button className="button">
                                    Pocket
                                </button>
                            </Link>
                            <button className="button">
                                Add Restaurant
                            </button>
                        </div>
                    )}
                </div>
                <div className="button-container">
                    {restaurants.length > 0 && (
                        <div>
                            <h2>Restaurants Information</h2>
                            {restaurants.map((restaurant, index) => (
                                <div className='restaurant-contain' key={index}>
                                    <Link to={`/${restaurant.Restaurant_Name}`} >
                                        <button>
                                            <h3>Name: {restaurant.Restaurant_Name}</h3>
                                            <p>Location: {restaurant.Restaurant_Location}</p>
                                            <p>Rate: {restaurant.Rate}</p>
                                        </button>
                                    </Link>
                                    <button className="delete-button">
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default RestaurantAccount;
