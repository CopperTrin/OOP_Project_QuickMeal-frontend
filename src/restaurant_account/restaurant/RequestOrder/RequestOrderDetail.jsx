import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './RequestOrderDetail.css'; // นำเข้าไฟล์ CSS
const BASE_URL = 'http://127.0.0.1:8000';
import api from '../../../api';

function RequestOrderDetail() {
    const { restaurant_name, order_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);
    const [isAccept, setIsAccept] = useState(false);

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
    async function fetchAccept(order_id) {
        try {
            const accept_response = await api.put(`${BASE_URL}/restaurant/${restaurantDetail.Restaurant_ID}/accept/${order_id}`);
            console.log(accept_response);
            if (accept_response.data) {
                window.location.reload();
                setIsAccept(true);
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
    }, [order_id]);


    return (
        <>
            <div>
                <h1>RequestOrderDetail</h1>
                {orderDetail && (
                    <div className="OrderDetail"> {/* ใช้ className เพื่อเรียกใช้งาน CSS */}
                        <p>Order ID: {order_id}</p>
                        <p>Customer: {orderDetail.Customer}</p>
                        <p>Rider: {orderDetail.Rider}</p>
                        <p>Restaurant: {orderDetail.Restaurant}</p>
                        <p>Food: {orderDetail.Food.join(', ')}</p>
                        <p>Order State: {orderDetail.Order_State}</p>
                        <p>Payment: {orderDetail.Payment}</p>
                    </div>
                )}
                <button
                    onClick={async () => {
                        await fetchAccept(order_id);
                        alert('Accept Success');
                    }} disabled={isAccept}
                >
                    Accept
                </button>
            </div>
        </>

    );
}

export default RequestOrderDetail;
