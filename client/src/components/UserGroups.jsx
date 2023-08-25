import { Link } from 'react-router-dom';

const UserGroups = ({ groups, users}) => {
  if (!groups.length) {
    return <h3>No Groups Yet</h3>;
  }

  return (
        <div class="group-container">
            {groups &&
                groups.map((group) => (
                    <div class="user-group-list-container">
                    {{#if enrollments.user_id.length}}
                    <div id="user-group-list">
                        {{#each enrollments.user_id as |group|}}
    
                        <div class="user-group-list-card">
                            <div class="user-group-info">
                            <div>
                                <h2>
                                    <a href="/groups/{{group.id}}">{{group.group_name}}</a>
                                </h2>
                                <p>
                                    Study Topic: {{group.topic.topic_name}}!
                                </p>
                                <p>
                                    Skill Level: {{group.skill_level}}
                                </p>
                                <p>
                                    Time to Meet: {{group.meet_time}}
                                </p>
                                <p>
                                    Created by: {{group.user.first_name}} {{group.user.last_name}}
                                </p>
                            </div>
                        </div>
                        <div>
                            <form id="add-user-{{group.id}}" class="add-user form" action="">
                                <label class="label" for="user_names">Add User: </label>
                                <select class="select user_names" name="user_names">
                                    {{!-- {{#unless enrollments.users.id}} --}}
                                    {{#each ../users}}<option value="{{id}}">{{first_name}} {{last_name}} | {{user_name}}
                                    </option>
                                    {{/each}}
                                    {{!-- {{/unless}} --}}
                                </select>
    
                                <button class="add-user button has-background-info-dark has-text-white" type="submit">Add
                                    User</button>
                            </form>
    
                        </div>
                        {{#if group.isOwner}}
                        <div>
                            <button class="deleteButton buttonDlt" data-id="{{group.id}}"><i
                                class='bx bx-trash'></i></button>
                        </div>
                        {{else}}
                        <div>
                            <button id="unenrolled-{{group.id}}" class="exitButton buttonExit" data-id="{{group.id}}">Leave
                        </div>
                        {{/if}}
                    </div>
                    {{/each}}
                </div>
                <script src="./js/enrollUser.js"></script>
                <script src="/js/deleteGroup.js"></script>
                <script src="/js/unenrolled.js"></script>
                <script src="./js/groups.js"></script>
            </div>
            ))}
        </div>
  );
};

export default UserGroups;
