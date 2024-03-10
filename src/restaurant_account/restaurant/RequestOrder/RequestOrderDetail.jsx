import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

function RequestOrderDetail() {
    const { order_id } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);

    async function fetchOrderDetail(order_id) {
        try {
            const order_response = await axios.get(`${BASE_URL}/show_order_detail/${order_id}`);
            setOrderDetail(order_response.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fetchOrderDetail(order_id);
    }, [order_id]);

    console.log(orderDetail);

    return (
        <>
            <div>
                <h1>RequestOrderDetail</h1>
                {orderDetail && (
                    <div className="Order Detail">
                        <p>Order ID: {order_id}</p>
                        <p>Customer: {orderDetail.Customer}</p>
                        <p>Rider: {orderDetail.Rider}</p>
                        <p>Restaurant: {orderDetail.Restaurant}</p>
                        <p>Food: {orderDetail.Food.join(', ')}</p>
                        <p>Order State: {orderDetail.Order_State}</p>
                        <p>Payment: {orderDetail.Payment}</p>
                    </div>
                )}
            </div>
        </>

    );
}

export default RequestOrderDetail;