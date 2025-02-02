import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './RequestOrderDetail.css'; // นำเข้าไฟล์ CSS
const BASE_URL = 'http://127.0.0.1:8000';
import api from '../../../api/api';

function RequestOrderDetail() {
    const { restaurant_name, order_id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);

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
            if (accept_response.data) {
                alert('Accept Success')
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    async function fetchDeny(order_id) {
        try {
            const deny_response = await api.put(`${BASE_URL}/restaurant/${restaurantDetail.Restaurant_ID}/deny/${order_id}`);
            if (deny_response.data) {
                alert('Deny Success');
            }

        }
        catch (error) {
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
                <h1>RequestedOrderDetail</h1>
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
                {orderDetail && orderDetail.Order_State === 'get_res' && (
                    <Link to={`/${restaurant_name}`}>
                        <button
                            onClick={async () => {
                                await fetchDeny(order_id);
                            }}
                        >
                            Deny
                        </button>
                    </Link>
                )}
                {orderDetail && orderDetail.Order_State !== 'get_res' && (
                    <Link to={`/${restaurant_name}`}>
                        <button
                            onClick={async () => {
                                await fetchAccept(order_id);
                            }}
                        >
                            Accept
                        </button>
                    </Link>
                )}
            </div>
        </>

    );
}

export default RequestOrderDetail;
