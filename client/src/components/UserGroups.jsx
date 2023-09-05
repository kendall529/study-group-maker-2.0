import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { useMutation } from '@apollo/client';
import { REMOVE_GROUP } from '../utils/mutations';


const UserGroups = ({ users }) => {
	const [removeGroup, { error }] = useMutation(REMOVE_GROUP);

	const handleRemoveButton = async (groupId) => {
    try {
      const { data } = await removeGroup({
        variables: { group_id: groupId }, 
      });
			location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
		<div className='flex flex-wrap justify-center' style={{paddingTop: "75px"}}>
			{users.groups && users.groups.map((group) => (
				<Card key={group._id} className='group-card max-w-sm mb-6 mx-4 px-6 font-serif bg-gray-400 border border-gray-400 rounded-2xl shadow-lg shadow-blue-800 hover:bg-gray-600 border-gray-600'>
					<div className="user-group-list-container">
						<div id="user-group-list">
							<div className="user-group-list-card">
								<div className="user-group-info">
									<div>
										<h2 className='text-blue-800 font-semibold text-4xl'>
											<a href="/groups/{{group._id}}">{group.group_name}</a>
										</h2>
										<p>Study Topic: {group.topic_id.topic_name}!</p>
										<p>Skill Level: {group.skill_level}</p>
										<p>Time to Meet: {group.meet_time}</p>
										<p>Created by: {group.created_by.username}</p>
									</div>
									{ group.created_by._id === users._id ?
										<button
											onClick={() => handleRemoveButton(group._id)} // Passes the group ID when the button is clicked
											className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
										>
										Delete Group
										</button>
										: 
										<></>
           				}
								</div>
              </div>
						</div>
          </div>
        </Card>
  		))}
      {/* <script src="./js/enrollUser.js"></script> */}
      {/* <script src="/js/deleteGroup.js"></script> */}
      {/* <script src="/js/unenrolled.js"></script> */}
      {/* <script src="./js/groups.js"></script> */}
    </div>
  );
};

export default UserGroups;
