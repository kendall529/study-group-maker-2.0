import React from 'react';
import ActiveUsersList from '../components/ActiveUsersList';
// import logo from '../assets/'
import '../styling/Dashboard.css';
import '../App.css';

const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <div className='dashboard-left-section'>
                <div className='dashboard-content-container'>
                    content
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
                    <img src="..." alt="..." />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;