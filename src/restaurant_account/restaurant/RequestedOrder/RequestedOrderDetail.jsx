import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import api from '../../../api';


const BASE_URL = 'http://127.0.0.1:8000';

function RequestedOrderDetail() {
    const { restaurant_name, order_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);
    const [foodInOrder, setFoodInOrder] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [confirmCancel, setConfirmCancel] = useState(false);

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
        fetchOrderDetail(order_id);
        fetchFoodInOrder(order_id);
    }, [order_id]);

    function handleFoodSelect(event) {
        setSelectedFood(event.target.value);
        setConfirmCancel(true); // ระบุว่ามีการเลือกอาหารแล้ว
    }

    async function handleCancel() {
        try {
            await api.post(`${BASE_URL}/cancel_by_restaurant/${restaurantDetail.Restaurant_ID}/${order_id}/${selectedFood}`);
        } catch (error) {
            console.log('error', error);
        }
    }

    console.log(selectedFood);
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
                    <ul>
                        {foodInOrder.map((food, index) => {
                            if (index === 0 || food.food_name !== foodInOrder[index - 1].food_name) {
                                return (
                                    <li key={index}>
                                        <label>
                                            <input type="radio" value={food.food_name} onChange={handleFoodSelect} checked={selectedFood === food.food_name} />
                                            {food.food_name} - ${food.food_price} ({countSameFood(food.food_name)})
                                        </label>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                    {confirmCancel && (
                        <div>
                            <Link to={`/${restaurant_name}/requested_order/`}>
                                <button onClick={handleCancel}>Cancel</button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    function countSameFood(foodName) {
        let count = 0;
        foodInOrder.forEach(food => {
            if (food.food_name === foodName) {
                count++;
            }
        });
        return count;
    }
}

export default RequestedOrderDetail;
