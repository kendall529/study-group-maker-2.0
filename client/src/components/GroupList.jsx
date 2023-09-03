import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ENROLL } from '../utils/mutations';
import { useState, useContext } from 'react';

const GroupList = ({ groups }) => {
  if (!groups) {
    return <h3>No Groups Yet</h3>;
  }

    const [formData, setFormData] = useState({
        group_id: '',
        user_id: useContext.user_id,
      });
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        console.log(formData);

        try {
          const { data } = await addGroup({
            variables: { ...formData },
          });
    
          navigate(`/groups/${data.addGroup._id}`);
        } catch (err) {
          console.error(err);
        }
      };

  return (
        <div className="group-container mt-14 flex flex-wrap">
            {groups &&
                groups.map((group) => (
                    <div className="info-card">
                    <h2 className='text-blue-400 font-semibold text-4xl'>
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
                        Meeting Link: 
                        <Link to={group.zoom_link}>
                            {group.zoom_link}
                        </Link>
                    </p>
                
                <div>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value={group.id} name="groupId" id="enroll_user">Join Group</button>
                </div>
                <div id="enroll-success" className="text-green"></div>

            </div>
            ))}
        </div>
  );
};

export default GroupList;
