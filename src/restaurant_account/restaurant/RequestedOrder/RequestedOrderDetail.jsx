import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000';
import api from '../../../api';

function RequestedOrderDetail() {
    const { restaurant_name, order_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);
    const [foodInOrder, setFoodInOrder] = useState([]);
    const [selectedFood, setSelectedFood] = useState('');

    async function fetchRestaurant(restaurant_name) {
        try {
            const restaurant_response = await api.get(`${BASE_URL}/restaurant/show_restaurant_detail_by_name/${restaurant_name}`);
            if (restaurant_response.data) {
                setRestaurantDetail(restaurant_response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    async function fetchOrderDetail(order_id) {
        try {
            const order_response = await api.get(`${BASE_URL}/show_order_detail/${order_id}`);
            setOrderDetail(order_response.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    async function fetchFoodInOrder(order_id) {
        try {
            const food_response = await api.get(`${BASE_URL}/restaurant/show_food_in_order/${order_id}`);
            if (food_response.data) {
                setFoodInOrder(food_response.data[order_id]);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fetchRestaurant(restaurant_name);
    }, [restaurant_name]);

    useEffect(() => {
        fetchOrderDetail(order_id);
        fetchFoodInOrder(order_id);
    }, [order_id]);

    function handleFoodChange(event) {
        setSelectedFood(event.target.value);
    }

    return (
        <div>
            <h1>RequestedOrderDetail</h1>
            {orderDetail && (
                <div className="OrderDetail">
                    <p>Order ID: {order_id}</p>
                    <p>Customer: {orderDetail.Customer}</p>
                    <p>Rider: {orderDetail.Rider}</p>
                    <p>Restaurant: {orderDetail.Restaurant}</p>
                    <p>Order State: {orderDetail.Order_State}</p>
                    <p>Payment: {orderDetail.Payment}</p>
                    <p>Food:</p>
                    <select value={selectedFood} onChange={handleFoodChange}>
                        <option value="">Select Food</option>
                        {foodInOrder.map((food, index) => (
                            <option key={index} value={food.food_id}>
                                {food.food_name} - ${food.food_price}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default RequestedOrderDetail;
