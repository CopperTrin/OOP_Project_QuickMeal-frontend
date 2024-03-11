import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosHeaders } from 'axios';
import Cookies from 'js-cookie';
import './Restaurant.css';
import api from '../../api/api';

const BASE_URL = 'http://127.0.0.1:8000';

function Restaurant() {
    const { restaurant_name } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null); // กำหนดค่าเริ่มต้นเป็น null
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchRestaurant(restaurant_name) {
            try {
                setIsLoading(true);
                const response = await api.get(`http://127.0.0.1:8000/restaurant/show_restaurant_detail_by_name/${restaurant_name}`);
                setRestaurantDetail(response.data);
            } catch (error) {
                console.log('error', error);
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchRestaurant(restaurant_name);
    }, [restaurant_name]);
    console.log(restaurantDetail);
    return (
        <>
            {isLoading && (<p className="border border-gray-200 p-10 rounded-md bg-white flex flex-col justify-center items-centertext-2xl font-bold mb-1">Loading..</p>)}
            {!isLoading &&
                <div>
                    <div className='restaurant-container'>
                        <h2>Restaurant Information</h2>
                        {restaurantDetail && ( // เช็คว่ามีค่าข้อมูลร้านอาหารหรือไม่ก่อนที่จะแสดงผล
                            <>
                                <p>Restaurant Name: {restaurantDetail.Restaurant_Name}</p>
                                <p>Location: {restaurantDetail.Restaurant_Location}</p>
                                <p>Rate: {restaurantDetail.Rate}</p>
                            </>
                        )}
                    </div>
                    <div className='button-container'>
                        <Link to={`/${restaurant_name}/request_order`}>
                            <button>
                                Request Order
                            </button>
                        </Link>
                        <br />
                        <Link to={`/${restaurant_name}/requested_order`}>
                            <button>
                                Requested Order
                            </button>
                        </Link>
                        <br />
                        <Link to={`/${restaurant_name}/menu`}>
                            <button>
                                Menu
                            </button>
                        </Link>
                        <br />
                        <Link to={`/${restaurant_name}/finished_order`}>
                            <button>
                                History
                            </button>
                        </Link>
                    </div>
                </div>
            }
        </>
    );
}

export default Restaurant;
