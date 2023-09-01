import { useQuery } from '@apollo/client';

import GroupList from '../components/GroupList';

import { GET_GROUPS } from '../utils/queries';

const Groups = () => {
  
  const { loading, data } = useQuery(GET_GROUPS);

  const groups = data?.getGroups || [];

  console.log(groups);

    return (
        <div>
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <GroupList
                groups={groups}
            />
          )}
          </div>
        </div>
    );
  };
export default Groups;