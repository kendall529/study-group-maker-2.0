import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    user {
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

export const GET_USER = gql`
  query getUser {
    user {
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

export const GET_GROUPS = gql`
  query getGroups {
		group {
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

export const GET_GROUP = gql`
  query getGroup($_id: ID!) {
		group(_id: $_id) {
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

export const GET_TOPICS = gql`
  query getTopics {
		topic {
			topic_name
		}
  }
`;