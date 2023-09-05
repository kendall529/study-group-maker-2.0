import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ActiveUsersList from '../components/ActiveUsersList';
import * as webRTCHandler from '../utils/webRTC/webRTCHandle'
import DirectCall from '../components/DirectCall';

// import logo from '../assets/'
import '../styling/Dashboard.css';
import '../App.css';

const Dashboard = () => {

  
    useEffect(() => {
        webRTCHandler.getLocalStream();
    }, [])

    return (
        <div className='dashboard-container'>
            <div className='dashboard-left-section'>
                <div className='dashboard-content-container'>
                    <DirectCall />
                </div>
                <div className='dashboard-rooms-container secondary-background-color'>
                    rooms
                </div>
            </div>
            <div className='dashboard-right-section'>
                <div className='dashboard-active-users-list'>
                    <ActiveUsersList />
                </div>
                <div className='dashboard-logo-container'>
                    <img src="./src/assets/images/logo4.png" alt="..." />
                </div>
            </div>
        </div>
    )
};

export default Dashboard;