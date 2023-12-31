import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
      token
    }
  }
`;

export const ADD_GROUP = gql`
  mutation addGroup($group_name: String!, $group_description: String!, $topic_id: ID!, $skill_level: String!, $zoom_link: String!, $meet_time: String!) {
    addGroup(group_name: $group_name, group_description: $group_description, topic_id: $topic_id, skill_level: $skill_level, zoom_link: $zoom_link, meet_time: $meet_time) {
			group_name
			group_description
			skill_level
			zoom_link
			meet_time
    }
  }
`;

export const REMOVE_GROUP = gql`
  mutation removeGroup($group_id: ID!) {
    removeGroup(group_id: $group_id) {
      _id
      group_name
      group_description
    }
  }
`;

export const ENROLL = gql`
  mutation enroll( $group_id: ID!) {
    enroll(group_id: $group_id) {
      _id
      username
      email
		}
  }
`;

export const UNENROLL = gql`
  mutation unEnroll($group_id: ID!) {
    unEnroll(group_id: $group_id) {
      _id
      username
      email
		}
  }
`;