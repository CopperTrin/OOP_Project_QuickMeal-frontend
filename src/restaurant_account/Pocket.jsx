import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosHeaders } from 'axios';
import api from '../api';

const BASE_URL = 'http://127.0.0.1:8000';

function Pocket() {
    return (
        <div>
            <h1>Pocket</h1>
        </div>
    );
}

export default Pocket;