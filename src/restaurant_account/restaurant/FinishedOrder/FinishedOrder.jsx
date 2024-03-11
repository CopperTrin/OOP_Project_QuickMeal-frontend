import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../../api';

const BASE_URL = 'http://127.0.0.1:8000';

function FinishedOrder() {
    const { restaurant_name } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null); // กำหนดค่าเริ่มต้นเป็น null
    const [finishedOrderList, setFinishedOrderList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    async function fetchRestaurant(restaurant_name) {
        try {
            setIsLoading(true)
            const restaurant_response = await api.get(`${BASE_URL}/restaurant/show_restaurant_detail_by_name/${restaurant_name}`);
            if (restaurant_response.data) {
                setRestaurantDetail(restaurant_response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
        finally {
            setIsLoading(false);
        }
    }
    async function fetchFinishedOrderList(restaurantDetail) {
        try {
            const finished_order_response = await api.get(`${BASE_URL}/restaurant/show_finished_order_list_in_restaurant/${restaurantDetail.Restaurant_ID}`);
            if (finished_order_response.data) {
                setFinishedOrderList(finished_order_response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }
    
    useEffect(() => {
        fetchRestaurant(restaurant_name);
    }, [restaurant_name]);
    
    useEffect(() => {
        if (restaurantDetail) {
            fetchFinishedOrderList(restaurantDetail);
        }
    }, [restaurantDetail]);

    return (
        <>
            <div className='restaurant-container'>
                {restaurantDetail && ( // เช็คว่ามีค่าข้อมูลร้านอาหารหรือไม่ก่อนที่จะแสดงผล
                    <>
                        <p>Restaurant Name: {restaurantDetail.Restaurant_Name}</p>
                        <p>Location: {restaurantDetail.Restaurant_Location}</p>
                        <p>Rate: {restaurantDetail.Rate}</p>
                    </>
                )}
            </div>
            <div>
                <h2>Requested Orders:</h2>
                {finishedOrderList[restaurant_name] && finishedOrderList[restaurant_name].map(order => (
                    <Link to={`/${restaurant_name}/finished_order/${order.Order_ID}`} key={order.Order_ID}>
                    <button className='order-button' key={order.Order_ID}>
                        <p>Order ID: {order.Order_ID}</p>
                        <p>Customer: {order.Customer}</p>
                        <p>Rider: {order.Rider}</p>
                        <p>Restaurant: {order.Restaurant}</p>
                        <p>Food: {order.Food.join(', ')}</p>
                        <p>Order State: {order.Order_State}</p>
                        <p>Payment: {order.Payment}</p>
                    </button>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default FinishedOrder;