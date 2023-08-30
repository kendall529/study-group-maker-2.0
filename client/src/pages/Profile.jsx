import GroupForm from '../components/GroupForm';
import UserGroups from '../components/UserGroups';

import { useQuery } from '@apollo/client';

import { GET_TOPICS, GET_USER, GET_GROUPS } from '../utils/queries';

const Profile = () => {

   const { loading, userData } = useQuery(GET_USER);
   const { loading2, topicsData } = useQuery(GET_TOPICS);
   const { loading3, groupsData } = useQuery(GET_GROUPS);

  const users = userData?.user || [];
  const topics = topicsData?.topics || [];
  const groups = users.groups;
  
    return (
        <div>
          <div>
              {loading || loading2 ? (
              <div>Loading...</div>
            ) : (
              <div>
                <UserGroups
                users = {users}
                groups = {groups}
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