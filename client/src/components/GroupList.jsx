import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ENROLL, UNENROLL } from '../utils/mutations';
import { React, useState, useContext } from 'react';
import { Card } from 'flowbite-react';
import { GET_USER } from '../utils/queries';

const GroupList = ({ groups, user }) => {
  const [enroll, { error: enrollError }] = useMutation(ENROLL);
  const [unEnroll, { error: unEnrollError }] = useMutation(UNENROLL);


  const handleJoinButton = async (groupId) => {
    try {
      const { data } = await enroll({
        variables: { group_id: groupId }, 
      });

      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeaveButton = async (groupId) => {
    try {
      const { data } = await unEnroll({
        variables: { group_id: groupId }, 
      });

      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-20 flex flex-wrap justify-center">
      {groups &&
        groups.map((group) => (
          <div
            key={group._id}
            className="group-card max-w-sm mb-6 mx-4 px-6 font-serif bg-gray-400 border border-gray-400 rounded-2xl shadow-lg shadow-blue-800 hover:bg-gray-600 border-gray-600"
          >
            <h2 className="text-blue-800 font-semibold text-4xl">
              <Link to={`/groups/${group._id}`}>{group.group_name}</Link>
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
                Created by: {group.created_by.username}
            </p>
            <p>
                Meeting Link: 
                <Link className='hover:text-blue-400' to={group.zoom_link}>
                    {group.zoom_link}
                </Link>
            </p>
            { !user.groups.find((userGroup) => userGroup._id === group._id) ?
            <button
              onClick={() => handleJoinButton(group._id)} // Passes the group ID when the button is clicked
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Join Group
            </button>
            :
            <button
            onClick={() => handleLeaveButton(group._id)} // Passes the group ID when the button is clicked
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Leave Group
          </button>
            }
          </div>
        ))}
    </div>
  );
};

export default GroupList;
