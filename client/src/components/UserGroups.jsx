import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';

const UserGroups = ({ groups, users}) => {
  if (!groups) {
    return <h3 className='flex flex-wrap justify-end mr-6 text-white text-xl font-semibold'>No Groups Yet</h3>;
  }

  return (
        <div className='mt-20 flex flex-wrap justify-end'>
            {users.groups &&
                users.groups.map((group) => (
                    <Card className='group-card max-w-sm mb-6 mx-4 px-6 font-serif bg-gray-400 border border-gray-400 rounded-2xl shadow-lg shadow-blue-800 hover:bg-gray-600 border-gray-600'>
                    <div class="user-group-list-container">
                        <div id="user-group-list">
    
                            <div class="user-group-list-card">
                                <div class="user-group-info">
                                    <div>
                                        <h2 className='text-blue-800 font-semibold text-4xl'>
                                            <a href="/groups/{{group.id}}">{group.group_name}</a>
                                        </h2>
                                        <p>
                                            Study Topic: {group.topic.topic_name}!
                                        </p>
                                        <p>
                                            Skill Level: {group.skill_level}
                                        </p>
                                        <p>
                                            Time to Meet: {group.meet_time}
                                        </p>
                                        <p>
                                            Created by: {group.created_by.username}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <form id="add-user-{{group.id}}" class="add-user form" action="">
                                        <label class="label" for="usernames">Add User: </label>
                                        <select class="select usernames" name="usernames">
                                        {
                                            group.users &&
                                                group.users.map((user) =>
                                                <option value={user.id}>{user.username}
                                                </option>
                                                )
                                        }
                                        </select>
        
                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value={group.id} name="groupId" id="enroll_user" type="submit">Add User</button>
                                    </form>
        
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
