
export const DASHBOARD_SET_USERNAME = 'DASHBOARD.SET_USERNAME';
export const DASHBOARD_SET_ACTIVE_USERS = 'DASHBOARD.SET_ACTIVE_USERS';


export const setUsername = (user_name) => {
    return {
        type: DASHBOARD_SET_USERNAME,
        user_name
    }
};

export const setActiveUsers = (activeUsers) => {
    return {
        type: DASHBOARD_SET_ACTIVE_USERS, 
        activeUsers
    }
}