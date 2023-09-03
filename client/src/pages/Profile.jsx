import GroupForm from '../components/GroupForm';
import UserGroups from '../components/UserGroups';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_TOPICS, GET_USER } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {


  const getUserResults = useQuery(GET_USER, {
    variables: {_id: "64efe03331931bb3f750e4e5"}});

  const getTopicResults = useQuery(GET_TOPICS);

  const users = getUserResults.data?.getUser || [];
  const topics = getTopicResults.data?.getTopics || [];
  
    return (
        <div>
          <div>
              {getUserResults.loading || getTopicResults.loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <UserGroups
                users = {users}
                />
                <GroupForm
                topics = {topics}
                user = {users}
                />
              </div>
            )}
          </div>
        </div>
    );
  };
  
export default Profile;