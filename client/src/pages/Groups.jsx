import { useQuery } from '@apollo/client';

import GroupList from '../components/GroupList';

//import { QUERY_GROUPS, QUERY_USERS } from '../utils/queries';

const Groups = () => {

  // const { loading, groupData } = useQuery(QUERY_GROUPS);
  // const { loading2, userData } = useQuery(QUERY_USERS);

  const groups = groupData?.groups || [];
  const users = userData?.users || [];

  
    return (
        <div>
          <div>
            {loading || loading2 ? (
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