import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

function HistoryOrder() {
    const { restaurant_name } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null); // กำหนดค่าเริ่มต้นเป็น null

    useEffect(() => {
        async function fetchRestaurant(restaurant_name) {
            try {
                const restaurnat_response = await axios.get(`${BASE_URL}/show_restaurant_detail/${restaurant_name}`);
                if (restaurnat_response.data) {
                    setRestaurantDetail(restaurnat_response.data);
                }
                
            } catch (error) {
                console.log('error', error);
            }
        }

        
        
        fetchRestaurant(restaurant_name);
    }, [restaurant_name]);
    return (
        <div className='restaurant-container'>
                {restaurantDetail && ( // เช็คว่ามีค่าข้อมูลร้านอาหารหรือไม่ก่อนที่จะแสดงผล
                    <>
                        <p>Restaurant Name: {restaurantDetail.Restaurant_Name}</p>
                    </>
                )}
            </div>
    );
}

export default HistoryOrder;