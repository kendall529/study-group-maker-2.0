import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      user_name
      first_name
      last_name
      email
      groups {
        _id
        group_name
        group_description
        topic_id {
          topic_name
        }
        skill_level
        zoom_link
        meet_time
        created_by {
          _id
          user_name
          first_name
          last_name
        }
      }
    }
  }
`;

export const GET_USER = gql`
query GetUser {
  getUser
  {
    _id
    user_name
    first_name
    last_name
    email
    groups {
      _id
      group_name
      group_description
      topic_id {
        topic_name
      }
      skill_level
      zoom_link
      meet_time
      created_by {
        _id
        user_name
        first_name
        last_name
      }
    }
  }
}
`;

export const GET_GROUPS = gql`
  query GetGroups {
    getGroups {
      _id
      group_name
      group_description
      topic_id {
        topic_name
      }
      skill_level
      zoom_link
      meet_time
      created_by {
        _id
        user_name
        first_name
        last_name
      }
    }
  }
`;

export const GET_GROUP = gql`
  query GetGroup($_id: ID!) {
		getGroup(_id: $_id) {
      _id
      group_name
      group_description
      topic_id {
        topic_name
      }
      skill_level
      zoom_link
      meet_time
      created_by {
        _id
        user_name
        first_name
        last_name
      }
    }
  }
`;

export const GET_TOPICS = gql`
  query GetTopics {
		getTopics {
      _id
			topic_name
		}
  }
`;

export const GET_MEMBERS = gql`
  query GetMembers($group_id: ID!) {
    getMembers(group_id: $group_id) {
      _id
      user_name
      email
    }
  }
`;