import GroupForm from '../components/GroupForm';
import UserGroups from '../components/UserGroups';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_TOPICS, GET_USER } from '../utils/queries';

const Profile = () => {
  let { id } = useParams();

  const getUserResults = useQuery(GET_USER, {
    variables: { _id: id },
  });

   const getTopicResults = useQuery(GET_TOPICS);

  const users = getUserResults.data?.user || [];
  const topics = getTopicResults.data?.topics || [];
  
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