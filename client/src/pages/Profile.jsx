import GroupForm from '../components/GroupForm';
import UserGroups from '../components/UserGroups';

import { useQuery } from '@apollo/client';

//import { QUERY_TOPICS, QUERY_SINGLE_USER, QUERY_ENROLLMENTS } from '../utils/queries';


const Profile = () => {

  //const { loading, userData } = useQuery(QUERY_SINGLE_USER);
  //const { loading2, enrollmentData } = useQuery(QUERY_ENROLLMENTS);
  //const { loading3, topicsData } = useQuery(QUERY_TOPICS);


 // const enrollments = enrollmentData?.enrollments || [];
  //const users = userData?.user || [];
  //const topics = topicsData?.topics || [];
  
    return (
        <div>
          <div>
            {/*
              {loading || loading2 || loading3 ? (
              <div>Loading...</div>
            ) : (
              <div>
                <UserGroups
                enrollments={enrollments}
                users = {users}
                />
                <GroupForm
                topics = {topics}
                />
              </div>
            )}
            */}
          </div>
        </div>
    );
  };
  
export default Profile;