import * as dashboardActions from '../actions/dashboardActions';

const initState= {
    username: '',
    activeUsers: []
};

const reducer = (state = initState, action) => {
    console.log('reducer action:>> ', action);
    switch (action.type) {
        case dashboardActions.DASHBOARD_SET_USERNAME:
            return {
                ...state,
                username: action.username
            };
        case dashboardActions.DASHBOARD_SET_ACTIVE_USERS:
            console.log('updating active users in reducer :>> ', action.activeUsers);
            return {
                ...state,
                activeUsers: action.activeUsers
            }
            default:
                return state;
    }
};

export default reducer;