import { useQuery } from '@apollo/client';

import GroupList from '../components/GroupList';

import { GET_GROUPS, GET_USER } from '../utils/queries';

const Groups = () => {
  
  const getGroupResults = useQuery(GET_GROUPS);

  const getUserResults = useQuery(GET_USER);

  const groups = getGroupResults.data?.getGroups || [];

  const user = getUserResults.data?.getUser || [];

  console.log(groups);

    return (
        <div>
          <div>
            {getUserResults.loading || getGroupResults.loading ? (
              <div>Loading...</div>
            ) : (
              <GroupList
                groups={groups}
                user = {user}
            />
          )}
          </div>
        </div>
    );
  };
export default Groups;