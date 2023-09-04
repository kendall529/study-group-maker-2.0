import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ActiveUsersList from '../components/ActiveUsersList';

// import logo from '../assets/'
import '../styling/Dashboard.css';
import '../App.css';


const Dashboard = () => {
    const location = useLocation();
    const username = useSelector((state) => state.dashboard.user_name); // Get the username from the Redux state
  
    const handleUserLeaving = () => {
      if (location.pathname !== '/Dashboard') {
        console.log("handleUserLeaving called", username); // Debug
        console.log("emitting user-leaving-dashboard", username); // Debug
        socket.emit('user-leaving-dashboard', { user_name: username });
      }
    };
  
    useEffect(() => {
      // Register event to be fired when user closes the window
      window.addEventListener('beforeunload', handleUserLeaving);
  
      // Cleanup function
      return () => {
        console.log("useEffect cleanup called"); // Debug
        handleUserLeaving(); // Emit event when user navigates away or component is unmounted
        window.removeEventListener('beforeunload', handleUserLeaving); // Remove the event listener
      };
    }, [location, username]); // dependency array

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
};

export default Dashboard;