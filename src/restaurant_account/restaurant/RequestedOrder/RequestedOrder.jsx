import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './RequestedOrder.css';

const BASE_URL = 'http://127.0.0.1:8000';

function RequestedOrder() {
    const { restaurant_name } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null); // กำหนดค่าเริ่มต้นเป็น null
    const [requestedOrderList, setRequestedOrderList] = useState([]);
    async function fetchRestaurant(restaurant_name) {
        try {
            const restaurant_response = await axios.get(`${BASE_URL}/show_restaurant_detail/${restaurant_name}`);
            if (restaurant_response.data) {
                setRestaurantDetail(restaurant_response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }
    async function fetchRequestedOrderList(restaurantDetail) {
        try {
            const requested_order_response = await axios.get(`${BASE_URL}/show_requested_order_list_in_restaurant/${restaurantDetail.Restaurant_ID}`);
            if (requested_order_response.data) {
                setRequestedOrderList(requested_order_response.data);
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
            fetchRequestedOrderList(restaurantDetail);
        }
    }, [restaurantDetail]);

    return (
        <>
            <div className='restaurant-container'>
                {restaurantDetail && ( // เช็คว่ามีค่าข้อมูลร้านอาหารหรือไม่ก่อนที่จะแสดงผล
                    <>
                        <p>Restaurant Name: {restaurantDetail.Restaurant_Name}</p>
                    </>
                )}
            </div>
            <div>
                <h2>Requested Orders:</h2>
                {requestedOrderList[restaurant_name] && requestedOrderList[restaurant_name].map(order => (
                    <button className='order-button' key={order.Order_ID}>
                        <p>Order ID: {order.Order_ID}</p>
                        <p>Customer: {order.Customer}</p>
                        <p>Rider: {order.Rider}</p>
                        <p>Restaurant: {order.Restaurant}</p>
                        <p>Food: {order.Food.join(', ')}</p>
                        <p>Order State: {order.Order_State}</p>
                        <p>Payment: {order.Payment}</p>
                    </button>
                    
                ))}
            </div>
        </>
    )
}

export default RequestedOrder;