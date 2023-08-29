import GroupForm from '../components/GroupForm';
import UserGroups from '../components/UserGroups';

import { useQuery } from '@apollo/client';

import { QUERY_GROUPS, QUERY_USERS } from '../utils/queries';


const Profile = () => {

  const { loading, groupData } = useQuery(QUERY_GROUPS);
  const { loading2, userData } = useQuery(QUERY_USERS);


  const groups = groupData?.groups || [];
  const users = userData?.users || [];
  
    return (
        <div>
          <div>
            <UserGroups/>
            <GroupForm/>
          </div>
        </div>
    );
  };
  
export default Groups;feat