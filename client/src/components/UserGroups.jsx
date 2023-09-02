import { Link } from 'react-router-dom';

const UserGroups = ({ groups, users}) => {
  if (!groups) {
    return <h3>No Groups Yet</h3>;
  }

  return (
        <div class="group-container">
            {users.groups &&
                users.groups.map((group) => (
                    <div class="user-group-list-container">
                        <div id="user-group-list">
    
                            <div class="user-group-list-card">
                                <div class="user-group-info">
                                    <div>
                                        <h2>
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
                                            Created by: {group.created_by.user_name}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <form id="add-user-{{group.id}}" class="add-user form" action="">
                                        <label class="label" for="user_names">Add User: </label>
                                        <select class="select user_names" name="user_names">
                                        {
                                            group.users &&
                                                group.users.map((user) =>
                                                <option value={user.id}>{user.user_name}
                                                </option>
                                                )
                                        }
                                        </select>
        
                                        <button class="add-user button has-background-info-dark has-text-white" type="submit">Add User</button>
                                    </form>
        
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
                <script src="./js/enrollUser.js"></script>
                <script src="/js/deleteGroup.js"></script>
                <script src="/js/unenrolled.js"></script>
                <script src="./js/groups.js"></script>
            </div>
        );
    };

export default UserGroups;
