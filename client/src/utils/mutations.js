import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GROUP = gql`
  mutation addGroup($group_name: String!, $group_description: String!, $topic_id: ID!, $skill_level: String!, $zoom_link: String!, $meet_time: String!, $created_by: ID!) {
    addGroup(group_name: $group_name, group_description: $group_description, topic_id: $topic_id, skill_level: $skill_level, zoom_link: $zoom_link, meet_time: $meet_time, created_by: $created_by) {
			group_name
			group_description
			topic_id {
				topic_name
			}
			skill_level
			zoom_link
			meet_time
			created_by
    }
  }
`;

export const REMOVE_GROUP = gql`
  mutation removeGroup($group_id: ID!) {
    removeGroup(group_id: $group_id) {
			group_name
			group_description
			topic_id {
				topic_name
			}
			skill_level
			zoom_link
			meet_time
			created_by
    }
  }
`;

export const ENROLL = gql`
  mutation enroll($user_id: ID!, $group_id: ID!) {
    enroll(user_id: $user_id, group_id: $group_id) {
      _id
      username
      first_name
      last_name
      email
      groups {
        group_name
        group_description
        topic_id {
					topic_name
        }
        skill_level
        zoom_link
        meet_time
				created_by
      }
		}
  }
`;

export const UNENROLL = gql`
  mutation unEnroll($user_id: ID!, $group_id: ID!) {
    unEnroll(user_id: $user_id, group_id: $group_id) {
      _id
      username
      first_name
      last_name
      email
      groups {
        group_name
        group_description
        topic_id {
					topic_name
        }
        skill_level
        zoom_link
        meet_time
				created_by
      }
		}
  }
`;