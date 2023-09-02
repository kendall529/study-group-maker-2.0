import { Link } from 'react-router-dom';

const GroupList = ({ groups }) => {
  if (!groups) {
    return <h3>No Groups Yet</h3>;
  }

  return (
        <div className="group-container">
            {groups &&
                groups.map((group) => (
                    <div className="info-card">
                    <h2>
                        <Link to={`/groups/${group.id}`}>
                            {group.group_name}
                        </Link>
                    </h2>
                    <p>Description: {group.group_description}</p>
                    <p>
                        Study Topic: {group.topic_id.topic_name}!
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
                    <p>
                        Meeting Link
                        <Link to={group.zoom_link}>
                            {group.zoom_link}
                        </Link>
                    </p>
                
                <div id= {group.id}>
                    <button className="button has-background-info-dark has-text-white" id="enroll_user">Join Group</button>
                </div>
                <div id="enroll-success" className="has-text-success"></div>

            </div>
            ))}
        </div>
  );
};

export default GroupList;
