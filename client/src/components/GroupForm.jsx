import { useState } from 'react';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_GROUP } from '../utils/mutations';

const GroupForm = ({groups,topics, user, title}) => {

    const token = Auth.getToken();

    const [addGroup, { error }] = useMutation(ADD_GROUP);

    const [formData, setFormData] = useState({
        group_name: '',
        group_description: '',
        topic_id: '',
        skill_level: 'Beginner', 
        zoom_link: '',
        meet_time: '1:00 PM CST', 

      });
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addGroup({
            variables: { ...formData, created_by: token },
          });
    
          navigate(`/groups/${data.addGroup._id}`);
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <div>
        <div className='flex justify-center'>
        <h2 className="mt-6 mb-2 text-white text-3xl font-semibold">Ready to study, {user.first_name}?!</h2>
      </div>


      <section id="profile">
        <h3 className="mb-6 text-white text-2xl font-medium flex justify-center">Make a Study Group!</h3>
        <div className="topOfProfile">
            <div className="profile-container flex justify-center">
                <div className="w-full max-w-sm p-4 border border-white rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-2" id="create_group" onSubmit={handleFormSubmit}>
                    <div>
                        <label className="label block mb-2 text-sm font-medium text-white" htmlFor="group_name">Group Name: </label>
                        <input className="input bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500" required type="text" name="group_name" id="group_name"  onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label className="label block mb-2 text-sm font-medium text-white" htmlFor="group_description">Group Description: </label>
                        <input className="input bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500" required type="text" name="group_description" id="group_description" onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label className="label block mb-2 text-sm font-medium text-white" htmlFor="topic_id">Topic: </label>

                            <select className="select rounded-lg" name="topic_id" id="topic_id" onChange={handleInputChange}>
                            {topics &&
                                topics.map((topic) => (
                                <option key={topic._id}>{topic.topic_name}</option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <label className="label block mb-2 text-sm font-medium text-white" htmlFor="skill_level">Skill Level: </label>
                        <select className="select rounded-lg" name="skill_level" id="skill_level" onChange={handleInputChange}>
                            <option value="Beginner">Beginner</option>
                        <   option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div>
                        <label className="label block mb-2 text-sm font-medium text-white" htmlFor="zoom_link">Zoom Link: </label>
                        <input className="input rounded-lg" type="text" name="zoom_link" id="zoom_link" onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label className="label block mb-2 text-sm font-medium text-white" htmlFor="meet_half_hour">Meet Time: </label>
                        <select className="select rounded-lg" name="meet_time" id="meet_time" onChange={handleInputChange}>
                            <option value="1:00">1:00 PM CST</option>
                            <option value="1:30">1:30 PM CST</option>
                            <option value="2:00">2:00 PM CST</option>
                            <option value="2:30">2:30 PM CST</option>
                            <option value="3:00">3:00 PM CST</option>
                            <option value="3:30">3:30 PM CST</option>
                            <option value="4:00">4:00 PM CST</option>
                            <option value="4:30">4:30 PM CST</option>
                            <option value="5:00">5:00 PM CST</option>
                            <option value="5:30">5:30 PM CST</option>
                            <option value="6:00">6:00 PM CST</option>
                            <option value="6:30">6:30 PM CST</option>
                            <option value="7:00">7:00 PM CST</option>
                            <option value="7:30">7:30 PM CST</option>
                            <option value="8:00">8:00 PM CST</option>
                            <option value="8:30">8:30 PM CST</option>
                            <option value="9:00">9:00 AM CST</option>
                            <option value="9:30">9:30 AM CST</option>
                            <option value="10:00">10:00 AM CST</option>
                            <option value="10:30">10:30 AM CST</option>
                            <option value="11:00">11:00 AM CST</option>
                            <option value="11:30">11:30 AM CST</option>
                            <option value="12:00">12:00 PM CST</option>
                            <option value="12:30">12:30 PM CST</option>
                        </select>
                    </div>
                    <div className='flex'>
                    <button className="button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Submit</button>
                    </div>
                    <div id="group-fail" className="text-red-600"></div>
                    </form>
                </div>
            </div>

        </div>
</section>
</div>
  );
};

export default GroupForm;
