import { useQuery } from '@apollo/client';

import GroupList from '../components/GroupList';

import { GET_GROUPS, GET_USERS } from '../utils/queries';

const Groups = () => {
  
  // const { loading, groupData } = useQuery(GET_GROUPS);
  const { loading2, userData } = useQuery(GET_USERS);

  const groups = [];
  const users = userData?.users || [];

  
    return (
        <div>
          <div>
            {loading2 ? (
              <div>Loading...</div>
            ) : (
              <GroupList
                groups={groups}
                users={users}
            />
          )}
          </div>
        </div>
    );
  };
export default Groups;